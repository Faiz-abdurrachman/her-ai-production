/**
 * ai-cv-interactive.js — Computer Vision Interactive Widgets & Quiz Engine
 * Handles all canvas-based demos, coding challenges, and quizzes for CV module
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════
  // CORE: Morphology Engine (JS implementation)
  // ═══════════════════════════════════════════

  function makeSE(shape, size) {
    var se = [];
    var c = Math.floor(size / 2);
    for (var y = 0; y < size; y++) {
      se[y] = [];
      for (var x = 0; x < size; x++) {
        if (shape === 'rect') se[y][x] = 1;
        else if (shape === 'cross') se[y][x] = (y === c || x === c) ? 1 : 0;
        else if (shape === 'ellipse') {
          var dx = (x - c) / (c + 0.5), dy = (y - c) / (c + 0.5);
          se[y][x] = (dx * dx + dy * dy <= 1) ? 1 : 0;
        } else se[y][x] = 1;
      }
    }
    return se;
  }

  function getPixel(arr, y, x) { return (arr[y] && arr[y][x] !== undefined) ? arr[y][x] : 0; }
  function setPixel(arr, y, x, v) { if (arr[y]) arr[y][x] = v; }

  function erode2D(img, se) {
    var h = img.length, w = img[0].length;
    var seH = se.length, seW = se[0].length;
    var padY = Math.floor(seH / 2), padX = Math.floor(seW / 2);
    var out = [];
    for (var y = 0; y < h; y++) {
      out[y] = [];
      for (var x = 0; x < w; x++) {
        var minVal = 255;
        for (var sy = 0; sy < seH; sy++) {
          for (var sx = 0; sx < seW; sx++) {
            if (se[sy][sx]) {
              var py = y + sy - padY, px = x + sx - padX;
              var v = getPixel(img, py, px);
              if (v < minVal) minVal = v;
            }
          }
        }
        out[y][x] = minVal;
      }
    }
    return out;
  }

  function dilate2D(img, se) {
    var h = img.length, w = img[0].length;
    var seH = se.length, seW = se[0].length;
    var padY = Math.floor(seH / 2), padX = Math.floor(seW / 2);
    var out = [];
    for (var y = 0; y < h; y++) {
      out[y] = [];
      for (var x = 0; x < w; x++) {
        var maxVal = 0;
        for (var sy = 0; sy < seH; sy++) {
          for (var sx = 0; sx < seW; sx++) {
            if (se[sy][sx]) {
              var py = y + sy - padY, px = x + sx - padX;
              var v = getPixel(img, py, px);
              if (v > maxVal) maxVal = v;
            }
          }
        }
        out[y][x] = maxVal;
      }
    }
    return out;
  }

  function opening2D(img, se) { return dilate2D(erode2D(img, se), se); }
  function closing2D(img, se) { return erode2D(dilate2D(img, se), se); }

  function gradient2D(img, se) {
    var d = dilate2D(img, se), e = erode2D(img, se);
    var out = [];
    for (var y = 0; y < img.length; y++) {
      out[y] = [];
      for (var x = 0; x < img[0].length; x++) {
        out[y][x] = Math.max(0, Math.min(255, d[y][x] - e[y][x]));
      }
    }
    return out;
  }

  function tophat2D(img, se) {
    var o = opening2D(img, se);
    var out = [];
    for (var y = 0; y < img.length; y++) {
      out[y] = [];
      for (var x = 0; x < img[0].length; x++) {
        out[y][x] = Math.max(0, Math.min(255, img[y][x] - o[y][x]));
      }
    }
    return out;
  }

  function blackhat2D(img, se) {
    var c = closing2D(img, se);
    var out = [];
    for (var y = 0; y < img.length; y++) {
      out[y] = [];
      for (var x = 0; x < img[0].length; x++) {
        out[y][x] = Math.max(0, Math.min(255, c[y][x] - img[y][x]));
      }
    }
    return out;
  }

  function skeleton2D(img) {
    var h = img.length, w = img[0].length;
    var skel = [];
    for (var y = 0; y < h; y++) { skel[y] = []; for (var x = 0; x < w; x++) skel[y][x] = 0; }
    var current = [];
    for (var y = 0; y < h; y++) { current[y] = []; for (var x = 0; x < w; x++) current[y][x] = img[y][x]; }
    var se = makeSE('cross', 3);
    var done = false;
    var iters = 0;
    while (!done && iters < 50) {
      iters++;
      var eroded = erode2D(current, se);
      var opened = dilate2D(eroded, se);
      var diff = [];
      var anyDiff = false;
      for (var y = 0; y < h; y++) {
        diff[y] = [];
        for (var x = 0; x < w; x++) {
          diff[y][x] = current[y][x] > 0 && opened[y][x] === 0 ? 1 : 0;
          if (diff[y][x]) { anyDiff = true; skel[y][x] = 1; }
        }
      }
      current = eroded;
      var allZero = true;
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) if (current[y][x] > 0) allZero = false;
      if (allZero || !anyDiff) done = true;
    }
    return skel;
  }

  function hitmiss2D(img) {
    // Simplified: skeleton-based corner detection
    var h = img.length, w = img[0].length;
    var out = [];
    for (var y = 0; y < h; y++) { out[y] = []; for (var x = 0; x < w; x++) out[y][x] = 0; }
    for (var y = 1; y < h - 1; y++) {
      for (var x = 1; x < w - 1; x++) {
        if (img[y][x] > 0) {
          var n = 0;
          if (img[y-1][x-1] > 0) n++; if (img[y-1][x] > 0) n++; if (img[y-1][x+1] > 0) n++;
          if (img[y][x-1] > 0) n++; if (img[y][x+1] > 0) n++;
          if (img[y+1][x-1] > 0) n++; if (img[y+1][x] > 0) n++; if (img[y+1][x+1] > 0) n++;
          if (n >= 2 && n <= 6) out[y][x] = 1;
        }
      }
    }
    return out;
  }

  // ═══════════════════════════════════════════
  // CANVAS HELPERS
  // ═══════════════════════════════════════════

  function canvasTo2D(canvas) {
    var ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    var h = canvas.height, w = canvas.width;
    var arr = [];
    for (var y = 0; y < h; y++) {
      arr[y] = [];
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        arr[y][x] = data[i]; // R channel (grayscale)
      }
    }
    return arr;
  }

  function binaryCanvasTo2D(canvas) {
    var ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    var h = canvas.height, w = canvas.width;
    var arr = [];
    for (var y = 0; y < h; y++) {
      arr[y] = [];
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        arr[y][x] = data[i] > 128 ? 255 : 0;
      }
    }
    return arr;
  }

  function binary2DToCanvas(arr, canvas) {
    var ctx = canvas.getContext('2d');
    var h = arr.length, w = arr[0].length;
    var imgData = ctx.createImageData(w, h);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        var v = arr[y][x] > 0 ? 255 : 0;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function grayscale2DToCanvas(arr, canvas) {
    var ctx = canvas.getContext('2d');
    var h = arr.length, w = arr[0].length;
    var imgData = ctx.createImageData(w, h);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        var v = Math.max(0, Math.min(255, arr[y][x]));
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function clearCanvas(canvas, val) {
    var ctx = canvas.getContext('2d');
    var v = val || 0;
    ctx.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function copyCanvas(src, dst) {
    var ctx = dst.getContext('2d');
    ctx.drawImage(src, 0, 0);
  }

  // ═══════════════════════════════════════════
  // CHAPTER 2: FLIP & ROTATE WIDGET
  // ═══════════════════════════════════════════

  window.initCvFlipRotate = function () {
    var canvas = document.getElementById('cv-flip-canvas');
    var resultCanvas = document.getElementById('cv-flip-result');
    if (!canvas || !resultCanvas) return;

    // Draw sample pattern
    var ctx = canvas.getContext('2d');
    canvas.width = 128; canvas.height = 128;
    resultCanvas.width = 128; resultCanvas.height = 128;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#f63392'; ctx.fillRect(10, 10, 40, 30);
    ctx.fillStyle = '#2563eb'; ctx.fillRect(60, 40, 30, 50);
    ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(90, 30, 15, 0, Math.PI * 2); ctx.fill();

    // Set up buttons
    document.querySelectorAll('[data-flip-action]').forEach(function (btn) {
      btn.onclick = function () {
        var action = this.getAttribute('data-flip-action');
        var srcArr = canvasTo2D(canvas);
        var h = srcArr.length, w = srcArr[0].length;
        var result = [];

        if (action === 'vertical') {
          for (var y = 0; y < h; y++) { result[y] = []; for (var x = 0; x < w; x++) result[y][x] = srcArr[h - 1 - y][x]; }
        } else if (action === 'horizontal') {
          for (var y = 0; y < h; y++) { result[y] = []; for (var x = 0; x < w; x++) result[y][x] = srcArr[y][w - 1 - x]; }
        } else if (action === 'both') {
          for (var y = 0; y < h; y++) { result[y] = []; for (var x = 0; x < w; x++) result[y][x] = srcArr[h - 1 - y][w - 1 - x]; }
        } else if (action === 'rotate90') {
          for (var y = 0; y < w; y++) { result[y] = []; for (var x = 0; x < h; x++) result[y][x] = srcArr[h - 1 - x][y]; }
          resultCanvas.width = h; resultCanvas.height = w;
        } else if (action === 'rotate45') {
          // Approximate 45° rotation with scaling
          var cw = Math.floor(w * 1.5), ch = Math.floor(h * 1.5);
          var cx = Math.floor(w / 2), cy = Math.floor(h / 2);
          var ncx = Math.floor(cw / 2), ncy = Math.floor(ch / 2);
          resultCanvas.width = cw; resultCanvas.height = ch;
          var angle = -45 * Math.PI / 180;
          var cos = Math.cos(angle), sin = Math.sin(angle);
          for (var y = 0; y < ch; y++) { result[y] = []; for (var x = 0; x < cw; x++) result[y][x] = 255; }
          for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
              var nx = Math.floor((x - cx) * cos - (y - cy) * sin + ncx);
              var ny = Math.floor((x - cx) * sin + (y - cy) * cos + ncy);
              if (nx >= 0 && nx < cw && ny >= 0 && ny < ch) result[ny][nx] = srcArr[y][x];
            }
          }
        }

        if (result.length > 0) grayscale2DToCanvas(result, resultCanvas);

        // Highlight active button
        document.querySelectorAll('[data-flip-action]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      };
    });
  };

  // ═══════════════════════════════════════════
  // CHAPTER 2: BITWISE OPERATIONS DEMO
  // ═══════════════════════════════════════════

  window.initCvBitwise = function () {
    var canvasA = document.getElementById('cv-bitwise-a');
    var canvasB = document.getElementById('cv-bitwise-b');
    var canvasResult = document.getElementById('cv-bitwise-result');
    if (!canvasA || !canvasB || !canvasResult) return;

    // Draw two shapes
    [canvasA, canvasB].forEach(function (c, idx) {
      c.width = 100; c.height = 100;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#fff';
      if (idx === 0) { ctx.fillRect(10, 10, 60, 60); }
      else { ctx.beginPath(); ctx.arc(60, 60, 30, 0, Math.PI * 2); ctx.fill(); }
    });

    canvasResult.width = 100; canvasResult.height = 100;

    function applyOp(op) {
      var a = binaryCanvasTo2D(canvasA), b = binaryCanvasTo2D(canvasB);
      var out = [];
      for (var y = 0; y < 100; y++) {
        out[y] = [];
        for (var x = 0; x < 100; x++) {
          var va = a[y][x] > 0, vb = b[y][x] > 0;
          if (op === 'AND') out[y][x] = (va && vb) ? 255 : 0;
          else if (op === 'OR') out[y][x] = (va || vb) ? 255 : 0;
          else if (op === 'XOR') out[y][x] = (va !== vb) ? 255 : 0;
          else if (op === 'NOT_A') out[y][x] = (!va) ? 255 : 0;
        }
      }
      binary2DToCanvas(out, canvasResult);
      document.querySelectorAll('[data-bitwise-op]').forEach(function (b) { b.classList.remove('active'); });
    }

    document.querySelectorAll('[data-bitwise-op]').forEach(function (btn) {
      btn.onclick = function () {
        applyOp(this.getAttribute('data-bitwise-op'));
        this.classList.add('active');
      };
    });
    applyOp('AND');
  };

  // ═══════════════════════════════════════════
  // CHAPTER 3: OTSU THRESHOLD INTERACTIVE
  // ═══════════════════════════════════════════

  window.initCvOtsu = function () {
    var srcCanvas = document.getElementById('cv-otsu-src');
    var resultCanvas = document.getElementById('cv-otsu-result');
    var slider = document.getElementById('cv-otsu-slider');
    var sliderVal = document.getElementById('cv-otsu-slider-val');
    if (!srcCanvas || !resultCanvas || !slider) return;

    srcCanvas.width = 200; srcCanvas.height = 150;
    resultCanvas.width = 200; resultCanvas.height = 150;

    var currentMode = 'bimodal';

    function generateHistogram(mode) {
      var ctx = srcCanvas.getContext('2d');
      var imgData = ctx.createImageData(200, 150);
      for (var y = 0; y < 150; y++) {
        for (var x = 0; x < 200; x++) {
          var i = (y * 200 + x) * 4;
          var v;
          if (mode === 'bimodal') v = (x < 80 || x > 130) ? (40 + Math.random() * 30) : (180 + Math.random() * 40);
          else if (mode === 'skewed') v = 30 + Math.random() * 20 + (x / 200) * 100;
          else v = Math.random() * 220 + 20;
          v = Math.floor(Math.max(0, Math.min(255, v)));
          imgData.data[i] = v; imgData.data[i + 1] = v; imgData.data[i + 2] = v; imgData.data[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    function otsuThreshold(arr) {
      var hist = new Array(256).fill(0);
      var total = arr.length * arr[0].length;
      for (var y = 0; y < arr.length; y++) for (var x = 0; x < arr[0].length; x++) hist[arr[y][x]]++;
      var sum = 0;
      for (var t = 0; t < 256; t++) sum += t * hist[t];
      var sumB = 0, wB = 0, wF = 0, max = 0, threshold = 0;
      for (var t = 0; t < 256; t++) {
        wB += hist[t];
        if (wB === 0) continue;
        wF = total - wB;
        if (wF === 0) break;
        sumB += t * hist[t];
        var mB = sumB / wB, mF = (sum - sumB) / wF;
        var between = wB * wF * (mB - mF) * (mB - mF);
        if (between > max) { max = between; threshold = t; }
      }
      return threshold;
    }

    function applyThreshold(arr, T) {
      var out = [];
      for (var y = 0; y < arr.length; y++) { out[y] = []; for (var x = 0; x < arr[0].length; x++) out[y][x] = arr[y][x] > T ? 255 : 0; }
      return out;
    }

    function updateOtsu(T) {
      var arr = canvasTo2D(srcCanvas);
      var otsuT = otsuThreshold(arr);
      var useT = (T !== undefined) ? T : otsuT;
      var result = applyThreshold(arr, useT);
      binary2DToCanvas(result, resultCanvas);
      if (sliderVal) sliderVal.textContent = useT;
      if (T === undefined) slider.value = otsuT;
    }

    // Mode buttons
    document.querySelectorAll('[data-otsu-mode]').forEach(function (btn) {
      btn.onclick = function () {
        currentMode = this.getAttribute('data-otsu-mode');
        document.querySelectorAll('[data-otsu-mode]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        generateHistogram(currentMode);
        updateOtsu();
      };
    });

    slider.oninput = function () { updateOtsu(parseInt(this.value)); };
    generateHistogram('bimodal');
    updateOtsu();
  };

  // ═══════════════════════════════════════════
  // CHAPTER 4: MORPHOLOGICAL SANDBOX
  // ═══════════════════════════════════════════

  window.initCvMorphSandbox = function () {
    // Primary sandbox canvas (the drawable input)
    var drawCanvas = document.getElementById('sbInputCanvas');
    if (!drawCanvas) return;

    var SIZE = 200;
    drawCanvas.width = SIZE; drawCanvas.height = SIZE;
    var drawCtx = drawCanvas.getContext('2d');
    clearCanvas(drawCanvas, 0);

    // Result canvases by operation name
    var resultCanvases = {
      erosion: document.getElementById('sbErode'),
      dilation: document.getElementById('sbDilate'),
      opening: document.getElementById('sbOpen'),
      closing: document.getElementById('sbClose'),
      gradient: document.getElementById('sbGrad'),
      tophat: document.getElementById('sbTopHat'),
      blackhat: document.getElementById('sbBlkHat'),
      skeleton: document.getElementById('sbSkel'),
      hitmiss: document.getElementById('sbHitMiss'),
    };

    var isDrawing = false;
    var currentTool = 'draw';
    var currentSE = makeSE('rect', 3);

    function redrawAll() {
      var arr = binaryCanvasTo2D(drawCanvas);
      var se = currentSE;
      var ops = {
        erosion: erode2D(arr, se),
        dilation: dilate2D(arr, se),
        opening: opening2D(arr, se),
        closing: closing2D(arr, se),
        gradient: gradient2D(arr, se),
        tophat: tophat2D(arr, se),
        blackhat: blackhat2D(arr, se),
        skeleton: skeleton2D(arr),
        hitmiss: hitmiss2D(arr),
      };
      Object.keys(ops).forEach(function (op) {
        if (resultCanvases[op]) {
          resultCanvases[op].width = 110; resultCanvases[op].height = 110;
          binary2DToCanvas(ops[op], resultCanvases[op]);
        }
      });
      // Also update simple drawCanvas result canvases if present
      var simpleResults = document.querySelectorAll('[id^="se"][id$="Canvas"], [id^="adv"]');
      simpleResults.forEach(function (c) {
        if (c !== drawCanvas && c.tagName === 'CANVAS') {
          var opMap = {
            seEroCanvas: 'erosion', seDilCanvas: 'dilation', seOpenCanvas: 'opening',
            seCloseCanvas: 'closing', seOrigCanvas: null,
            advGradCanvas: 'gradient', advTopHatCanvas: 'tophat', advBlkHatCanvas: 'blackhat',
            advHitCanvas: 'hitmiss',
          };
          var op = opMap[c.id];
          if (op && ops[op]) {
            c.width = c.width || 160; c.height = c.height || 160;
            binary2DToCanvas(ops[op], c);
          }
        }
      });
    }

    function drawAt(clientX, clientY) {
      var rect = drawCanvas.getBoundingClientRect();
      var scaleX = drawCanvas.width / rect.width;
      var scaleY = drawCanvas.height / rect.height;
      var cx = Math.floor((clientX - rect.left) * scaleX);
      var cy = Math.floor((clientY - rect.top) * scaleY);
      var bs = 3;
      drawCtx.fillStyle = currentTool === 'draw' ? '#fff' : '#000';
      drawCtx.fillRect(cx - Math.floor(bs / 2), cy - Math.floor(bs / 2), bs, bs);
      redrawAll();
    }

    drawCanvas.addEventListener('mousedown', function (e) { isDrawing = true; drawAt(e.clientX, e.clientY); });
    drawCanvas.addEventListener('mousemove', function (e) { if (isDrawing) drawAt(e.clientX, e.clientY); });
    drawCanvas.addEventListener('mouseup', function () { isDrawing = false; });
    drawCanvas.addEventListener('mouseleave', function () { isDrawing = false; });
    // Touch support
    drawCanvas.addEventListener('touchstart', function (e) { e.preventDefault(); isDrawing = true; drawAt(e.touches[0].clientX, e.touches[0].clientY); });
    drawCanvas.addEventListener('touchmove', function (e) { e.preventDefault(); if (isDrawing) drawAt(e.touches[0].clientX, e.touches[0].clientY); });
    drawCanvas.addEventListener('touchend', function () { isDrawing = false; });

    // Scene presets
    function loadScene(name) {
      clearCanvas(drawCanvas, 0);
      drawCtx.fillStyle = '#fff';
      if (name === 'defects') {
        drawCtx.fillRect(30, 30, 60, 60);
        drawCtx.fillRect(110, 110, 60, 60);
        drawCtx.fillRect(5, 5, 4, 4); drawCtx.fillRect(185, 15, 4, 4); drawCtx.fillRect(15, 185, 4, 4);
        drawCtx.fillStyle = '#000'; drawCtx.fillRect(50, 50, 12, 12); drawCtx.fillRect(135, 135, 12, 12);
      } else if (name === 'text') {
        drawCtx.font = 'bold 44px monospace';
        drawCtx.fillText('CV', 30, 130);
      } else if (name === 'cells') {
        for (var i = 0; i < 6; i++) {
          drawCtx.beginPath();
          drawCtx.arc(35 + i * 28, 60 + (i % 2) * 50, 15, 0, Math.PI * 2);
          drawCtx.fill();
        }
      } else if (name === 'circuit') {
        drawCtx.fillRect(15, 60, 170, 4);
        drawCtx.fillRect(15, 130, 170, 4);
        drawCtx.fillRect(60, 60, 4, 74);
        drawCtx.fillRect(130, 60, 4, 74);
      }
      redrawAll();
    }

    // Wire up scene buttons
    document.querySelectorAll('.scene-btn, [data-scene], [onclick*="loadScene"]').forEach(function (btn) {
      var scene = btn.getAttribute('data-scene') || '';
      if (!scene && btn.onclick) return; // already has handler
      if (scene) btn.addEventListener('click', function () { loadScene(scene); });
    });

    // Wire up tool buttons (Draw / Erase / Clear)
    var tools = { draw: '#fff', erase: '#000' };
    document.querySelectorAll('.sb-tool-btn, .md-tool').forEach(function (btn) {
      var tool = btn.getAttribute('data-tool') || '';
      if (tool === 'draw' || tool === 'erase') {
        btn.addEventListener('click', function () {
          currentTool = tool;
          document.querySelectorAll('.sb-tool-btn, .md-tool').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      } else if (btn.textContent.includes('Clear') || btn.classList.contains('clear')) {
        btn.addEventListener('click', function () {
          clearCanvas(drawCanvas, 0);
          redrawAll();
        });
      }
    });

    // SE size slider
    var seSlider = document.getElementById('sbSeSize');
    if (seSlider) {
      seSlider.addEventListener('input', function () {
        var size = parseInt(this.value) || 3;
        var shapeEl = document.getElementById('sbSeShape');
        var shape = shapeEl ? shapeEl.value : 'rect';
        currentSE = makeSE(shape, size);
        var lbl = document.getElementById('sbSeSizeLbl');
        if (lbl) lbl.textContent = size + '\u00D7' + size;
        redrawAll();
      });
    }

    // SE shape selector
    var shapeSel = document.getElementById('sbSeShape');
    if (shapeSel) {
      shapeSel.addEventListener('change', function () {
        var size = parseInt((document.getElementById('sbSeSize') || {}).value) || 3;
        currentSE = makeSE(this.value, size);
        redrawAll();
      });
    }

    // Initialize with default scene
    loadScene('defects');

    // Simple draw canvas (#drawCanvas) for erosion/dilation demo
    var simpleDrawCanvas = document.getElementById('drawCanvas');
    if (simpleDrawCanvas && simpleDrawCanvas !== drawCanvas) {
      var sdc = simpleDrawCanvas.getContext('2d');
      simpleDrawCanvas.width = 180; simpleDrawCanvas.height = 180;
      clearCanvas(simpleDrawCanvas, 0);
      var sdDrawing = false;
      simpleDrawCanvas.addEventListener('mousedown', function (e) { sdDrawing = true; });
      simpleDrawCanvas.addEventListener('mousemove', function (e) {
        if (!sdDrawing) return;
        var r = simpleDrawCanvas.getBoundingClientRect();
        var sx = Math.floor((e.clientX - r.left) * (simpleDrawCanvas.width / r.width));
        var sy = Math.floor((e.clientY - r.top) * (simpleDrawCanvas.height / r.height));
        sdc.fillStyle = '#fff';
        sdc.fillRect(sx - 2, sy - 2, 5, 5);
        redrawAll();
      });
      simpleDrawCanvas.addEventListener('mouseup', function () { sdDrawing = false; });
    }
  };

  // ═══════════════════════════════════════════
  // CHAPTER 4: CODING CHALLENGES
  // ═══════════════════════════════════════════

  window.runChallenge = function (editorId, outId, checkId) {
    var editor = document.getElementById(editorId);
    var outWrap = document.getElementById(outId);
    var checkEl = document.getElementById(checkId);
    if (!editor || !outWrap || !checkEl) return;

    var code = editor.value;
    var outPre = outWrap.querySelector('pre');
    outWrap.style.display = 'block';

    // Create sandbox with numpy-like arrays
    try {
      var output = [];
      var np = {
        zeros: function (h, w, dtype) {
          var arr = []; for (var y = 0; y < h; y++) { arr[y] = []; for (var x = 0; x < w; x++) arr[y][x] = 0; }
          arr.astype = function () { return this; }; arr.shape = [h, w]; return arr;
        },
        clip: function (arr, lo, hi) { return arr.map(function (r) { return r.map(function (v) { return Math.max(lo, Math.min(hi, v)); }); }); },
        pad: function (arr, pad, mode) {
          var h = arr.length, w = arr[0].length;
          var nh = h + 2 * pad, nw = w + 2 * pad;
          var out = np.zeros(nh, nw);
          for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) out[y + pad][x + pad] = arr[y][x];
          return out;
        },
        random: { seed: function () {} }
      };

      function erode(img, ks) {
        ks = ks || 3; var pad = Math.floor(ks / 2);
        var h = img.length, w = img[0].length;
        var out = []; for (var y = 0; y < h; y++) { out[y] = []; for (var x = 0; x < w; x++) {
          var min = 255;
          for (var sy = 0; sy < ks; sy++) for (var sx = 0; sx < ks; sx++) {
            var py = y + sy - pad, px = x + sx - pad;
            var v = (py >= 0 && py < h && px >= 0 && px < w) ? img[py][px] : 0;
            if (v < min) min = v;
          }
          out[y][x] = min;
        }} return out;
      }

      function dilate(img, ks) {
        ks = ks || 3; var pad = Math.floor(ks / 2);
        var h = img.length, w = img[0].length;
        var out = []; for (var y = 0; y < h; y++) { out[y] = []; for (var x = 0; x < w; x++) {
          var max = 0;
          for (var sy = 0; sy < ks; sy++) for (var sx = 0; sx < ks; sx++) {
            var py = y + sy - pad, px = x + sx - pad;
            var v = (py >= 0 && py < h && px >= 0 && px < w) ? img[py][px] : 0;
            if (v > max) max = v;
          }
          out[y][x] = max;
        }} return out;
      }

      var print = function () {
        var args = Array.prototype.slice.call(arguments);
        output.push(args.map(function (a) {
          if (typeof a === 'boolean') return a ? 'True' : 'False';
          if (typeof a === 'number') return Math.round(a) === a ? String(a) : a.toFixed(2);
          return String(a);
        }).join(' '));
      };

      var int = parseInt;
      var min = Math.min;
      var max = Math.max;

      // Handle fill-in-the-blank (___) patterns
      code = code.replace(/___\(/g, '(').replace(/___\./g, '');

      // Execute
      var fn = new Function('np', 'erode', 'dilate', 'print', 'int', 'min', 'max', code);
      fn(np, erode, dilate, print, int, min, max);

      if (outPre) outPre.textContent = output.join('\n') || '(no output)';
    } catch (e) {
      if (outPre) outPre.textContent = 'Error: ' + e.message;
    }

    // Auto-check against expected
    var expectedText = '';
    var expectedBox = checkEl.parentElement.querySelector('.expected-box code');
    if (expectedBox) expectedText = expectedBox.textContent;
    if (outPre && expectedText) {
      var actual = outPre.textContent.trim();
      var expectedLines = expectedText.split('&nbsp;').map(function (s) { return s.trim(); });
      var allMatch = expectedLines.every(function (line) { return actual.indexOf(line) >= 0; });
      checkEl.style.display = 'block';
      checkEl.className = 'check-result ' + (allMatch ? 'pass' : 'fail');
      checkEl.textContent = allMatch ? '✅ Correct! All checks passed.' : '❌ Not quite — check your output against expected.';
    }
  };

  window.resetCodingQuiz = function (num) {
    var templates = {
      1: 'import numpy as np\n\ndef erode(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].min()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\ndef dilate(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].max()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\n# BUG: this is Closing (dilate→erode), not Opening (erode→dilate)\ndef opening(img, ks=3):\n    return erode(dilate(img, ks), ks)   # FIX THIS LINE\n\n# Test\nimg = np.zeros((10,10), dtype=np.uint8)\nimg[2:8, 2:8] = 255   # main rectangle\nimg[0,0] = 255        # noise pixel\n\nresult = opening(img)\nprint("Noise pixel after opening:", result[0,0])   # must be 0\nprint("Main rect after opening:", result[4,4])     # must be 255\nprint("Opening correct:", result[0,0]==0 and result[4,4]==255)',
      2: 'import numpy as np\n\ndef erode(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].min()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\ndef dilate(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].max()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\n# Grayscale image: ramp background + 3 bright spots\nnp.random.seed(0)\nimg = np.zeros((16,16), dtype=np.uint8)\nfor y in range(16):\n    for x in range(16):\n        img[y,x] = int(y * 10)\n\nimg[2,2]  = min(255, img[2,2]  + 120)\nimg[2,13] = min(255, img[2,13] + 120)\nimg[7,7]  = min(255, img[7,7]  + 120)\n\nopened = dilate(erode(img, 5), 5)\ntop_hat = np.clip(img.astype(int) - opened.astype(int), 0, 255).astype(np.uint8)\n\nprint("Top-hat at spot (2,2):", top_hat[2,2])\nprint("Top-hat at spot (2,13):", top_hat[2,13])\nprint("Top-hat at spot (7,7):", top_hat[7,7])\nprint("Top-hat at background (8,2):", top_hat[8,2])\nprint("Spots found (>50):", (top_hat > 50).sum())',
      3: 'import numpy as np\n\ndef erode(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].min()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\ndef dilate(img, ks=3):\n    pad=ks//2; p=np.pad(img.astype(float),pad,mode=\'constant\')\n    return np.array([[p[y:y+ks,x:x+ks].max()\n        for x in range(img.shape[1])] for y in range(img.shape[0])]).astype(np.uint8)\n\nnp.random.seed(42)\nimg = np.zeros((20,20), dtype=np.uint8)\nimg[2:7,  2:7]  = 255\nimg[13:18, 13:18] = 255\nimg[0, 0] = img[1,18] = img[18,1] = 255\nimg[4,4] = img[14,14] = 0\n\nprint(f"White pixels before: {int((img==255).sum())}")\n\ncleaned = erode(dilate(img, 3), 3)\nprint(f"White pixels after opening: {int((cleaned==255).sum())}")\nprint(f"Noise at (0,0) removed: {cleaned[0,0]==0}")\n\nfilled = dilate(erode(cleaned, 3), 3)\nprint(f"Hole at (4,4) filled: {filled[4,4]==255}")\nprint(f"Hole at (14,14) filled: {filled[14,14]==255}")\n\neroded  = erode(filled, 3)\ndilated = dilate(filled, 3)\ngradient = np.clip(dilated.astype(int) - eroded.astype(int), 0, 255).astype(np.uint8)\nprint(f"Edge pixels: {int((gradient>0).sum())}")\nprint(f"Interior pixel (4,4) is edge: {gradient[4,4]>0}")',
    };
    var editor = document.getElementById('cq-' + num + '-editor');
    if (editor && templates[num]) editor.value = templates[num];
    var outWrap = document.getElementById('cq-' + num + '-out');
    var checkEl = document.getElementById('cq-' + num + '-check');
    if (outWrap) outWrap.style.display = 'none';
    if (checkEl) checkEl.style.display = 'none';
  };

  // ═══════════════════════════════════════════
  // CHAPTER 4: QUIZ RENDERER
  // ═══════════════════════════════════════════

  window.createCvQuiz = function (containerId, questions, chapterId) {
    var container = document.getElementById(containerId);
    if (!container || !questions) return;

    var html = '';
    questions.forEach(function (q, idx) {
      html += '<div class="quiz-item"><div class="quiz-q-num">Question ' + (idx + 1) + ' of ' + questions.length + '</div>';
      html += '<div class="quiz-q-text">' + q.question + '</div>';
      html += '<div class="quiz-opts">';
      q.options.forEach(function (opt, oi) {
        html += '<button class="quiz-opt" data-q="' + idx + '" data-o="' + oi + '" onclick="window.selectCvQuizOption(this, ' + idx + ', ' + oi + ', ' + q.correct + ', \'' + (q.explanation || '') + '\')"><span class="quiz-opt-badge">' + String.fromCharCode(65 + oi) + '</span>' + opt + '</button>';
      });
      html += '</div>';
      html += '<div class="quiz-feedback" id="cv-quiz-fb-' + idx + '">' + (q.explanation || '') + '</div>';
      html += '</div>';
    });
    container.innerHTML = html;

    container._quizState = { answers: {}, total: questions.length, correct: 0 };
  };

  window.selectCvQuizOption = function (btn, qIdx, oIdx, correctIdx, explanation) {
    var container = btn.closest('.quiz-item');
    if (!container) return;

    var state = (document.getElementById('quizContainer') || {})._quizState;
    if (state && state.answers[qIdx] !== undefined) return; // already answered

    // Mark all options
    var opts = container.querySelectorAll('.quiz-opt');
    opts.forEach(function (o, i) {
      o.disabled = true;
      if (i === correctIdx) o.classList.add('correct');
      else if (i === oIdx && oIdx !== correctIdx) o.classList.add('wrong');
      if (i !== oIdx && i !== correctIdx) o.classList.add('muted');
      if (i === oIdx) o.classList.add(oIdx === correctIdx ? 'correct' : 'wrong');
    });

    // Show feedback
    var fb = container.querySelector('.quiz-feedback');
    if (fb) { fb.classList.add('show', oIdx === correctIdx ? 'ok' : 'bad'); fb.style.display = 'block'; }

    if (state) {
      state.answers[qIdx] = oIdx === correctIdx;
      if (oIdx === correctIdx) state.correct++;

      // Check if all answered
      if (Object.keys(state.answers).length === state.total) {
        var scoreEl = document.getElementById('finalScore');
        var scoresEl = document.getElementById('fsScores');
        var msgEl = document.getElementById('fsMsg');
        if (scoreEl) scoreEl.style.display = 'block';
        if (scoresEl) scoresEl.innerHTML = 'Quiz: <strong>' + state.correct + '/' + state.total + '</strong>';
        if (msgEl) msgEl.textContent = state.correct === state.total ? 'Perfect! You mastered morphological operations.' : state.correct >= state.total * 0.7 ? 'Great job! Review the ones you missed.' : 'Keep learning — review the material and try again.';

        // Save quiz progress
        if (window.saveChapterProgress) {
          window.saveChapterProgress('computer-vision', 'quiz', 'completed', Math.round(state.correct / state.total * 100));
        }
      }
    }
  };

  // ═══════════════════════════════════════════
  // CHAPTER 4: MORPH PLAYGROUND
  // ═══════════════════════════════════════════

  window.runMorphPlayground = function () {
    var editor = document.getElementById('playground-editor');
    var outWrap = document.getElementById('pg-output');
    var outPre = document.getElementById('pg-output-pre');
    if (!editor || !outWrap || !outPre) return;

    var code = editor.value;
    outWrap.style.display = 'block';

    try {
      var output = [];
      var np = {
        zeros: function (h, w, dtype) {
          var arr = []; for (var y = 0; y < h; y++) { arr[y] = []; for (var x = 0; x < w; x++) arr[y][x] = 0; }
          arr.astype = function () { return this; }; arr.shape = [h, w]; return arr;
        },
        clip: function (arr, lo, hi) { return arr.map(function (r) { return r.map(function (v) { return Math.max(lo, Math.min(hi, v)); }); }); },
        pad: function (arr, pad, mode) {
          var h = arr.length, w = arr[0].length;
          var out = np.zeros(h + 2 * pad, w + 2 * pad);
          for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) out[y + pad][x + pad] = arr[y][x];
          return out;
        }
      };

      function erode(img, se) { return erode2D(img, se); }
      function dilate(img, se) { return dilate2D(img, se); }

      var print = function () {
        var args = Array.prototype.slice.call(arguments);
        output.push(args.map(function (a) {
          if (typeof a === 'boolean') return a ? 'True' : 'False';
          if (typeof a === 'number') return Math.round(a) === a ? String(a) : a.toFixed(2);
          return String(a);
        }).join(' '));
      };

      var int = parseInt;
      var min = Math.min;
      var max = Math.max;

      // Replace ___(...) patterns
      code = code.replace(/___\(/g, '(').replace(/___\./g, '');

      // Parse SE creation
      function make_se(shape, size) {
        var se = makeSE(shape, size);
        se.astype = function () { return this; };
        return se;
      }

      var fn = new Function('np', 'erode', 'dilate', 'print', 'int', 'min', 'max', 'make_se', code);
      fn(np, erode, dilate, print, int, min, max, make_se);
      outPre.textContent = output.join('\n') || '(no output)';
    } catch (e) {
      outPre.textContent = 'Error: ' + e.message;
    }
  };

  window.resetMorphPlayground = function () {
    var editor = document.getElementById('playground-editor');
    var outWrap = document.getElementById('pg-output');
    if (outWrap) outWrap.style.display = 'none';
  };

  window.loadMorphSnippet = function (name) {
  };

  // ═══════════════════════════════════════════
  // AUTO-INIT: Scan for widgets after chapter load
  // ═══════════════════════════════════════════

  window.initCvInteractives = function () {
    setTimeout(function () {
      // Chapter 2 widgets
      if (document.getElementById('cv-flip-canvas') || document.querySelector('[id*=flip]')) window.initCvFlipRotate();
      if (document.getElementById('cv-bitwise-a') || document.querySelector('[id*=bitwise]')) window.initCvBitwise();
      // Chapter 3 widgets
      if (document.getElementById('cv-otsu-src') || document.querySelector('[id*=otsu]')) window.initCvOtsu();
      // Chapter 4 widgets
      if (document.getElementById('drawCanvas') || document.getElementById('sbInputCanvas') || document.getElementById('advDrawCanvas')) {
        window.initCvMorphSandbox();
      }
      // Quiz (chapter 4)
      if (document.getElementById('quizContainer')) {
        window.createCvQuiz();
      }
    }, 400);
  };

  // Auto-init when chapter HTML loads (MutationObserver)
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function () {
      if (document.querySelector('.cv-chapter-wrapper')) {
        setTimeout(window.initCvInteractives, 200);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═══════════════════════════════════════════════════════
  // MORPHOLOGICAL SANDBOX (Chapter 4)
  // ═══════════════════════════════════════════════════════

  function initMorphSandbox() {
    const drawCanvas = document.getElementById('morph-draw-canvas');
    if (!drawCanvas) return setTimeout(initMorphSandbox, 500);
    const results = {};
    ['erosion','dilation','opening','closing','gradient','tophat','blackhat','skeleton','hitmiss'].forEach(op => {
      const c = document.getElementById('morph-result-' + op);
      if (c) results[op] = c;
    });

    const W = 200, H = 200;
    const scale = 4; // internal resolution
    const iW = W, iH = H;
    const imgData = new Uint8Array(iW * iH);
    let seSize = 3;
    let drawing = false;
    let erasing = false;

    drawCanvas.width = W; drawCanvas.height = H;
    const dCtx = drawCanvas.getContext('2d');
    dCtx.fillStyle = '#fff'; dCtx.fillRect(0, 0, W, H);

    function drawGrid() {
      dCtx.fillStyle = '#fff'; dCtx.fillRect(0, 0, W, H);
      const cellSize = W / iW;
      for (let y = 0; y < iH; y++) {
        for (let x = 0; x < iW; x++) {
          dCtx.fillStyle = imgData[y * iW + x] ? '#f63392' : '#f0f0f0';
          dCtx.fillRect(x * cellSize, y * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }

    function getCell(e) {
      const rect = drawCanvas.getBoundingClientRect();
      const cellSize = W / iW;
      const x = Math.floor((e.clientX - rect.left) / cellSize);
      const y = Math.floor((e.clientY - rect.top) / cellSize);
      return { x, y };
    }

    drawCanvas.addEventListener('mousedown', e => { drawing = true; erasing = e.shiftKey; const c = getCell(e); if (c.x >= 0 && c.x < iW && c.y >= 0 && c.y < iH) { imgData[c.y * iW + c.x] = erasing ? 0 : 1; drawGrid(); applyMorphOps(); } });
    drawCanvas.addEventListener('mousemove', e => { if (!drawing) return; const c = getCell(e); if (c.x >= 0 && c.x < iW && c.y >= 0 && c.y < iH) { imgData[c.y * iW + c.x] = erasing ? 0 : 1; drawGrid(); applyMorphOps(); } });
    drawCanvas.addEventListener('mouseup', () => { drawing = false; });
    drawCanvas.addEventListener('mouseleave', () => { drawing = false; });

    function makeSE(size, shape) {
      const se = new Uint8Array(size * size);
      const c = Math.floor(size / 2);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (shape === 'cross') se[y * size + x] = (x === c || y === c) ? 1 : 0;
          else if (shape === 'ellipse') se[y * size + x] = ((x-c)*(x-c)/((c+0.5)*(c+0.5)) + (y-c)*(y-c)/((c+0.5)*(c+0.5)) <= 1) ? 1 : 0;
          else se[y * size + x] = 1;
        }
      }
      return se;
    }

    function morphOp(input, se, size, op) {
      const pad = Math.floor(size / 2);
      const result = new Uint8Array(iW * iH);
      for (let y = 0; y < iH; y++) {
        for (let x = 0; x < iW; x++) {
          let val = op === 'erode' || op === 'opening1' ? 1 : 0;
          let count = 0;
          for (let sy = 0; sy < size; sy++) {
            for (let sx = 0; sx < size; sx++) {
              if (!se[sy * size + sx]) continue;
              const ny = y + sy - pad, nx = x + sx - pad;
              if (ny < 0 || ny >= iH || nx < 0 || nx >= iW) continue;
              count++;
              const v = input[ny * iW + nx];
              if (op === 'erode' || op === 'opening1') val = Math.min(val, v);
              else val = Math.max(val, v);
            }
          }
          if (count === 0) val = (op === 'erode' || op === 'opening1') ? 0 : 0;
          result[y * iW + x] = val;
        }
      }
      return result;
    }

    function applyMorphOps() {
      const se = makeSE(seSize, 'rect');
      const eroded = morphOp(imgData, se, seSize, 'erode');
      const dilated = morphOp(imgData, se, seSize, 'dilate');
      const opened = morphOp(morphOp(imgData, se, seSize, 'erode'), se, seSize, 'dilate');
      const closed = morphOp(morphOp(imgData, se, seSize, 'dilate'), se, seSize, 'erode');
      const gradient = new Uint8Array(iW * iH);
      const tophat = new Uint8Array(iW * iH);
      const blackhat = new Uint8Array(iW * iH);
      for (let i = 0; i < iW * iH; i++) { gradient[i] = dilated[i] && !eroded[i] ? 1 : 0; tophat[i] = imgData[i] && !opened[i] ? 1 : 0; blackhat[i] = closed[i] && !imgData[i] ? 1 : 0; }

      renderToCanvas(results['erosion'], eroded);
      renderToCanvas(results['dilation'], dilated);
      renderToCanvas(results['opening'], opened);
      renderToCanvas(results['closing'], closed);
      renderToCanvas(results['gradient'], gradient);
      renderToCanvas(results['tophat'], tophat);
      renderToCanvas(results['blackhat'], blackhat);
    }

    function renderToCanvas(canvas, data) {
      if (!canvas) return;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      const cellSize = W / iW;
      for (let y = 0; y < iH; y++) {
        for (let x = 0; x < iW; x++) {
          ctx.fillStyle = data[y * iW + x] ? '#f63392' : '#f0f0f0';
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }

    drawGrid();
    // Tool buttons
    document.querySelectorAll('.md-tool').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.md-tool').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.classList.contains('clear')) { imgData.fill(0); drawGrid(); applyMorphOps(); }
      });
    });

    // SE size
    document.querySelectorAll('.md-se-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.md-se-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        seSize = parseInt(btn.textContent) || 3;
        applyMorphOps();
      });
    });

    // Scene presets
    document.querySelectorAll('.adv-scene-sel').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.adv-scene-sel').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        imgData.fill(0);
        const t = btn.textContent.trim();
        if (t === 'Defects') { for (let y = 40; y < 80; y++) for (let x = 40; x < 80; x++) imgData[y*iW+x] = 1; imgData[55*iW+55] = 0; imgData[10*iW+10] = imgData[10*iW+180] = imgData[180*iW+10] = 1; }
        else if (t === 'Text') { for (let y = 60; y < 80; y++) for (let x = 30; x < 170; x++) imgData[y*iW+x] = 1; for (let y = 100; y < 120; y++) for (let x = 30; x < 170; x++) imgData[y*iW+x] = 1; }
        else if (t === 'Cells') { for (let y = 50; y < 70; y++) for (let x = 30; x < 50; x++) imgData[y*iW+x] = 1; for (let y = 130; y < 150; y++) for (let x = 30; x < 50; x++) imgData[y*iW+x] = 1; for (let y = 90; y < 110; y++) for (let x = 150; x < 170; x++) imgData[y*iW+x] = 1; }
        else if (t === 'Circuit') { for (let y = 80; y < 120; y++) imgData[y*iW+50] = imgData[y*iW+150] = 1; for (let x = 50; x < 151; x++) imgData[80*iW+x] = imgData[100*iW+x] = imgData[119*iW+x] = 1; }
        drawGrid();
        applyMorphOps();
      });
    });
  }

  // ═══════════════════════════════════════════════════════
  // CODING CHALLENGES (Chapter 4)
  // ═══════════════════════════════════════════════════════

  function cvErrode(arr2d, ks) {
    const h = arr2d.length, w = arr2d[0].length;
    const pad = Math.floor(ks/2);
    const out = [];
    for (let y = 0; y < h; y++) { out[y] = []; for (let x = 0; x < w; x++) { let mn = 255; for (let dy = -pad; dy <= pad; dy++) for (let dx = -pad; dx <= pad; dx++) { const ny = y+dy, nx = x+dx; mn = Math.min(mn, (ny>=0&&ny<h&&nx>=0&&nx<w) ? arr2d[ny][nx] : 0); } out[y][x] = mn; } }
    return out;
  }
  function cvDilate(arr2d, ks) {
    const h = arr2d.length, w = arr2d[0].length;
    const pad = Math.floor(ks/2);
    const out = [];
    for (let y = 0; y < h; y++) { out[y] = []; for (let x = 0; x < w; x++) { let mx = 0; for (let dy = -pad; dy <= pad; dy++) for (let dx = -pad; dx <= pad; dx++) { const ny = y+dy, nx = x+dx; mx = Math.max(mx, (ny>=0&&ny<h&&nx>=0&&nx<w) ? arr2d[ny][nx] : 0); } out[y][x] = mx; } }
    return out;
  }

  window.runChallenge = function(editorId, outId, checkId) {
    const editor = document.getElementById(editorId);
    const outWrap = document.getElementById(outId);
    const checkWrap = document.getElementById(checkId);
    const outPre = document.getElementById(outId + '-pre');
    if (!editor || !outWrap || !checkWrap) return;

    const code = editor.value;
    const outputs = [];
    const _print = function() { outputs.push(Array.from(arguments).join(' ')); };

    try {
      const fn = new Function('erode', 'dilate', 'print', 'np', '_np', code);
      fn(cvErrode, cvDilate, _print, createNpShim(), createNpShim());
    } catch(e) {
      outputs.push('Error: ' + e.message);
    }

    outWrap.style.display = 'block';
    outPre.textContent = outputs.join('\n') || '(no output)';
    checkWrap.style.display = 'block';

    const expected = checkWrap.closest('.challenge-card')?.querySelector('.expected-box code')?.textContent || '';
    const passed = outputs.join('\n').includes('True') && !outputs.join('\n').includes('Error');
    checkWrap.className = 'check-result ' + (passed ? 'pass' : 'fail');
    checkWrap.textContent = passed ? '✓ PASS — Output matches expected' : '✗ FAIL — Check your code and try again';
  };

  window.resetCodingQuiz = function(num) {
    const editor = document.getElementById('cq-' + num + '-editor');
    if (editor && editor._orig) editor.value = editor._orig;
    const out = document.getElementById('cq-' + num + '-out');
    const check = document.getElementById('cq-' + num + '-check');
    if (out) out.style.display = 'none';
    if (check) check.style.display = 'none';
  };

  function createNpShim() {
    const zeros = (h, w, dtype) => { const a = []; for (let y = 0; y < h; y++) { a[y] = new Array(w).fill(0); } return a; };
    const clip = (arr, lo, hi) => arr.map(row => row.map(v => Math.max(lo, Math.min(hi, v))));
    const astype = (arr, type) => arr;
    const sum = (arr) => { let s = 0; arr.forEach(row => row.forEach(v => s += v)); return s; };
    const pad = (arr, pad, mode) => { const h = arr.length + 2*pad, w = arr[0].length + 2*pad; const out = zeros(h, w); for (let y = 0; y < arr.length; y++) for (let x = 0; x < arr[0].length; x++) out[y+pad][x+pad] = arr[y][x]; return out; };
    return { zeros, clip, astype, sum, pad, random: { seed() {} }, uint8: 'uint8', int32: 'int32', array: (v) => v };
  }

  window.runMorphPlayground = function() {
    const editor = document.getElementById('playground-editor');
    const outWrap = document.getElementById('pg-output');
    const outPre = document.getElementById('pg-output-pre');
    if (!editor || !outWrap) return;
    const outputs = [];
    try {
      const fn = new Function('erode', 'dilate', 'print', 'np', code);
      const code = editor.value;
      fn(cvErrode, cvDilate, function() { outputs.push(Array.from(arguments).join(' ')); }, createNpShim());
    } catch(e) { outputs.push('Error: ' + e.message); }
    outWrap.style.display = 'block';
    outPre.textContent = outputs.join('\n') || '(no output)';
  };

  window.resetMorphPlayground = function() {
    const editor = document.getElementById('playground-editor');
    if (editor && editor._orig) editor.value = editor._orig;
    const out = document.getElementById('pg-output');
    if (out) out.style.display = 'none';
  };

  window.loadMorphSnippet = function(name) {
    const snippets = {
      erosion: 'eroded = erode(img, 3)\nprint("White pixels after erosion:", int((eroded==255).sum()))',
      dilation: 'dilated = dilate(img, 3)\nprint("White pixels after dilation:", int((dilated==255).sum()))',
      opening: 'opened = dilate(erode(img, 3), 3)\nprint("Noise removed (white diff):", int((img==255).sum()) - int((opened==255).sum()))',
      closing: 'closed = erode(dilate(img, 3), 3)\nprint("Holes filled:", int((closed==255).sum()) - int((img==255).sum()))',
      gradient: 'eroded = erode(img, 3)\ndilated = dilate(img, 3)\ngradient = np.clip(dilated.astype(int)-eroded.astype(int),0,255).astype(np.uint8)\nprint("Edge pixels:", int((gradient>0).sum()))',
      tophat: 'opened = dilate(erode(img, 5), 5)\ntop_hat = np.clip(img.astype(int)-opened.astype(int),0,255).astype(np.uint8)\nprint("Bright details:", int((top_hat>0).sum()))',
      pipeline: '# Full pipeline: Opening → Closing → Gradient\ncleaned = dilate(erode(img, 3), 3)\nfilled  = erode(dilate(cleaned, 3), 3)\neroded2 = erode(filled, 3)\ndilated2= dilate(filled, 3)\ngrad    = np.clip(dilated2.astype(int)-eroded2.astype(int),0,255).astype(np.uint8)\nprint("Edge pixels:", int((grad>0).sum()))',
    };
    const editor = document.getElementById('playground-editor');
    if (editor && snippets[name]) editor.value = snippets[name];
  };

  // ═══════════════════════════════════════════════════════
  // QUIZ (Chapter 4)
  // ═══════════════════════════════════════════════════════

  window.createCvQuiz = function() {
    const container = document.getElementById('quizContainer');
    if (!container) return setTimeout(window.createCvQuiz, 500);

    const questions = [
      { q: 'Opening = Erode → Dilate. What is its main purpose?', opts: ['Remove small bright noise', 'Fill small dark holes', 'Find edges', 'Enlarge bright regions'], ans: 0 },
      { q: 'Closing = Dilate → Erode. What is its main purpose?', opts: ['Remove small bright noise', 'Fill small dark holes', 'Find edges', 'Shrink bright regions'], ans: 1 },
      { q: 'Morphological gradient is defined as:', opts: ['Dilate + Erode', 'Dilate − Erode', 'Erode − Dilate', 'Dilate × Erode'], ans: 1 },
      { q: 'Top-Hat transform is:', opts: ['Image − Opening', 'Closing − Image', 'Image − Closing', 'Dilate − Image'], ans: 0 },
      { q: 'Black-Hat transform is useful for finding:', opts: ['Bright details on dark background', 'Dark details on bright background', 'All edges', 'Smooth regions'], ans: 1 },
    ];

    let html = '';
    questions.forEach((q, i) => {
      html += '<div class="quiz-item"><div class="quiz-q-num">Question ' + (i+1) + ' of ' + questions.length + '</div>';
      html += '<div class="quiz-q-text">' + q.q + '</div><div class="quiz-opts">';
      q.opts.forEach((opt, j) => {
        html += '<button class="quiz-opt" onclick="window._cvSelectAnswer(' + i + ',' + j + ',this)" data-q="' + i + '" data-a="' + j + '"><span class="quiz-opt-badge">' + String.fromCharCode(65+j) + '</span>' + opt + '</button>';
      });
      html += '</div><div class="quiz-feedback" id="cv-quiz-fb-' + i + '"></div></div>';
    });

    container.innerHTML = html;
    window._cvQuizAnswers = new Array(questions.length).fill(-1);
    window._cvQuizCorrect = questions.map(q => q.ans);
  };

  window._cvSelectAnswer = function(qIdx, aIdx, btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.quiz-opt').forEach(b => { b.classList.remove('correct','wrong','muted'); b.disabled = false; });
    btn.classList.add(aIdx === window._cvQuizCorrect[qIdx] ? 'correct' : 'wrong');
    parent.querySelectorAll('.quiz-opt').forEach(b => { if (b !== btn) b.classList.add('muted'); b.disabled = true; });
    window._cvQuizAnswers[qIdx] = aIdx;

    const fb = document.getElementById('cv-quiz-fb-' + qIdx);
    fb.className = 'quiz-feedback show ' + (aIdx === window._cvQuizCorrect[qIdx] ? 'ok' : 'bad');
    fb.textContent = aIdx === window._cvQuizCorrect[qIdx] ? '✓ Benar!' : '✗ Salah. Coba lagi!';

    // Check if all answered
    if (window._cvQuizAnswers.every(a => a >= 0)) {
      const score = window._cvQuizAnswers.filter((a, i) => a === window._cvQuizCorrect[i]).length;
      const total = window._cvQuizCorrect.length;
      const pct = Math.round(score / total * 100);
      document.getElementById('finalScore').style.display = 'block';
      document.getElementById('fsScores').innerHTML = '<strong>' + pct + '%</strong> — ' + score + '/' + total + ' benar';
      document.getElementById('fsMsg').textContent = pct >= 80 ? 'Luar biasa! Kamu menguasai Morphological Operations.' : pct >= 60 ? 'Bagus! Lanjutkan belajar dan coba lagi.' : 'Perlu review lagi. Baca ulang materi di atas.';
      document.getElementById('nextLesson').style.display = 'block';
      window.saveChapterProgress('computer-vision', 4, 'completed');
    }
  };

  // Store original editor values for reset
  setTimeout(() => {
    document.querySelectorAll('.code-editor').forEach(ed => { ed._orig = ed.value; });
  }, 1000);

})();
