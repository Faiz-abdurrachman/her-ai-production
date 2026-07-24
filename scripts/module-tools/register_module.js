const fs = require('fs');
const path = require('path');

const baseId = process.argv[2];
const categoryFolder = process.argv[3];
const moduleFolder = process.argv[4];

if (!baseId || !categoryFolder || !moduleFolder) {
    console.error("Usage: node register_module.js <baseId> <categoryFolder> <moduleFolder>");
    process.exit(1);
}

const camelBase = baseId.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

// 1. Update router.js
const routerPath = path.join(__dirname, '../../js/router.js');
let routerJs = fs.readFileSync(routerPath, 'utf8');

// The route in router.js is likely /participant-ai-lab-something
const routeKeyMatch = routerJs.match(new RegExp(`"/participant-ai-lab-${baseId.replace('ai-', '')}":.*under-development\\.html"`));
const actualRouteKey = routeKeyMatch ? routeKeyMatch[0].split(':')[0].replace(/"/g, '') : `/participant-ai-lab-${baseId.replace('ai-', '')}`;

const materiHtmlPath = `"/pages/frontend/fellow-dashboard/${categoryFolder}/${moduleFolder}/materi.html"`;
const practiceHtmlPath = `"/pages/frontend/fellow-dashboard/${categoryFolder}/${moduleFolder}/latihan.html"`;
const quizHtmlPath = `"/pages/frontend/fellow-dashboard/${categoryFolder}/${moduleFolder}/kuis.html"`;
const discussionHtmlPath = `"/pages/frontend/fellow-dashboard/${categoryFolder}/${moduleFolder}/diskusi.html"`;

if (routerJs.includes(actualRouteKey) && routerJs.includes('under-development.html')) {
    // Replace in staticRoutes
    routerJs = routerJs.replace(
        new RegExp(`"${actualRouteKey}":.*under-development\\.html",?`),
        `"${actualRouteKey}": ${materiHtmlPath},\n        "${actualRouteKey}-practice": ${practiceHtmlPath},\n        "${actualRouteKey}-quiz": ${quizHtmlPath},\n        "${actualRouteKey}-discussion": ${discussionHtmlPath},`
    );
} else if (!routerJs.includes(actualRouteKey)) {
    // Insert into staticRoutes
    routerJs = routerJs.replace(/routes: \{/, `routes: {\n        "${actualRouteKey}": ${materiHtmlPath},\n        "${actualRouteKey}-practice": ${practiceHtmlPath},\n        "${actualRouteKey}-quiz": ${quizHtmlPath},\n        "${actualRouteKey}-discussion": ${discussionHtmlPath},`);
    
    // Insert into publicRoutes
    routerJs = routerJs.replace(/const publicRoutes = \[/, `const publicRoutes = [\n            "${actualRouteKey}",\n            "${actualRouteKey}-practice",\n            "${actualRouteKey}-quiz",\n            "${actualRouteKey}-discussion",`);
}

if (!routerJs.includes(`path.startsWith("${actualRouteKey}")`)) {
    // Also inject into initRouter
    const initInjection = `
                } else if (path.startsWith("${actualRouteKey}") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "${actualRouteKey}" && typeof window.init${camelBase}Materi === "function") {
                        window.init${camelBase}Materi();
                    }
                    if (path === "${actualRouteKey}-practice" && typeof window.init${camelBase}Practice === "function") {
                        window.init${camelBase}Practice();
                    }
                    if (path === "${actualRouteKey}-quiz" && typeof window.init${camelBase}Quiz === "function") {
                        window.init${camelBase}Quiz();
                    }
                    if (path === "${actualRouteKey}-discussion" && typeof window.init${camelBase}Discussion === "function") {
                        window.init${camelBase}Discussion();
                    }
`;
    // Find a good place to inject in initRouter (e.g., after initAiDeepLearningDiscussion)
    routerJs = routerJs.replace(/(window\.initAiDeepLearningDiscussion\(\);\n[ \t]*})/, `$1${initInjection}`);
    
    fs.writeFileSync(routerPath, routerJs);
    console.log("Updated router.js");
} else {
    console.log("Routes already exist in router.js");
}

// 2. Update index.html
const indexPath = path.join(__dirname, '../../index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
if (!indexHtml.includes(`src="/js/frontend/fellow-dashboard/${baseId}.js"`)) {
    const scriptInsert = `<script src="/js/frontend/fellow-dashboard/${baseId}.js"></script>`;
    indexHtml = indexHtml.replace(/<script src="\/js\/frontend\/fellow-dashboard\/ai-python\.js\?v=20260722-fix-404"><\/script>/, `<script src="/js/frontend/fellow-dashboard/ai-python.js?v=20260722-fix-404"></script>\n    ${scriptInsert}`);
    
    // Cache bust CSS
    const ts = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    indexHtml = indexHtml.replace(/modules\.css\?v=[^"]+/, `modules.css?v=${ts}`);
    fs.writeFileSync(indexPath, indexHtml);
    console.log("Updated index.html");
}

// 3. Update modules.css
const cssPath = path.join(__dirname, '../../css/frontend/fellow-dashboard/modules.css');
let css = fs.readFileSync(cssPath, 'utf8');
const searchId = `#${camelBase}`;

if (!css.includes(searchId)) {
    // Replicate aiPython to camelBase in CSS!
    const regex = /([ \t]*)(.*#aiDeepLearning[a-zA-Z0-9_-]+.*)(?=[,{])/g;
    css = css.replace(regex, (match, whitespace, selector) => {
        const newSelector = selector.replace(/aiDeepLearning/g, camelBase.charAt(0).toLowerCase() + camelBase.slice(1));
        return match + ',\n' + whitespace + newSelector;
    });
    fs.writeFileSync(cssPath, css);
    console.log("Updated modules.css");
}

