'use strict';

/* ═══ HerAI CNN Why — AI Lab port ═══ */

function initCnnWhyParamExplorer() {
  var RES_MAP = [32, 64, 128, 224];

  var slRes = document.getElementById('slRes');
  var slH1  = document.getElementById('slH1');
  var slH2  = document.getElementById('slH2');
  if (!slRes) return;

  function fmt(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + ' miliar';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + ' juta';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + ' ribu';
    return n.toLocaleString();
  }
  function fmtExact(n) { return n.toLocaleString('id-ID'); }

  function html(parts) { return parts.join(''); }
  function span(cls, text) { return '<span class="math-term ' + cls + '">' + text + '</span>'; }
  function op(t)           { return '<span class="math-op">' + t + '</span>'; }
  function res(cls, text)  { return '<span class="math-result ' + cls + '">' + text + '</span>'; }
  function cmt(text)       { return '<span class="math-comment">' + text + '</span>'; }

  function update() {
    var resolution = RES_MAP[+slRes.value];
    var h1         = +slH1.value;
    var h2         = +slH2.value;

    document.getElementById('valRes').textContent  = resolution;
    document.getElementById('valRes2').textContent = resolution;
    document.getElementById('valH1').textContent   = h1;
    document.getElementById('valH2').textContent   = h2;

    var nIn   = resolution * resolution * 3;
    var p1    = nIn * h1 + h1;
    var p2    = h1  * h2 + h2;
    var p3    = h2  * 10 + 10;
    var total = p1 + p2 + p3;
    var cnnP  = 3 * 3 * 3 * 32 + 32;

    document.getElementById('peStep1').innerHTML = html([
      cmt('// Tinggi x Lebar x Channels'), '<br>',
      span('blue', resolution), op('x'), span('blue', resolution), op('x'), span('blue', '3'),
      op('='), res('', fmtExact(nIn) + ' neuron input'),
    ]);

    document.getElementById('peLabel2').textContent = 'Hidden Layer 1: ' + h1.toLocaleString() + ' neuron';
    var largeP1 = p1 > 50000000;
    document.getElementById('peStep2').innerHTML = html([
      span('blue', fmtExact(nIn)), op('x'), span('purple', fmtExact(h1)),
      op('+'), span('purple', fmtExact(h1)), cmt(' (bias)'),
      op('='), res(largeP1 ? 'red' : '', fmtExact(p1) + ' params'),
    ]);

    document.getElementById('peLabel3').textContent = 'Hidden Layer 2: ' + h2.toLocaleString() + ' neuron';
    document.getElementById('peStep3').innerHTML = html([
      span('purple', fmtExact(h1)), op('x'), span('purple', fmtExact(h2)),
      op('+'), span('purple', fmtExact(h2)), cmt(' (bias)'),
      op('='), res('red', fmtExact(p2) + ' params'),
    ]);

    document.getElementById('peStep4').innerHTML = html([
      span('purple', fmtExact(h2)), op('x'), span('green', '10'),
      op('+'), span('green', '10'), cmt(' (bias)'),
      op('='), res('green', fmtExact(p3) + ' params'),
    ]);

    var danger = total > 10000000;
    document.getElementById('peTotalMath').innerHTML =
      fmtExact(p1) + ' + ' + fmtExact(p2) + ' + ' + fmtExact(p3);
    document.getElementById('peTotalResult').textContent = fmtExact(total) + ' parameter';
    document.getElementById('peTotalResult').style.color = danger ? '#ef4444' : '#34c759';
    document.getElementById('peTotalNote').textContent   =
      'untuk gambar ' + resolution + 'x' + resolution + ' \u2014 ' + fmt(total);
    document.getElementById('peTotal').className =
      'calc-total' + (danger ? ' danger' : '');

    var ratio    = p1 / cnnP;
    var cnnWidth = Math.max(0.5, (cnnP / p1) * 100);
    document.getElementById('barMLP').style.width = '100%';
    document.getElementById('barCNN').style.width = cnnWidth + '%';
    document.getElementById('numMLP').textContent = fmt(p1);
    document.getElementById('numCNN').textContent = fmt(cnnP);
    document.getElementById('peRatio').innerHTML  =
      'MLP layer 1 punya <strong style="color:#ef4444">' + Math.round(ratio).toLocaleString() + 'x</strong> lebih banyak parameter dari Conv 3x3 dengan 32 filter';

    var warn = document.getElementById('peWarning');
    if (total > 50000000) {
      warn.style.display = 'flex';
      document.getElementById('peWarningText').textContent =
        fmt(total) + ' parameter \u2014 GPU biasa hanya punya 8\u201316 GB VRAM. Satu batch saja bisa habis memory!';
    } else if (total > 10000000) {
      warn.style.display = 'flex';
      document.getElementById('peWarningText').textContent =
        fmt(total) + ' parameter \u2014 sangat mudah overfit tanpa dataset yang sangat besar.';
    } else {
      warn.style.display = 'none';
    }
  }

  slRes.addEventListener('input', update);
  slH1.addEventListener('input',  update);
  slH2.addEventListener('input',  update);
  update();
}

function initCnnWhyPixelGrid() {
  var PIXELS = [
    [40,  40,  40,  40],
    [40,  200, 40,  200],
    [40,  40,  40,  40],
    [40,  180, 180, 40],
  ];
  var COLORS = [
    '#1a1a2e','#1a1a2e','#1a1a2e','#1a1a2e',
    '#1a1a2e','#2997ff','#1a1a2e','#2997ff',
    '#1a1a2e','#1a1a2e','#1a1a2e','#1a1a2e',
    '#1a1a2e','#a855f7','#a855f7','#1a1a2e',
  ];
  var LABELS = [
    'bg','bg','bg','bg',
    'bg','eye_L','bg','eye_R',
    'bg','bg','bg','bg',
    'bg','mouth','mouth','bg',
  ];

  var grid = document.getElementById('pixelGrid');
  var flat = document.getElementById('flatVector');
  if (!grid || !flat) return;

  var values = [].concat.apply([], PIXELS);

  values.forEach(function(v, i) {
    var cell = document.createElement('div');
    cell.className = 'px-cell';
    cell.textContent = v;
    cell.style.background = COLORS[i];
    cell.style.color = v > 100 ? '#fff' : 'rgba(255,255,255,.4)';
    cell.title = '(' + Math.floor(i / 4) + ', ' + (i % 4) + ') = ' + v + '  [' + LABELS[i] + ']';
    grid.appendChild(cell);
  });

  values.forEach(function(v, i) {
    var cell = document.createElement('div');
    cell.className = 'fv-cell';
    cell.style.background = COLORS[i];
    cell.style.color = v > 100 ? '#fff' : 'rgba(255,255,255,.4)';
    cell.innerHTML =
      '<span style="min-width:28px;font-size:10px;opacity:.5">[' + i + ']</span>' +
      ' ' + v + ' ' +
      '<span style="margin-left:auto;font-size:10px;opacity:.4">' + LABELS[i] + '</span>';
    flat.appendChild(cell);
  });
}

function initCnnWhyTranslationDemo() {
  var leftGrid  = document.getElementById('catLeft');
  var rightGrid = document.getElementById('catRight');
  var leftBars  = document.getElementById('neuronsLeft');
  var rightBars = document.getElementById('neuronsRight');
  if (!leftGrid) return;

  var CAT_L = [
    [0,1,0,1,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ];
  var CAT_R = [
    [0,0,1,0,1],
    [0,0,1,1,1],
    [0,0,0,1,0],
    [0,0,1,1,1],
    [0,0,0,0,0],
  ];

  function buildGrid(container, data) {
    [].concat.apply([], data).forEach(function(v) {
      var d = document.createElement('div');
      d.className = 'td-cell';
      d.style.background  = v ? 'rgba(41,151,255,.25)' : 'rgba(255,255,255,.04)';
      d.style.borderColor = v ? 'rgba(41,151,255,.4)'  : 'var(--border)';
      container.appendChild(d);
    });
  }

  function buildNeurons(container, data, colorFn) {
    [].concat.apply([], data).forEach(function(v, i) {
      var bar = document.createElement('div');
      bar.className       = 'tn-bar';
      bar.style.width     = v ? (30 + Math.random() * 50) + 'px' : '4px';
      bar.style.background = colorFn(i, v);
      bar.style.opacity   = v ? '1' : '0.15';
      container.appendChild(bar);
    });
  }

  buildGrid(leftGrid,  CAT_L);
  buildGrid(rightGrid, CAT_R);
  buildNeurons(leftBars,  CAT_L, function(i, v) { return v ? '#2997ff' : 'var(--border-s)'; });
  buildNeurons(rightBars, CAT_R, function(i, v) { return v ? '#a855f7' : 'var(--border-s)'; });
}

/* ── Init ──────────────────────────────── */
window.initAiLabCnnWhy = function() {
  var content = document.getElementById('cnn-why-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  if (typeof initCnnWhyParamExplorer === 'function') initCnnWhyParamExplorer();
  if (typeof initCnnWhyPixelGrid === 'function') initCnnWhyPixelGrid();
  if (typeof initCnnWhyTranslationDemo === 'function') initCnnWhyTranslationDemo();
};
