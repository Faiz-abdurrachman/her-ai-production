# Sumber Dinamis: bow.js

> Sumber: `js/frontend/fellow-dashboard/ai-lab/bow.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
'use strict';

/* ══════════════════════════════════════════════════════════════
   HerAI Bag-of-Words — AI Lab port
   ══════════════════════════════════════════════════════════════ */

/* ── Indonesian stopwords ───────────────────────────────────── */
const BOW_ID_STOPWORDS = new Set([
  'orang','orang','masyarakat','sejak','sejak','lalu','kemudian','selain',
  'berbagai','beberapa','banyak','sebuah','salah','satu','dua','tiga',
]);

/* ── Simple Indonesian tokenizer (no library) ──────────────── */
function BOW_tokenizeId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !BOW_ID_STOPWORDS.has(w));
}

/* ── Build vocabulary from array of documents ──────────────── */
function BOW_buildVocabulary(docs) {
  const freq = {};
  docs.forEach(doc => {
    const tokens = BOW_tokenizeId(doc);
    tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
  });
  // Sort by frequency desc, then alpha
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word, count]) => ({ word, count }));
}

/* ── Build BoW vector for a single document ─────────────────── */
function BOW_bowVector(text, vocab) {
  const tokens = BOW_tokenizeId(text);
  const counts = {};
  tokens.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
  return vocab.map(({ word }) => counts[word] || 0);
}

/* ── Dot product ────────────────────────────────────────────── */
function BOW_dot(a, b) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

/* ── Magnitude ──────────────────────────────────────────────── */
function BOW_magnitude(v) {
  return Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
}

/* ── Cosine similarity ──────────────────────────────────────── */
function BOW_cosineSim(a, b) {
  const magA = BOW_magnitude(a);
  const magB = BOW_magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return BOW_dot(a, b) / (magA * magB);
}

/* ── Colour for similarity value ────────────────────────────── */
function BOW_simToColor(val) {
  // 0 = dark, 1 = vivid green
  const alpha = 0.05 + val * 0.7;
  const intensity = Math.round(40 + val * 180);
  return {
    bg:     `rgba(48,209,88,${alpha.toFixed(2)})`,
    border: `rgba(48,209,88,${(alpha * 1.6).toFixed(2)})`,
    color:  val > 0.5 ? '#f63392' : val > 0.2 ? '#e8e8f0' : '#8888a0',
  };
}

/* ══════════════════════════════════════════════════════════════
   STATIC DEMOS (Section 1)
   ══════════════════════════════════════════════════════════════ */
function BOW_buildStaticDemo() {
  const container = document.getElementById('staticBowDemo');
  if (!container) return;

  const sentences = [
    { label: 'D1 — Transportasi', text: 'Gojek ojek online Jakarta', color: '#f63392' },
    { label: 'D2 — E-commerce', text: 'Tokopedia Shopee belanja online', color: '#a855f7' },
    { label: 'D3 — Startup', text: 'Gojek Tokopedia startup Indonesia', color: '#f59e0b' },
  ];
  const sharedVocab = ['gojek', 'ojek', 'online', 'jakarta', 'tokopedia', 'shopee', 'belanja', 'startup', 'indonesia'];

  sentences.forEach((s, si) => {
    const tokens = BOW_tokenizeId(s.text);
    const counts = {};
    tokens.forEach(t => { counts[t] = (counts[t] || 0) + 1; });

    const wrap = document.createElement('div');
    wrap.className = 'bvd-doc';
    wrap.innerHTML = `
      <div class="bvd-doc-header">
        <div class="bvd-dot" style="background:${s.color}"></div>
        <div class="bvd-label">${s.label}</div>
      </div>
      <div class="bvd-sentence">${s.text.replace(/(\w+)/g, (m) => tokens.includes(m.toLowerCase()) ? `<strong>${m}</strong>` : m)}</div>
      <div class="bvd-vector" id="bvd-vec-${si}"></div>
    `;
    container.appendChild(wrap);

    requestAnimationFrame(() => {
      const vecEl = document.getElementById(`bvd-vec-${si}`);
      if (!vecEl) return;
      sharedVocab.forEach(word => {
        const cnt = counts[word] || 0;
        const cell = document.createElement('div');
        cell.className = `bvd-cell${cnt > 0 ? ' active' : ''}`;
        if (cnt > 0) cell.style.borderColor = s.color + '80';
        if (cnt > 0) cell.style.background = s.color + '18';
        cell.innerHTML = `<span class="bvd-word">${word}</span><span class="bvd-count" style="${cnt > 0 ? `color:${s.color}` : ''}">${cnt}</span>`;
        vecEl.appendChild(cell);
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   SPARSE MATRIX VISUAL (Section 2)
   ══════════════════════════════════════════════════════════════ */
function BOW_buildSparseVisual() {
  const container = document.getElementById('sparseVisual');
  if (!container) return;

  const ROWS = 20; // documents
  const COLS = 60; // words
  const DENSITY = 0.08; // ~8% non-zero

  const grid = document.createElement('div');
  grid.style.cssText = `display:grid;grid-template-columns:repeat(${COLS},18px);gap:2px;padding:2px;background:rgba(246,51,146,.06);border:2px solid rgba(244,143,188,.26);border-radius:8px;`;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.style.cssText = 'width:18px;height:14px;border-radius:3px;transition:all .2s;cursor:default;';
      const rand = Math.random();
      if (rand < DENSITY * 0.3) {
        cell.style.background = 'rgba(246,51,146,.45)';
        cell.style.border = '2px solid rgba(246,51,146,.6)';
        cell.style.boxShadow = '0 0 4px rgba(246,51,146,.2)';
        cell.title = `Doc ${r+1} × Word ${c+1} = 2`;
      } else if (rand < DENSITY) {
        cell.style.background = 'rgba(246,51,146,.22)';
        cell.style.border = '2px solid rgba(246,51,146,.35)';
        cell.title = `Doc ${r+1} × Word ${c+1} = 1`;
      } else {
        cell.style.background = '#fff7fb';
        cell.style.border = '2px solid rgba(142,145,160,.2)';
        cell.title = `Doc ${r+1} × Word ${c+1} = 0`;
      }
      cell.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.5)'; this.style.zIndex = '5'; });
      cell.addEventListener('mouseleave', function() { this.style.transform = ''; this.style.zIndex = ''; });
      grid.appendChild(cell);
    }
  }
  container.appendChild(grid);
}

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE PLAYGROUND
   ══════════════════════════════════════════════════════════════ */

const BOW_DEFAULT_DOCS = [
  'Ojek online seperti Gojek dan Grab sudah mengubah cara masyarakat Jakarta bepergian setiap hari.',
  'Tokopedia dan Shopee bersaing ketat di pasar belanja online Indonesia dengan jutaan transaksi setiap hari.',
  'Startup teknologi Indonesia seperti Gojek dan Tokopedia sudah berkembang menjadi perusahaan besar kelas dunia.',
];

let BOW_currentVocab   = [];
let BOW_currentVectors = [];
let BOW_currentDocs    = [...BOW_DEFAULT_DOCS];

const BOW_DOC_COLORS = ['#f63392', '#a855f7', '#f59e0b'];
const BOW_DOC_NAMES  = ['D1', 'D2', 'D3'];

/* ── Tab switching ──────────────────────────────────────────── */
document.querySelectorAll('.pg-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pg-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pg-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById('pane-' + tab.dataset.tab);
    if (pane) pane.classList.add('active');
  });
});

/* ── Run BoW ────────────────────────────────────────────────── */
function BOW_runBoW() {
  const d1 = (document.getElementById('doc1') || {}).value || '';
  const d2 = (document.getElementById('doc2') || {}).value || '';
  const d3 = (document.getElementById('doc3') || {}).value || '';
  BOW_currentDocs = [d1, d2, d3];

  // Build vocab
  BOW_currentVocab = BOW_buildVocabulary(BOW_currentDocs);

  // Build vectors (use top 30 words max for display)
  const displayVocab = BOW_currentVocab.slice(0, 30);
  BOW_currentVectors = BOW_currentDocs.map(doc => BOW_bowVector(doc, displayVocab));

  // Word count info
  const totalWords = BOW_currentDocs.reduce((sum, d) => sum + BOW_tokenizeId(d).length, 0);
  const wc = document.getElementById('wordCountInfo');
  if (wc) wc.textContent = `${BOW_currentVocab.length} kata unik · ${totalWords} total token`;

  BOW_renderVocab(displayVocab);
  BOW_renderMatrix(displayVocab, BOW_currentVectors);
  BOW_renderHeatmap();
}

/* ── Render vocabulary chips ────────────────────────────────── */
function BOW_renderVocab(vocab) {
  const el = document.getElementById('vocabChips');
  const cnt = document.getElementById('vocabCount');
  if (!el) return;
  if (cnt) cnt.textContent = `${BOW_currentVocab.length} kata`;

  el.innerHTML = '';
  if (!vocab.length) { el.innerHTML = '<span style="font-family:var(--ai-mono);font-size:11px;color:var(--ai-text3);">Tidak ada kata setelah stop word dihapus.</span>'; return; }

  vocab.forEach(({ word, count }, i) => {
    const chip = document.createElement('div');
    chip.className = 'vocab-chip';
    chip.style.animationDelay = `${i * 0.02}s`;
    chip.style.opacity = '0';
    chip.style.animation = `tokenAppear .3s ease ${i * 0.025}s forwards`;
    chip.innerHTML = `${word}<span class="vocab-chip-count">${count}</span>`;
    el.appendChild(chip);
  });
}

/* ── Render document-term matrix table ──────────────────────── */
function BOW_renderMatrix(vocab, vectors) {
  const el = document.getElementById('matrixTable');
  const info = document.getElementById('matrixInfo');
  if (!el) return;
  if (!vocab.length) { el.innerHTML = '<span style="font-family:var(--ai-mono);font-size:11px;color:var(--ai-text3);">—</span>'; return; }

  if (info) info.textContent = `${vectors.length} dok × ${vocab.length} kata`;

  const table = document.createElement('table');
  table.className = 'matrix-table';

  // Header
  const thead = document.createElement('thead');
  const hrow  = document.createElement('tr');
  const th0   = document.createElement('th');
  th0.className = 'row-header';
  th0.textContent = 'Dokumen';
  hrow.appendChild(th0);
  vocab.forEach(({ word }) => {
    const th = document.createElement('th');
    th.textContent = word;
    hrow.appendChild(th);
  });
  thead.appendChild(hrow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  vectors.forEach((vec, ri) => {
    const tr = document.createElement('tr');
    const td0 = document.createElement('td');
    td0.className = 'doc-name';
    td0.innerHTML = `<span style="color:${BOW_DOC_COLORS[ri]};font-weight:700;">${BOW_DOC_NAMES[ri]}</span>`;
    tr.appendChild(td0);

    vec.forEach(cnt => {
      const td = document.createElement('td');
      td.textContent = cnt;
      td.className = `cell-${Math.min(cnt, 3)}`;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  el.innerHTML = '';
  el.appendChild(table);
}

/* ── Render cosine similarity heatmap ──────────────────────── */
function BOW_renderHeatmap() {
  const el   = document.getElementById('heatmapGrid');
  const info = document.getElementById('heatmapInfo');
  if (!el) return;

  if (!BOW_currentVocab.length) {
    el.innerHTML = '<span style="font-family:var(--ai-mono);font-size:11px;color:var(--ai-text3);">—</span>';
    return;
  }

  // Compute 3×3 sim matrix
  const n = BOW_currentVectors.length;
  const sims = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => BOW_cosineSim(BOW_currentVectors[i], BOW_currentVectors[j]))
  );

  if (info) {
    const maxOff = Math.max(sims[0][1], sims[0][2], sims[1][2]);
    info.textContent = `Pasangan paling mirip: ${(maxOff * 100).toFixed(0)}%`;
  }

  el.innerHTML = '';

  const CELL_SIZE = 84;
  const LABEL_W   = 48;

  // Build table layout: label col + 3 heatmap cols
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:inline-flex;flex-direction:column;gap:0;';

  // Column labels row
  const colLabels = document.createElement('div');
  colLabels.style.cssText = `display:flex;gap:0;margin-left:${LABEL_W}px;`;
  BOW_DOC_NAMES.forEach((name, j) => {
    const lbl = document.createElement('div');
    lbl.style.cssText = `width:${CELL_SIZE}px;text-align:center;font-family:var(--ai-mono);font-size:11px;color:${BOW_DOC_COLORS[j]};padding-bottom:6px;font-weight:700;`;
    lbl.textContent = name;
    colLabels.appendChild(lbl);
  });
  wrapper.appendChild(colLabels);

  // Rows
  sims.forEach((row, i) => {
    const rowEl = document.createElement('div');
    rowEl.style.cssText = 'display:flex;gap:0;margin-bottom:3px;align-items:center;';

    // Row label
    const rowLabel = document.createElement('div');
    rowLabel.style.cssText = `width:${LABEL_W}px;font-family:var(--ai-mono);font-size:11px;color:${BOW_DOC_COLORS[i]};font-weight:700;padding-right:8px;text-align:right;flex-shrink:0;`;
    rowLabel.textContent = BOW_DOC_NAMES[i];
    rowEl.appendChild(rowLabel);

    row.forEach((val, j) => {
      const isDiag = i === j;
      const c = BOW_simToColor(isDiag ? 1 : val);
      const cell = document.createElement('div');
      cell.style.cssText = `
        width:${CELL_SIZE}px; height:${CELL_SIZE}px;
        background:${isDiag ? 'rgba(255,255,255,.06)' : c.bg};
        border:1px solid ${isDiag ? 'rgba(255,255,255,.1)' : c.border};
        border-radius:8px; margin-right:3px;
        display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
        cursor:default; position:relative; transition:all .2s;
        font-family:var(--ai-mono);
      `;

      const scoreEl = document.createElement('div');
      scoreEl.style.cssText = `font-size:20px;font-weight:800;color:${isDiag ? 'var(--ai-text3)' : c.color};line-height:1;`;
      scoreEl.textContent = isDiag ? '—' : val.toFixed(2);

      const labelEl = document.createElement('div');
      labelEl.style.cssText = 'font-size:9px;color:var(--ai-text3);text-transform:uppercase;letter-spacing:.06em;';
      labelEl.textContent = isDiag ? 'sama' : val >= 0.7 ? 'sangat mirip' : val >= 0.4 ? 'cukup mirip' : val >= 0.1 ? 'sedikit mirip' : 'berbeda';

      // Tooltip
      const tip = document.createElement('div');
      tip.style.cssText = `
        position:absolute;bottom:calc(100%+8px);left:50%;transform:translateX(-50%);
        background:#1e1e2a;border:1px solid rgba(255,255,255,.12);border-radius:6px;
        padding:6px 10px;font-size:10px;color:var(--text-2);white-space:nowrap;
        opacity:0;visibility:hidden;transition:all .15s;z-index:20;pointer-events:none;
      `;
      if (!isDiag) {
        tip.textContent = `sim(${BOW_DOC_NAMES[i]}, ${BOW_DOC_NAMES[j]}) = ${val.toFixed(4)}`;
      }

      cell.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.zIndex = '10';
        tip.style.opacity = '1'; tip.style.visibility = 'visible';
      });
      cell.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.zIndex = '';
        tip.style.opacity = '0'; tip.style.visibility = 'hidden';
      });

      cell.appendChild(scoreEl);
      cell.appendChild(labelEl);
      if (!isDiag) cell.appendChild(tip);
      rowEl.appendChild(cell);
    });

    wrapper.appendChild(rowEl);
  });

  el.appendChild(wrapper);
}

/* ── Document search ────────────────────────────────────────── */
function BOW_runSearch() {
  const query = (document.getElementById('searchInput') || {}).value || '';
  const el    = document.getElementById('searchResults');
  if (!el) return;

  if (!query.trim() || !BOW_currentVocab.length) {
    el.innerHTML = '<div class="sr-empty">Jalankan BoW terlebih dahulu, lalu masukkan query.</div>';
    return;
  }

  const displayVocab = BOW_currentVocab.slice(0, 30);
  const qVec = BOW_bowVector(query, displayVocab);
  const qMag = BOW_magnitude(qVec);

  if (qMag === 0) {
    el.innerHTML = '<div class="sr-empty">Tidak ada kata dalam query yang cocok dengan vocabulary. Coba kata lain.</div>';
    return;
  }

  // Score each doc
  const scored = BOW_currentDocs.map((doc, i) => ({
    doc, i,
    score: BOW_cosineSim(qVec, BOW_currentVectors[i]),
  })).sort((a, b) => b.score - a.score);

  const maxScore = scored[0].score;

  el.innerHTML = '';
  scored.forEach((item, rank) => {
    const isTop = rank === 0 && item.score > 0;
    const div   = document.createElement('div');
    div.className = `search-result${isTop ? ' top-result' : ''}`;
    div.style.opacity = '0';
    div.style.animation = `tokenAppear .3s ease ${rank * 0.1}s forwards`;

    const barWidth = maxScore > 0 ? (item.score / maxScore) * 100 : 0;
    const snippetWords = item.doc.slice(0, 90) + (item.doc.length > 90 ? '…' : '');

    div.innerHTML = `
      <div class="sr-rank">${rank === 0 ? '🥇' : rank === 1 ? '🥈' : '🥉'}</div>
      <div class="sr-body">
        <div class="sr-text" style="color:${BOW_DOC_COLORS[item.i]}80;">
          <strong style="color:${BOW_DOC_COLORS[item.i]};">${BOW_DOC_NAMES[item.i]}</strong> — ${snippetWords}
        </div>
        <div class="sr-bar-wrap"><div class="sr-bar" style="width:${barWidth.toFixed(1)}%;background:${BOW_DOC_COLORS[item.i]};"></div></div>
      </div>
      <div class="sr-score" style="color:${BOW_DOC_COLORS[item.i]};">${(item.score * 100).toFixed(1)}%</div>
    `;
    el.appendChild(div);
  });
}

/* ── Scroll Spy & Smooth Scroll ─────────────────────────────── */
function BOW_setupScrollSpy() {
  const links = document.querySelectorAll('.lesson-list-card a');
  const secs = Array.from(document.querySelectorAll('.lesson-sec[id]'));
  const ring = document.querySelector('.lpc-ring-wrap circle:nth-child(2)');
  const pctText = document.querySelector('.lpc-ring-text strong');

  if (!links.length || !secs.length) return;

  // Smooth scroll and prevent default hash behavior
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#sec-')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const scrollContainer = document.querySelector('.fellow-main') || window;

  function updateScroll() {
    let activeIdx = 0;
    secs.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) activeIdx = i;
    });

    links.forEach((l, i) => {
      const li = l.closest('li');
      if (li) li.classList.toggle('active', i === activeIdx);
    });

    const p = Math.round((activeIdx / Math.max(1, secs.length - 1)) * 100);
    if (ring) ring.style.strokeDashoffset = 188.5 * (1 - p/100);
    if (pctText) pctText.textContent = p + '%';
  }

  if (window.BOW_scrollHandler) {
    window.removeEventListener('scroll', window.BOW_scrollHandler);
  }
  window.BOW_scrollHandler = updateScroll;
  window.addEventListener('scroll', updateScroll, { passive: true });

  updateScroll();
}

/* ── Init & Wire up ─────────────────────────────────────────── */
window.initAiLabBow = function() {
  var content = document.getElementById('bow-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';

  if (document.getElementById('staticBowDemo') && !document.getElementById('staticBowDemo').children.length) {
    BOW_buildStaticDemo();
  }
  if (document.getElementById('sparseVisual') && !document.getElementById('sparseVisual').children.length) {
    BOW_buildSparseVisual();
  }

  BOW_setupScrollSpy();

  /* ── Tab switching ──────────────────────────────────────────── */
  document.querySelectorAll('.pg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pg-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pg-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById('pane-' + tab.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  /* ── Wire up buttons ────────────────────────────────────────── */
  const btnRun   = document.getElementById('btnRun');
  const btnReset = document.getElementById('btnReset');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  if (btnRun) btnRun.addEventListener('click', BOW_runBoW);

  if (btnReset) btnReset.addEventListener('click', () => {
    ['doc1','doc2','doc3'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.value = BOW_DEFAULT_DOCS[i];
    });
    BOW_runBoW();
  });

  if (searchBtn) searchBtn.addEventListener('click', BOW_runSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') BOW_runSearch(); });
  }

  // Auto-run on doc input change (debounced)
  let BOW_debounce = null;
  ['doc1','doc2','doc3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      clearTimeout(BOW_debounce);
      BOW_debounce = setTimeout(BOW_runBoW, 400);
    });
  });

  // Initial run
  BOW_runBoW();
};

/* ── CSS animation keyframe (dynamic injection) ─────────────── */
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tokenAppear {
      from { opacity:0; transform:translateY(8px) scale(.9); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
})();

````
