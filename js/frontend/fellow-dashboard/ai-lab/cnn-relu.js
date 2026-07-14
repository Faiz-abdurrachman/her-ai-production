'use strict';

/* ═══ HerAI CNN ReLU — AI Lab port ═══ */

function initCnnReluViz() {
  var slX      = document.getElementById('slX');
  var valX     = document.getElementById('valX');
  var rioInput = document.getElementById('rioInput');
  var rioOutput= document.getElementById('rioOutput');
  var graph    = document.getElementById('reluGraph');
  if (!slX) return;

  function relu(x)     { return Math.max(0, x); }
  function fmtNum(n)   { return n.toFixed(1); }

  function drawGraph(currentX) {
    if (!graph) return;
    var W = graph.clientWidth || 280;
    var H = 140;
    var PAD = 24;
    var xMin = -5, xMax = 5;

    function toSvgX(x) { return PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2); }
    function toSvgY(y) { return H - PAD - (y / xMax) * (H - PAD * 2); }

    var path = '';
    for (var x = xMin; x <= xMax; x += 0.1) {
      var sx = toSvgX(x), sy = toSvgY(relu(x));
      path += (x === xMin ? 'M' : 'L') + sx.toFixed(1) + ',' + sy.toFixed(1) + ' ';
    }

    var dotX = toSvgX(currentX);
    var dotY = toSvgY(relu(currentX));
    var isZero = currentX <= 0;

    graph.innerHTML =
      '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
        '<line x1="' + PAD + '" y1="' + toSvgY(0) + '" x2="' + (W - PAD) + '" y2="' + toSvgY(0) + '" stroke="rgba(255,255,255,.15)" stroke-width="1"/>' +
        '<line x1="' + toSvgX(0) + '" y1="' + PAD + '" x2="' + toSvgX(0) + '" y2="' + (H - PAD) + '" stroke="rgba(255,255,255,.15)" stroke-width="1"/>' +
        '<path d="' + path + '" fill="none" stroke="#2997ff" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<line x1="' + dotX + '" y1="' + PAD + '" x2="' + dotX + '" y2="' + (H - PAD) + '" stroke="rgba(255,255,255,.1)" stroke-dasharray="4,3" stroke-width="1"/>' +
        '<circle cx="' + dotX + '" cy="' + dotY + '" r="5" fill="' + (isZero ? '#ff3b30' : '#34c759') + '" stroke="#fff" stroke-width="1.5"/>' +
        '<text x="' + PAD + '" y="' + (H - 6) + '" font-size="10" fill="rgba(255,255,255,.35)" font-family="monospace">' + xMin + '</text>' +
        '<text x="' + (W - PAD - 4) + '" y="' + (H - 6) + '" font-size="10" fill="rgba(255,255,255,.35)" font-family="monospace">' + xMax + '</text>' +
        '<text x="' + (toSvgX(0) + 4) + '" y="' + (PAD + 12) + '" font-size="10" fill="rgba(255,255,255,.35)" font-family="monospace">y</text>' +
      '</svg>';
  }

  function update() {
    var x   = parseFloat(slX.value);
    var out = relu(x);
    if (valX)      valX.textContent     = fmtNum(x);
    if (rioInput)  rioInput.textContent  = (x >= 0 ? '+' : '') + fmtNum(x);
    if (rioOutput) {
      rioOutput.textContent = fmtNum(out);
      rioOutput.style.color = out === 0 ? '#ff3b30' : '#34c759';
    }
    drawGraph(x);
  }

  slX.addEventListener('input', update);
  window.addEventListener('resize', function() { drawGraph(parseFloat(slX.value)); });
  update();
}

function initCnnReluVariantCompare() {
  var slXComp  = document.getElementById('slXComp');
  var valXComp = document.getElementById('valXComp');
  var container= document.getElementById('variantCompare');
  if (!slXComp || !container) return;

  var VARIANTS = [
    { name: 'ReLU', color: '#2997ff', fn: function(x) { return Math.max(0, x); } },
    { name: 'Leaky ReLU (a=0.01)', color: '#a855f7', fn: function(x) { return x >= 0 ? x : 0.01 * x; } },
    { name: 'Parametric ReLU (a=0.1)', color: '#ff9f0a', fn: function(x) { return x >= 0 ? x : 0.1 * x; } },
    { name: 'GELU', color: '#34c759', fn: function(x) { return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x * x * x))); } },
  ];

  function update() {
    var x = parseFloat(slXComp.value);
    if (valXComp) valXComp.textContent = x.toFixed(1);

    container.innerHTML = '';
    VARIANTS.forEach(function(v) {
      var out = v.fn(x);
      var row = document.createElement('div');
      row.style.cssText =
        'display:flex;align-items:center;gap:12px;padding:10px 12px;' +
        'background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm);margin-bottom:8px;';

      var dot = document.createElement('span');
      dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:' + v.color + ';flex-shrink:0;';

      var label = document.createElement('span');
      label.style.cssText = 'font-family:var(--font-mono);font-size:12px;color:var(--text-2);flex:1;';
      label.textContent = v.name;

      var barWrap = document.createElement('div');
      barWrap.style.cssText = 'flex:2;height:8px;background:var(--bg-card);border-radius:4px;overflow:hidden;';
      var bar = document.createElement('div');
      var pct = Math.max(0, Math.min(100, ((out + 4) / 8) * 100));
      bar.style.cssText = 'height:100%;width:' + pct.toFixed(1) + '%;background:' + v.color + ';border-radius:4px;transition:width .2s;';
      barWrap.appendChild(bar);

      var val = document.createElement('span');
      val.style.cssText = 'font-family:var(--font-mono);font-size:13px;font-weight:700;color:' + v.color + ';width:52px;text-align:right;';
      val.textContent = out.toFixed(3);

      row.append(dot, label, barWrap, val);
      container.appendChild(row);
    });
  }

  slXComp.addEventListener('input', update);
  update();
}

/* ── Init ──────────────────────────────── */
window.initAiLabCnnRelu = function() {
  var content = document.getElementById('cnn-relu-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  if (typeof initCnnReluViz === 'function') initCnnReluViz();
  if (typeof initCnnReluVariantCompare === 'function') initCnnReluVariantCompare();
};
