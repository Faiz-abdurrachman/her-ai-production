'use strict';

/* ════════════════════════════════════════════════════════════════
   HerAI Preprocessing — AI Lab port
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const STOPWORDS_ID = new Set([
  'yang','di','ke','dari','dan','atau','tapi','namun','serta','karena','sehingga',
  'maka','pada','dalam','untuk','dengan','oleh','adalah','ini','itu','tersebut',
  'saya','aku','kamu','kau','dia','mereka','kita','kami','pun','lah','kah','tah',
  'juga','sudah','telah','akan','bisa','dapat','harus','boleh','mau','ingin','ada',
  'tidak','bukan','tak','belum','jangan','sangat','lebih','paling','hanya','saja',
  'masih','sudah','lagi','pernah','sedang','saat','ketika','setelah','sebelum',
  'hingga','sampai','selama','antara','seperti','bagaimana','mengapa','kapan',
  'siapa','apa','dimana','kemana','tentang','terhadap','kepada','karena','sebab',
  'supaya','agar','bahwa','kalau','jika','apabila','meskipun','walaupun','namun',
  'tetapi','melainkan','padahal','sedangkan','adapun','yaitu','yakni','misalnya',
  'antara','setiap','tiap','masing','masing-masing','para','semua','seluruh',
  'beberapa','banyak','sedikit','cukup','kurang','punya','milik','oleh','karena',
  'nya','mu','ku','pun','lah','kah','tah','dah','nda','kan',
]);

const NORM_DICT = {
  'gw':'saya','gue':'saya','gua':'saya','w':'saya',
  'lu':'kamu','lo':'kamu','elo':'kamu','loe':'kamu',
  'udah':'sudah','dah':'sudah','sdh':'sudah',
  'tdk':'tidak','gak':'tidak','nggak':'tidak','ngga':'tidak','ga':'tidak','kagak':'tidak',
  'yg':'yang','yng':'yang',
  'dgn':'dengan',
  'utk':'untuk','buat':'untuk',
  'krn':'karena','karna':'karena',
  'bs':'bisa','bsa':'bisa',
  'gimana':'bagaimana','gmn':'bagaimana',
  'gitu':'begitu','gini':'begini',
  'aja':'saja','aje':'saja',
  'kalo':'kalau','klo':'kalau',
  'emang':'memang','emg':'memang',
  'banget':'sangat','bgt':'sangat',
  'gabisa':'tidak bisa','gausa':'tidak usah',
  'pengen':'ingin','pingin':'ingin',
  'kayak':'seperti','kyk':'seperti',
  'abis':'habis','abiss':'habis',
  'bikin':'membuat','bikinin':'membuatkan',
  'liat':'lihat','liat2':'melihat-lihat',
  'dengerin':'dengarkan','denger':'dengar',
  'makasih':'terima kasih','makasi':'terima kasih','thx':'terima kasih',
  'sy':'saya','sy.':'saya',
  'bpk':'bapak','bp.':'bapak','ibu':'ibu',
  'bro':'saudara','sob':'sahabat',
  'ok':'oke','oke':'oke',
  'sm':'sama','ama':'sama','ma':'sama',
  'dpt':'dapat','dpat':'dapat',
  'jd':'jadi','jdi':'jadi',
  'blm':'belum','belom':'belum',
  'hrs':'harus',
  'dr':'dari','dar':'dari',
  'ke-':'ke ',
  'tp':'tapi','tpi':'tapi',
  'lg':'lagi','lgi':'lagi',
  'org':'orang','orng':'orang',
  'tmn':'teman','temen':'teman',
  'byk':'banyak','bnyk':'banyak',
  'sdkt':'sedikit',
  'skrg':'sekarang','skrang':'sekarang',
  'kmrn':'kemarin',
  'bsk':'besok','esok':'besok',
  'msh':'masih',
  'ttg':'tentang',
  'hal':'hal',
  'ngerti':'mengerti','ngerti':'mengerti','ngerti':'mengerti',
  'pake':'pakai','make':'memakai',
};

const STEM_DICT = {
  // simple prefix/suffix rules for demo (Sastrawi simplified)
  'pembelajaran':'ajar','mempelajari':'ajar','pelajaran':'ajar','belajar':'ajar',
  'memakan':'makan','makanan':'makan','dimakan':'makan','pemakan':'makan',
  'berlari':'lari','pelari':'lari','dilarikan':'lari',
  'penulisan':'tulis','menulis':'tulis','tulisan':'tulis','ditulis':'tulis',
  'pemikiran':'pikir','berpikir':'pikir','memikirkan':'pikir',
  'kecantikan':'cantik','mempercantik':'cantik',
  'keindahan':'indah','memperindah':'indah',
  'pengembangan':'kembang','mengembangkan':'kembang','perkembangan':'kembang',
  'pekerja':'kerja','pekerjaan':'kerja','bekerja':'kerja','mengerjakan':'kerja',
  'pemahaman':'paham','memahami':'paham','dipahami':'paham',
  'perjalanan':'jalan','berjalan':'jalan','menjalankan':'jalan','dijalankan':'jalan',
  'keputusan':'putus','memutuskan':'putus','diputuskan':'putus',
  'pertumbuhan':'tumbuh','menumbuhkan':'tumbuh','berkembang':'kembang',
  'pengetahuan':'tahu','mengetahui':'tahu','diketahui':'tahu',
  'perasaan':'rasa','merasakan':'rasa','dirasakan':'rasa',
  'permasalahan':'masalah','mempermasalahkan':'masalah',
  'ketidaktahuan':'tahu','ketidakmampuan':'mampu',
  'kemampuan':'mampu','berkemampuan':'mampu',
  'keperluan':'perlu','memerlukan':'perlu','diperlukan':'perlu',
  'berbicara':'bicara','pembicaraan':'bicara','dibicarakan':'bicara',
  'mendengarkan':'dengar','pendengaran':'dengar',
  'melihat':'lihat','penglihatan':'lihat','terlihat':'lihat',
  'matematika':'matematika','komputer':'komputer',
  'kecerdasan':'cerdas','kecerdikan':'cerdik',
  'mesin':'mesin','pemrograman':'program','memprogram':'program',
  'mendalam':'dalam','pendalaman':'dalam',
};

function simpleStem(word) {
  word = word.toLowerCase();
  if (STEM_DICT[word]) return STEM_DICT[word];
  // Simple suffix stripping
  const suffixes = ['kan','lah','kah','an','nya','i'];
  for (const s of suffixes) {
    if (word.endsWith(s) && word.length > s.length + 3) {
      const base = word.slice(0, -s.length);
      if (STEM_DICT[base]) return STEM_DICT[base];
      if (base.length > 3) word = base;
    }
  }
  // Simple prefix stripping
  const prefixes = ['mem','men','meng','me','ber','ter','ke','pe','di','se'];
  for (const p of prefixes) {
    if (word.startsWith(p) && word.length > p.length + 3) {
      const base = word.slice(p.length);
      if (STEM_DICT[base]) return STEM_DICT[base];
      if (base.length > 3) { word = base; break; }
    }
  }
  return word;
}

/* ════════════════════════════════════════════════════════════════
   PROCESSING FUNCTIONS
   ════════════════════════════════════════════════════════════════ */

function doLower(text)  { return text.toLowerCase(); }

function doNoise(text, opts = {}) {
  let t = text;
  if (opts.html)    t = t.replace(/<[^>]+>/g, ' ');
  if (opts.url)     t = t.replace(/https?:\/\/\S+/g, ' ');
  if (opts.emoji)   t = t.replace(/[\u{1F300}-\u{1F9FF}]/gu, ' ').replace(/[^\x00-\x7F]/g, ' ');
  if (opts.hashtag) t = t.replace(/#\w+/g, ' ');
  if (opts.punct)   t = t.replace(/[^\w\s]/g, ' ');
  if (opts.num)     t = t.replace(/\d+/g, ' ');
  return t.replace(/\s+/g, ' ').trim();
}

function doNorm(text) {
  const changes = [];
  const result = text.split(/\b/).map(word => {
    const lower = word.toLowerCase().trim();
    if (NORM_DICT[lower]) {
      if (lower !== NORM_DICT[lower]) changes.push({ from: word.trim(), to: NORM_DICT[lower] });
      return word.replace(new RegExp(word.trim(), 'gi'), NORM_DICT[lower]);
    }
    return word;
  }).join('');
  return { text: result, changes };
}

function doStopword(text) {
  return text.split(/\s+/).filter(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    return clean && !STOPWORDS_ID.has(clean);
  }).join(' ');
}

function doStem(text) {
  return text.split(/\s+/).map(w => simpleStem(w)).join(' ');
}

function countWords(text) { return text.trim().split(/\s+/).filter(Boolean).length; }

/* ════════════════════════════════════════════════════════════════
   INTERACTIVE HANDLERS
   ════════════════════════════════════════════════════════════════ */

/* Lowercase demo */
window.applyLower = function () {
  const input  = document.getElementById('lowerInput').value;
  const output = doLower(input);
  document.getElementById('lowerOutput').textContent = output;
  document.getElementById('lowerStats').innerHTML =
    `<span class="ibr-stat">Sebelum: <span>${countWords(input)} kata</span></span>
     <span class="ibr-stat">Setelah: <span>${countWords(output)} kata</span></span>
     <span class="ibr-stat">Chars berubah: <span>${[...input].filter((c,i)=>c!==output[i]).length}</span></span>`;
  document.getElementById('lowerResult').style.display = 'block';
};
window.resetLower = function () {
  document.getElementById('lowerInput').value = 'Saya SUKA makan Nasi Goreng di JAKARTA setiap Pagi!';
  document.getElementById('lowerResult').style.display = 'none';
};

/* Noise demo */
window.applyNoise = function () {
  const input = document.getElementById('noiseInput').value;
  const opts = {
    html:    document.getElementById('nt-html').checked,
    url:     document.getElementById('nt-url').checked,
    emoji:   document.getElementById('nt-emoji').checked,
    punct:   document.getElementById('nt-punct').checked,
    num:     document.getElementById('nt-num').checked,
    hashtag: document.getElementById('nt-hashtag').checked,
  };
  const output = doNoise(input, opts);
  document.getElementById('noiseOutput').textContent = output;
  document.getElementById('noiseStats').innerHTML =
    `<span class="ibr-stat">Sebelum: <span>${input.length} chars</span></span>
     <span class="ibr-stat">Setelah: <span>${output.length} chars</span></span>
     <span class="ibr-stat">Berkurang: <span>${input.length - output.length} chars</span></span>`;
  document.getElementById('noiseResult').style.display = 'block';
};
window.resetNoise = function () {
  document.getElementById('noiseInput').value = 'Cek promo di https://tokopedia.com/item?id=123 😍😍 harga <b>Rp 99.000</b> aja!! #murah #promo2024';
  document.getElementById('noiseResult').style.display = 'none';
};

/* Stopword demo */
window.highlightStopwords = function () {
  const input = document.getElementById('stopInput').value;
  const words = input.split(/(\s+)/);
  let count = 0;
  const html = words.map(w => {
    const clean = w.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (clean && STOPWORDS_ID.has(clean)) {
      count++;
      return `<span class="sw-highlight" onclick="this.remove();updateStopStats()">${w}</span>`;
    }
    return w;
  }).join('');
  const out = document.getElementById('stopOutput');
  out.innerHTML = html;
  document.getElementById('stopStats').innerHTML =
    `<span class="ibr-stat">Total kata: <span>${countWords(input)}</span></span>
     <span class="ibr-stat">Stopwords: <span>${count}</span></span>
     <span class="ibr-stat">Setelah hapus: <span>${countWords(input) - count}</span></span>`;
  document.getElementById('stopResult').style.display = 'block';
};
window.updateStopStats = function () {
  const remaining = document.getElementById('stopOutput').querySelectorAll('.sw-highlight').length;
  const total = countWords(document.getElementById('stopInput').value);
  // re-count stats after deletion
};
window.removeStopwords = function () {
  const input  = document.getElementById('stopInput').value;
  const output = doStopword(input);
  document.getElementById('stopOutput').innerHTML = output;
  document.getElementById('stopStats').innerHTML =
    `<span class="ibr-stat">Sebelum: <span>${countWords(input)} kata</span></span>
     <span class="ibr-stat">Setelah: <span>${countWords(output)} kata</span></span>
     <span class="ibr-stat">Dihapus: <span>${countWords(input) - countWords(output)}</span></span>`;
  document.getElementById('stopResult').style.display = 'block';
};
window.resetStop = function () {
  document.getElementById('stopInput').value = 'Saya sedang belajar tentang pemrosesan teks bahasa Indonesia karena hal ini sangat penting untuk pengembangan model kecerdasan buatan yang dapat memahami bahasa kita dengan baik.';
  document.getElementById('stopResult').style.display = 'none';
};

/* Stemming single word */
window.stemWord = function () {
  const word  = document.getElementById('stemInput').value.trim();
  if (!word) return;
  const stem  = simpleStem(word.toLowerCase());
  const same  = stem === word.toLowerCase();
  const vis   = document.getElementById('stemVisual');
  vis.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <span style="font-family:var(--font-mono);font-size:16px;color:var(--text)">${word}</span>
      <span style="color:var(--text-3)">→</span>
      <span style="font-family:var(--font-disp);font-size:22px;font-weight:800;color:${same?'var(--text-2)':'var(--accent)'}">${stem}</span>
      ${same ? '<span style="font-size:11px;color:var(--text-3);font-family:var(--font-mono)">(tidak berubah)</span>' : ''}
    </div>`;
  document.getElementById('stemResult').style.display = 'block';
};
document.getElementById('stemInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') stemWord();
});

/* Stemming batch */
window.stemBatch = function () {
  const text  = document.getElementById('stemBatchInput').value;
  const words = text.split(/\s+/);
  const html = words.map(w => {
    const clean = w.replace(/[^a-zA-Z]/g, '');
    const stem  = simpleStem(clean.toLowerCase());
    const changed = stem !== clean.toLowerCase() && clean.length > 0;
    return `<span class="stem-token">
      <span class="stem-original">${w}</span>
      <span class="stem-arrow-sm">↓</span>
      <span class="stem-stemmed ${changed ? 'changed' : 'same'}">${changed ? stem : w}</span>
    </span>`;
  }).join(' ');
  document.getElementById('stemBatchOutput').innerHTML = html;
  document.getElementById('stemBatchResult').style.display = 'block';
};
window.resetStem = function () {
  document.getElementById('stemBatchInput').value = 'Pembelajaran mesin membutuhkan pemahaman mendalam tentang matematika dan pemrograman komputer.';
  document.getElementById('stemBatchResult').style.display = 'none';
};

/* Normalization */
window.applyNorm = function () {
  const input       = document.getElementById('normInput').value;
  const { text: output, changes } = doNorm(input);
  document.getElementById('normOutput').textContent = output;
  document.getElementById('normStats').innerHTML =
    `<span class="ibr-stat">Kata dinormalisasi: <span>${changes.length}</span></span>`;
  const diffHtml = changes.map(c =>
    `<div class="nd-item"><span class="nd-from">"${c.from}"</span><span style="color:var(--text-3)">→</span><span class="nd-to">"${c.to}"</span></div>`
  ).join('');
  document.getElementById('normDiff').innerHTML = changes.length
    ? `<div class="ibr-label" style="margin-bottom:8px;">Perubahan:</div>${diffHtml}`
    : '';
  document.getElementById('normResult').style.display = 'block';
};
window.resetNorm = function () {
  document.getElementById('normInput').value = 'Gw udah coba tapi gabisa, emang susah banget. Gimana caranya biar bisa? Krn gw nggak ngerti sm sekali.';
  document.getElementById('normResult').style.display = 'none';
};

/* ── Pipeline Lab ────────────────────────────────────────────── */
function initPipelineLab() {
  const labInput = document.getElementById('labInput');
  if (!labInput || labInput.dataset.ready) return;
  labInput.dataset.ready = 'true';

  function runPipeline() {
    const raw = labInput.value;
    let text  = raw;
    const steps = {
      lower: document.getElementById('lab-lower')?.checked,
      noise: document.getElementById('lab-noise')?.checked,
      norm:  document.getElementById('lab-norm')?.checked,
      stop:  document.getElementById('lab-stop')?.checked,
      stem:  document.getElementById('lab-stem')?.checked,
    };

    if (steps.lower) { text = doLower(text); }
    const prevLower = document.getElementById('prev-lower');
    if (prevLower) prevLower.textContent = steps.lower ? text : '(skip)';

    if (steps.noise) { text = doNoise(text, { html: true, url: true, emoji: true, punct: true }); }
    const prevNoise = document.getElementById('prev-noise');
    if (prevNoise) prevNoise.textContent = steps.noise ? text : '(skip)';

    if (steps.norm)  { const r = doNorm(text); text = r.text; }
    const prevNorm = document.getElementById('prev-norm');
    if (prevNorm) prevNorm.textContent = steps.norm ? text : '(skip)';

    if (steps.stop)  { text = doStopword(text); }
    const prevStop = document.getElementById('prev-stop');
    if (prevStop) prevStop.textContent = steps.stop ? text : '(skip)';

    if (steps.stem)  { text = doStem(text); }
    const prevStem = document.getElementById('prev-stem');
    if (prevStem) prevStem.textContent = steps.stem ? text : '(skip)';

    const labResult = document.getElementById('labResult');
    if (labResult) labResult.textContent = text || '(teks kosong)';
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    const labStats = document.getElementById('labStats');
    if (labStats) {
      labStats.innerHTML =
        `<span class="pl-stat">Input: <span>${countWords(raw)} kata</span></span>
         <span class="pl-stat">Output: <span>${tokens.length} token</span></span>
         <span class="pl-stat">Reduksi: <span>${Math.round((1 - tokens.length / countWords(raw)) * 100)}%</span></span>`;
    }
  }

  labInput.addEventListener('input', runPipeline);
  ['lab-lower','lab-noise','lab-norm','lab-stop','lab-stem'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', runPipeline);
  });
  runPipeline();
}

/* ── Init ────────────────────────────────────────────────────── */
window.initAiLabPreprocessing = function() {
  const content = document.getElementById('preprocessing-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  initPipelineLab();
};
