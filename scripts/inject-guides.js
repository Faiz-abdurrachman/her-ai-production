#!/usr/bin/env node
/**
 * inject-guides.js — Fase 1-4: Replace PYTHON_GUIDES + roadmap header in ai-*.js
 * Usage: node scripts/inject-guides.js [--phase=1|2|3|4|all] [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const GUIDES_DIR = path.join(__dirname, 'nazril-guides-output');
const JS_DIR = path.join(__dirname, '..', 'js', 'frontend', 'fellow-dashboard');
const DRY_RUN = process.argv.includes('--dry-run');
const PHASE_ARG = process.argv.find(a => a.startsWith('--phase='));
const PHASE = PHASE_ARG ? PHASE_ARG.split('=')[1] : 'all';

const PHASE_MODULES = {
  '1': ['ui-ux','healthcare','geospatial','manufacturing','culture','business-insight','people-business-mgt'],
  '2': ['deployment','back-end','bioinformatics','data-engineering','data-science','front-end','infrastructure'],
  '3': ['deep-learning','reinforcement-learning','agentic-ai','large-language-model','multimodal-llm','vlm'],
  '4': ['evaluation','evolution','modern','python']
};
const MODULE_IDS = PHASE === 'all'
  ? Object.values(PHASE_MODULES).flat()
  : (PHASE_MODULES[PHASE] || []);

const MODULE_FILE_MAP = {
  'culture':'ai-culture.js', 'geospatial':'ai-geospatial.js', 'healthcare':'ai-healthcare.js',
  'manufacturing':'ai-manufacturing.js', 'business-insight':'ai-business-insight.js',
  'people-business-mgt':'ai-people-business-mgt.js', 'ui-ux':'ai-ui-ux.js',
  'deployment':'ai-deployment.js', 'back-end':'ai-back-end.js', 'bioinformatics':'ai-bioinformatics.js',
  'data-engineering':'ai-data-engineering.js', 'data-science':'ai-data-science.js',
  'front-end':'ai-front-end.js', 'infrastructure':'ai-infrastructure.js',
  'deep-learning':'ai-deep-learning.js', 'reinforcement-learning':'ai-reinforcement-learning.js',
  'agentic-ai':'ai-agentic-ai.js', 'large-language-model':'ai-large-language-model.js',
  'multimodal-llm':'ai-multimodal-llm.js', 'vlm':'ai-vlm.js',
  'evaluation':'ai-evaluation.js', 'evolution':'ai-evolution.js', 'python':'ai-python.js',
  'modern':'ai-modern.js'
};

function formatValue(val, indent) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return JSON.stringify(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(v => formatValue(v, indent + '    '));
    if (val.every(v => typeof v !== 'object' || v === null)) {
      return '[' + items.join(', ') + ']';
    }
    return '[\n' + indent + '    ' + items.join(',\n' + indent + '    ') + '\n' + indent + ']';
  }
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '{}';
    const pairs = keys.map(k => {
      const v = formatValue(val[k], indent + '    ');
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return indent + '    ' + key + ': ' + v;
    });
    return '{\n' + pairs.join(',\n') + '\n' + indent + '}';
  }
  return String(val);
}

function buildGuidesArray(guides) {
  const items = guides.map((g, i) => {
    const entry = [
      `hook: ${formatValue(g.hook, '            ')}`,
      `flow: ${formatValue(g.flow, '            ')}`,
      `deepDive: ${formatValue(g.deepDive, '            ')}`,
      `workedExample: ${formatValue(g.workedExample, '            ')}`,
      `glossary: ${formatValue(g.glossary, '            ')}`,
      `quickCheck: ${formatValue(g.quickCheck, '            ')}`,
      `challenge: ${formatValue(g.challenge, '            ')}`,
      `roadmapRef: ${JSON.stringify(g.roadmapRef)}`
    ];
    return '        {\n' + entry.join(',\n') + '\n        }';
  });
  return 'const PYTHON_GUIDES = [\n' + items.join(',\n') + '\n    ];';
}

function buildRoadmapHeader(moduleId) {
  const badge = {
    'culture':'AI + Budaya','geospatial':'AI + Geospasial','healthcare':'AI + Kesehatan',
    'manufacturing':'AI + Manufaktur','business-insight':'Business Insight',
    'people-business-mgt':'People & Business','ui-ux':'Design Thinking',
    'deployment':'AI Deployment','back-end':'Back-End + AI','bioinformatics':'Bioinformatika',
    'data-engineering':'Data Engineering','data-science':'Data Science','front-end':'Front-End + AI',
    'infrastructure':'Infrastruktur','deep-learning':'Deep Learning',
    'reinforcement-learning':'Reinforcement Learning','agentic-ai':'Agentic AI',
    'large-language-model':'LLM','multimodal-llm':'Multimodal LLM','vlm':'Vision Language Model',
    'evaluation':'Evaluasi AI','evolution':'Evolusi AI','modern':'AI Modern','python':'Python'
  }[moduleId] || 'AI';

  const subtitle = {
    'culture':'Melestarikan warisan dengan kecerdasan buatan',
    'geospatial':'Memahami bumi melalui data dan AI',
    'healthcare':'AI untuk diagnosis, prediksi, dan perawatan',
    'manufacturing':'Otomatisasi cerdas di lini produksi',
    'business-insight':'Dari data menjadi keputusan strategis',
    'people-business-mgt':'Mengelola tim dan bisnis berbasis data',
    'ui-ux':'Merancang pengalaman dari kebutuhan nyata',
    'deployment':'Dari model ke produksi yang andal',
    'back-end':'Membangun sistem AI yang scalable',
    'bioinformatics':'Biologi molekuler bertemu machine learning',
    'data-engineering':'Pipeline data untuk AI production',
    'data-science':'Eksplorasi, pemodelan, dan insight',
    'front-end':'Antarmuka cerdas untuk pengguna',
    'infrastructure':'Fondasi komputasi untuk AI modern',
    'deep-learning':'Neural network dari dasar hingga aplikasi',
    'reinforcement-learning':'Agent belajar dari konsekuensi',
    'agentic-ai':'AI yang bertindak secara otonom',
    'large-language-model':'Memahami dan membangun LLM',
    'multimodal-llm':'AI yang memahami teks, gambar, dan suara',
    'vlm':'Penglihatan komputer dengan language model',
    'evaluation':'Metrik dan validasi model AI',
    'evolution':'Perkembangan paradigma AI',
    'modern':'Konsep AI modern dan terkini',
    'python':'Python untuk workflow AI'
  }[moduleId] || 'Memahami konsep melalui praktik';

  return `'<div class="ai-modern-roadmap-head"><i class="fas fa-compass" aria-hidden="true"></i><div><span>${badge}</span><h3>${subtitle}</h3><p>Gunakan penjelasan berikut untuk menghubungkan kode, data, failure case, dan keputusan dalam workflow AI.</p></div></div>' +`;
}

function replaceGuidesBlock(content, newGuides) {
  const startMarker = 'const PYTHON_GUIDES = [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return { content, replaced: false };

  let depth = 0;
  let endIdx = startIdx;
  let inBlock = false;
  for (let i = startIdx; i < content.length; i++) {
    const ch = content[i];
    if (ch === '[') { depth++; inBlock = true; }
    if (ch === ']') {
      depth--;
      if (depth === 0 && inBlock) { endIdx = i + 1; break; }
    }
  }

  return {
    content: content.slice(0, startIdx) + newGuides + content.slice(endIdx),
    replaced: true
  };
}

function replaceRoadmapHeader(content, newHeader, moduleId) {
  let result = content;

  const roadmapPattern = /'<div class="ai-modern-roadmap-head"><i class="fas fa-compass" aria-hidden="true"><\/i><div><span>[^<]*<\/span><h3>[^<]*<\/h3><p>[^<]*<\/p><\/div><\/div>' \+/;
  if (roadmapPattern.test(result)) {
    result = result.replace(roadmapPattern, newHeader);
  }

  if (moduleId === 'modern') {
    const eyebrowPattern = /eyebrow:\s*"Jalur Pemula"/g;
    const badge = {
      'modern':'AI Modern','python':'Python','evaluation':'Evaluasi AI','evolution':'Evolusi AI'
    }[moduleId] || 'AI';
    result = result.replace(eyebrowPattern, `eyebrow: "${badge}"`);
  }

  return result;
}

function buildPlaceholderGuides(moduleId) {
  const titles = {
    'evaluation': ['Metrik Evaluasi', 'Confusion Matrix', 'ROC & AUC', 'Cross-Validation', 'Bias-Variance', 'Model Selection', 'Error Analysis', 'Benchmarking'],
    'evolution': ['AI Klasik', 'Machine Learning', 'Deep Learning Era', 'Transformer Revolution', 'Multimodal AI', 'Agentic Systems', 'AI Safety', 'Future Trends'],
    'modern': ['Foundation Models', 'Prompt Engineering', 'RAG Architecture', 'Fine-Tuning', 'AI Orchestration', 'Evaluation', 'Deployment', 'Ethics'],
    'python': ['Python Basics', 'NumPy & Pandas', 'Data Visualization', 'Scikit-learn', 'PyTorch Basics', 'Model Training', 'Experimentation', 'Production']
  };
  const chapterTitles = titles[moduleId] || Array.from({length:8},(_,i)=>`Bab ${i+1}`);

  return chapterTitles.map((title, i) => ({
    hook: {
      question: `${title} — konsep kunci yang perlu dipahami.`,
      answerA: { label: 'Mitos', text: 'Anggapan umum yang perlu diluruskan.', icon: 'fas fa-times-circle' },
      answerB: { label: 'Fakta', text: 'Pemahaman berdasarkan praktik dan bukti.', icon: 'fas fa-check-circle' },
      message: `Materi ${title} sedang dikembangkan oleh tim kurikulum HerAI. Konten lengkap akan mencakup penjelasan konsep, contoh kasus, langkah kerja, dan latihan.`
    },
    flow: [['Persiapan', 'Pelajari materi.'], ['Praktik', 'Kerjakan latihan.'], ['Evaluasi', 'Ukur pemahaman.']],
    deepDive: [[title, `Materi ${title} dalam pengembangan.`, 'Konten sedang dikurasi oleh tim.']],
    workedExample: [title, ['Deskripsi', 'Contoh kasus sedang disiapkan.']],
    glossary: [[title, `Konsep dalam ${title}.`]],
    quickCheck: { question: `Apa yang Anda ketahui tentang ${title}?`, options: ['Pilihan A', 'Pilihan B', 'Pilihan C'], answer: 0, explanationCorrect: 'Tepat.', explanationWrong: 'Coba lagi.' },
    challenge: { instruction: `Jelaskan ${title} dengan kalimat Anda sendiri.`, placeholder: 'Tulis jawaban Anda...', example: '' },
    roadmapRef: String(i + 1)
  }));
}

let success = 0;
let failed = 0;

for (const moduleId of MODULE_IDS) {
  const fileName = MODULE_FILE_MAP[moduleId];
  if (!fileName) { console.log(`⚠️  ${moduleId}: no file mapping`); failed++; continue; }
  const filePath = path.join(JS_DIR, fileName);
  if (!fs.existsSync(filePath)) { console.log(`⚠️  ${moduleId}: ${fileName} not found`); failed++; continue; }

  console.log(`Processing: ${fileName} (${moduleId})`);

  let content = fs.readFileSync(filePath, 'utf8');

  let guides;
  const guidePath = path.join(GUIDES_DIR, `guides-${moduleId}.json`);
  if (fs.existsSync(guidePath)) {
    guides = JSON.parse(fs.readFileSync(guidePath, 'utf8')).guides;
  } else {
    guides = buildPlaceholderGuides(moduleId);
    console.log(`  📝 Using placeholder guides (no Nazril MD)`);
  }

  const newGuidesBlock = buildGuidesArray(guides);
  const { content: replaced, replaced: didReplace } = replaceGuidesBlock(content, newGuidesBlock);

  if (!didReplace) {
    console.log(`  ⚠️  PYTHON_GUIDES block not found in ${fileName}`);
    failed++;
    continue;
  }

  const newHeader = buildRoadmapHeader(moduleId);
  const finalContent = replaceRoadmapHeader(replaced, newHeader, moduleId);

  if (DRY_RUN) {
    console.log(`  ✅ [DRY RUN] Would update ${fileName}`);
    success++;
    continue;
  }

  fs.writeFileSync(filePath, finalContent, 'utf8');

  try {
    require('child_process').execSync(`node --check ${filePath}`, { stdio: 'pipe' });
    console.log(`  ✅ ${fileName} updated + syntax OK`);
    success++;
  } catch (e) {
    console.log(`  ❌ ${fileName} syntax error: ${e.stderr ? e.stderr.toString().split('\n')[0] : e.message}`);
    failed++;
  }
}

console.log(`\n📊 Done: ${success} success, ${failed} failed`);
