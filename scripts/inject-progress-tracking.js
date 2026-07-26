/**
 * Inject saveChapterProgress calls into all ai-*.js module files.
 *
 * For each module JS file:
 * 1. Extract MODULE_ID from the first CHAPTER[0].sourcePath
 * 2. Inject const MODULE_ID declaration near the top of the IIFE
 * 3. Inject window.saveChapterProgress(MODULE_ID, chapter, 'completed') 
 *    after updateProgress(chapter, total);
 *
 * Usage: node scripts/inject-progress-tracking.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.resolve(__dirname, '..', 'js', 'frontend', 'fellow-dashboard');
const DRY_RUN = process.argv.includes('--dry-run');

const SPECIAL_FILES = {
  'ai-cv.js': 'cv',
  'ai-python-basic.js': 'manual-pattern',  // Different loadPythonTopik, no updateProgress
  'ai-ml-basic.js': 'manual-pattern',      // Different loadMlTopik, uses updateChapterUi
};

let stats = { modified: 0, skipped: 0, errors: [] };

function extractModuleId(content, filename) {
  // Try to extract from CHAPTERS[0].sourcePath
  const sourcePathMatch = content.match(/"sourcePath":\s*"([^"]+)"/);
  if (sourcePathMatch) {
    const sourcePath = sourcePathMatch[1];
    // Extract the last folder name before /chapters/
    // e.g. ".../foundation-core-ai/deep-learning/chapters/..." → "deep-learning"
    // e.g. ".../data-engineering-domains/infrastructure/chapters/..." → "infrastructure"
    const parts = sourcePath.split('/');
    const chaptersIdx = parts.indexOf('chapters');
    if (chaptersIdx > 0) {
      let raw = parts[chaptersIdx - 1];
      // Strip numeric prefix like "02-" from "02-python-untuk-ai"
      raw = raw.replace(/^\d+-/, '');
      return raw;
    }
    // Fallback: last meaningful folder
    if (chaptersIdx === -1) {
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] && parts[i] !== 'chapters' && parts[i] !== '') {
          return parts[i].replace(/^\d+-/, '');
        }
      }
    }
  }

  // Fallback: derive from filename
  const base = filename.replace(/^ai-/, '').replace(/\.js$/, '');
  return base;
}

function injectStandardModule(content, moduleId) {
  // Check if already injected
  if (content.includes('saveChapterProgress(MODULE_ID')) {
    console.log(`  [SKIP] Already has saveChapterProgress injection`);
    return { content, modified: false };
  }
  if (content.includes('const MODULE_ID =')) {
    console.log(`  [SKIP] Already has MODULE_ID`);
    return { content, modified: false };
  }

  let modified = false;

  // Step 1: Inject MODULE_ID constant after SOURCE_BASE definition
  const sourceBasePattern = /(\n\s*(?:const|var)\s+SOURCE_BASE\s*=\s*"[^"]*";)/;
  if (sourceBasePattern.test(content)) {
    const injection = `\n    const MODULE_ID = '${moduleId}';`;
    content = content.replace(sourceBasePattern, (match) => match + injection);
    modified = true;
    console.log(`  Injected MODULE_ID = '${moduleId}'`);
  } else {
    // Fallback: inject after STORAGE block closing brace
    const storagePattern = /(const STORAGE = \{[\s\S]*?\n    \};)/;
    if (storagePattern.test(content)) {
      const injection = `\n    const MODULE_ID = '${moduleId}';`;
      content = content.replace(storagePattern, (match) => match + injection);
      modified = true;
      console.log(`  Injected MODULE_ID = '${moduleId}' (after STORAGE fallback)`);
    }
  }

  // Step 2: Inject saveChapterProgress after updateProgress(chapter, total);
  // Match various signatures: updateProgress(chapter, total), updateProgress(number, CHAPTERS.length), etc.
  const updateProgressPattern = /(\s+updateProgress\(\s*\w+\s*,\s*(?:total|CHAPTERS\.length)\s*\);)/;
  if (updateProgressPattern.test(content)) {
    content = content.replace(
      updateProgressPattern,
      (match) => match + `\n        window.saveChapterProgress(MODULE_ID, chapter, 'completed');`
    );
    modified = true;
    console.log(`  Injected saveChapterProgress call`);
  }

  return { content, modified };
}

function injectManualPattern(content, filename, moduleId) {
  if (content.includes('saveChapterProgress')) {
    console.log(`  [SKIP] Already has saveChapterProgress`);
    return { content, modified: false };
  }

  if (filename === 'ai-python-basic.js') {
    return injectPythonBasic(content, moduleId);
  }
  if (filename === 'ai-ml-basic.js') {
    return injectMlBasic(content, moduleId);
  }
  return { content, modified: false };
}

function injectPythonBasic(content, moduleId) {
  // Inject MODULE_ID after the opening IIFE line
  content = content.replace(
    /(var STORAGE_KEY_CHAPTER = "[^"]+";)/,
    (match) => match + `\n    const MODULE_ID = '${moduleId}';`
  );
  console.log(`  Injected MODULE_ID = '${moduleId}'`);

  // Inject saveChapterProgress after progress update in loadChapter's .then()
  // Pattern: setting progressText after progress calculation, before the .catch
  const progressTextPattern = /(if \(progressText\) progressText\.textContent = chapterNumber \+ ' dari ' \+ totalChapters \+ ' materi selesai';)/;
  if (progressTextPattern.test(content)) {
    content = content.replace(
      progressTextPattern,
      (match) => match + `\n                    window.saveChapterProgress(MODULE_ID, chapterNumber, 'completed');`
    );
    console.log(`  Injected saveChapterProgress call`);
    return { content, modified: true };
  }

  console.log(`  [WARN] Could not find injection point for python-basic`);
  return { content, modified: false };
}

function injectMlBasic(content, moduleId) {
  // Inject MODULE_ID after ML_BASE definition
  content = content.replace(
    /(const ML_BASE = "[^"]+";)/,
    (match) => match + `\n    const MODULE_ID = '${moduleId}';`
  );
  console.log(`  Injected MODULE_ID = '${moduleId}'`);

  // Inject saveChapterProgress at end of updateChapterUi (after finishButton block)
  const updateChapterUiEnd = /(if \(finishButton\) \{\s*\n\s*finishButton\.hidden = chapterNumber !== CHAPTERS\.length;\s*\n\s*\})/;
  if (updateChapterUiEnd.test(content)) {
    content = content.replace(
      updateChapterUiEnd,
      (match) => match + `\n        window.saveChapterProgress(MODULE_ID, chapterNumber, 'completed');`
    );
    console.log(`  Injected saveChapterProgress call`);
    return { content, modified: true };
  }

  console.log(`  [WARN] Could not find injection point for ml-basic`);
  return { content, modified: false };
}

function injectCvModule(content) {
  if (content.includes('saveChapterProgress')) {
    console.log(`  [SKIP] Already has saveChapterProgress`);
    return { content, modified: false };
  }

  let modified = false;

  // Inject MODULE_ID after CV_BASE_PATH
  const cvBasePathPattern = /(const CV_BASE_PATH = "[^"]+";)/;
  if (cvBasePathPattern.test(content)) {
    content = content.replace(cvBasePathPattern, (match) => match + `\n    const MODULE_ID = 'computer-vision';`);
    modified = true;
    console.log(`  Injected MODULE_ID = 'computer-vision'`);
  }

  // Inject saveChapterProgress after successful content render (after container.innerHTML assignment)
  // We inject after the mode check block, after container.innerHTML = html;
  const innerHtmlPattern = /(container\.innerHTML = html;\s*\n\s*)/;
  if (innerHtmlPattern.test(content)) {
    content = content.replace(
      innerHtmlPattern,
      (match) => match + `if (mode === 'materi') window.saveChapterProgress(MODULE_ID, chapterId, 'completed');\n            `
    );
    modified = true;
    console.log(`  Injected saveChapterProgress call`);
  }

  return { content, modified };
}

function processFile(filePath) {
  const filename = path.basename(filePath);
  console.log(`\nProcessing: ${filename}`);

  let content = fs.readFileSync(filePath, 'utf-8');

  if (SPECIAL_FILES[filename] === 'cv') {
    const result = injectCvModule(content);
    content = result.content;
    if (result.modified) stats.modified++;
    else stats.skipped++;
  } else if (SPECIAL_FILES[filename] === 'manual-pattern') {
    const moduleId = extractModuleId(content, filename);
    console.log(`  Module ID extracted: ${moduleId}`);
    const result = injectManualPattern(content, filename, moduleId);
    content = result.content;
    if (result.modified) stats.modified++;
    else stats.skipped++;
  } else {
    // Standard module
    // Skip if no CHAPTERS or updateProgress (might be a non-module helper)
    if (!content.includes('CHAPTERS') || !content.includes('updateProgress')) {
      console.log(`  [SKIP] Not a standard module (no CHAPTERS or updateProgress)`);
      stats.skipped++;
      return;
    }

    const moduleId = extractModuleId(content, filename);
    console.log(`  Module ID extracted: ${moduleId}`);
    const result = injectStandardModule(content, moduleId);
    content = result.content;
    if (result.modified) stats.modified++;
    else stats.skipped++;
  }

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would write ${filename}`);
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  [WRITTEN] ${filename}`);
  }
}

function main() {
  console.log('=== Inject Progress Tracking ===');
  console.log(`Directory: ${MODULES_DIR}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('');

  // Find all ai-*.js files
  const files = fs.readdirSync(MODULES_DIR)
    .filter(f => f.startsWith('ai-') && f.endsWith('.js'))
    .map(f => path.join(MODULES_DIR, f))
    .sort();

  console.log(`Found ${files.length} ai-*.js files\n`);

  for (const file of files) {
    try {
      processFile(file);
    } catch (err) {
      stats.errors.push({ file: path.basename(file), error: err.message });
      console.log(`  [ERROR] ${err.message}`);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Modified: ${stats.modified}`);
  console.log(`Skipped:  ${stats.skipped}`);
  console.log(`Errors:   ${stats.errors.length}`);
  if (stats.errors.length > 0) {
    stats.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  }
}

main();
