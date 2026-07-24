const fs = require('fs');
const path = require('path');

const cvBase = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/';
const dirs = ['01-digital-image-fundamentals', '02-convolutional-neural-networks', '03-advanced-cnn-architectures'];

dirs.forEach(dir => {
    const chaptersDir = path.join(cvBase, dir, 'chapters');
    if (!fs.existsSync(chaptersDir)) return;
    
    fs.readdirSync(chaptersDir).forEach(file => {
        if (!file.endsWith('.html')) return;
        
        const filePath = path.join(chaptersDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex to find the top-level page class like .pixel-anatomy-page
        // We will replace it entirely with a generic wrapper that we will inject in the container.
        
        // Let's replace ANY class that ends with "-page" and is at the start of a CSS rule.
        // e.g. .pixel-anatomy-page { ... } -> .cv-chapter-wrapper { ... }
        // e.g. .pixel-anatomy-page .lesson-hero -> .cv-chapter-wrapper .lesson-hero
        
        content = content.replace(/\.[a-z0-9-]*page\b/g, '.cv-chapter-wrapper');
        
        // Then, we need to wrap the whole <article> content in a div with this class, OR just attach it to the article.
        // We can just add class="cv-chapter-wrapper" to the <article> tag!
        content = content.replace(/<article\s+class="([^"]*)"/g, '<article class="$1 cv-chapter-wrapper"');
        // also handle <article class='...'>
        content = content.replace(/<article\s+class='([^']*)'/g, "<article class='$1 cv-chapter-wrapper'");
        
        // If article has no class, add it. (The previous regexes handle existing classes, let's also handle missing classes just in case)
        if (!content.includes('cv-chapter-wrapper"')) {
            content = content.replace(/<article>/g, '<article class="cv-chapter-wrapper">');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned CSS scoping in ${dir}/chapters/${file}`);
    });
});
