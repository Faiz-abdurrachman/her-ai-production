const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/lessons/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssFix = `
  /* --- UNIVERSAL UI FIXES FOR CV LESSONS --- */
  .ai-lab-content .sec-num, [class*="-page"] .sec-num {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    margin-top: 2px !important;
    box-sizing: border-box !important;
    border-radius: 6px !important;
  }
  
  [class*="-page"] .cs-card {
    border: 1px solid var(--px-line, #e2e8f0) !important;
    border-top: 3px solid var(--cs-accent, #3b82f6) !important;
    border-radius: 8px !important;
    background: #fff !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
  }
  
  [class*="-page"] .challenge-card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
  }
</style>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Only inject if not already injected
    if (!content.includes('/* --- UNIVERSAL UI FIXES FOR CV LESSONS --- */')) {
        content = content.replace('</style>', cssFix);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Fixed UI in ${file}`);
    }
});
