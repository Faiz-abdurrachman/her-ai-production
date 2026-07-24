const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css', 'frontend', 'fellow-dashboard', 'modules.css');

const cssToAppend = `

/* Phase 2: Mobile UI Polish for Lesson Topbar & Tabs */
@media (max-width: 920px) {
    .lesson-detail-page .fellow-main {
        padding-top: 24px;
    }

    .lesson-topbar {
        position: relative;
        display: grid;
        grid-template-areas:
            "empty bell avatar"
            "breadcrumb breadcrumb breadcrumb"
            "search search search";
        grid-template-columns: 1fr 46px 46px;
        gap: 16px 12px;
        margin-bottom: 20px;
    }

    .lesson-breadcrumb {
        grid-area: breadcrumb;
        min-height: 0;
        padding-top: 6px;
    }

    .lesson-tabs::-webkit-scrollbar {
        display: none;
    }
    
    .lesson-tabs {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
}
`;

fs.appendFileSync(cssPath, cssToAppend);
console.log("Appended mobile CSS to modules.css!");
