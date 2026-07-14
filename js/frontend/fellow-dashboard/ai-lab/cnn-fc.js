'use strict';

/* ═══ HerAI CNN FC Layer & Softmax — AI Lab port ═══ */

function initCnnFcSoftmax() {
  var sl0 = document.getElementById('slZ0');
  var sliders = [
    { sl: sl0, val: document.getElementById('valZ0'), prob: document.getElementById('probZ0') },
    { sl: document.getElementById('slZ1'), val: document.getElementById('valZ1'), prob: document.getElementById('probZ1') },
    { sl: document.getElementById('slZ2'), val: document.getElementById('valZ2'), prob: document.getElementById('probZ2') },
  ];
  var barsEl = document.getElementById('softmaxBars');
  var sumEl  = document.getElementById('softmaxSum');
  if (!sl0) return;

  var LABELS = ['Kucing', 'Anjing', 'Burung'];
  var COLORS = ['#2997ff', '#a855f7', '#ff9f0a'];

  if (barsEl) {
    barsEl.innerHTML = '';
    LABELS.forEach(function(lbl, i) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:8px;';
      row.innerHTML =
        '<span style="font-size:12px;font-family:var(--font-mono);color:var(--text-2);width:52px;">' + lbl + '</span>' +
        '<div style="flex:1;height:10px;background:var(--bg-card);border-radius:5px;overflow:hidden;">' +
        '  <div id="smBar' + i + '" style="height:100%;width:0%;background:' + COLORS[i] + ';border-radius:5px;transition:width .25s;"></div>' +
        '</div>' +
        '<span id="smPctLbl' + i + '" style="font-size:13px;font-family:var(--font-mono);font-weight:700;color:' + COLORS[i] + ';width:48px;text-align:right;">\u2014</span>';
      barsEl.appendChild(row);
    });
  }

  function softmax(logits) {
    var exps = logits.map(function(z) { return Math.exp(z); });
    var sum  = exps.reduce(function(a, b) { return a + b; }, 0);
    return exps.map(function(e) { return e / sum; });
  }

  function update() {
    var logits = sliders.map(function(s) { return parseFloat(s.sl.value); });
    var probs  = softmax(logits);
    var sum    = probs.reduce(function(a, b) { return a + b; }, 0);

    sliders.forEach(function(s, i) {
      s.val.textContent  = logits[i].toFixed(1);
      s.prob.textContent = (probs[i] * 100).toFixed(1) + '%';
      var bar = document.getElementById('smBar' + i);
      var lbl = document.getElementById('smPctLbl' + i);
      if (bar) bar.style.width = (probs[i] * 100).toFixed(1) + '%';
      if (lbl) lbl.textContent = (probs[i] * 100).toFixed(1) + '%';
    });

    if (sumEl) sumEl.textContent = '\u2211 probabilitas = ' + sum.toFixed(4) + ' (selalu = 1)';
  }

  sliders.forEach(function(s) { s.sl.addEventListener('input', update); });
  update();
}

function initCnnFcCrossEntropy() {
  var slProb  = document.getElementById('slProb');
  var valProb = document.getElementById('valProb');
  var ceMath  = document.getElementById('ceMath');
  var ceResult= document.getElementById('ceResult');
  var ceNote  = document.getElementById('ceNote');
  if (!slProb) return;

  function update() {
    var p    = parseFloat(slProb.value);
    var loss = -Math.log(p);

    if (valProb)  valProb.textContent  = p.toFixed(2);
    if (ceMath)   ceMath.textContent   = '\u2212log(' + p.toFixed(2) + ')';
    if (ceResult) {
      ceResult.textContent = '= ' + loss.toFixed(4);
      ceResult.style.color = p > 0.7 ? '#34c759' : p > 0.4 ? '#ff9f0a' : '#ef4444';
    }
    if (ceNote) {
      if      (p > 0.9)  ceNote.textContent = 'Prediksi sangat bagus. Loss mendekati 0.';
      else if (p > 0.7)  ceNote.textContent = 'Prediksi cukup baik.';
      else if (p > 0.4)  ceNote.textContent = 'Prediksi ragu-ragu. Model perlu latihan lebih.';
      else               ceNote.textContent = 'Prediksi sangat salah. Loss tinggi - gradient besar, belajar cepat.';
    }
  }

  slProb.addEventListener('input', update);
  update();
}

/* ── Init ──────────────────────────────── */
window.initAiLabCnnFc = function() {
  var content = document.getElementById('cnn-fc-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  if (typeof initCnnFcSoftmax === 'function') initCnnFcSoftmax();
  if (typeof initCnnFcCrossEntropy === 'function') initCnnFcCrossEntropy();
};
