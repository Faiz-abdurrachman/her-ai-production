'use strict';

/* ═══ HerAI Pixel Anatomy — AI Lab port ═══ */

'use strict';



/* ── 5. Pixel canvas ─────────────────────────────────────────── */
function initPixelInspector() {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;
  const W = 280, H = 280;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const id  = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    id.data[i]   = Math.round((x / W) * 255);
    id.data[i+1] = Math.round((y / H) * 255);
    id.data[i+2] = Math.round(128 + 60 * Math.sin(x * .04) * Math.cos(y * .04));
    id.data[i+3] = 255;
  }
  ctx.putImageData(id, 0, 0);
  function hex2(n) { return n.toString(16).padStart(2,'0').toUpperCase(); }
  function inspect(cx, cy) {
    const r   = canvas.getBoundingClientRect();
    const px  = Math.min(W-1, Math.floor((cx - r.left) * (W / r.width)));
    const py  = Math.min(H-1, Math.floor((cy - r.top)  * (H / r.height)));
    const i   = (py * W + px) * 4;
    const R = id.data[i], G = id.data[i+1], B = id.data[i+2];
    const hx  = '#' + hex2(R) + hex2(G) + hex2(B);
    const lum = Math.round(.299*R + .587*G + .114*B);
    const sw  = document.getElementById('pxSwatch');
    if (sw) sw.style.background = hx;
    const s = (id, v) => { const e = document.getElementById(id); if(e) e.textContent = v; };
    s('pxPos', `(${px}, ${py})`); s('pxHex', hx); s('pxGray', lum);
    [['chR','chRv',R],['chG','chGv',G],['chB','chBv',B]].forEach(([f,v,val]) => {
      const fe = document.getElementById(f), ve = document.getElementById(v);
      if(fe) fe.style.width = (val/255*100)+'%'; if(ve) ve.textContent = val;
    });
  }
  canvas.addEventListener('mousemove', e => inspect(e.clientX, e.clientY));
  canvas.addEventListener('touchmove', e => { e.preventDefault(); inspect(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  const r0 = canvas.getBoundingClientRect();
  inspect(r0.left + r0.width/2, r0.top + r0.height/2);
}

/* ── 6. Coord canvas ─────────────────────────────────────────── */
function initPixelCoords() {
  const canvas = document.getElementById('coordCanvas');
  if (!canvas) return;
  const COLS = 9, ROWS = 5;
  function draw(hx=-1, hy=-1) {
    const rect = canvas.getBoundingClientRect();
    const W = Math.floor(rect.width), H = 200;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const cw = Math.floor(W/COLS), ch = Math.floor(H/ROWS);
    ctx.clearRect(0, 0, W, H);
    for (let row=0; row<ROWS; row++) for (let col=0; col<COLS; col++) {
      const act = col===hx && row===hy;
      ctx.fillStyle = act ? 'rgba(246,51,146,.12)' : 'transparent';
      ctx.fillRect(col*cw, row*ch, cw, ch);
      ctx.strokeStyle = 'rgba(246,51,146,.15)'; ctx.lineWidth = .5;
      ctx.strokeRect(col*cw, row*ch, cw, ch);
      ctx.font = act ? 'bold 11px monospace' : '10px monospace';
      ctx.fillStyle = act ? '#f63392' : 'rgba(23,24,39,.35)';
      ctx.textAlign = 'center';
      ctx.fillText(`${col},${row}`, col*cw+cw/2, row*ch+ch/2+4);
    }
    ctx.fillStyle = '#f63392'; ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'start'; ctx.fillText('x →', 6, 14);
    ctx.textAlign = 'center'; ctx.fillText('y ↓', 10, H-6);
  }
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    const col = Math.min(COLS-1, Math.floor((e.clientX-r.left)/r.width*COLS));
    const row = Math.min(ROWS-1, Math.floor((e.clientY-r.top)/r.height*ROWS));
    draw(col, row);
    const el = document.getElementById('coordReadout');
    if (el) el.textContent = `img[y=${row}, x=${col}]   →   (column=${col}, row=${row})`;
  });
  canvas.addEventListener('mouseleave', () => draw());
  draw(); window.addEventListener('resize', () => draw());
}

/* ── 7. RGB channel canvas ───────────────────────────────────── */
function initPixelRgb() {
  const canvas = document.getElementById('rgbCanvas');
  if (!canvas) return;
  function render() {
    const rect = canvas.getBoundingClientRect();
    const W = Math.floor(rect.width), H = 160;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const pw = Math.floor((W - 24) / 4);
    const fns = [(r,g,b)=>[r,g,b], (r,g,b)=>[r,0,0], (r,g,b)=>[0,g,0], (r,g,b)=>[0,0,b]];
    fns.forEach((fn, p) => {
      const id = ctx.createImageData(pw, H);
      const ox = p * (pw + 8);
      for (let y=0; y<H; y++) for (let x=0; x<pw; x++) {
        const i = (y*pw+x)*4;
        const r = Math.round((x/pw)*255), g = Math.round((y/H)*255);
        const b = Math.round(100+60*Math.sin(x*.05)*Math.cos(y*.05));
        const [cr,cg,cb] = fn(r,g,b);
        id.data[i]=cr; id.data[i+1]=cg; id.data[i+2]=cb; id.data[i+3]=255;
      }
      ctx.putImageData(id, ox, 0);
    });
  }
  render(); window.addEventListener('resize', render);
}

/* ── 8. Live calculator ──────────────────────────────────────── */
function rgbToHsv(r,g,b) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
  let h=0, s=max===0?0:d/max, v=max;
  if(d!==0){
    if(max===r) h=((g-b)/d)%6; else if(max===g) h=(b-r)/d+2; else h=(r-g)/d+4;
    h=Math.round(h*30); if(h<0)h+=180;
  }
  return [h, Math.round(s*255), Math.round(v*255)];
}
function rgbToLab(r,g,b) {
  let R=r/255,G=g/255,B=b/255;
  const lin=c=>c>.04045?Math.pow((c+.055)/1.055,2.4):c/12.92;
  R=lin(R); G=lin(G); B=lin(B);
  let X=(R*.4124+G*.3576+B*.1805)/.9505, Y=R*.2126+G*.7152+B*.0722;
  let Z=(R*.0193+G*.1192+B*.9505)/1.089;
  const f=t=>t>.008856?Math.cbrt(t):(7.787*t+16/116);
  return [Math.round(116*f(Y)-16), Math.round(500*(f(X)-f(Y))), Math.round(200*(f(Y)-f(Z)))];
}
window.updateCalc = function () {
  const r=+document.getElementById('slR').value, g=+document.getElementById('slG').value, b=+document.getElementById('slB').value;
  document.getElementById('svR').textContent=r; document.getElementById('svG').textContent=g; document.getElementById('svB').textContent=b;
  const prev=document.getElementById('calcPreview'); if(prev) prev.style.background=`rgb(${r},${g},${b})`;
  const h2=n=>n.toString(16).padStart(2,'0').toUpperCase();
  const gray=Math.round(.299*r+.587*g+.114*b);
  const [H,S,V]=rgbToHsv(r,g,b); const [L,la,lb]=rgbToLab(r,g,b);
  const cr=document.getElementById('calcResults');
  if(cr) cr.innerHTML=[['RGB',`(${r}, ${g}, ${b})`],['Hex',`#${h2(r)}${h2(g)}${h2(b)}`],
    ['Grayscale',gray],['HSV',`(${H}°, ${S}, ${V})`],
    ['Normalized',`(${(r/255).toFixed(2)}, ${(g/255).toFixed(2)}, ${(b/255).toFixed(2)})`],
    ['LAB',`L=${L}, a=${la}, b=${lb}`]
  ].map(([l,v])=>`<div class="cr-item"><div class="cr-label">${l}</div><div class="cr-val">${v}</div></div>`).join('');
  const ms=document.getElementById('mathSteps');
  if(ms) ms.innerHTML=`<span class="cm"># Grayscale — ITU-R BT.601</span>\ngray = 0.299 × ${r} + 0.587 × ${g} + 0.114 × ${b}\n     = ${(.299*r).toFixed(2)} + ${(.587*g).toFixed(2)} + ${(.114*b).toFixed(2)}\n     = ${(.299*r+.587*g+.114*b).toFixed(2)}\n     ≈ <strong style="color:var(--accent)">${gray}</strong>`;
};
if(document.getElementById('slR')) updateCalc();

/* ── 9. Pyodide ──────────────────────────────────────────────── */
let pyodide = null, pyReady = false;

async function initPyodide() {
  const status = document.getElementById('pyStatus');
  const overlay = document.getElementById('pyLoading');
  try {
    pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
    await pyodide.loadPackage(['numpy']);
    pyReady = true;
    if(status){ status.textContent = '<i class="fas fa-snake"></i> Python ready'; status.className = 'py-status ready'; }
    if(overlay) overlay.style.display = 'none';
    document.querySelectorAll('.run-btn').forEach(b => { b.disabled = false; b.title = ''; });
  } catch(e) {
    if(status){ status.textContent = '❌ Python failed'; status.className = 'py-status error'; }
    if(overlay) overlay.style.display = 'none';
    console.error('Pyodide error:', e);
  }
}
document.querySelectorAll('.run-btn').forEach(b => { b.disabled = true; b.title = 'Loading Python runtime...'; });
if (typeof loadPyodide !== "undefined") { initPyodide(); }

/* ── 10. Run code ────────────────────────────────────────────── */
window.runChallenge = async function(editorId, outputWrapId, checkId) {
  if (!pyReady) { alert('Python runtime still loading, please wait...'); return; }
  const code    = document.getElementById(editorId)?.value || '';
  const outWrap = document.getElementById(outputWrapId);
  const outPre  = document.getElementById(outputWrapId + '-pre');
  const checkEl = document.getElementById(checkId);
  const btn     = document.querySelector(`button[onclick*="${editorId}"]`);

  if(btn){ btn.textContent = '⏳ Running...'; btn.disabled = true; }

  const captureCode = `
import sys, io
_buf = io.StringIO()
sys.stdout = _buf
try:
${code.split('\n').map(l => '    ' + l).join('\n')}
finally:
    sys.stdout = sys.__stdout__
_buf.getvalue()
`;
  try {
    const result = await pyodide.runPythonAsync(captureCode);
    const output = String(result || '').trim();
    if(outWrap){ outWrap.style.display = 'block'; outWrap.classList.remove('is-error'); }
    if(outPre){ outPre.textContent = output || '(no output)'; outPre.style.color = ''; }
    if(checkId) autoCheck(checkId, output);
    PIXEL_updateFinalScore();
  } catch(err) {
    if(outWrap){ outWrap.style.display = 'block'; outWrap.classList.add('is-error'); }
    if(outPre){ outPre.textContent = 'Error:\n' + err.message; outPre.style.color = ''; }
    if(checkEl) checkEl.style.display = 'none';
  }
  if(btn){ btn.textContent = '▶ Run'; btn.disabled = false; }
};

/* ── 11. Auto-check ──────────────────────────────────────────── */
const EXPECTED = {
  'check-1':    'Shape: (100, 200, 3)\nDtype: uint8\nTotal pixels: 20000',
  'check-2':    'Pixel at (col=3, row=2): [60 61 62]\nHeight: 10, Width: 10\nCenter pixel: [150 151 152]',
  'check-3':    'Red pixel: [255   0   0]\nGreen pixel: [  0 255   0]\nR=100, G=150, B=200\nGrayscale: 172',
  'check-4':    'HSV of pure red: [ 0 255 255]\nHSV of pure green: [ 60 255 255]',
  'check-5':    'RGB: (64, 128, 200)\nGrayscale: 119\nNormalized R: 0.251',
  'cq-1-check': 'Red pixel: [255   0   0]\nGreen pixel: [  0 255   0]',
  'cq-2-check': 'Total pixels: 10000\nMean value: 127.51\nMin: 0\nMax: 255\nRed channel shape: (100, 100)',
  'cq-3-check': '[[ 76 149  29]\n [ 226 178 105]\n [ 255 128   0]]',
};
const passed = {};

function clean(s) {
  return s.replace(/\[\s*([\d\s]+)\s*\]/g, (m, nums) => '[' + nums.trim().split(/\s+/).join(' ') + ']').trim();
}

function autoCheck(checkId, output) {
  const el = document.getElementById(checkId);
  if(!el) return;
  const exp = EXPECTED[checkId];
  if(!exp){ el.style.display='none'; return; }
  const ok = clean(output) === clean(exp);
  passed[checkId] = ok;
  el.style.display = 'block';
  el.className = 'check-result show ' + (ok ? 'pass' : 'fail');
  el.innerHTML = ok
    ? '✅ Correct! Output matches expected.'
    : '❌ Not quite. Check the hint and try again.<br><small>Compare your output with the expected output below.</small>';
}

/* ── 12. Hint & reset ────────────────────────────────────────── */
window.toggleHint = function(id) {
  const el = document.getElementById(id);
  if(el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

const DEFAULTS = {
  1:`import numpy as np\n\n# Create a 100×200 color image (height=100, width=200)\nimg = np.zeros((___, ___, ___), dtype=np.uint8)\n\nprint("Shape:", ___.shape)\nprint("Dtype:", ___.___)\n\ntotal_pixels = ___ * ___\nprint("Total pixels:", total_pixels)`,
  2:`import numpy as np\n\nimg = np.arange(300, dtype=np.uint8).reshape(10, 10, 3)\n\npixel = img[___, ___]\nprint("Pixel at (col=3, row=2):", pixel)\n\nh, w = img.shape[___]\nprint(f"Height: {h}, Width: {w}")\n\ncenter = img[___, ___]\nprint("Center pixel:", center)`,
  3:`import numpy as np\n\nred_pixel = np.array([___, ___, ___], dtype=np.uint8)\nprint("Red pixel:", red_pixel)\n\ngreen_pixel = np.array([___, ___, ___], dtype=np.uint8)\nprint("Green pixel:", green_pixel)\n\npixel = np.array([100, 150, 200], dtype=np.uint8)\nr = pixel[___]; g = pixel[___]; b = pixel[___]\nprint(f"R={r}, G={g}, B={b}")\nprint("Grayscale:", int(0.299*r + 0.587*g + 0.114*b))`,
  4:`import numpy as np\n\ndef rgb_to_hsv_manual(r, g, b):\n    max_c = max(r, g, b)\n    min_c = min(r, g, b)\n    d = max_c - min_c\n    if d == 0: h = 0\n    elif max_c == r: h = (60 * ((g - b) / d)) % 360\n    elif max_c == g: h = 60 * ((b - r) / d + 2)\n    else: h = 60 * ((r - g) / d + 4)\n    s = 0 if max_c == 0 else d / max_c\n    v = max_c\n    return int(h/2), int(s*255), int(v*255)\n\nred_hsv = rgb_to_hsv_manual(___)\nprint("HSV of pure red:", np.array(red_hsv))\n\ngreen_hsv = rgb_to_hsv_manual(___)\nprint("HSV of pure green:", np.array(green_hsv))`,
  5:`import numpy as np\n\nr, g, b = 64, 128, 200\nprint(f"RGB: ({r}, {g}, {b})")\n\ngray = round(___ * r + ___ * g + ___ * b)\nprint("Grayscale:", gray)\n\nnorm_r = round(r / ___, 3)\nprint("Normalized R:", norm_r)`,
};
const CQ_DEFAULTS = {
  1:`import numpy as np\n\nimg = np.zeros((10, 10, 3), dtype=np.uint8)\nimg[3, 5] = [255, 0, 0]\nimg[7, 2] = [0, 255, 0]\n\n# BUG: row and col are swapped — fix these two lines\nred_pixel   = img[5, 3]\ngreen_pixel = img[2, 7]\n\nprint("Red pixel:", red_pixel)\nprint("Green pixel:", green_pixel)`,
  2:`import numpy as np\n\nnp.random.seed(42)\nimg = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)\n\ntotal = ___ * ___\nprint("Total pixels:", total)\n\nmean_val = round(float(img.___()),  2)\nprint("Mean value:", mean_val)\nprint("Min:", int(img.___()))\nprint("Max:", int(img.___()))\n\nr_shape = img[:, :, ___].shape\nprint("Red channel shape:", r_shape)`,
  3:`import numpy as np\n\nimg = np.array([\n    [[255, 0,   0  ], [0,   255, 0  ], [0,   0,   255]],\n    [[255, 255, 0  ], [0,   255, 255], [255, 0,   255]],\n    [[255, 255, 255], [128, 128, 128], [0,   0,   0  ]]\n], dtype=np.float32)\n\ngray = (___ * img[:,:,0] + ___ * img[:,:,1] + ___ * img[:,:,2])\ngray = gray.astype(np.uint8)\nprint(gray)`,
};

window.resetChallenge = function(editorId, num) {
  const ta = document.getElementById(editorId);
  if(ta && DEFAULTS[num]) ta.value = DEFAULTS[num];
  const outId = 'out-' + num;
  const out = document.getElementById(outId); if(out) out.style.display = 'none';
  const chk = document.getElementById('check-' + num); if(chk){ chk.style.display='none'; chk.className='check-result'; }
};
window.resetCodingQuiz = function(num) {
  const ta = document.getElementById(`cq-${num}-editor`);
  if(ta && CQ_DEFAULTS[num]) ta.value = CQ_DEFAULTS[num];
  const out = document.getElementById(`cq-${num}-out`); if(out) out.style.display='none';
  const chk = document.getElementById(`cq-${num}-check`); if(chk){ chk.style.display='none'; chk.className='check-result'; }
};

/* ── 13. Final score ─────────────────────────────────────────── */
function PIXEL_updateFinalScore() {
  const cqKeys = ['cq-1-check','cq-2-check','cq-3-check'];
  if(!cqKeys.every(k => passed[k] !== undefined)) return;
  const mcPassed = [1,2,3,4,5].filter(i => passed['check-'+i]).length;
  const cqPassed = cqKeys.filter(k => passed[k]).length;
  const card = document.getElementById('finalScore');
  const scEl = document.getElementById('fsScores');
  const msgEl = document.getElementById('fsMsg');
  if(!card) return;
  card.style.display = 'block';
  if(scEl) scEl.innerHTML =
    `<div class="fs-score-item"><span class="fs-score-num">${mcPassed}/5</span><span class="fs-score-lbl">Theory</span></div>` +
    `<div class="fs-score-divider"></div>` +
    `<div class="fs-score-item"><span class="fs-score-num">${cqPassed}/3</span><span class="fs-score-lbl">Coding</span></div>`;
  const total = mcPassed + cqPassed;
  if(msgEl) msgEl.textContent = total === 8 ? '<i class="fas fa-party-horn"></i> Perfect! Siap ke lesson berikutnya.' :
    total >= 6 ? '<i class="fas fa-thumbs-up"></i> Good work! Review soal yang salah.' : '<i class="fas fa-book"></i> Keep practicing — baca ulang section di atas.';
  if(cqPassed >= 2 && mcPassed >= 3) {
    const nl = document.getElementById('nextLesson');
    if(nl) nl.style.display = 'block';
  }
}

/* ── 14. MCQ Quiz ────────────────────────────────────────────── */
function initPixelRGB() {
  const container = document.getElementById('quizContainer');
  if(!container) return;
  const Qs = [
    { q:'What does <code>img.shape</code> return for a 480×640 color image?', opts:['(480, 640, 3)','(640, 480, 3)','(3, 480, 640)','(480, 640)'], ans:0, exp:'NumPy: [row, col, channel] — height first, then width, then channels.' },
    { q:'Why does OpenCV use BGR instead of RGB?', opts:['BGR is faster','Historical legacy from early cameras','BGR matches human perception','Memory alignment'], ans:1, exp:'BGR is a historical artifact from early cameras storing bytes in BGR order.' },
    { q:'Best color space to track a yellow ball under varying lighting?', opts:['RGB','LAB','HSV','Grayscale'], ans:2, exp:'HSV separates hue from brightness — lighting changes affect V but not H.' },
    { q:'Correct ITU-R BT.601 grayscale formula?', opts:['(R+G+B)/3','0.299R+0.587G+0.114B','0.333R+0.333G+0.333B','0.5R+0.25G+0.25B'], ans:1, exp:'Weighted formula matching human eye sensitivity — most sensitive to green.' },
    { q:'Pixel at column=100, row=50 in NumPy?', opts:['img[100, 50]','img[50, 100]','img[100][50]','img.pixel(100,50)'], ans:1, exp:'NumPy = img[row, col]. row=50 first, then col=100.' },
  ];
  let answered = new Array(Qs.length).fill(null);

  function render() {
    container.innerHTML = '';
    Qs.forEach((q, qi) => {
      const div = document.createElement('div');
      div.className = 'quiz-item';
      div.innerHTML = `<div class="quiz-q-num">Question ${qi+1} of ${Qs.length}</div>
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">${q.opts.map((o,oi)=>`
          <button class="quiz-opt ${answered[qi]!==null?(oi===q.ans?'correct':(oi===answered[qi]?'wrong':'muted')):''}"
                  onclick="answerQ(${qi},${oi})" ${answered[qi]!==null?'disabled':''}>
            <span class="quiz-opt-badge">${'ABCD'[oi]}</span>${o}
          </button>`).join('')}
        </div>
        <div class="quiz-feedback ${answered[qi]!==null?'show '+(answered[qi]===q.ans?'ok':'bad'):''}">
          ${answered[qi]!==null?(answered[qi]===q.ans?'✓ Correct! ':'✗ Not quite. ')+q.exp:''}
        </div>`;
      container.appendChild(div);
    });
  }

  window.answerQ = function(qi, oi) {
    if(answered[qi] !== null) return;
    answered[qi] = oi;
    passed['check-'+(qi+1)] = oi === Qs[qi].ans;
    render();
    PIXEL_updateFinalScore();
  };
  render();
}

/* ── 15. Section Prev/Next buttons ───────────────────────────── */
(function () {
  const secs = Array.from(document.querySelectorAll('.lesson-sec[id]'));
  const labels = {
    'sec-what':'What is a pixel?', 'sec-coords':'Coordinates',
    'sec-rgb':'RGB channels', 'sec-colorspaces':'Color spaces',
    'sec-math':'The math', 'sec-playground':'Full Playground', 'sec-quiz':'Quiz + Coding',
  };
  secs.forEach((sec, i) => {
    const prev = secs[i-1], next = secs[i+1];
    const nav = document.createElement('div');
    nav.className = 'sec-nav-buttons';
    if(prev) {
      const btn = document.createElement('a');
      btn.className = 'sec-nav-btn prev'; btn.href = '#'+prev.id;
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3L5 8l5 5"/></svg> ${labels[prev.id]||'Previous'}`;
      btn.addEventListener('click', e => { e.preventDefault(); prev.scrollIntoView({behavior:'smooth',block:'start'}); });
      nav.appendChild(btn);
    } else { nav.appendChild(document.createElement('span')); }
    if(next) {
      const btn = document.createElement('a');
      btn.className = 'sec-nav-btn next'; btn.href = '#'+next.id;
      btn.innerHTML = `${labels[next.id]||'Next'} <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3l5 5-5 5"/></svg>`;
      btn.addEventListener('click', e => { e.preventDefault(); next.scrollIntoView({behavior:'smooth',block:'start'}); });
      nav.appendChild(btn);
    }
    sec.appendChild(nav);
  });
})();

/* ── 16. Playground ──────────────────────────────────────────── */
const PIXEL_playgroundDefault = `import numpy as np

# Create a sample 5x5 RGB image
img = np.random.randint(0, 256, (5, 5, 3), dtype=np.uint8)

print("Image shape:", img.shape)
print("Image dtype:", img.dtype)
print("\\nFirst row of pixels:")
print(img[0])
print("\\nPixel at center (row=2, col=2):")
print(img[2, 2])

r_mean = img[:,:,0].mean()
g_mean = img[:,:,1].mean()
b_mean = img[:,:,2].mean()
print(f"\\nChannel means — R:{r_mean:.1f} G:{g_mean:.1f} B:{b_mean:.1f}")`;

const PIXEL_playgroundSnippets = {
  pixels: `import numpy as np

img = np.random.randint(0, 256, (10, 10, 3), dtype=np.uint8)
print("Shape:", img.shape)
print("First 3 pixels of first row:")
print(img[0, :3])`,
  channels: `import numpy as np

img = np.random.randint(0, 256, (4, 4, 3), dtype=np.uint8)
r = img[:,:,0]
g = img[:,:,1]
b = img[:,:,2]
print("Red channel:\\n", r)
print("\\nGreen channel:\\n", g)
print("\\nBlue channel:\\n", b)`,
  grayscale: `import numpy as np

img = np.random.randint(0, 256, (5, 5, 3), dtype=np.uint8)
gray = (0.299 * img[:,:,0] + 0.587 * img[:,:,1] + 0.114 * img[:,:,2]).astype(np.uint8)
print("Original shape:", img.shape)
print("Grayscale:\\n", gray)`,
  stats: `import numpy as np

img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)
print("Shape:", img.shape)
print("Mean:", img.mean())
print("Std:", img.std())
print("Min:", img.min())
print("Max:", img.max())
print("\\nPer channel means:")
print("R:", img[:,:,0].mean())
print("G:", img[:,:,1].mean())
print("B:", img[:,:,2].mean())`,
};

window.loadSnippet = function(name) {
  const ed = document.getElementById('playground-editor');
  if (ed && PIXEL_playgroundSnippets[name]) ed.value = PIXEL_playgroundSnippets[name];
};
window.runPlayground = async function() {
  const ed  = document.getElementById('playground-editor');
  const out = document.getElementById('pg-output-pre');
  if (!ed || !out) return;
  const wrap = out.closest('.output-wrap');
  if (wrap) { wrap.style.display = 'block'; wrap.classList.remove('is-error'); }
  out.textContent = 'Running\u2026';
  out.style.color = '';
  if (!pyReady) { out.textContent = 'Python runtime not ready yet\u2026'; return; }
  try {
    let stdout = '';
    pyodide.setStdout({ batched: (s) => { stdout += s + '\n'; } });
    await pyodide.runPythonAsync(ed.value);
    out.textContent = stdout || '(no output)';
  } catch(err) {
    if (wrap) wrap.classList.add('is-error');
    out.textContent = 'Error:\n' + err.message;
    out.style.color = '';
  }
};
window.resetPlayground = function() {
  const ed = document.getElementById('playground-editor');
  if (ed) ed.value = PIXEL_playgroundDefault;
  const out = document.getElementById('pg-output');
  if (out) out.style.display = 'none';
};
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (document.activeElement?.classList.contains('playground-editor')) {
      e.preventDefault();
      runPlayground();
    }
  }
});

/* ── Init ──────────────────────────────── */
window.initAiLabPixel = function() {
  var content = document.getElementById('pixel-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  document.querySelectorAll('.run-btn').forEach(b => { b.disabled = true; b.title = 'Loading Python runtime...'; });
  if (typeof initPixelInspector === 'function') initPixelInspector();
  if (typeof initPixelRgb === 'function') initPixelRgb();
  if (typeof initPixelCoords === 'function') initPixelCoords();
  if (typeof initPixelRGB === 'function') initPixelRGB();
  if (typeof initPixelColorSpaces === 'function') initPixelColorSpaces();
  if (typeof initPixelQuiz === 'function') initPixelQuiz();
  if (typeof initPyodide === 'function') initPyodide();
};
