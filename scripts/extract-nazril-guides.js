#!/usr/bin/env node
/**
 * extract-nazril-guides.js
 * Fase 0 — Bug #57: Parse Nazril MD files → generate GUIDES array replacement.
 *
 * Usage: node scripts/extract-nazril-guides.js [--dry-run]
 * Output: scripts/nazril-guides-output/guides-{module_id}.json
 *         scripts/nazril-guides-output/roadmap-headers.json
 *         scripts/nazril-guides-output/inject-guides.js
 *
 * Mapping Nazril MD → GUIDES fields:
 *   Tujuan Bab         → learningOutcomes (string[])
 *   Gambaran + Analogi  → hook.question, hook.message
 *   Konsep Inti table   → glossary ([[term, def], ...])
 *   Hubungan antarkonsep→ deepDive ([[title, p1, p2], ...])
 *   Langkah Kerja       → flow ([[step, desc], ...])
 *   Contoh Kasus        → workedExample ([title, [label,desc], ...])
 *   Kesalahan Umum      → mistakes (string[])
 *   Checkpoint          → quickCheck ({question, options[], answer, ...})
 *   Latihan             → challenge ({instruction, placeholder, example})
 *
 * 15 chapters per module → 8 GUIDES entries (bab 1-8 → [0-7], bab 9-15 reuse [0-6])
 */

const fs = require('fs');
const path = require('path');

const NAZRIL_DIR = path.join(__dirname, '..', 'nazril', 'modul-materi-herai');
const OUTPUT_DIR = path.join(__dirname, 'nazril-guides-output');
const DRY_RUN = process.argv.includes('--dry-run');

// Ensure output dir
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// FILE → MODULE ID MAPPING
// ---------------------------------------------------------------------------
const FILE_TO_MODULE = {
  // Business & Industry Applications
  'Modul_AI_for_Culture_HerAI.md':             { id: 'culture',         title: 'AI untuk Budaya dan Warisan',          routePrefix: 'culture' },
  'Modul_AI_for_Geospatial_HerAI.md':          { id: 'geospatial',      title: 'AI untuk Geospasial',                  routePrefix: 'geospatial' },
  'Modul_AI_for_Healthcare_HerAI.md':          { id: 'healthcare',      title: 'AI untuk Kesehatan',                   routePrefix: 'healthcare' },
  'Modul_AI_for_Manufacturing_HerAI.md':       { id: 'manufacturing',   title: 'AI untuk Manufaktur',                  routePrefix: 'manufacturing' },
  'Modul_Business_Insight_HerAI.md':           { id: 'business-insight',title: 'Business Insight dengan AI',            routePrefix: 'business-insight' },
  'Modul_People_and_Business_Management_HerAI.md': { id: 'people-business-mgt', title: 'People & Business Management dengan AI', routePrefix: 'people-business-mgt' },
  'Modul_UI_UX_Design_Thinking_HerAI.md':      { id: 'ui-ux',           title: 'UI/UX Design Thinking',                routePrefix: 'ui-ux' },
  // Data Engineering Domain
  'Modul_AI_Deployment_HerAI.md':              { id: 'deployment',      title: 'AI Deployment',                        routePrefix: 'deployment' },
  'Modul_Back_End_Development_for_AI_HerAI.md':{ id: 'back-end',        title: 'Back-End Development untuk AI',        routePrefix: 'back-end' },
  'Modul_Bioinformatics_and_AI_HerAI.md':      { id: 'bioinformatics',  title: 'Bioinformatics dan AI',                routePrefix: 'bioinformatics' },
  'Modul_Data_Engineering_HerAI.md':           { id: 'data-engineering',title: 'Data Engineering',                     routePrefix: 'data-engineering' },
  'Modul_Data_Science_HerAI.md':               { id: 'data-science',    title: 'Data Science',                         routePrefix: 'data-science' },
  'Modul_Front_End_Development_for_AI_HerAI.md':{ id: 'front-end',      title: 'Front-End Development untuk AI',       routePrefix: 'front-end' },
  'Modul_Infrastructure_for_AI_HerAI.md':       { id: 'infrastructure', title: 'Infrastruktur untuk AI',               routePrefix: 'infrastructure' },
  // Foundation & Core AI
  'Modul_Deep_Learning_HerAI.md':              { id: 'deep-learning',   title: 'Deep Learning',                        routePrefix: 'deep-learning' },
  'Modul_Reinforcement_Learning_HerAI.md':     { id: 'reinforcement-learning', title: 'Reinforcement Learning',       routePrefix: 'reinforcement-learning' },
  // Generative & Multimodal AI
  'Modul_Agentic_AI_HerAI.md':                 { id: 'agentic-ai',      title: 'Agentic AI',                           routePrefix: 'agentic-ai' },
  'Modul_Large_Language_Model_HerAI.md':       { id: 'large-language-model', title: 'Large Language Model',           routePrefix: 'large-language-model' },
  'Modul_Multimodal_Large_Language_Model_HerAI.md': { id: 'multimodal-llm', title: 'Multimodal Large Language Model', routePrefix: 'multimodal-llm' },
  'Modul_Vision_Language_Model_HerAI.md':      { id: 'vlm',             title: 'Vision Language Model',               routePrefix: 'vlm' },
};

// ---------------------------------------------------------------------------
// PARSER HELPERS
// ---------------------------------------------------------------------------

/** Strip YAML frontmatter — returns body without --- blocks at top */
function stripFrontmatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('---', 3);
    if (end !== -1) return text.slice(end + 3).trim();
  }
  return text.trim();
}

/** Split MD into chapters by `# Bab N -` or `# Bab N ` */
function splitChapters(body) {
  const chapters = [];
  const lines = body.split('\n');
  let buf = [];
  let inChapter = false;

  for (const line of lines) {
    // Detect chapter start: "# Bab N " or "# Bab N -"
    if (/^# Bab \d{1,2}\b/.test(line)) {
      if (inChapter && buf.length > 0) {
        chapters.push(buf.join('\n'));
        buf = [];
      }
      inChapter = true;
    }
    if (inChapter) buf.push(line);
  }
  if (inChapter && buf.length > 0) chapters.push(buf.join('\n'));
  return chapters;
}

/** Extract content between ## Section and next ## (or end) */
function extractSection(content, heading) {
  // Match the heading: ## Heading Name (case-insensitive-ish)
  const re = new RegExp(`^##\\s+${escapeRegex(heading)}\\b`, 'im');
  const m = content.match(re);
  if (!m) return '';

  const start = m.index;
  // Find next ## heading after this one
  const afterStart = start + m[0].length;
  const nextH2 = content.slice(afterStart).search(/^##\s/m);
  const end = nextH2 === -1 ? content.length : afterStart + nextH2;
  return content.slice(afterStart, end).trim();
}

/** Extract content from narrative-format chapter (## N.N or ## Checkpoint Bab N) */
function extractSectionNarrative(content, headingPattern) {
  const re = new RegExp(`^##\\s+${headingPattern}`, 'im');
  const m = content.match(re);
  if (!m) return '';

  const start = m.index;
  const afterStart = start + m[0].length;
  const nextH2 = content.slice(afterStart).search(/^##\s/m);
  const end = nextH2 === -1 ? content.length : afterStart + nextH2;
  return content.slice(afterStart, end).trim();
}

/** Detect if chapter uses template format (has "## Gambaran Sederhana") or narrative format */
function detectFormat(chapterContent) {
  if (!chapterContent) return 'template';
  return /^##\s+Gambaran Sederhana\b/im.test(chapterContent) ? 'template' : 'narrative';
}

function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** Clean up markdown artifacts */
function cleanText(s) {
  return s
    .replace(/^>\s*/gm, '')       // blockquote >
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/`([^`]+)`/g, '$1')  // inline code
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Extract bullet points as string array */
function extractBullets(sectionContent) {
  const bullets = [];
  const lines = sectionContent.split('\n');
  for (const line of lines) {
    const m = line.match(/^\s*[-*]\s+(.+)/);
    if (m) bullets.push(cleanText(m[1]));
  }
  return bullets.filter(Boolean);
}

/** Extract numbered list as string array */
function extractNumberedList(sectionContent) {
  const items = [];
  const lines = sectionContent.split('\n');
  for (const line of lines) {
    const m = line.match(/^\s*\d+[.)]\s+(.+)/);
    if (m) items.push(cleanText(m[1]));
  }
  return items.filter(Boolean);
}

/** Extract markdown table as 2D array [row][col] */
function extractTable(sectionContent) {
  const rows = [];
  const lines = sectionContent.split('\n');
  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (/^\|[\s-:|]+\|$/.test(trimmed)) continue; // separator row
      const cells = trimmed.split('|').slice(1, -1).map(c => cleanText(c.trim()));
      if (cells.length > 0) rows.push(cells);
      inTable = true;
    } else if (inTable) {
      break;
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// SECTION EXTRACTORS
// ---------------------------------------------------------------------------

function extractLearningOutcomes(chapterContent) {
  const section = extractSection(chapterContent, 'Tujuan Bab');
  if (!section) return [];
  // Try bullets first, then numbered
  const bullets = extractBullets(section);
  if (bullets.length > 0) return bullets;
  return extractNumberedList(section);
}

function extractHook(chapterContent) {
  const section = extractSection(chapterContent, 'Gambaran Sederhana');
  if (!section) return null;

  const cleaned = cleanText(section);
  // Find the analogi block (starts with > **Analogi:**)
  const analogiMatch = cleaned.match(/\*\*Analogi:\*\*\s*(.+?)(?:\n\n|$)/s);
  const analogi = analogiMatch ? analogiMatch[1].trim() : '';

  // First 1-2 sentences as the question/topic
  const firstPara = cleaned.split('\n\n')[0].trim();
  const question = firstPara.length > 200 ? firstPara.slice(0, 197) + '...' : firstPara;

  return {
    question: question || 'Materi ini penting, tapi sering disalahpahami.',
    answerA: { label: 'Mitos umum', text: 'Anggapan yang sering muncul tapi perlu diklarifikasi.', icon: 'fas fa-question-circle' },
    answerB: { label: 'Faktanya', text: analogi || 'Pemahaman yang lebih akurat berdasarkan praktik nyata.', icon: 'fas fa-lightbulb' },
    message: cleaned.split('\n\n').slice(1).join('\n\n').slice(0, 300) || cleaned.slice(0, 300)
  };
}

function extractGlossary(chapterContent) {
  const section = extractSection(chapterContent, 'Konsep Inti');
  if (!section) return [];

  const table = extractTable(section);
  // table[0] = header row, table[1+] = data rows
  // Columns: Istilah | Penjelasan mudah | Cara memeriksa pemahaman
  return table.slice(1).map(row => [
    cleanText(row[0] || ''),
    cleanText(row[1] || '') || 'Konsep kunci dalam materi ini.'
  ]).filter(([term]) => term.length > 0);
}

function extractDeepDive(chapterContent) {
  const section = extractSection(chapterContent, 'Hubungan antarkonsep');
  if (!section) return [];

  const cleaned = cleanText(section);
  const paragraphs = cleaned.split('\n\n').filter(p => p.trim());
  if (paragraphs.length === 0) return [];

  // First paragraph as title, combined as p1/p2
  const title = paragraphs[0].length > 120 ? paragraphs[0].slice(0, 120) : paragraphs[0];
  const p1 = paragraphs.slice(0, Math.ceil(paragraphs.length / 2)).join('\n\n');
  const p2 = paragraphs.slice(Math.ceil(paragraphs.length / 2)).join('\n\n');

  return [[title, p1, p2]];
}

function extractFlow(chapterContent) {
  const section = extractSection(chapterContent, 'Langkah Kerja');
  if (!section) return [];

  const items = extractNumberedList(section);
  if (items.length === 0) return [];

  return items.map(item => {
    const step = item.length > 50 ? item.slice(0, 47) + '...' : item;
    return [step, item];
  });
}

function extractWorkedExample(chapterContent) {
  const section = extractSection(chapterContent, 'Contoh Kasus');
  if (!section) return ['Contoh kasus', ['Deskripsi', 'Belum tersedia.']];

  const cleaned = cleanText(section);
  // Try to find mini project name or first sentence as title
  const title = cleaned.split('\n')[0].slice(0, 100) || 'Contoh Penerapan';

  // Look for table
  const table = extractTable(section);
  if (table.length > 1) {
    // table rows: Situasi | Pilihan tindakan | Trade-off
    const example = [title];
    for (const row of table.slice(1)) {
      const label = cleanText(row[0] || '');
      const desc = cleanText(row[1] || row[2] || '');
      if (label) example.push([label, desc]);
    }
    if (example.length === 1) example.push(['Detail', cleaned.slice(0, 200)]);
    return example;
  }

  // Fallback: use paragraphs
  const paras = cleaned.split('\n\n').filter(p => p.trim());
  const result = [title];
  for (let i = 0; i < Math.min(paras.length, 4); i++) {
    const label = i === 0 ? 'Konteks' : i === 1 ? 'Tantangan' : i === 2 ? 'Pendekatan' : 'Hasil';
    result.push([label, paras[i].slice(0, 200)]);
  }
  return result;
}

function extractMistakes(chapterContent) {
  const section = extractSection(chapterContent, 'Kesalahan Umum');
  if (!section) return ['Materi belum tersedia.'];

  const bullets = extractBullets(section);
  if (bullets.length > 0) return bullets;
  return [cleanText(section).slice(0, 200)];
}

function extractQuickCheck(chapterContent) {
  const section = extractSection(chapterContent, 'Checkpoint');
  if (!section) return null;

  const items = extractNumberedList(section);
  if (items.length === 0) return null;

  // Use the first checkpoint question
  const question = items[0];
  return {
    question: question.length > 200 ? question.slice(0, 197) + '...' : question,
    options: ['Jawaban A (belum tentu tepat)', 'Jawaban B (belum tentu tepat)', 'Jawaban C (belum tentu tepat)'],
    answer: 1, // default to middle option — needs manual curation
    explanationCorrect: 'Tepat. Pemahaman ini penting untuk materi selanjutnya.',
    explanationWrong: 'Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari.'
  };
}

function extractChallenge(chapterContent) {
  const section = extractSection(chapterContent, 'Latihan');
  if (!section) return null;

  const items = extractNumberedList(section);
  if (items.length === 0) return null;

  return {
    instruction: items[0].length > 300 ? items[0].slice(0, 297) + '...' : items[0],
    placeholder: 'Tulis jawaban Anda di sini...',
    example: ''
  };
}

// ---------------------------------------------------------------------------
// PROCESS SINGLE MD FILE
// ---------------------------------------------------------------------------

function processMdFile(filePath, moduleMeta) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const body = stripFrontmatter(raw);
  const chapters = splitChapters(body);

  console.log(`  📄 ${path.basename(filePath)}: ${chapters.length} chapters found`);

  // Map each chapter (max 15) to GUIDES entry (max 8, wrapping)
  const guides = [];
  const maxGuides = 8;

  for (let i = 0; i < chapters.length && i < 15; i++) {
    const ch = chapters[i];
    const gIdx = i % maxGuides;

    if (i < maxGuides) {
      // Create new entry for first 8 chapters
      guides.push(buildGuidesEntry(ch, i + 1));
    }
    // Chapters 9-15 reuse guides entries — skip creation
  }

  // Ensure we have exactly 8 entries (pad if fewer chapters)
  while (guides.length < maxGuides) {
    guides.push(buildGuidesEntry('', guides.length + 1));
  }

  return {
    moduleId: moduleMeta.id,
    moduleTitle: moduleMeta.title,
    routePrefix: moduleMeta.routePrefix,
    guides
  };
}

function buildGuidesEntry(chapterContent, babNumber) {
  if (!chapterContent) {
    return emptyGuidesEntry(babNumber);
  }

  const format = detectFormat(chapterContent);
  if (format === 'narrative') {
    return buildNarrativeEntry(chapterContent, babNumber);
  }
  return buildTemplateEntry(chapterContent, babNumber);
}

function emptyGuidesEntry(babNumber) {
  return {
    hook: {
      question: 'Materi sedang dikembangkan.',
      answerA: { label: 'N/A', text: 'Belum tersedia.', icon: 'fas fa-hourglass-half' },
      answerB: { label: 'N/A', text: 'Belum tersedia.', icon: 'fas fa-hourglass-half' },
      message: 'Konten lengkap bab ini sedang disiapkan oleh tim kurikulum.'
    },
    flow: [['Langkah 1', 'Belum tersedia'], ['Langkah 2', 'Belum tersedia']],
    deepDive: [['Materi dalam pengembangan', 'Konten sedang dikurasi.', '']],
    workedExample: ['Belum tersedia', ['Deskripsi', 'Konten sedang disiapkan.']],
    glossary: [['Istilah', 'Definisi belum tersedia.']],
    quickCheck: { question: 'Materi bab ini sedang dikembangkan.', options: ['A', 'B', 'C'], answer: 0, explanationCorrect: '', explanationWrong: '' },
    challenge: { instruction: 'Latihan belum tersedia.', placeholder: '', example: '' },
    roadmapRef: String(babNumber)
  };
}

function buildTemplateEntry(chapterContent, babNumber) {
  const hook = extractHook(chapterContent) || {
    question: 'Apa yang membuat materi ini penting?',
    answerA: { label: 'Mitos', text: 'Jawaban umum yang perlu diluruskan.', icon: 'fas fa-times-circle' },
    answerB: { label: 'Fakta', text: 'Pemahaman benar berdasarkan bukti dan praktik.', icon: 'fas fa-check-circle' },
    message: ''
  };

  const flow = extractFlow(chapterContent);
  const deepDive = extractDeepDive(chapterContent);
  const workedExample = extractWorkedExample(chapterContent);
  const glossary = extractGlossary(chapterContent);
  const quickCheck = extractQuickCheck(chapterContent) || {
    question: 'Apa konsep utama dari bab ini?',
    options: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
    answer: 1,
    explanationCorrect: 'Benar.',
    explanationWrong: 'Coba lagi.'
  };
  const challenge = extractChallenge(chapterContent) || {
    instruction: 'Tulis ringkasan bab ini dengan kalimat Anda sendiri.',
    placeholder: 'Tulis di sini...',
    example: ''
  };

  return {
    hook,
    flow: flow.length >= 2 ? flow : [['Persiapan', 'Siapkan data dan tools.'], ['Eksekusi', 'Lakukan langkah utama.'], ['Verifikasi', 'Periksa hasil.']],
    deepDive: deepDive.length > 0 ? deepDive : [['Pendalaman Materi', 'Konsep-konsep inti dari bab ini.', 'Hubungan dengan praktik di lapangan.']],
    workedExample,
    glossary: glossary.length > 0 ? glossary : [['Konsep', 'Definisi.']],
    quickCheck,
    challenge,
    roadmapRef: String(babNumber)
  };
}

function buildNarrativeEntry(chapterContent, babNumber) {
  const introStr = extractSectionNarrative(chapterContent, String(babNumber) + '\\.1\\s');
  const intro = introStr || chapterContent;

  const hook = {
    question: extractFirstParagraph(intro, 200) || 'Apa yang membuat materi ini penting?',
    answerA: { label: 'Mitos', text: 'Jawaban umum yang perlu diluruskan.', icon: 'fas fa-times-circle' },
    answerB: { label: 'Fakta', text: 'Pemahaman benar berdasarkan bukti dan praktik.', icon: 'fas fa-check-circle' },
    message: extractParagraphs(intro, 1, 3, 500)
  };

  const table = extractTable(intro);
  const glossary = table.length > 0
    ? table.slice(0, 6).map(row => [cleanText(row[0] || ''), cleanText(row[1] || row[2] || '')])
    : [['Konsep', 'Definisi.']];

  const checkpointStr = extractSectionNarrative(chapterContent, 'Checkpoint Bab ' + babNumber + '\\b');
  const ckItems = checkpointStr ? extractNumberedList(checkpointStr) : [];
  const quickCheck = ckItems.length > 0
    ? {
        question: ckItems[0].length > 200 ? ckItems[0].slice(0, 197) + '...' : ckItems[0],
        options: ['Jawaban A', 'Jawaban B', 'Jawaban C'],
        answer: 0,
        explanationCorrect: 'Tepat.',
        explanationWrong: 'Coba pikirkan ulang.'
      }
    : { question: 'Apa konsep utama dari bab ini?', options: ['A', 'B', 'C'], answer: 0, explanationCorrect: 'Benar.', explanationWrong: 'Coba lagi.' };

  const latihanStr = extractSectionNarrative(chapterContent, 'Latihan Bab ' + babNumber + '\\b');
  const latItems = latihanStr ? extractNumberedList(latihanStr) : [];
  const challenge = latItems.length > 0
    ? { instruction: latItems[0].slice(0, 297) + (latItems[0].length > 300 ? '...' : ''), placeholder: 'Tulis jawaban Anda di sini...', example: '' }
    : { instruction: 'Tulis ringkasan bab ini dengan kalimat Anda sendiri.', placeholder: 'Tulis di sini...', example: '' };

  const paras = intro.split('\n\n').filter(p => p.trim() && !p.startsWith('|') && !p.startsWith('>'));
  const deepDive = paras.length > 1
    ? [[paras[0].slice(0, 120), paras.slice(0, Math.ceil(paras.length / 2)).join('\n\n'), paras.slice(Math.ceil(paras.length / 2)).join('\n\n')]]
    : [['Pendalaman Materi', intro.slice(0, 500), 'Ringkasan.']];

  return {
    hook,
    flow: [['Persiapan', 'Pelajari materi bab ini.'], ['Eksekusi', 'Praktikkan konsep yang dipelajari.'], ['Verifikasi', 'Kerjakan checkpoint dan latihan.']],
    deepDive,
    workedExample: ['Penerapan Konsep', ['Deskripsi', intro.slice(0, 300)]],
    glossary,
    quickCheck,
    challenge,
    roadmapRef: String(babNumber)
  };
}

function extractFirstParagraph(text, maxLen) {
  const cleaned = cleanText(text).split('\n\n')[0] || '';
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 3) + '...' : cleaned;
}

function extractParagraphs(text, start, end, maxLen) {
  const cleaned = cleanText(text);
  const paras = cleaned.split('\n\n').filter(p => p.trim());
  const slice = paras.slice(start, end);
  const result = slice.join('\n\n');
  return result.length > maxLen ? result.slice(0, maxLen - 3) + '...' : result;
}

// ---------------------------------------------------------------------------
// GENERATE ROADMAP HEADERS
// ---------------------------------------------------------------------------

function generateRoadmapHeaders(allResults) {
  const headers = {};
  for (const r of allResults) {
    headers[r.moduleId] = {
      badge: getModuleBadge(r.moduleId),
      title: getModuleSubtitle(r.moduleId)
    };
  }
  return headers;
}

function getModuleBadge(moduleId) {
  const badges = {
    'culture': 'AI + Budaya',
    'geospatial': 'AI + Geospasial',
    'healthcare': 'AI + Kesehatan',
    'manufacturing': 'AI + Manufaktur',
    'business-insight': 'Business Insight',
    'people-business-mgt': 'People & Business',
    'ui-ux': 'Design Thinking',
    'deployment': 'AI Deployment',
    'back-end': 'Back-End + AI',
    'bioinformatics': 'Bioinformatika',
    'data-engineering': 'Data Engineering',
    'data-science': 'Data Science',
    'front-end': 'Front-End + AI',
    'infrastructure': 'Infrastruktur',
    'deep-learning': 'Deep Learning',
    'reinforcement-learning': 'Reinforcement Learning',
    'agentic-ai': 'Agentic AI',
    'large-language-model': 'LLM',
    'multimodal-llm': 'Multimodal LLM',
    'vlm': 'Vision Language Model'
  };
  return badges[moduleId] || 'AI';
}

function getModuleSubtitle(moduleId) {
  const subtitles = {
    'culture': 'Melestarikan warisan dengan kecerdasan buatan',
    'geospatial': 'Memahami bumi melalui data dan AI',
    'healthcare': 'AI untuk diagnosis, prediksi, dan perawatan',
    'manufacturing': 'Otomatisasi cerdas di lini produksi',
    'business-insight': 'Dari data menjadi keputusan strategis',
    'people-business-mgt': 'Mengelola tim dan bisnis berbasis data',
    'ui-ux': 'Merancang pengalaman dari kebutuhan nyata',
    'deployment': 'Dari model ke produksi yang andal',
    'back-end': 'Membangun sistem AI yang scalable',
    'bioinformatics': 'Biologi molekuler bertemu machine learning',
    'data-engineering': 'Pipeline data untuk AI production',
    'data-science': 'Eksplorasi, pemodelan, dan insight',
    'front-end': 'Antarmuka cerdas untuk pengguna',
    'infrastructure': 'Fondasi komputasi untuk AI modern',
    'deep-learning': 'Neural network dari dasar hingga aplikasi',
    'reinforcement-learning': 'Agent belajar dari konsekuensi',
    'agentic-ai': 'AI yang bertindak secara otonom',
    'large-language-model': 'Memahami dan membangun LLM',
    'multimodal-llm': 'AI yang memahami teks, gambar, dan suara',
    'vlm': 'Penglihatan komputer dengan language model'
  };
  return subtitles[moduleId] || 'Memahami konsep melalui praktik';
}

// ---------------------------------------------------------------------------
// FIND ALL MD FILES
// ---------------------------------------------------------------------------

function findAllMdFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllMdFiles(fullPath));
    } else if (entry.name.endsWith('.md') && FILE_TO_MODULE[entry.name]) {
      results.push({ path: fullPath, name: entry.name, meta: FILE_TO_MODULE[entry.name] });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

function main() {
  console.log('🔍 extract-nazril-guides.js — Fase 0 Bug #57\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);

  const mdFiles = findAllMdFiles(NAZRIL_DIR);
  console.log(`Found ${mdFiles.length} Nazril MD files\n`);

  const allResults = [];
  const errors = [];

  for (const { path: filePath, name, meta } of mdFiles) {
    try {
      console.log(`Processing: ${name}`);
      const result = processMdFile(filePath, meta);
      allResults.push(result);

      if (!DRY_RUN) {
        const outPath = path.join(OUTPUT_DIR, `guides-${result.moduleId}.json`);
        fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`  ✅ → guides-${result.moduleId}.json (${result.guides.length} guides)`);
      }
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
      errors.push({ file: name, error: err.message });
    }
  }

  // Generate roadmap headers
  const roadmapHeaders = generateRoadmapHeaders(allResults);
  if (!DRY_RUN) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'roadmap-headers.json'),
      JSON.stringify(roadmapHeaders, null, 2),
      'utf8'
    );
    console.log('\n✅ roadmap-headers.json');

    // Write summary
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'summary.json'),
      JSON.stringify({
        processed: allResults.length,
        errors: errors.length,
        errorDetails: errors,
        modules: allResults.map(r => ({ id: r.moduleId, title: r.moduleTitle, guides: r.guides.length }))
      }, null, 2),
      'utf8'
    );
  }

  console.log(`\n📊 SUMMARY: ${allResults.length} processed, ${errors.length} errors`);
  if (errors.length > 0) {
    console.log('Errors:');
    errors.forEach(e => console.log(`  ❌ ${e.file}: ${e.error}`));
  }

  console.log(`\nOutput: ${OUTPUT_DIR}/`);
}

main();

// ---------------------------------------------------------------------------
// EXPORT FOR USE BY INJECTOR SCRIPT
// ---------------------------------------------------------------------------
module.exports = { processMdFile, FILE_TO_MODULE };
