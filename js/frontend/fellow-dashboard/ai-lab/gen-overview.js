'use strict';

/* ═══ HerAI Generative AI Overview ═══ */

/* ── Animated noise canvas in hero ─────────────────── */
function initGenAiCanvas() {
  var canvas = document.getElementById('genCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var frame = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawNoise() {
    var w = canvas.width, h = canvas.height;
    var imageData = ctx.createImageData(w, h);
    var data = imageData.data;
    var t = frame * 0.008;

    for (var i = 0; i < data.length; i += 4) {
      var x = (i / 4) % w;
      var y = Math.floor((i / 4) / w);
      var fade = x / w;
      var noise = Math.random();
      var signal = (Math.sin(x * 0.04 + t) * Math.cos(y * 0.04 + t) + 1) / 2;
      var val = Math.round((noise * (1 - fade) + signal * fade) * 180);
      data[i] = val * 0.6;
      data[i+1] = val * 0.2;
      data[i+2] = val * 1.0;
      data[i+3] = 60;
    }
    ctx.putImageData(imageData, 0, 0);
    frame++;

    if (frame < 80) requestAnimationFrame(drawNoise);
    else {
      setTimeout(function() { frame = 0; requestAnimationFrame(drawNoise); }, 3000);
    }
  }
  requestAnimationFrame(drawNoise);
}

/* ── Init ──────────────────────────────── */
window.initGenAiOverview = function() {
  var content = document.getElementById('genai-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  if (typeof initGenAiCanvas === 'function') initGenAiCanvas();
};
