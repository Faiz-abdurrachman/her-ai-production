# Sumber Dinamis: pos-ner.js

> Sumber: `js/frontend/fellow-dashboard/ai-lab/pos-ner.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
'use strict';

/* ════════════════════════════════════════════════════════════════
   HerAI POS Tagging & NER — AI Lab port
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

// Simple rule-based POS tagger for Indonesian
const POS_RULES = {
  // Pronouns
  pron: ['saya','aku','kamu','kau','dia','mereka','kita','kami','anda','beliau','ia'],
  // Prepositions
  adp: ['di','ke','dari','pada','dalam','untuk','dengan','oleh','tentang','terhadap','kepada','antara','atas','bawah','depan','belakang','samping'],
  // Conjunctions
  conj: ['dan','atau','tapi','tetapi','namun','serta','karena','sehingga','maka','jika','kalau','bila','ketika','setelah','sebelum','walaupun','meskipun','bahwa','supaya','agar'],
  // Determiners
  det: ['ini','itu','tersebut','para','semua','setiap','tiap','masing','beberapa','banyak','sedikit'],
  // Auxiliaries
  aux: ['sudah','telah','akan','harus','boleh','bisa','dapat','mau','ingin','sedang','masih','pernah','belum'],
  // Adverbs
  adv: ['sangat','tidak','tak','bukan','juga','hanya','saja','lagi','selalu','sering','kadang','jarang','hampir','cukup','terlalu','paling','lebih','kurang'],
  // Numbers
  num: ['satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh','pertama','kedua','ketiga','puluh','ratus','ribu','juta'],
};

const VERB_PREFIXES = ['me','mem','men','meng','menge','di','ber','ter','ke','per'];
const NOUN_SUFFIXES = ['an','kan','kan','nya'];
const ADJ_PATTERNS  = ['cantik','bagus','besar','kecil','tinggi','rendah','panjang','pendek','lebar','sempit','baru','lama','baik','buruk','indah','jelek','cepat','lambat','kuat','lemah','keras','lembut','panas','dingin','cerah','gelap','bersih','kotor'];

// Named entities - Indonesian context
const NE_PERSONS = [
  ['joko','widodo'],['prabowo','subianto'],['megawati','soekarnoputri'],
  ['budi','santoso'],['siti','rahayu'],['ibu','sari'],['pak','budi'],
  ['raisa','andriana'],['agnez','mo'],['dian','sastro'],
  ['susi','pudjiastuti'],['sri','mulyani'],['retno','marsudi'],
];
const NE_ORGS = [
  ['tokopedia'],['gojek'],['grab'],['bukalapak'],['traveloka'],
  ['pt','telkom','indonesia'],['bank','mandiri'],['bank','bca'],['bank','bri'],
  ['universitas','indonesia'],['itb'],['ugm'],['kpk'],['bumn'],['ojk'],
  ['pertamina'],['pln'],['garuda','indonesia'],
];
const NE_LOCS = [
  ['jakarta'],['surabaya'],['bandung'],['medan','semarang'],['yogyakarta'],
  ['bali'],['solo'],['malang'],['makassar'],['palembang'],['bogor'],
  ['jawa','tengah'],['jawa','barat'],['jawa','timur'],['kalimantan'],
  ['sulawesi'],['papua'],['sumatra'],['jakarta','selatan'],['jakarta','pusat'],
  ['jakarta','utara'],['gunung','bromo'],['selat','sunda'],['danau','toba'],
];
const NE_DATES = [
  ['januari'],['februari'],['maret'],['april'],['mei'],['juni'],
  ['juli'],['agustus'],['september'],['oktober'],['november'],['desember'],
  ['senin'],['selasa'],['rabu'],['kamis'],['jumat'],['sabtu'],['minggu'],
  ['kemarin'],['hari','ini'],['besok'],['tahun','depan'],['tahun','lalu'],
  ['pukul'],['pkl'],
];

function getPOSTag(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g,'');
  if (!w) return 'PUNCT';
  // Check rules
  for (const [tag, list] of Object.entries(POS_RULES)) {
    if (list.includes(w)) return tag.toUpperCase();
  }
  // Number
  if (/^\d+$/.test(w)) return 'NUM';
  // Proper noun heuristic (capitalized, not at start)
  if (/^[A-Z]/.test(word) && ADJ_PATTERNS.includes(w) === false) return 'PROPN';
  // Verb prefix
  for (const p of VERB_PREFIXES) {
    if (w.startsWith(p) && w.length > p.length + 3) return 'VERB';
  }
  // Verb suffix -kan, -i
  if ((w.endsWith('kan') || w.endsWith('i')) && w.length > 5) return 'VERB';
  // Adj
  if (ADJ_PATTERNS.includes(w)) return 'ADJ';
  // Noun suffix -an
  if (w.endsWith('an') && w.length > 4) return 'NOUN';
  // Default NOUN
  return 'NOUN';
}

function runNEROnTokens(tokens) {
  const lower = tokens.map(t => t.toLowerCase().replace(/[^a-z]/g,''));
  const tags   = new Array(tokens.length).fill('O');

  function matchList(list, startIdx) {
    for (const ent of list) {
      if (ent.length === 1) {
        if (lower[startIdx] === ent[0]) return ent.length;
      } else {
        let match = true;
        for (let k = 0; k < ent.length; k++) {
          if (lower[startIdx+k] !== ent[k]) { match = false; break; }
        }
        if (match && startIdx+ent.length <= tokens.length) return ent.length;
      }
    }
    return 0;
  }

  for (let i = 0; i < tokens.length; i++) {
    let len;
    if ((len = matchList(NE_PERSONS, i)) > 0) {
      tags[i] = 'B-PER';
      for (let k=1;k<len;k++) tags[i+k]='I-PER';
      i += len-1;
    } else if ((len = matchList(NE_ORGS, i)) > 0) {
      tags[i] = 'B-ORG';
      for (let k=1;k<len;k++) tags[i+k]='I-ORG';
      i += len-1;
    } else if ((len = matchList(NE_LOCS, i)) > 0) {
      tags[i] = 'B-LOC';
      for (let k=1;k<len;k++) tags[i+k]='I-LOC';
      i += len-1;
    } else if ((len = matchList(NE_DATES, i)) > 0) {
      tags[i] = 'B-DATE';
      for (let k=1;k<len;k++) tags[i+k]='I-DATE';
      i += len-1;
    }
  }
  return tags;
}

/* ════════════════════════════════════════════════════════════════
   VITERBI DEMO
   ════════════════════════════════════════════════════════════════ */
const V_WORDS = ['Saya','makan','nasi'];
const V_TAGS  = ['PRON','VERB','NOUN'];

// Simplified emission & transition probs
const EMIT = {
  'Saya': {'PRON':0.95,'NOUN':0.03,'VERB':0.02},
  'makan':{'VERB':0.62,'NOUN':0.30,'PRON':0.08},
  'nasi': {'NOUN':0.91,'VERB':0.05,'PRON':0.04},
};
const TRANS = {
  'START':{'PRON':0.45,'NOUN':0.35,'VERB':0.20},
  'PRON' :{'VERB':0.72,'NOUN':0.18,'PRON':0.10},
  'VERB' :{'NOUN':0.65,'VERB':0.20,'PRON':0.15},
  'NOUN' :{'NOUN':0.40,'VERB':0.35,'PRON':0.25},
};

let viterbiDone = false;

window.runViterbi = function() {
  const head = document.getElementById('viterbiHead');
  const body = document.getElementById('viterbiBody');
  head.innerHTML = '';
  body.innerHTML = '';
  viterbiDone = false;

  // Header
  const hr = document.createElement('tr');
  hr.innerHTML = '<th>Tag \\ Kata</th>' + V_WORDS.map(w=>`<th>${w}</th>`).join('');
  head.appendChild(hr);

  // Compute viterbi scores
  const scores = {}; // scores[tag][word_idx]
  const backptr = {};
  V_TAGS.forEach(t => { scores[t] = []; backptr[t] = []; });

  // t=0
  V_TAGS.forEach(tag => {
    scores[tag][0] = (TRANS['START'][tag]||0.01) * (EMIT[V_WORDS[0]][tag]||0.01);
    backptr[tag][0] = 'START';
  });
  // t=1,2
  for (let t=1; t<V_WORDS.length; t++) {
    V_TAGS.forEach(tag => {
      let best=-1, bestPrev='';
      V_TAGS.forEach(prev => {
        const s = scores[prev][t-1] * (TRANS[prev][tag]||0.01) * (EMIT[V_WORDS[t]][tag]||0.01);
        if(s>best){best=s;bestPrev=prev;}
      });
      scores[tag][t] = best;
      backptr[tag][t] = bestPrev;
    });
  }

  // Find best final tag
  let bestFinal='', bestScore=-1;
  V_TAGS.forEach(t => { if(scores[t][V_WORDS.length-1]>bestScore){bestScore=scores[t][V_WORDS.length-1];bestFinal=t;} });

  // Traceback
  const path = [];
  let cur = bestFinal;
  for(let t=V_WORDS.length-1;t>=0;t--){path.unshift(cur);cur=backptr[cur][t];}

  // Render rows with animation
  V_TAGS.forEach((tag, ri) => {
    const tr = document.createElement('tr');
    let rowHtml = `<td class="vt-tag">${tag}</td>`;
    for(let t=0;t<V_WORDS.length;t++){
      const score = scores[tag][t];
      const isBest = path[t] === tag;
      rowHtml += `<td class="${isBest?'vt-cell-best':''} vt-cell-fill"
        data-tag="${tag}" data-word="${V_WORDS[t]}" data-t="${t}"
        data-score="${score.toFixed(5)}"
        data-emit="${(EMIT[V_WORDS[t]][tag]||0.01).toFixed(3)}"
        data-trans="${t===0?(TRANS['START'][tag]||0.01).toFixed(3):(TRANS[backptr[tag][t]]?.[tag]||0.01).toFixed(3)}"
        onclick="showViterbiDetail(this)"
        style="animation-delay:${(ri*3+t)*80}ms">
        <span class="vt-score">${score.toFixed(4)}</span>
        ${isBest?'<span style="font-size:10px;color:#34c759">★</span>':''}
      </td>`;
    }
    tr.innerHTML = rowHtml;
    body.appendChild(tr);
  });

  const res = document.getElementById('viterbiResult');
  res.style.display='block';
  res.innerHTML = `<i class="fas fa-bullseye"></i> Jalur terbaik: <strong>${V_WORDS.map((w,i)=>`${w}/${path[i]}`).join(' → ')}</strong>`;
  viterbiDone = true;
};

window.showViterbiDetail = function(cell) {
  const d = document.getElementById('viterbiDetail');
  d.style.display='block';
  d.innerHTML = `
    <strong>Cell: "${cell.dataset.word}" → ${cell.dataset.tag}</strong><br>
    Emission P(${cell.dataset.word}|${cell.dataset.tag}) = <span style="color:#2997ff">${cell.dataset.emit}</span><br>
    Transition P(${cell.dataset.tag}|prev) = <span style="color:#a855f7">${cell.dataset.trans}</span><br>
    Viterbi score = emission × transition × prev_best = <span style="color:#34c759">${cell.dataset.score}</span>
  `;
};

window.resetViterbi = function() {
  document.getElementById('viterbiHead').innerHTML='';
  document.getElementById('viterbiBody').innerHTML='';
  document.getElementById('viterbiResult').style.display='none';
  document.getElementById('viterbiDetail').style.display='none';
};

/* ════════════════════════════════════════════════════════════════
   AMBIGUITY INTERACTIVE
   ════════════════════════════════════════════════════════════════ */
const AMBIG_DATA = {
  malang: [
    { tag:'b-loc', tagLabel:'B-LOC', sentence:'Dia kuliah di <strong>Malang</strong> sejak 2020.', note:'Kota di Jawa Timur' },
    { tag:'adj',   tagLabel:'ADJ',   sentence:'Nasib <strong>malang</strong> menimpa mereka.', note:'Sial / tidak beruntung' },
    { tag:'b-per', tagLabel:'B-PER', sentence:'<strong>Malang</strong> terpilih jadi ketua RT.', note:'Nama orang' },
  ],
  bima: [
    { tag:'b-loc', tagLabel:'B-LOC', sentence:'Kapal itu berlabuh di <strong>Bima</strong>, NTB.', note:'Kota di Nusa Tenggara Barat' },
    { tag:'b-per', tagLabel:'B-PER', sentence:'<strong>Bima</strong> memenangkan lomba debat nasional.', note:'Nama orang (tokoh pewayangan)' },
    { tag:'propn', tagLabel:'PROPN', sentence:'Motor <strong>Bima</strong> X itu habis di pasaran.', note:'Nama produk (motor Honda)' },
  ],
  kia: [
    { tag:'b-org', tagLabel:'B-ORG', sentence:'Dealer <strong>Kia</strong> ada di jalan utama.', note:'Merek mobil Korea' },
    { tag:'b-per', tagLabel:'B-PER', sentence:'<strong>Kia</strong> pergi ke sekolah pagi-pagi.', note:'Nama orang perempuan' },
    { tag:'b-loc', tagLabel:'B-LOC', sentence:'Mereka transit di <strong>Kia</strong> sebelum ke Seoul.', note:'Nama daerah di Korea' },
  ],
  lima: [
    { tag:'num',   tagLabel:'NUM',   sentence:'Dia punya <strong>lima</strong> ekor kucing.', note:'Angka 5' },
    { tag:'b-loc', tagLabel:'B-LOC', sentence:'Ibukota Peru adalah <strong>Lima</strong>.', note:'Kota di Peru' },
    { tag:'b-per', tagLabel:'B-PER', sentence:'<strong>Lima</strong> baru saja menikah bulan lalu.', note:'Nama orang' },
  ],
  pare: [
    { tag:'noun',  tagLabel:'NOUN',  sentence:'Sayur <strong>pare</strong> itu pahit sekali.', note:'Jenis sayuran' },
    { tag:'b-loc', tagLabel:'B-LOC', sentence:'Kursus bahasa Inggris di <strong>Pare</strong> terkenal.', note:'Kampung Inggris di Kediri' },
    { tag:'b-per', tagLabel:'B-PER', sentence:'<strong>Pare</strong> juara olimpiade matematika.', note:'Nama orang' },
  ],
};

function showAmbig(word) {
  document.querySelectorAll('.ai-word').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === word));
  const data = AMBIG_DATA[word] || [];
  const container = document.getElementById('ambigCases');
  container.innerHTML = data.map(d => `
    <div class="aic-item">
      <div class="aic-tag"><span class="iob-label ${d.tag}">${d.tagLabel}</span></div>
      <div class="aic-sent">${d.sentence}</div>
      <div class="aic-note">${d.note}</div>
    </div>
  `).join('');
}
window.showAmbig = showAmbig;

/* ════════════════════════════════════════════════════════════════
   CONFUSION MATRIX
   ════════════════════════════════════════════════════════════════ */
const CM_DATA = {
  labels: ['O','PER','ORG','LOC'],
  // rows = actual, cols = predicted
  matrix: [
    [9420,  12,  18,   8],  // actual O
    [  15, 412,  18,   5],  // actual PER
    [  22,  14, 287,  19],  // actual ORG
    [   8,   3,  11, 389],  // actual LOC
  ],
  examples: {
    '1-2': ['Aktual PER → Prediksi ORG: "Susi Pudjiastuti" dikira nama perusahaan karena tanpa konteks jabatan'],
    '1-3': ['Aktual PER → Prediksi LOC: "Solo pergi ke Solo" — Solo pertama dikira kota'],
    '2-1': ['Aktual ORG → Prediksi O: "KPK" tidak ada di training data, model skip'],
    '2-3': ['Aktual ORG → Prediksi LOC: "Bank Mandiri Jakarta" — Jakarta di-attach ke ORG'],
    '3-1': ['Aktual LOC → Prediksi O: "Malang" tanpa konteks, model ragu'],
    '3-2': ['Aktual LOC → Prediksi PER: "Bima memenangkan" — Bima dikira nama orang padahal kota'],
  }
};

function buildCM() {
  const container = document.getElementById('confusionMatrix');
  if (!container) return;
  const totals = CM_DATA.matrix.map(row => row.reduce((a,b)=>a+b,0));
  const maxOff = Math.max(...CM_DATA.matrix.flatMap((row,r)=>row.filter((_,c)=>c!==r)));

  CM_DATA.matrix.forEach((row, ri) => {
    const div = document.createElement('div');
    div.className = 'cm-row';
    div.innerHTML = `<div class="cm-row-label">Actual: ${CM_DATA.labels[ri]}</div>`;
    row.forEach((val, ci) => {
      const isDiag = ri === ci;
      const pct = ((val / totals[ri]) * 100).toFixed(1);
      const intensity = isDiag ? (val / totals[ri]) : (val / maxOff);
      const bg = isDiag
        ? `rgba(52,199,89,${0.06 + intensity*0.35})`
        : `rgba(239,68,68,${0.03 + intensity*0.3})`;
      const cell = document.createElement('div');
      cell.className = `cm-cell${isDiag?' diagonal':''}`;
      cell.style.background = bg;
      cell.innerHTML = `<span class="cm-val">${val}</span><span class="cm-pct">${pct}%</span>`;
      cell.addEventListener('click', () => {
        const key = `${ri}-${ci}`;
        const ex = CM_DATA.examples[key];
        const panel = document.getElementById('cmExample');
        if (ex) {
          panel.style.display='block';
          panel.innerHTML = `<div class="cm-ex-title">Actual: ${CM_DATA.labels[ri]} → Predicted: ${CM_DATA.labels[ci]}</div>`
            + ex.map(e=>`<div class="cm-ex-item">• ${e}</div>`).join('');
        } else {
          panel.style.display='block';
          panel.innerHTML = `<div class="cm-ex-title">Actual: ${CM_DATA.labels[ri]} → Predicted: ${CM_DATA.labels[ci]}</div>
            <div class="cm-ex-item">${isDiag ? '✅ Prediksi benar — '+val+' kasus tepat' : '— tidak ada contoh tersimpan untuk kombinasi ini'}</div>`;
        }
      });
      div.appendChild(cell);
  });
  container.appendChild(div);
  });
}

/* ════════════════════════════════════════════════════════════════
   POS TAGGER
   ════════════════════════════════════════════════════════════════ */
window.runPOS = function() {
  const text   = document.getElementById('posInput').value;
  const tokens = text.split(/\s+/).filter(Boolean);
  const output = document.getElementById('posOutput');
  output.innerHTML = tokens.map(tok => {
    const tag = getPOSTag(tok).toLowerCase();
    return `<div class="pos-token">
      <span class="pos-word">${tok}</span>
      <span class="pos-badge ${tag}">${tag.toUpperCase()}</span>
    </div>`;
  }).join('');
  document.getElementById('posResult').style.display='block';
};
window.resetPOS = function() {
  document.getElementById('posInput').value='Presiden Joko Widodo meresmikan jalan tol baru di Jawa Tengah kemarin.';
  document.getElementById('posResult').style.display='none';
};

/* ════════════════════════════════════════════════════════════════
   NER HIGHLIGHTER
   ════════════════════════════════════════════════════════════════ */
window.runNER = function() {
  const text   = document.getElementById('nerInput').value;
  const tokens = text.split(/(\s+|[,.!?;:])/);
  const words  = tokens.filter(t => t.trim() && !/^[\s,.!?;:]+$/.test(t));
  const spaces = [];
  const nerTags = runNEROnTokens(words);

  // Reconstruct with highlights
  let html = '', wi = 0;
  const counts = {PER:0, ORG:0, LOC:0, DATE:0};

  for (let i=0; i<words.length; i++) {
    const tag = nerTags[i];
    if (tag === 'O') {
      html += `<span>${words[i]}</span> `;
    } else {
      const type = tag.replace(/^[BI]-/,'').toLowerCase();
      if (tag.startsWith('B-')) {
        // Collect multi-token entity
        let fullText = words[i];
        let j = i+1;
        while (j < words.length && nerTags[j] === 'I-'+tag.slice(2)) {
          fullText += ' ' + words[j]; j++;
        }
        counts[tag.slice(2)] = (counts[tag.slice(2)]||0) + 1;
        html += `<span class="ner-span ${type}">
          <span class="ner-span-text">${fullText}</span>
          <span class="ner-span-label">${tag.slice(2)}</span>
        </span> `;
        i = j-1;
      }
    }
  }

  document.getElementById('nerOutput').innerHTML = html;
  document.getElementById('nerStats').innerHTML = Object.entries(counts)
    .filter(([,v])=>v>0)
    .map(([k,v])=>`<span class="ibr-stat">${k}: <span>${v}</span></span>`)
    .join('');
  document.getElementById('nerResult').style.display='block';
};
window.resetNER = function() {
  document.getElementById('nerInput').value='Budi Santoso dari Surabaya bekerja di PT Telkom Indonesia sejak Januari 2020. Ia bertemu Ibu Sari di kantor Bank BCA Jakarta Selatan kemarin.';
  document.getElementById('nerResult').style.display='none';
};

/* ════════════════════════════════════════════════════════════════
   QUIZ
   ════════════════════════════════════════════════════════════════ */
const QUIZ_QUESTIONS = [
  {
    text: 'Kata "<span class="quiz-blank">berlari</span>" dalam kalimat "Anak itu berlari kencang" adalah?',
    sentence: 'Anak itu <span class="quiz-blank">berlari</span> kencang',
    options: ['NOUN','VERB','ADJ','ADV'],
    answer: 'VERB',
    explain: 'Berlari = ber- + lari. Prefix ber- adalah penanda VERB yang kuat di Bahasa Indonesia.'
  },
  {
    text: 'Tag IOB untuk kata "Mandiri" dalam "Bank Mandiri" adalah?',
    sentence: 'Saya nabung di Bank <span class="quiz-blank">Mandiri</span> hari ini.',
    options: ['B-ORG','I-ORG','B-LOC','O'],
    answer: 'I-ORG',
    explain: 'Bank = B-ORG (awal entitas), Mandiri = I-ORG (lanjutan entitas). Keduanya satu ORG.'
  },
  {
    text: '"Malang" dalam kalimat berikut paling tepat dilabeli sebagai?',
    sentence: 'Nasib <span class="quiz-blank">malang</span> selalu menghampirinya.',
    options: ['B-LOC','PROPN','ADJ','NOUN'],
    answer: 'ADJ',
    explain: 'Konteks "nasib ... menghampiri" → malang = adjektiva (sial/tidak beruntung), bukan kota.'
  },
  {
    text: 'Kata "sangat" dalam "Makanan itu sangat enak" adalah?',
    sentence: 'Makanan itu <span class="quiz-blank">sangat</span> enak.',
    options: ['ADJ','VERB','ADV','DET'],
    answer: 'ADV',
    explain: 'Sangat memodifikasi adjektiva "enak" → adverbia intensifier.'
  },
  {
    text: '"Solo" dalam kalimat ini paling tepat dilabeli?',
    sentence: 'Mas <span class="quiz-blank">Solo</span> akhirnya dapat pacar juga setelah 5 tahun.',
    options: ['B-LOC','B-PER','ADJ','PROPN'],
    answer: 'B-PER',
    explain: 'Konteks: "Mas [nama]" + predikat "dapat pacar" → Solo = nama orang. Bukan kota! <i class="fas fa-face-smile"></i>'
  },
  {
    text: 'Precision model NER = 0.85, Recall = 0.75. Berapa F1-score-nya?',
    sentence: 'P = 0.85, R = 0.75 → F1 = <span class="quiz-blank">?</span>',
    options: ['0.80','0.794','0.810','0.775'],
    answer: '0.794',
    explain: 'F1 = 2×(P×R)/(P+R) = 2×(0.85×0.75)/(0.85+0.75) = 1.275/1.6 = 0.797 ≈ 0.794'
  },
];

let PN_quizAnswered = [];
let quizScoreVal = 0;

function buildQuiz() {
  const container = document.getElementById('quizContainer');
  PN_quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(false);
  quizScoreVal = 0;
  document.getElementById('quizScore').textContent = '0';
  document.getElementById('quizTotal').textContent = QUIZ_QUESTIONS.length;

  container.innerHTML = QUIZ_QUESTIONS.map((q, qi) => `
    <div class="quiz-q" id="qq-${qi}">
      <div class="quiz-q-num">Soal ${qi+1} / ${QUIZ_QUESTIONS.length}</div>
      <div class="quiz-q-text">${q.text}</div>
      <div class="quiz-q-sentence">${q.sentence}</div>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <button class="quiz-opt" onclick="answerQuiz(${qi},'${opt}',this)">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="qf-${qi}" style="display:none"></div>
    </div>
  `).join('') + `<div id="quiz-finish" style="display:none"></div>`;
}

window.answerQuiz = function(qi, opt, btn) {
  if (PN_quizAnswered[qi]) return;
  PN_quizAnswered[qi] = true;
  var q = QUIZ_QUESTIONS[qi];
  var isCorrect = opt === q.answer;
  if (isCorrect) quizScoreVal++;
  var scoreEl = document.getElementById('quizScore');
  if (scoreEl) scoreEl.textContent = quizScoreVal;

  // Style buttons
  var btns = document.querySelectorAll('#qq-' + qi + ' .quiz-opt');
  for (var i = 0; i < btns.length; i++) {
    var b = btns[i];
    b.classList.add('answered');
    if (b.textContent === q.answer) {
      b.classList.add(isCorrect && b === btn ? 'correct' : 'reveal');
    }
  }
  if (!isCorrect && btn) btn.classList.add('wrong');

  // Feedback
  var fb = document.getElementById('qf-' + qi);
  if (fb) {
    fb.style.display = 'block';
    fb.className = 'quiz-feedback ' + (isCorrect ? 'ok' : 'bad');
    fb.innerHTML = isCorrect ? '<i class="fas fa-circle-check"></i> Benar! ' + q.explain : '<i class="fas fa-circle-xmark"></i> Salah. Jawaban: ' + q.answer + '. ' + q.explain;
  }

  // Check if all done
  if (PN_quizAnswered.every(Boolean)) {
    setTimeout(() => {
      const fin = document.getElementById('quiz-finish');
      fin.style.display='block';
      const pct = Math.round((quizScoreVal/QUIZ_QUESTIONS.length)*100);
      const msg = pct>=80 ? '<i class="fas fa-fire"></i> Luar biasa!' : pct>=60 ? '<i class="fas fa-thumbs-up"></i> Bagus!' : '<i class="fas fa-book-open"></i> Perlu belajar lagi!';
      fin.innerHTML = `<div class="quiz-score-banner">
        <div class="qsb-score">${quizScoreVal}/${QUIZ_QUESTIONS.length}</div>
        <div class="qsb-label">${msg} Skor kamu: ${pct}%</div>
        <div class="qsb-retry"><button class="ib-btn primary" onclick="buildQuiz()">↺ Coba Lagi</button></div>
      </div>`;
      fin.scrollIntoView({behavior:'smooth',block:'center'});
    }, 400);
  }
};

/* ════ Init function ════ */
window.initAiLabPosNer = function() {
  const content = document.getElementById('posner-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';

  buildCM();
  // POS demo
  const posInput = document.getElementById('posInput');
  if (posInput && !posInput.dataset.ready) {
    posInput.dataset.ready = 'true';
    posInput.addEventListener('input', () => {
      const text = posInput.value;
      const tokens = text.split(/\s+/).filter(Boolean);
      const output = document.getElementById('posOutput');
      if (!output) return;
      if (!tokens.length) { output.innerHTML = '<span style="color:var(--ai-text3);font-size:.8rem">Ketik kalimat di atas...</span>'; return; }
      const res = document.getElementById('posResult');
      if (res) res.style.display = 'block';
      output.innerHTML = tokens.map(t => {
        const tag = getPOSTag(t);
        return '<div class="pos-demo-token"><span class="pos-badge ' + tag.toLowerCase() + '">' + tag + '</span>' + t + '</div>';
      }).join('');
    });
    posInput.dispatchEvent(new Event('input'));
  }

  // NER demo
  const nerInput = document.getElementById('nerInput');
  if (nerInput && !nerInput.dataset.ready) {
    nerInput.dataset.ready = 'true';
    nerInput.addEventListener('input', () => {
      const text = nerInput.value;
      const tokens = text.split(/\s+/).filter(Boolean);
      const output = document.getElementById('nerOutput');
      if (!output) return;
      if (!tokens.length) { output.innerHTML = '<span style="color:var(--ai-text3);font-size:.8rem">Ketik kalimat di atas...</span>'; return; }
      const res = document.getElementById('nerResult');
      if (res) res.style.display = 'block';
      const tags = runNEROnTokens(tokens);
      output.innerHTML = tokens.map((t, i) => {
        const tag = tags[i];
        return '<div class="ner-token">' + t + '<span class="ner-tag ' + (tag !== 'O' ? tag : '') + '">' + tag + '</span></div>';
      }).join('');
      const stats = document.getElementById('nerStats');
      if (stats) {
        const entCount = tags.filter(t => t !== 'O').length;
        stats.innerHTML = '<span class="ibr-stat">Token: <span>' + tokens.length + '</span></span><span class="ibr-stat">Entitas: <span>' + entCount + '</span></span>';
      }
    });
    nerInput.dispatchEvent(new Event('input'));
  }

  // Viterbi demo
  if (document.getElementById('viterbiHead') && !document.getElementById('viterbiHead').dataset.ready) {
    document.getElementById('viterbiHead').dataset.ready = 'true';
    runViterbi();
  }

  // Quiz
  const quizContainer = document.getElementById('quizContainer');
  if (quizContainer && !quizContainer.dataset.ready) {
    quizContainer.dataset.ready = 'true';
    buildQuiz();
  }
};

````
