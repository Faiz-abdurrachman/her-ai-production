const fs = require('fs');

const routerFile = '/home/faiz/her6/Her-AI/js/router.js';
let content = fs.readFileSync(routerFile, 'utf8');

const newRoutes = `
        "/participant-cv-digital-image": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/01-digital-image-fundamentals/materi.html",
        "/participant-cv-digital-image-practice": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/01-digital-image-fundamentals/latihan.html",
        "/participant-cv-digital-image-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/01-digital-image-fundamentals/kuis.html",
        "/participant-cv-digital-image-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/01-digital-image-fundamentals/diskusi.html",
        "/participant-cv-cnn": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/02-convolutional-neural-networks/materi.html",
        "/participant-cv-cnn-practice": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/02-convolutional-neural-networks/latihan.html",
        "/participant-cv-cnn-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/02-convolutional-neural-networks/kuis.html",
        "/participant-cv-cnn-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/02-convolutional-neural-networks/diskusi.html",
        "/participant-cv-advanced-cnn": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/03-advanced-cnn-architectures/materi.html",
        "/participant-cv-advanced-cnn-practice": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/03-advanced-cnn-architectures/latihan.html",
        "/participant-cv-advanced-cnn-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/03-advanced-cnn-architectures/kuis.html",
        "/participant-cv-advanced-cnn-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/03-advanced-cnn-architectures/diskusi.html",
`;

const newAuthRoutes = `
            "/participant-cv-digital-image",
            "/participant-cv-digital-image-practice",
            "/participant-cv-digital-image-quiz",
            "/participant-cv-digital-image-discussion",
            "/participant-cv-cnn",
            "/participant-cv-cnn-practice",
            "/participant-cv-cnn-quiz",
            "/participant-cv-cnn-discussion",
            "/participant-cv-advanced-cnn",
            "/participant-cv-advanced-cnn-practice",
            "/participant-cv-advanced-cnn-quiz",
            "/participant-cv-advanced-cnn-discussion",
`;

const newExecutionLogic = `
                } else if (path.startsWith("/participant-cv-")) {
                    if (typeof window.initFellowDashboardPage === "function") {
                        window.initFellowDashboardPage("modules");
                    }
                    if (path === "/participant-cv-digital-image" && typeof window.initCvDigitalImage === "function") {
                        window.initCvDigitalImage();
                    } else if (path === "/participant-cv-cnn" && typeof window.initCvCnn === "function") {
                        window.initCvCnn();
                    } else if (path === "/participant-cv-advanced-cnn" && typeof window.initCvAdvancedCnn === "function") {
                        window.initCvAdvancedCnn();
                    }
`;

// Insert new routes after the first participant-specialization-computer-vision entry
if (!content.includes('/participant-cv-digital-image":')) {
    content = content.replace(/("\/participant-specialization-computer-vision": "\/pages\/frontend\/fellow-dashboard\/data-engineering-domains\/computer-vision.html",)/, "$1\n" + newRoutes);
    content = content.replace(/("\/participant-specialization-computer-vision",)/, "$1\n" + newAuthRoutes);
    
    // Insert newExecutionLogic before the first initFellowDashboardPage block for other courses
    const targetExec = '} else if (path.startsWith("/participant-ai-reasoning") && typeof window.initFellowDashboardPage === "function") {';
    content = content.replace(targetExec, newExecutionLogic.trim() + "\n                " + targetExec);
    
    fs.writeFileSync(routerFile, content, 'utf8');
    console.log("Updated router.js");
} else {
    console.log("router.js already updated");
}
