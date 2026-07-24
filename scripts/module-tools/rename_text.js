const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning';
const files = ['latihan.html', 'kuis.html', 'diskusi.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace specific visible strings
    content = content.replace(/>Latihan Python</g, '>Latihan Deep Learning<');
    content = content.replace(/>Kuis Python</g, '>Kuis Deep Learning<');
    content = content.replace(/>Diskusi Python</g, '>Diskusi Deep Learning<');
    
    // Breadcrumb and headers
    content = content.replace(/Latihan Python/g, 'Latihan Deep Learning');
    content = content.replace(/Kuis Python/g, 'Kuis Deep Learning');
    content = content.replace(/Diskusi Python/g, 'Diskusi Deep Learning');
    
    // Replace "Python untuk AI" if still exists
    content = content.replace(/Python untuk AI/g, 'Deep Learning');

    // Inside paragraphs like "Uji pemahaman Python sebagai workflow"
    content = content.replace(/pemahaman Python sebagai/g, 'pemahaman Deep Learning sebagai');
    content = content.replace(/konsep python/g, 'konsep Deep Learning');

    fs.writeFileSync(filePath, content);
});
console.log("Renamed texts in UI successfully!");
