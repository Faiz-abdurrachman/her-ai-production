(function() {
  'use strict';

  /* ── Indonesian Morphology Engine ─────────────────────────── */
  const ID_PREFIXES = [
    'mempertanggung','memperlakukan','mempermasalah',
    'memper','mempere','ketidak',
    'menge','meng','mem','men','meny','me',
    'penge','peng','pem','pen','peny','pe',
    'membe','mempel',
    'ber','per','ter','ke','se',
    'di','ku','kau',
  ];
  const ID_SUFFIXES = ['isasi','isme','logi','wati','wan','kan','an','nya','i','lah','kah','pun','tah'];
  const COMMON_WORDS = new Set([
    'saya','aku','kamu','kau','anda','dia','ia','kita','kami','mereka','beliau',
    'gue','gw','lo','lu','kalian','di','ke','dari','dan','atau','tapi','tetapi','namun','melainkan',
    'dengan','untuk','pada','oleh','dalam','antara','tentang','karena','sebab','sehingga','agar','supaya','bahwa',
    'jika','kalau','apabila','bila','ketika','saat','sambil','setelah','sebelum','selama','sejak','hingga','sampai',
    'sudah','telah','belum','tidak','bukan','jangan','tak','masih','sedang','akan','mau','ingin','harus','bisa','boleh',
    'juga','pun','saja','aja','lagi','lah','deh','dong','nih','sih','ya','iya',
    'ini','itu','sini','situ','sana','mana','apa','siapa','kapan','bagaimana','mengapa','kenapa',
    'orang','anak','bapak','ibu','pak','bu','mas','mbak','bang','kak',
    'kota','desa','jalan','rumah','kantor','sekolah','pasar','toko','warung',
    'waktu','hari','malam','pagi','siang','sore','tahun','bulan',
    'baik','buruk','bagus','jelek','besar','kecil','baru','lama','lain',
    'banyak','sedikit','semua','seluruh','setiap','beberapa','para',
    'ada','buat','beli','jual','makan','minum','pergi','datang','pulang',
    'kerja','main','baca','tulis','lihat','dengar','tahu','tanya','jawab',
    'satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh',
    'gaskeun','gapapa','yaudah','wkwk','hehe','haha','fix','banget','poll',
    'ojek','online','internet','aplikasi','startup',
    'jakarta','surabaya','bandung','medan','semarang','yogyakarta','bali',
    'indonesia','jawa','sumatra','kalimantan','sulawesi','papua',
    'gojek','tokopedia','bukalapak','shopee','traveloka','yang','cara','punya','milik','sesuai','berupa','berisi',
  ]);

  function detectMorphemes(word) {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!clean || clean.length <= 3 || COMMON_WORDS.has(clean)) return null;
    let prefix = null, suffix = null, root = clean;
    for (const p of ID_PREFIXES) {
      if (clean.startsWith(p) && clean.length > p.length + 2) { prefix = clean.slice(0, p.length); root = clean.slice(p.length); break; }
    }
    for (const s of ID_SUFFIXES) {
      if (root.endsWith(s) && root.length > s.length + 2) { suffix = root.slice(root.length - s.length); root = root.slice(0, root.length - s.length); break; }
    }
    if (prefix === null && suffix === null) return null;
    return { prefix, root, suffix, original: word };
  }

  /* ── Tokenization algorithms ───────────────────────────────── */
  function tokenizeWord(text) {
    const result = [];
    const regex = /([A-Za-zÀ-ÿ0-9](?:[A-Za-zÀ-ÿ0-9._-]*[A-Za-zÀ-ÿ0-9])?)|([^\w\s])/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      if (m[1]) result.push({ text: m[1], type: 'word', index: m.index });
      else if (m[2]) result.push({ text: m[2], type: 'punct', index: m.index });
    }
    return result;
  }

  function tokenizeSubword(text) {
    const words = [];
    const regex = /([A-Za-zÀ-ÿ0-9](?:[A-Za-zÀ-ÿ0-9._-]*[A-Za-zÀ-ÿ0-9])?)|([^\w\s])/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      if (m[1]) words.push({ text: m[1], type: 'word' });
      else if (m[2]) words.push({ text: m[2], type: 'punct' });
    }
    const result = [];
    for (const w of words) {
      if (w.type === 'punct') { result.push({ text: w.text, type: 'punct', wordRef: w.text }); continue; }
      const morph = detectMorphemes(w.text);
      if (morph) {
        if (morph.prefix) result.push({ text: morph.prefix + '-', type: 'prefix', wordRef: w.text });
        result.push({ text: morph.root, type: 'root', wordRef: w.text });
        if (morph.suffix) result.push({ text: '-' + morph.suffix, type: 'suffix', wordRef: w.text });
      } else if (w.text.length > 10 && !COMMON_WORDS.has(w.text.toLowerCase())) {
        const mid = Math.ceil(w.text.length / 2);
        result.push({ text: w.text.slice(0, mid), type: 'word', wordRef: w.text });
        result.push({ text: '##' + w.text.slice(mid), type: 'suffix', wordRef: w.text });
      } else {
        result.push({ text: w.text, type: 'word', wordRef: w.text });
      }
    }
    return result;
  }

  function tokenizeChar(text) {
    return [...text].map(c => ({
      text: c === ' ' ? '·' : c === '\n' ? '↵' : c,
      type: c === ' ' || c === '\n' ? 'space' : /[A-Za-zÀ-ÿ]/.test(c) ? 'char' : 'punct',
      raw: c,
    }));
  }

  /* ── Color palette ─────────────────────────────────────────── */
  const TOKEN_PALETTE = [
    { bg:'rgba(246,51,146,.14)',  border:'rgba(246,51,146,.4)',  color:'#f63392' },
    { bg:'rgba(255,107,157,.14)', border:'rgba(255,107,157,.4)', color:'#ff6b9d' },
    { bg:'rgba(236,72,153,.14)',  border:'rgba(236,72,153,.4)',  color:'#ec4899' },
    { bg:'rgba(168,85,247,.14)',  border:'rgba(168,85,247,.4)',  color:'#a855f7' },
    { bg:'rgba(239,68,68,.14)',   border:'rgba(239,68,68,.4)',   color:'#f87171' },
    { bg:'rgba(20,184,166,.14)',  border:'rgba(20,184,166,.4)',  color:'#14b8a6' },
    { bg:'rgba(34,197,94,.14)',   border:'rgba(34,197,94,.4)',   color:'#22c55e' },
    { bg:'rgba(250,204,21,.14)',  border:'rgba(250,204,21,.4)',  color:'#facc15' },
  ];
  const TYPE_STYLES = {
    prefix: { bg:'rgba(246,51,146,.14)',  border:'rgba(246,51,146,.4)',  color:'#f63392' },
    root:   { bg:'rgba(34,197,94,.14)',   border:'rgba(34,197,94,.4)',   color:'#22c55e' },
    suffix: { bg:'rgba(168,85,247,.14)',  border:'rgba(168,85,247,.4)',  color:'#a855f7' },
    punct:  { bg:'rgba(142,145,160,.1)',  border:'rgba(142,145,160,.35)', color:'#6f7282' },
    space:  { bg:'rgba(142,145,160,.06)', border:'rgba(142,145,160,.2)',  color:'#8e91a0' },
  };
  const MODE_DESCRIPTIONS = {
    word:    '<strong>Berbasis Kata:</strong> Pisahkan teks berdasarkan spasi dan tanda baca. Satu kata = satu token.',
    subword: '<strong>Subkata (BPE):</strong> Kata umum tetap utuh. Kata berafiks dipecah menjadi awalan + akar + akhiran.',
    char:    '<strong>Karakter:</strong> Setiap karakter adalah satu token. Spasi ditampilkan sebagai <code style="color:#f63392">·</code>',
  };

  function renderTokens(tokens, mode) {
    const container = document.getElementById('tokenOutput');
    if (!container) return [];
    container.innerHTML = '';
    const displayTokens = mode === 'char' ? tokens : tokens.filter(t => t.type !== 'space');
    let pi = 0;
    const colorMap = {};
    const typeLabels = { word:'kata', prefix:'awalan', root:'akar', suffix:'akhiran', punct:'tanda baca', space:'spasi', char:'karakter' };

    displayTokens.forEach((tok, i) => {
      const chip = document.createElement('span');
      chip.className = 'token-chip';
      let style = TYPE_STYLES[tok.type];
      if (!style) {
        const key = tok.wordRef || tok.text;
        if (!(key in colorMap)) { colorMap[key] = TOKEN_PALETTE[pi % TOKEN_PALETTE.length]; pi++; }
        style = colorMap[key];
      }
      chip.style.cssText = `background:${style.bg};border:1px solid ${style.border};color:${style.color};animation-delay:${Math.min(i * 0.025, 1)}s`;
      chip.title = tok.type === 'word' ? 'Token kata: ' + tok.text : typeLabels[tok.type] ? 'Token ' + typeLabels[tok.type] + ': ' + tok.text : 'Token #' + i;

      const txt = document.createElement('span');
      txt.textContent = tok.text;
      chip.appendChild(txt);

      const idx = document.createElement('span');
      idx.className = 'token-index';
      idx.textContent = '#' + i;
      chip.appendChild(idx);

      container.appendChild(chip);
    });
    return displayTokens;
  }

  function animateNum(el, val, suffix) {
    if (!el) return;
    el.textContent = val + (suffix || '');
  }

  function updateStats(tokens, rawText) {
    const dt = tokens.filter(t => t.type !== 'space');
    const unique = new Set(dt.map(t => t.text.toLowerCase())).size;
    const avgLen = dt.length ? (dt.reduce((a, t) => a + t.text.replace(/[#·↵→-]/g,'').length, 0) / dt.length).toFixed(1) : 0;
    const chars = rawText.replace(/\s/g, '').length;
    const compression = dt.length ? (chars / dt.length).toFixed(1) : '0';
    animateNum(document.getElementById('statTotal'), dt.length);
    animateNum(document.getElementById('statUnique'), unique);
    animateNum(document.getElementById('statAvgLen'), avgLen);
    animateNum(document.getElementById('statCompression'), compression + '×');
    animateNum(document.getElementById('tokenCountBadge'), dt.length + ' token');
  }

  function updateMorphology(tokens, mode) {
    const grid = document.getElementById('morphoGrid');
    if (!grid) return;
    if (mode !== 'subword') {
      grid.innerHTML = '<div class="morpho-empty">Ganti ke mode <strong>Subkata (BPE)</strong> untuk melihat analisis morfologi.</div>';
      return;
    }
    const morphTokens = tokens.filter(t => ['prefix','root','suffix'].includes(t.type));
    if (!morphTokens.length) {
      grid.innerHTML = '<div class="morpho-empty">Tidak ditemukan kata berafiks dalam teks ini.</div>';
      return;
    }
    const groups = {};
    morphTokens.forEach(t => {
      const ref = t.wordRef || t.text;
      if (!groups[ref]) groups[ref] = [];
      groups[ref].push(t);
    });
    grid.innerHTML = Object.entries(groups).map(([word, toks]) => {
      const parts = toks.map(t => {
        const cls = t.type === 'prefix' ? ' m-prefix' : t.type === 'suffix' ? ' m-suffix' : ' m-root';
        return '<div class="morpho-piece' + cls + '"><div class="morpho-value">' + t.text.replace(/^-|-$/g,'') + '</div><div class="morpho-type">' + ({prefix:'awalan',root:'akar',suffix:'akhiran'}[t.type]||'') + '</div></div>';
      }).join('<div class="morpho-sep">+</div>');
      return '<div class="morpho-word-card"><div class="morpho-original">' + word + '</div><div class="morpho-breakdown">' + parts + '</div></div>';
    }).join('');
  }

  /* ── Main playground init ──────────────────────────────────── */
  function initPlayground() {
    const textarea = document.getElementById('inputText');
    const clearBtn = document.getElementById('btnClear');
    const modeTabs = document.querySelectorAll('.mode-tab');
    const modeDesc = document.getElementById('modeDesc');
    const exampleChips = document.querySelectorAll('.example-chip');
    let currentMode = 'word';

    function process() {
      const text = textarea.value;
      let tokens;
      if (currentMode === 'word') tokens = tokenizeWord(text);
      else if (currentMode === 'subword') tokens = tokenizeSubword(text);
      else tokens = tokenizeChar(text);
      renderTokens(tokens, currentMode);
      updateStats(tokens, text);
      updateMorphology(tokens, currentMode);
    }

    textarea.addEventListener('input', process);

    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      process();
    });

    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        modeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMode = tab.dataset.mode;
        if (modeDesc) modeDesc.innerHTML = MODE_DESCRIPTIONS[currentMode] || '';
        process();
      });
    });

    exampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.text;
        if (text) { textarea.value = text; process(); }
      });
    });

    process();
  }

  /* ── Init when called (SPA-compatible) ──────────────────── */
  window.initAiLabTokenization = function() {
    const textarea = document.getElementById('inputText');
    if (!textarea || textarea.dataset.aiLabReady) return;
    textarea.dataset.aiLabReady = 'true';
    initPlayground();
  };
})();
