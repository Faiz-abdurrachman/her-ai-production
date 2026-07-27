#!/usr/bin/env node
/**
 * transform-router-for-lazy.js
 * Wraps initAi* and initCv* calls in router.js with __aiLabLoader.load().
 * 
 * Usage: node scripts/transform-router-for-lazy.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const DRY_RUN = process.argv.includes('--dry-run');

const ROUTER_PATH = path.join(__dirname, '..', 'js', 'router.js');
let content = fs.readFileSync(ROUTER_PATH, 'utf8');

// ---------------------------------------------------------------------------
// MODULE MAP: route prefix → ai-*.js filename (without .js extension)
// ---------------------------------------------------------------------------
const MODULE_MAP = [
  // Module blocks with `path.startsWith` pattern
  { prefix: '/participant-ai-lab-geospatial',     file: 'ai-geospatial' },
  { prefix: '/participant-ai-lab-manufacturing',   file: 'ai-manufacturing' },
  { prefix: '/participant-ai-lab-ui-ux',           file: 'ai-ui-ux' },
  { prefix: '/participant-ai-lab-healthcare',      file: 'ai-healthcare' },
  { prefix: '/participant-ai-lab-culture',         file: 'ai-culture' },
  { prefix: '/participant-ai-lab-people-business-mgt', file: 'ai-people-business-mgt' },
  { prefix: '/participant-ai-lab-business-insight',file: 'ai-business-insight' },
  { prefix: '/participant-ai-lab-back-end',        file: 'ai-back-end' },
  { prefix: '/participant-ai-lab-front-end',       file: 'ai-front-end' },
  { prefix: '/participant-ai-lab-deployment',      file: 'ai-deployment' },
  { prefix: '/participant-ai-lab-infrastructure',  file: 'ai-infrastructure' },
  { prefix: '/participant-ai-lab-data-science',    file: 'ai-data-science' },
  { prefix: '/participant-ai-lab-data-engineering',file: 'ai-data-engineering' },
  { prefix: '/participant-ai-lab-bioinformatics',  file: 'ai-bioinformatics' },
  { prefix: '/participant-ai-lab-agentic-ai',      file: 'ai-agentic-ai' },
  { prefix: '/participant-ai-lab-multimodal-llm',  file: 'ai-multimodal-llm' },
  { prefix: '/participant-ai-lab-vlm',             file: 'ai-vlm' },
  { prefix: '/participant-ai-lab-large-language-model', file: 'ai-large-language-model' },
  { prefix: '/participant-ai-lab-multimodal-llm',  file: 'ai-multimodal-llm' },
  { prefix: '/participant-ai-lab-reinforcement-learning', file: 'ai-reinforcement-learning' },
  { prefix: '/participant-ai-lab-deep-learning',   file: 'ai-deep-learning' },
  // Non-standard prefixes (different URL pattern)
  { prefix: '/participant-ai-python',              file: 'ai-python' },
  { prefix: '/participant-ai-modern',              file: 'ai-modern' },
  { prefix: '/participant-ai-reasoning',           file: 'ai-reasoning' },
  { prefix: '/participant-cv-',                    file: 'ai-cv' },
  { prefix: '/participant-ai-evaluation',          file: 'ai-evaluation' },
  { prefix: '/participant-ai-evolution',           file: 'ai-evolution' },
];

// ---------------------------------------------------------------------------
// TRANSFORM: wrap init function calls inside each module block
// ---------------------------------------------------------------------------
let transformed = content;
let replaceCount = 0;

// Process each module
for (const mod of MODULE_MAP) {
  const loaderCode = `window.__aiLabLoader.load('${mod.file}').then(function() {\n`;

  // Find the module route block in the router
  // Pattern: `else if (path.startsWith("PREFIX")` or `else if (path === "PREFIX"` 
  // We need to find the first `if (path...` or `if (...init...)` AFTER the route check
  // and wrap init function calls

  // Strategy: Find the opening of the module block and insert loader
  // The block structure is:
  //   } else if (path.startsWith("PREFIX") ... ) {
  //       window.initFellowDashboardPage("modules");
  //       if (path === ...) { ... }
  //   }
  // We need to wrap the init calls (but NOT the initFellowDashboardPage call)

  // Use a two-pass approach:
  // 1. Find the route check line
  // 2. Find `initFellowDashboardPage` line after it 
  // 3. After that line, insert `__aiLabLoader.load(...).then(function() {`
  // 4. Find the closing `}` of the block and insert `});`

  // Find the route condition for this module
  const routePattern = mod.prefix.startsWith('/participant-ai-lab-')
    ? `path.startsWith("${mod.prefix}")`
    : `path.startsWith("${mod.prefix}")`;
  
  const routeIdx = transformed.indexOf(routePattern);
  if (routeIdx === -1) {
    console.log(`  ⚠️  Pattern not found: ${routePattern}`);
    continue;
  }

  // Find the initFellowDashboardPage call after this route check
  const afterRoute = transformed.indexOf(`initFellowDashboardPage`, routeIdx);
  if (afterRoute === -1) {
    console.log(`  ⚠️  initFellowDashboardPage not found after ${routePattern}`);
    continue;
  }

  // Find the end of the `initFellowDashboardPage("modules");` line
  const lineEnd = transformed.indexOf('\n', afterRoute);
  if (lineEnd === -1) continue;

  // The line should be something like: "    window.initFellowDashboardPage("modules");"
  // After it, there might be whitespace, then init function calls
  // We need to insert the loader.then() after this line
  const afterDashboardCall = transformed.indexOf('\n', lineEnd + 1);
  if (afterDashboardCall === -1) continue;

  // Check what comes after the dashboard call — if it's whitespace followed by init calls, wrap them
  const afterSlice = transformed.slice(lineEnd);
  const initCallMatch = afterSlice.match(/\n(\s*)if\s*\(/);
  if (!initCallMatch) {
    console.log(`  ⚠️  No init call found after dashboard call in ${routePattern}`);
    continue;
  }

  // Find the closing brace of this else-if block
  // Count braces from the route check to find the proper closing brace
  let depth = 0;
  let braceStart = -1;
  let braceEnd = -1;
  for (let i = routeIdx; i < transformed.length; i++) {
    if (transformed[i] === '{') {
      depth++;
      if (braceStart === -1) braceStart = i;
    } else if (transformed[i] === '}') {
      depth--;
      if (depth === 0 && braceStart !== -1) {
        braceEnd = i;
        break;
      }
    }
  }

  if (braceEnd === -1) {
    console.log(`  ⚠️  Could not find closing brace for ${routePattern}`);
    continue;
  }

  // The block content between the first { and the matching }
  const blockContent = transformed.slice(braceStart + 1, braceEnd);
  
  // Find all init function calls in this block (but NOT initFellowDashboardPage)
  const initMatches = [...blockContent.matchAll(/(if\s*\([^)]*\)\s*\{[^}]*window\.init[A-Z][^}]*\})/g)];
  if (initMatches.length === 0) {
    console.log(`  ⚠️  No window.init* calls found in ${routePattern}`);
    continue;
  }

  // Insert loader before the first init call and close after the last
  const firstInit = initMatches[0];
  const lastInit = initMatches[initMatches.length - 1];
  
  // Find the positions relative to the full file
  const blockFirstInitPos = braceStart + 1 + firstInit.index;
  const blockLastInitEnd = braceStart + 1 + lastInit.index + lastInit[0].length;

  // Extract the init call region (from first init to end of last init)
  const initRegion = transformed.slice(blockFirstInitPos, blockLastInitEnd);
  
  // Wrap the init region
  const wrappedInitRegion = `${loaderCode}${initRegion}\n        });`;

  // Build the replacement
  const beforeInit = transformed.slice(0, blockFirstInitPos);
  const afterInit = transformed.slice(blockLastInitEnd);
  transformed = beforeInit + wrappedInitRegion + afterInit;

  replaceCount++;
  console.log(`  ✅ ${routePattern} → ${mod.file}.js (${initMatches.length} init calls wrapped)`);
}

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
if (DRY_RUN) {
  console.log(`\n🔍 DRY RUN: ${replaceCount} modules would be transformed`);
  console.log(`     Output preview: ${transformed.length} chars (was ${content.length})`);
} else {
  fs.writeFileSync(ROUTER_PATH, transformed, 'utf8');
  console.log(`\n✅ Transformed ${replaceCount} modules in router.js`);
}
