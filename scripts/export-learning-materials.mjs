import fs from "fs";
import path from "path";
import crypto from "crypto";
import vm from "vm";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const OUT = path.join(ROOT, "materi");
const PAGE_ROOT = path.join(ROOT, "pages/frontend/fellow-dashboard");
const JS_ROOT = path.join(ROOT, "js/frontend/fellow-dashboard");
const PANDOC = "/home/faiz/.npm-global/lib/node_modules/pandoc-bin/vendor/pandoc";
const PANDOC_CACHE = "/tmp/herai-material-export";

const learningRoots = [
    "pages/frontend/fellow-dashboard/foundation-core-ai",
    "pages/frontend/fellow-dashboard/data-engineering-domains",
    "pages/frontend/fellow-dashboard/generative-multimodal-ai"
];

const standaloneLearningPages = [
    "pages/frontend/curriculum.html",
    "pages/frontend/home.html",
    "pages/frontend/industry-applications.html",
    "pages/frontend/fellow-dashboard/modules.html",
    "pages/frontend/fellow-dashboard/course-placeholder.html"
];

const curated = [
    {
        output: "00-katalog-dan-cakupan.md",
        title: "Katalog dan Cakupan Kurikulum HerAI",
        sources: [
            "pages/frontend/curriculum.html",
            "pages/frontend/home.html",
            "pages/frontend/fellow-dashboard/modules.html"
        ]
    },
    {
        output: "01-foundation-core-ai/00-ai-fundamentals-advanced-overview.md",
        title: "AI Fundamentals & Advanced — Overview",
        sources: [
            "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/overview.html"
        ]
    },
    {
        output: "01-foundation-core-ai/01-pengantar-ai.md",
        title: "Pengantar AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai"
    },
    {
        output: "01-foundation-core-ai/02-python-untuk-ai.md",
        title: "Pemrograman Python untuk AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai",
        dynamic: ["python"]
    },
    {
        output: "01-foundation-core-ai/03-konsep-ai-modern.md",
        title: "Konsep AI Modern",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern",
        dynamic: ["modern"]
    },
    {
        output: "01-foundation-core-ai/04-reasoning-ai.md",
        title: "Reasoning AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning",
        dynamic: ["reasoning"]
    },
    {
        output: "01-foundation-core-ai/05-evaluation-ai.md",
        title: "Evaluation AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation",
        dynamic: ["evaluation"]
    },
    {
        output: "01-foundation-core-ai/06-evolution-of-ai.md",
        title: "Evolution of AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai",
        dynamic: ["evolution"]
    },
    {
        output: "01-foundation-core-ai/07-math-for-ai.md",
        title: "Math for AI",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai",
        dynamic: ["math"]
    },
    {
        output: "01-foundation-core-ai/08-machine-learning.md",
        title: "Machine Learning",
        prefix: "pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning",
        dynamic: ["ml"]
    },
    {
        output: "02-data-engineering-domains/01-natural-language-processing.md",
        title: "Natural Language Processing",
        prefix: "pages/frontend/fellow-dashboard/data-engineering-domains/nlp"
    },
    {
        output: "02-data-engineering-domains/02-computer-vision.md",
        title: "Computer Vision",
        prefix: "pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision"
    },
    {
        output: "03-generative-multimodal-ai/01-generative-ai.md",
        title: "Generative AI",
        prefix: "pages/frontend/fellow-dashboard/generative-multimodal-ai",
        dynamic: ["scaffolds-generative"]
    },
    {
        output: "05-business-industry-applications/01-ai-for-industries.md",
        title: "AI for Industries",
        sources: [
            "pages/frontend/industry-applications.html"
        ]
    }
];

function posix(relativePath) {
    return relativePath.split(path.sep).join("/");
}

function ensureDir(directory) {
    fs.mkdirSync(directory, { recursive: true });
}

function write(relativePath, content) {
    const target = path.join(OUT, relativePath);
    ensureDir(path.dirname(target));
    fs.writeFileSync(target, content.replace(/\s+$/u, "") + "\n", "utf8");
}

function walk(directory, predicate = () => true) {
    if (!fs.existsSync(directory)) return [];
    const entries = fs.readdirSync(directory, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name));
    const files = [];
    for (const entry of entries) {
        const full = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...walk(full, predicate));
        else if (entry.isFile() && predicate(full)) files.push(full);
    }
    return files;
}

function relative(fullPath) {
    return posix(path.relative(ROOT, fullPath));
}

function decodeEntities(text) {
    return String(text || "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#(?:39|x27);/gi, "'")
        .replace(/&nbsp;/g, " ");
}

function plainText(html) {
    return decodeEntities(String(html || "")
        .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim());
}

function firstTitle(html, fallback) {
    const match = String(html).match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i);
    return match ? plainText(match[1]) : fallback;
}

function extractBalancedElement(html, startIndex, tagName) {
    if (startIndex < 0) return "";
    const matcher = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
    matcher.lastIndex = startIndex;
    let depth = 0;
    let match;
    while ((match = matcher.exec(html))) {
        const isClosing = /^<\//.test(match[0]);
        if (isClosing) depth -= 1;
        else if (!/\/>$/.test(match[0])) depth += 1;
        if (depth === 0) return html.slice(startIndex, matcher.lastIndex);
    }
    return html.slice(startIndex);
}

function removeElementsByClass(html, classFragments) {
    let output = html;
    for (const classFragment of classFragments) {
        let searchFrom = 0;
        while (searchFrom < output.length) {
            const matcher = new RegExp(
                `<([a-z][a-z0-9-]*)\\b[^>]*class=["'][^"']*${classFragment}[^"']*["'][^>]*>`,
                "i"
            );
            const slice = output.slice(searchFrom);
            const match = slice.match(matcher);
            if (!match) break;
            const start = searchFrom + match.index;
            const block = extractBalancedElement(output, start, match[1]);
            if (!block) break;
            output = output.slice(0, start) + output.slice(start + block.length);
            searchFrom = start;
        }
    }
    return output;
}

function educationalHtml(sourceHtml) {
    const articleMatch = sourceHtml.match(/<article\b[^>]*class=["'][^"']*lesson-article[^"']*["'][^>]*>/i);
    if (articleMatch) {
        return extractBalancedElement(sourceHtml, articleMatch.index, "article");
    }

    const mainMatch = sourceHtml.match(/<main\b[^>]*>/i);
    let selected = mainMatch
        ? extractBalancedElement(sourceHtml, mainMatch.index, "main")
        : sourceHtml;

    selected = removeElementsByClass(selected, [
        "fellow-topbar",
        "lesson-topbar",
        "lesson-right-panel",
        "module-right",
        "course-detail-right"
    ]);
    return selected;
}

function htmlToMarkdown(html) {
    if (!plainText(html)) return "";
    try {
        ensureDir(PANDOC_CACHE);
        const cacheKey = crypto.createHash("sha256").update(html).digest("hex");
        const inputPath = path.join(PANDOC_CACHE, `${cacheKey}.html`);
        const outputPath = path.join(PANDOC_CACHE, `${cacheKey}.md`);
        if (!fs.existsSync(outputPath)) {
            fs.writeFileSync(inputPath, html, "utf8");
            execFileSync(
            PANDOC,
                ["-f", "html", "-t", "markdown_github", "--no-wrap", "--base-header-level=3", "-o", outputPath, inputPath],
                {
                    cwd: ROOT,
                    encoding: "utf8",
                    maxBuffer: 64 * 1024 * 1024
                }
            );
        }
        return fs.readFileSync(outputPath, "utf8").trim();
    } catch (error) {
        return [
            "> Konversi Pandoc gagal; fragmen HTML asli dipertahankan agar konten tidak hilang.",
            "",
            "```html",
            html,
            "```"
        ].join("\n");
    }
}

function isProbablyHtml(value) {
    return /<\/?(?:h[1-6]|p|section|article|div|ul|ol|li|table|blockquote|pre|code)\b/i.test(String(value || ""));
}

function heading(level, label) {
    const normalized = plainText(label).replace(/\s+/g, " ").trim() || "Tanpa judul";
    if (level <= 6) return `${"#".repeat(level)} ${normalized}`;
    return `**${normalized}**`;
}

function renderStructured(value, level = 3, label = "") {
    const lines = [];
    if (label) lines.push(heading(level, label), "");

    if (value === null || value === undefined) {
        lines.push("_Tidak ada nilai._", "");
        return lines.join("\n");
    }

    if (typeof value === "string") {
        lines.push(isProbablyHtml(value) ? htmlToMarkdown(value) : value, "");
        return lines.join("\n");
    }

    if (typeof value === "number" || typeof value === "boolean") {
        lines.push(String(value), "");
        return lines.join("\n");
    }

    if (Array.isArray(value)) {
        if (!value.length) {
            lines.push("_Daftar kosong._", "");
            return lines.join("\n");
        }
        if (value.every(item => ["string", "number", "boolean"].includes(typeof item))) {
            for (const item of value) lines.push(`- ${String(item).replace(/\n/g, " ")}`);
            lines.push("");
            return lines.join("\n");
        }
        value.forEach((item, index) => {
            const itemLabel = item && typeof item === "object" && !Array.isArray(item) && (item.title || item.name || item.slug)
                ? item.title || item.name || item.slug
                : `Item ${index + 1}`;
            lines.push(renderStructured(item, level, itemLabel));
        });
        return lines.join("\n");
    }

    for (const [key, item] of Object.entries(value)) {
        if (["icon", "route", "sourcePath", "aliases"].includes(key)) {
            const rendered = Array.isArray(item) ? item.join(", ") : String(item);
            lines.push(`- **${key}:** ${rendered}`);
            continue;
        }
        if (item && typeof item === "object") {
            lines.push(renderStructured(item, Math.min(level + 1, 7), key));
        } else if (typeof item === "string" && isProbablyHtml(item)) {
            lines.push(heading(Math.min(level + 1, 7), key), "", htmlToMarkdown(item), "");
        } else {
            lines.push(`- **${key}:** ${String(item ?? "")}`);
        }
    }
    lines.push("");
    return lines.join("\n");
}

function iifeEndPositions(source) {
    const positions = [];
    let index = source.indexOf("})();");
    while (index >= 0) {
        positions.push(index);
        index = source.indexOf("})();", index + 5);
    }
    return positions;
}

function injectAt(source, position, statement) {
    return source.slice(0, position) + `\n${statement}\n` + source.slice(position);
}

function evaluateInstrumented(relativePath, injections, replacements = []) {
    let source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
    for (const [needle, replacement] of replacements) {
        if (!source.includes(needle)) throw new Error(`Instrumen tidak menemukan pola: ${needle}`);
        source = source.replace(needle, replacement);
    }
    const originalPositions = iifeEndPositions(source);
    const resolved = injections.map(injection => ({
        ...injection,
        position: originalPositions[injection.iife]
    })).sort((a, b) => b.position - a.position);
    for (const injection of resolved) {
        if (!Number.isInteger(injection.position)) {
            throw new Error(`IIFE ke-${injection.iife} tidak ditemukan pada ${relativePath}`);
        }
        source = injectAt(source, injection.position, injection.statement);
    }

    const sandbox = {
        console,
        URL,
        URLSearchParams,
        Date,
        Math,
        JSON,
        Promise,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        window: {
            location: { hash: "" },
            addEventListener() {},
            removeEventListener() {},
            scrollTo() {}
        },
        document: {},
        localStorage: {},
        sessionStorage: {}
    };
    sandbox.globalThis = sandbox;
    vm.runInNewContext(source, sandbox, { filename: relativePath, timeout: 5000 });
    return JSON.parse(JSON.stringify(sandbox.__HERAI_EXPORT__ || {}));
}

const dynamicData = {};

function collectDynamicData() {
    console.log("[export] dynamic: math");
    dynamicData.math = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-math-for-ai.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { mathForAiCourse, mathForAiLessons, mathForAiPracticeTasks, mathForAiQuiz, mathForAiDiscussionPrompts };"
        }]
    );

    console.log("[export] dynamic: python");
    dynamicData.python = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-python.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { CHAPTERS, PYTHON_GUIDES, PRACTICES, QUIZ, DISCUSSION_PROMPTS, SOURCE_VISUALS, PRACTICE_TOPICS };"
        }]
    );

    console.log("[export] dynamic: reasoning");
    dynamicData.reasoning = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-reasoning.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { CHAPTERS, PRACTICES, QUIZ, DISCUSSION_PROMPTS, SOURCE_VISUALS, PRACTICE_TOPICS };"
        }]
    );

    console.log("[export] dynamic: modern");
    dynamicData.modern = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-modern.js",
        [
            {
                iife: 0,
                statement: "globalThis.__HERAI_EXPORT__ = Object.assign(globalThis.__HERAI_EXPORT__ || {}, { CHAPTERS, SOURCE_VISUALS, BEGINNER_GUIDES });"
            },
            {
                iife: 1,
                statement: "globalThis.__HERAI_EXPORT__ = Object.assign(globalThis.__HERAI_EXPORT__ || {}, { PRACTICE_ITEMS, PRACTICES, QUIZ, DISCUSSION_PROMPTS, PRACTICE_TOPICS });"
            }
        ]
    );

    console.log("[export] dynamic: evaluation");
    dynamicData.evaluation = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-evaluation.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { MODULES, EXERCISES, QUIZ, DISCUSSIONS };"
        }]
    );

    console.log("[export] dynamic: evolution");
    dynamicData.evolution = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-evolution.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { MODULES, EXERCISES, QUIZ, DISCUSSIONS };"
        }]
    );

    console.log("[export] dynamic: machine learning");
    dynamicData.ml = evaluateInstrumented(
        "js/frontend/fellow-dashboard/ai-ml-basic.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { CHAPTERS, DISCUSSION_PROMPTS };"
        }]
    );

    console.log("[export] dynamic: course scaffolds");
    dynamicData.scaffolds = evaluateInstrumented(
        "js/frontend/fellow-dashboard/course-placeholder.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = { COURSE_SCAFFOLDS, REASONING_OVERVIEW, REASONING_MODULES, REASONING_REFERENCES };"
        }]
    );

    console.log("[export] dynamic: intro interactions");
    dynamicData.introInteractions = evaluateInstrumented(
        "js/frontend/fellow-dashboard/settings.js",
        [{
            iife: 0,
            statement: "globalThis.__HERAI_EXPORT__ = Object.assign(globalThis.__HERAI_EXPORT__ || {}, { introInteractions: globalThis.__INTRO_INTERACTIONS__ || {} });"
        }],
        [
            ["const lensContent = {", "const lensContent = globalThis.__INTRO_INTERACTIONS__ = globalThis.__INTRO_INTERACTIONS__ || {}, __lensContent = globalThis.__INTRO_INTERACTIONS__.lensContent = {"],
            ["const content = lensContent[button.dataset.aiLens]", "const content = __lensContent[button.dataset.aiLens]"],
            ["|| lensContent.goal;", "|| __lensContent.goal;"],
            ["const examples = {", "const examples = globalThis.__INTRO_INTERACTIONS__.examples = {"],
            ["const scenarios = {", "const scenarios = globalThis.__INTRO_INTERACTIONS__.scenarios = {"]
        ]
    );
    console.log("[export] dynamic: done");
}

function allEducationalHtml() {
    const files = [];
    for (const root of learningRoots) {
        files.push(...walk(path.join(ROOT, root), file => file.endsWith(".html")));
    }
    for (const relativePath of standaloneLearningPages) {
        const full = path.join(ROOT, relativePath);
        if (fs.existsSync(full)) files.push(full);
    }
    return [...new Set(files)].sort((a, b) => relative(a).localeCompare(relative(b)));
}

function allEducationalJs() {
    return walk(JS_ROOT, file => file.endsWith(".js"))
        .sort((a, b) => relative(a).localeCompare(relative(b)));
}

function sourceFilesFor(spec, educationalHtmlFiles) {
    if (spec.sources) return spec.sources.map(item => path.join(ROOT, item));
    return educationalHtmlFiles.filter(file => relative(file).startsWith(spec.prefix + "/"));
}

function markdownForSource(sourceFile) {
    const sourceHtml = fs.readFileSync(sourceFile, "utf8");
    const body = htmlToMarkdown(educationalHtml(sourceHtml));
    return {
        title: firstTitle(educationalHtml(sourceHtml), path.basename(sourceFile, ".html")),
        body: body || "_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._",
        sourceTextLength: plainText(educationalHtml(sourceHtml)).length
    };
}

function writePageArchive(htmlFiles) {
    const rows = [];
    for (const [sourceIndex, sourceFile] of htmlFiles.entries()) {
        const sourceRelative = relative(sourceFile);
        console.log(`[export] HTML ${sourceIndex + 1}/${htmlFiles.length}: ${sourceRelative}`);
        const archiveRelative = `_arsip-halaman/${sourceRelative.replace(/^pages\//, "").replace(/\.html$/i, ".md")}`;
        const converted = markdownForSource(sourceFile);
        const rawHtml = fs.readFileSync(sourceFile, "utf8");
        const fence = rawHtml.includes("````") ? "`````" : "````";
        const content = [
            `# ${converted.title}`,
            "",
            `> Sumber: \`${sourceRelative}\``,
            "> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.",
            "> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.",
            "",
            converted.body,
            "",
            "## Lampiran Sumber HTML Lengkap",
            "",
            `${fence}html`,
            rawHtml,
            fence
        ].join("\n");
        write(archiveRelative, content);
        rows.push({
            source: sourceRelative,
            output: `materi/${archiveRelative}`,
            sourceTextLength: converted.sourceTextLength,
            outputBytes: Buffer.byteLength(content)
        });
    }
    return rows;
}

function writeJsArchive(jsFiles) {
    const rows = [];
    for (const sourceFile of jsFiles) {
        const sourceRelative = relative(sourceFile);
        const archiveRelative = `_arsip-sumber-dinamis/${sourceRelative.replace(/^js\//, "").replace(/\.js$/i, ".md")}`;
        const source = fs.readFileSync(sourceFile, "utf8");
        const fence = source.includes("````") ? "`````" : "````";
        const content = [
            `# Sumber Dinamis: ${path.basename(sourceFile)}`,
            "",
            `> Sumber: \`${sourceRelative}\``,
            "> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.",
            "",
            `${fence}javascript`,
            source,
            fence
        ].join("\n");
        write(archiveRelative, content);
        rows.push({
            source: sourceRelative,
            output: `materi/${archiveRelative}`,
            sourceTextLength: source.length,
            outputBytes: Buffer.byteLength(content)
        });
    }
    return rows;
}

function writeCuratedFiles(htmlFiles) {
    const rows = [];
    for (const spec of curated) {
        const sources = sourceFilesFor(spec, htmlFiles);
        const sections = [
            `# ${spec.title}`,
            "",
            "> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.",
            "> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.",
            ""
        ];
        for (const sourceFile of sources) {
            const converted = markdownForSource(sourceFile);
            sections.push(
                `## ${converted.title}`,
                "",
                `> Sumber: \`${relative(sourceFile)}\``,
                "",
                converted.body,
                ""
            );
        }
        for (const dynamicKey of spec.dynamic || []) {
            const key = dynamicKey === "scaffolds-generative" ? "scaffolds" : dynamicKey;
            let data = dynamicData[key];
            if (dynamicKey === "scaffolds-generative") {
                data = data?.COURSE_SCAFFOLDS?.["/participant-ai-lab-gen"] || {};
            }
            sections.push(
                "## Konten Dinamis dan Interaktif",
                "",
                `> Data berikut diekstrak dari JavaScript runtime untuk \`${dynamicKey}\`, termasuk teks yang baru muncul setelah interaksi.`,
                "",
                renderStructured(data, 3)
            );
        }
        if (spec.output.endsWith("01-pengantar-ai.md")) {
            sections.push(
                "## Variasi Konten Interaktif Pengantar AI",
                "",
                renderStructured(dynamicData.introInteractions?.introInteractions || {}, 3)
            );
        }
        const content = sections.join("\n");
        write(spec.output, content);
        rows.push({
            title: spec.title,
            output: `materi/${spec.output}`,
            sources: sources.map(relative)
        });
    }
    return rows;
}

function slugFromRoute(route) {
    return route.replace(/^\//, "").replace(/^participant-/, "").replace(/[^a-z0-9-]+/gi, "-");
}

function writeCourseScaffolds() {
    const scaffolds = dynamicData.scaffolds?.COURSE_SCAFFOLDS || {};
    const rows = [];
    for (const [route, course] of Object.entries(scaffolds).sort(([a], [b]) => a.localeCompare(b))) {
        const output = `04-outline-course-dan-spesialisasi/${slugFromRoute(route)}.md`;
        const content = [
            `# ${course.displayTitle || course.title || route}`,
            "",
            `> Route sumber: \`${route}\``,
            `> Status sumber: **${course.status || "Tidak dinyatakan"}**`,
            "",
            renderStructured(course, 2)
        ].join("\n");
        write(output, content);
        rows.push({ route, title: course.displayTitle || course.title, output: `materi/${output}`, status: course.status || "" });
    }
    return rows;
}

function sha256(filePath) {
    return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function markdownLinkFromMateri(target) {
    return target.replace(/^materi\//, "./");
}

function writeReadme(curatedRows, scaffoldRows, pageRows, jsRows) {
    const completeScaffolds = scaffoldRows.filter(row => !/placeholder/i.test(row.status));
    const placeholderScaffolds = scaffoldRows.filter(row => /placeholder/i.test(row.status));
    const lines = [
        "# Materi HerAI Fellowship",
        "",
        "Folder ini adalah hasil ekspor materi yang telah tersedia di codebase HerAI. Ekspor dibuat berlapis agar nyaman dibaca sekaligus dapat diaudit:",
        "",
        "1. **Materi terkurasi per course** — file utama seperti `pengantar-ai.md`.",
        "2. **Outline course dan specialization** — seluruh scaffold, termasuk yang masih placeholder.",
        "3. **Arsip halaman** — satu Markdown untuk setiap halaman HTML sumber materi.",
        "4. **Arsip sumber dinamis** — JavaScript lengkap di dalam Markdown untuk menjaga teks interaktif yang tidak selalu tampak pada HTML.",
        "5. **MANIFEST.md** — pemetaan sumber, output, ukuran, dan checksum.",
        "",
        "## Materi Utama",
        ""
    ];
    for (const row of curatedRows) {
        lines.push(`- [${row.title}](${markdownLinkFromMateri(row.output)}) — ${row.sources.length} sumber HTML`);
    }
    lines.push(
        "",
        "## Outline Course dan Specialization",
        "",
        `Terdapat **${scaffoldRows.length}** scaffold route: **${completeScaffolds.length}** berstatus selain placeholder dan **${placeholderScaffolds.length}** masih berstatus placeholder.`,
        ""
    );
    for (const row of scaffoldRows) {
        lines.push(`- [${row.title}](${markdownLinkFromMateri(row.output)}) — ${row.status || "status tidak dinyatakan"}`);
    }
    lines.push(
        "",
        "## Ringkasan Cakupan",
        "",
        `- Halaman HTML materi yang dikonversi: **${pageRows.length}**`,
        `- Sumber JavaScript yang diarsipkan tanpa potongan: **${jsRows.length}**`,
        `- File materi utama terkurasi: **${curatedRows.length}**`,
        `- File outline course/track: **${scaffoldRows.length}**`,
        "",
        "## Batasan yang Ditemukan",
        "",
        "- Folder `business-industry-applications/*` dan `specialization-tracks/*` berisi `.gitkeep`; konten yang tersedia untuk area tersebut saat ini berupa scaffold JavaScript, bukan halaman final.",
        "- Beberapa course memiliki versi canonical dan legacy. Keduanya tetap dimasukkan agar tidak ada materi lama yang hilang.",
        "- Materi interaktif memiliki state browser dan perilaku UI. Teks/data sumbernya disimpan lengkap, tetapi state jawaban pengguna tentu tidak termasuk.",
        "- Materi yang mungkin hanya tersimpan di Google Sheets/GAS production dan tidak ada di repository tidak dapat diekspor dari filesystem ini.",
        "",
        "Lihat [MANIFEST.md](./MANIFEST.md) untuk audit lengkap."
    );
    write("README.md", lines.join("\n"));
}

function writeManifest(curatedRows, scaffoldRows, pageRows, jsRows) {
    const generatedFiles = walk(OUT, file => file.endsWith(".md"))
        .filter(file => path.basename(file) !== "MANIFEST.md")
        .sort((a, b) => relative(a).localeCompare(relative(b)));
    const lines = [
        "# Manifest Ekspor Materi",
        "",
        `Dibuat: ${new Date().toISOString()}`,
        "",
        "## Statistik",
        "",
        `- Materi utama: ${curatedRows.length}`,
        `- Scaffold course/track: ${scaffoldRows.length}`,
        `- Arsip halaman HTML: ${pageRows.length}`,
        `- Arsip sumber dinamis JavaScript: ${jsRows.length}`,
        `- Total file Markdown sebelum manifest: ${generatedFiles.length}`,
        "",
        "## Pemetaan Halaman HTML",
        "",
        "| Sumber | Output | Karakter teks sumber |",
        "|---|---|---:|"
    ];
    for (const row of pageRows) {
        lines.push(`| \`${row.source}\` | \`${row.output}\` | ${row.sourceTextLength} |`);
    }
    lines.push(
        "",
        "## Pemetaan Sumber Dinamis",
        "",
        "| Sumber | Output | Byte sumber |",
        "|---|---|---:|"
    );
    for (const row of jsRows) {
        lines.push(`| \`${row.source}\` | \`${row.output}\` | ${row.sourceTextLength} |`);
    }
    lines.push(
        "",
        "## Checksum File Hasil",
        "",
        "| File | Byte | SHA-256 |",
        "|---|---:|---|"
    );
    for (const file of generatedFiles) {
        lines.push(`| \`${relative(file)}\` | ${fs.statSync(file).size} | \`${sha256(file)}\` |`);
    }
    write("MANIFEST.md", lines.join("\n"));
}

function main() {
    ensureDir(OUT);
    collectDynamicData();
    const htmlFiles = allEducationalHtml();
    const jsFiles = allEducationalJs();
    console.log(`[export] archives: ${htmlFiles.length} HTML, ${jsFiles.length} JS`);
    const pageRows = writePageArchive(htmlFiles);
    console.log("[export] HTML archive done");
    const jsRows = writeJsArchive(jsFiles);
    console.log("[export] JS archive done");
    const curatedRows = writeCuratedFiles(htmlFiles);
    console.log("[export] curated files done");
    const scaffoldRows = writeCourseScaffolds();
    console.log("[export] scaffold files done");
    writeReadme(curatedRows, scaffoldRows, pageRows, jsRows);
    writeManifest(curatedRows, scaffoldRows, pageRows, jsRows);
    console.log(JSON.stringify({
        htmlSources: htmlFiles.length,
        jsSources: jsFiles.length,
        curatedFiles: curatedRows.length,
        scaffoldFiles: scaffoldRows.length,
        markdownFiles: walk(OUT, file => file.endsWith(".md")).length
    }, null, 2));
}

main();
