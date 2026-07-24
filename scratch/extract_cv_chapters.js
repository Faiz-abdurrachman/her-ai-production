const fs = require('fs');
const path = require('path');

const config = [
    {
        folder: '01-digital-image-fundamentals',
        topics: [
            { id: 1, file: 'pixel-anatomy.html' },
            { id: 2, file: 'image-processing-opencv.html' },
            { id: 3, file: 'filtering-kernels.html' },
            { id: 4, file: 'morphological-transforms.html' }
        ]
    },
    {
        folder: '02-convolutional-neural-networks',
        topics: [
            { id: 1, file: 'cnn-intro.html' },
            { id: 2, file: 'cnn-why.html' },
            { id: 3, file: 'cnn-relu.html' },
            { id: 4, file: 'cnn-fc.html' }
        ]
    },
    {
        folder: '03-advanced-cnn-architectures',
        topics: [
            { id: 1, file: 'cnn-arch.html' },
            { id: 2, file: 'cnn-arch-builder.html' },
            { id: 3, file: 'cnn-hands.html' }
        ]
    }
];

const cvBase = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/';
const lessonsDir = path.join(cvBase, 'lessons');

config.forEach(mod => {
    const chaptersDir = path.join(cvBase, mod.folder, 'chapters');
    
    mod.topics.forEach(t => {
        const sourceFile = path.join(lessonsDir, t.file);
        if (!fs.existsSync(sourceFile)) {
            console.error('File not found: ' + sourceFile);
            return;
        }

        const html = fs.readFileSync(sourceFile, 'utf8');

        // We need to extract:
        // 1. <style> blocks inside <main> or at the end
        // 2. <article> block
        // 3. <script> blocks inside <main> or at the end
        
        let extracted = '';

        // Extract style block using regex (assuming it's near the bottom before scripts)
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
        if (styleMatch) {
            extracted += styleMatch.join('\n') + '\n\n';
        }

        // Extract article
        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
        if (articleMatch) {
            extracted += articleMatch[0] + '\n\n';
        }

        // Extract script block (ignoring global ones)
        // Usually, the local script is the last script block, or any block containing specific logic
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/g);
        if (scriptMatch) {
            // we don't want to extract empty script tags, or tags with src
            scriptMatch.forEach(s => {
                if (!s.includes('switchCvLocalTab')) { // skip the one we injected earlier
                    extracted += s + '\n\n';
                }
            });
        }

        const destFile = path.join(chaptersDir, `${t.id}.html`);
        fs.writeFileSync(destFile, extracted, 'utf8');
        console.log(`Extracted chapter ${t.id} to ${mod.folder}`);
    });
});
