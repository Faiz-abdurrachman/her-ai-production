const fs = require('fs');
const path = require('path');

const targetDirs = [
    'pages/frontend/fellow-dashboard/business-industry-application',
    'pages/frontend/fellow-dashboard/data-engineering-domain',
    'pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning',
    'pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning'
];

function scanAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === '02-python-untuk-ai') continue;
            scanAndReplace(fullPath);
        } else if (file === 'diskusi.html') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const replacements = [
                ['<h1>Diskusi Python</h1>', '<h1>Diskusi Topik</h1>'],
                ['Diskusikan mengapa Python dominan, kapan notebook membantu atau berisiko, serta bagaimana keputusan cleaning memengaruhi kesiapan data untuk AI.', 'Diskusikan studi kasus, eksplorasi masalah, dan penerapan konsep-konsep dari materi ini untuk memperdalam pemahaman praktis Anda di dunia nyata.'],
                ['berdiskusi tentang Python', 'berdiskusi tentang modul ini'],
                ['<h2>Forum Python AI</h2>', '<h2>Forum Diskusi Kelas</h2>'],
                ['Prompt diskusi Python', 'Prompt diskusi kelas'],
                [/<button type="button" data-discussion-prompt="Mengapa Python dominan.*?<\/button>/g, '<button type="button" data-discussion-prompt="Bagaimana penerapan konsep ini dapat memecahkan masalah di industri Anda?"><i class="fas fa-lightbulb"></i><span>Ide & Penerapan</span></button>'],
                [/<button type="button" data-discussion-prompt="Kapan notebook membantu.*?<\/button>/g, '<button type="button" data-discussion-prompt="Apa saja tantangan atau risiko terbesar saat mengimplementasikan teori ini di dunia nyata?"><i class="fas fa-triangle-exclamation"></i><span>Risiko & Tantangan</span></button>'],
                [/<button type="button" data-discussion-prompt="Apakah menghapus missing value.*?<\/button>/g, '<button type="button" data-discussion-prompt="Menurut Anda, bagaimana etika dan bias dapat memengaruhi keputusan yang diambil berdasarkan model ini?"><i class="fas fa-balance-scale"></i><span>Etika & Bias</span></button>'],
                [/<button type="button" data-discussion-prompt="Dataset tanpa missing.*?<\/button>/g, '<button type="button" data-discussion-prompt="Bagikan pengalaman atau kesulitan Anda saat mempraktikkan materi ini."><i class="fas fa-users"></i><span>Berbagi Pengalaman</span></button>'],
                ['<option>Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat?</option>', '<option>Bagaimana penerapan konsep ini dapat memecahkan masalah di industri Anda?</option>'],
                ['<option>Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya?</option>', '<option>Apa saja tantangan atau risiko terbesar saat mengimplementasikan teori ini di dunia nyata?</option>'],
                ['<option>Apakah menghapus missing value selalu benar? Bukti apa yang diperlukan sebelum memilih aturan cleaning?</option>', '<option>Menurut Anda, bagaimana etika dan bias dapat memengaruhi keputusan yang diambil berdasarkan model ini?</option>'],
                ['<option>Dataset tanpa missing value apakah otomatis siap untuk Machine Learning?</option>', '<option>Bagikan pengalaman atau kesulitan Anda saat mempraktikkan materi ini.</option>'],
                ['workflow Python, risiko', 'konsep materi, risiko'],
                ['materi/baru/Python-baru.md', 'file materi terkait'],
                ['trade-off workflow Python', 'penerapan konsep ini']
            ];

            for (const [search, replace] of replacements) {
                if (typeof search === 'string' && content.includes(search)) {
                    content = content.split(search).join(replace);
                    modified = true;
                } else if (search instanceof RegExp && search.test(content)) {
                    content = content.replace(search, replace);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated Diskusi Content: ${fullPath}`);
            }
        }
    }
}

const baseDir = path.join(__dirname, '../../');
for (const dir of targetDirs) {
    scanAndReplace(path.join(baseDir, dir));
}
console.log('Finished updating Diskusi Python contents.');
