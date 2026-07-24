const fs = require('fs');
const path = require('path');

const config = [
    {
        folder: '01-digital-image-fundamentals',
        title: 'Digital Image Fundamentals',
        desc: 'Pahami anatomi piksel, pemrosesan citra dasar dengan OpenCV, hingga operasi morfologi dan kernel pada gambar.',
        baseRoute: 'cv-digital-image',
        topics: [
            { id: 1, name: 'Pixel Anatomy', file: 'pixel-anatomy.html' },
            { id: 2, name: 'Image Processing with OpenCV', file: 'image-processing-opencv.html' },
            { id: 3, name: 'Filtering & Kernels', file: 'filtering-kernels.html' },
            { id: 4, name: 'Morphological Transforms', file: 'morphological-transforms.html' }
        ]
    },
    {
        folder: '02-convolutional-neural-networks',
        title: 'Convolutional Neural Networks',
        desc: 'Pelajari konsep dasar arsitektur CNN, keunggulannya dibandingkan jaringan biasa, hingga penerapan fungsi aktivasi ReLU.',
        baseRoute: 'cv-cnn',
        topics: [
            { id: 1, name: 'Introduction to CNN', file: 'cnn-intro.html' },
            { id: 2, name: 'Why CNNs?', file: 'cnn-why.html' },
            { id: 3, name: 'Activation Functions & ReLU', file: 'cnn-relu.html' },
            { id: 4, name: 'Fully Connected Layers', file: 'cnn-fc.html' }
        ]
    },
    {
        folder: '03-advanced-cnn-architectures',
        title: 'Advanced CNN Architectures',
        desc: 'Rangkai dan bangun arsitektur CNN yang lebih kompleks serta terapkan dalam kasus dunia nyata melalui praktik langsung.',
        baseRoute: 'cv-advanced-cnn',
        topics: [
            { id: 1, name: 'CNN Architecture Overview', file: 'cnn-arch.html' },
            { id: 2, name: 'CNN Architecture Builder', file: 'cnn-arch-builder.html' },
            { id: 3, name: 'Hands-on CNN', file: 'cnn-hands.html' }
        ]
    }
];

const cvBase = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/';

config.forEach(mod => {
    const modDir = path.join(cvBase, mod.folder);
    
    // Create chapter sidebar list HTML
    let sidebarListHtml = '';
    mod.topics.forEach((t, i) => {
        const activeClass = i === 0 ? 'class="active"' : '';
        const icon = i === 0 ? 'far fa-circle-play' : 'far fa-circle';
        sidebarListHtml += `<li ${activeClass} data-chapter="${t.id}"><span>${t.id}</span><a href="javascript:void(0)" onclick="window.loadCvChapter('${mod.baseRoute}', ${t.id})">${t.name}</a><i class="${icon}"></i></li>\n`;
    });

    ['materi.html', 'latihan.html', 'kuis.html', 'diskusi.html'].forEach(filename => {
        const filePath = path.join(modDir, filename);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace general metadata
        content = content.replace(/Python untuk AI/g, mod.title);
        content = content.replace(/Eksplorasi materi secara mendalam dari konsep dasar hingga implementasi praktis untuk mendukung pemahaman Anda di ekosistem AI./g, mod.desc);
        content = content.replace(/AI Fundamentals/g, 'Computer Vision');
        
        // Replace parent breadcrumb link
        content = content.replace(/#\/participant-ai-fundamentals/g, '#/participant-specialization-computer-vision');

        // Replace tab links
        content = content.replace(/#\/participant-ai-python-practice/g, `#/participant-${mod.baseRoute}-practice`);
        content = content.replace(/#\/participant-ai-python-quiz/g, `#/participant-${mod.baseRoute}-quiz`);
        content = content.replace(/#\/participant-ai-python-discussion/g, `#/participant-${mod.baseRoute}-discussion`);
        content = content.replace(/#\/participant-ai-python/g, `#/participant-${mod.baseRoute}`);

        // Update JS function calls for buttons
        content = content.replace(/window\.loadPythonChapter\([0-9]+\)/g, `window.loadCvChapter('${mod.baseRoute}', 1)`);

        // Replace sidebar list ONLY in materi.html
        if (filename === 'materi.html') {
            const sidebarRegex = /<ol id="reasoning-sidebar-list">[\s\S]*?<\/ol>/;
            content = content.replace(sidebarRegex, `<ol id="${mod.baseRoute}-sidebar-list">\n${sidebarListHtml}</ol>`);
            
            // Fix script container ID
            content = content.replace(/id="materi-reasoning"/g, `id="materi-${mod.baseRoute}"`);
            content = content.replace(/id="reasoning-chapter-container"/g, `id="${mod.baseRoute}-chapter-container"`);
            content = content.replace(/Memuat materi Python.../g, `Memuat materi ${mod.title}...`);
            content = content.replace(/0 dari 6/g, `0 dari ${mod.topics.length}`);
            content = content.replace(/Modul 2 dari 6/g, `Modul Spesialisasi`);
        }

        fs.writeFileSync(filePath, content, 'utf8');
    });
    console.log(`Initialized module templates for ${mod.folder}`);
});
