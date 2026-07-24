const fs = require('fs');
const path = require('path');

const mdPath = 'nazril/modul-materi-herai/foundation-core-ai/Modul_Deep_Learning_HerAI.md';
const content = fs.readFileSync(mdPath, 'utf8');

const chapters = content.split(/\n# Bab /).slice(1);
console.log("Total chapters found:", chapters.length);
