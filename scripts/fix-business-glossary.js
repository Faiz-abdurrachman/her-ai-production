#!/usr/bin/env node
/**
 * fix-business-glossary.js
 * Bug #63 — P1: Replace boilerplate glossary definitions in 7 business modules.
 *
 * Reads glossary definitions from scripts/glossary-defs/*.json,
 * updates the guides JSON files in scripts/nazril-guides-output/,
 * then optionally runs inject-guides.js --phase=1.
 *
 * Usage: node scripts/fix-business-glossary.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const GUIDES_DIR = path.join(__dirname, 'nazril-guides-output');
const DEFS_DIR = path.join(__dirname, 'glossary-defs');
const DRY_RUN = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// Load all definition files from glossary-defs/
// ---------------------------------------------------------------------------
function loadDefinitions() {
  const allDefs = {};
  if (!fs.existsSync(DEFS_DIR)) {
    console.log('  ⚠️  glossary-defs/ directory not found. Creating...');
    fs.mkdirSync(DEFS_DIR, { recursive: true });
    return allDefs;
  }

  const files = fs.readdirSync(DEFS_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const moduleId = file.replace('.json', '');
    const raw = fs.readFileSync(path.join(DEFS_DIR, file), 'utf8');
    try {
      const data = JSON.parse(raw);
      // Support both flat {moduleId: {guideIdx: [[term,def],...]}} and single-module format
      if (data[moduleId]) {
        allDefs[moduleId] = data[moduleId];
      } else if (Object.keys(data).some(k => !isNaN(parseInt(k)))) {
        // Direct format: { "1": [...], "2": [...] }
        allDefs[moduleId] = data;
      }
    } catch (e) {
      console.error(`  ❌ Failed to parse ${file}: ${e.message}`);
    }
  }
  return allDefs;
}

// ---------------------------------------------------------------------------
// Apply definitions to a single guides JSON file
// ---------------------------------------------------------------------------
function applyDefinitions(moduleId, allDefs) {
  const moduleDefs = allDefs[moduleId];
  if (!moduleDefs) {
    console.log(`  ⚠️  No definitions found for ${moduleId} — skipping`);
    return false;
  }

  const guidesPath = path.join(GUIDES_DIR, `guides-${moduleId}.json`);
  if (!fs.existsSync(guidesPath)) {
    console.log(`  ⚠️  Guides file not found: ${guidesPath} — skipping`);
    return false;
  }

  const raw = fs.readFileSync(guidesPath, 'utf8');
  const guides = JSON.parse(raw);
  let replacedCount = 0;

  for (const [guideIdxStr, defs] of Object.entries(moduleDefs)) {
    const guideIdx = parseInt(guideIdxStr) - 1; // 1-based → 0-based
    if (guideIdx < 0 || guideIdx >= guides.guides.length) {
      console.log(`  ⚠️  ${moduleId} guide ${guideIdxStr} out of range (${guides.guides.length} guides)`);
      continue;
    }

    const glossary = guides.guides[guideIdx].glossary;
    if (!glossary || !Array.isArray(glossary)) {
      console.log(`  ⚠️  ${moduleId} guide ${guideIdxStr} has no glossary array`);
      continue;
    }

    // Build a map of term → new definition
    const defMap = {};
    for (const [term, def] of defs) {
      defMap[term] = def;
    }

    // Replace definitions where the term matches
    for (const entry of glossary) {
      const term = entry[0];
      if (defMap[term]) {
        const oldDef = entry[1];
        entry[1] = defMap[term];
        if (oldDef.includes('konsep penting dalam') || oldDef.includes('perlu diberi definisi operasional')) {
          replacedCount++;
        }
      }
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2) + '\n', 'utf8');
    console.log(`  ✅ ${moduleId}: ${replacedCount} boilerplate definitions replaced (${guidesPath})`);
  } else {
    console.log(`  🔍 [DRY RUN] ${moduleId}: ${replacedCount} boilerplate definitions would be replaced`);
  }

  return replacedCount > 0;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
const TARGET_MODULES = [
  'ui-ux', 'healthcare', 'geospatial', 'manufacturing',
  'culture', 'business-insight', 'people-business-mgt',
  'back-end', 'bioinformatics', 'data-engineering', 'data-science',
  'deployment', 'front-end', 'infrastructure'
];

console.log('📚 Business Glossary Fix — Bug #63');
console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);

const allDefs = loadDefinitions();
console.log(`📦 Loaded definitions for: ${Object.keys(allDefs).join(', ') || '(none)'}\n`);

let totalFixed = 0;
let modulesFixed = 0;

for (const mod of TARGET_MODULES) {
  if (applyDefinitions(mod, allDefs)) {
    modulesFixed++;
  }
}

console.log(`\n📊 Summary: ${modulesFixed}/${TARGET_MODULES.length} modules fixed`);

if (!DRY_RUN && modulesFixed > 0) {
  console.log('\n🚀 To apply to JS files, run:');
  console.log('  node scripts/inject-guides.js --phase=1');
}
