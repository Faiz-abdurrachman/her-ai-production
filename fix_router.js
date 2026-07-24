const fs = require('fs');
const path = require('path');

const routerPath = path.join(__dirname, 'js', 'router.js');
let routerJs = fs.readFileSync(routerPath, 'utf8');

// We need to inject -practice, -quiz, -discussion for any module in participantDashboardPages and publicRoutes

const injectSuffixes = (arrayMatchStr) => {
    return routerJs.replace(new RegExp(`(const ${arrayMatchStr} = \\[[\\s\\S]*?\\];)`, 'm'), (match) => {
        // extract all routes in the array
        const elements = match.match(/"([^"]+)"/g) || [];
        const newElements = new Set(elements);
        
        elements.forEach(el => {
            const val = el.replace(/"/g, '');
            if (val.startsWith('/participant-ai-lab-') && !val.endsWith('-practice') && !val.endsWith('-quiz') && !val.endsWith('-discussion')) {
                newElements.add(`"${val}-practice"`);
                newElements.add(`"${val}-quiz"`);
                newElements.add(`"${val}-discussion"`);
            }
        });
        
        const replacement = `const ${arrayMatchStr} = [\n            ` + Array.from(newElements).join(',\n            ') + `\n        ];`;
        return replacement;
    });
};

routerJs = injectSuffixes('participantDashboardPages');
routerJs = injectSuffixes('publicRoutes');

fs.writeFileSync(routerPath, routerJs);
console.log("Fixed router arrays!");
