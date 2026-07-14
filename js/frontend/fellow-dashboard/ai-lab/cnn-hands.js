'use strict';

/* ═══ HerAI CNN Hands-on — AI Lab port ═══ */

function initCnnHandsCodeCopy() {
  document.querySelectorAll('.cb-copy').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = btn.getAttribute('data-target');
      var pre = document.getElementById(targetId);
      if (!pre) return;
      var text = pre.textContent || pre.innerText;
      navigator.clipboard.writeText(text.trim()).then(function() {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#34c759';
        setTimeout(function() { btn.textContent = orig; btn.style.color = ''; }, 1800);
      }).catch(function() {
        var range = document.createRange();
        range.selectNodeContents(pre);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      });
    });
  });
}

function initCnnHandsTrainingAnim() {
  var outputEl = document.querySelector('.output-preview');
  if (!outputEl) return;

  var LINES = [
    'Epoch  5 | Train loss: 1.312 acc: 52.1% | Val loss: 1.198 acc: 57.3%',
    'Epoch 10 | Train loss: 1.089 acc: 61.5% | Val loss: 1.054 acc: 62.8%',
    'Epoch 20 | Train loss: 0.872 acc: 69.4% | Val loss: 0.891 acc: 69.1%',
    'Epoch 30 | Train loss: 0.751 acc: 74.1% | Val loss: 0.812 acc: 72.4%',
    'Epoch 50 | Train loss: 0.624 acc: 78.3% | Val loss: 0.756 acc: 75.2%',
  ];

  var animated = false;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !animated) {
        animated = true;
        outputEl.textContent = '';
        var i = 0;
        function addLine() {
          if (i >= LINES.length) return;
          outputEl.textContent += (i > 0 ? '\n' : '') + LINES[i];
          i++;
          setTimeout(addLine, 320);
        }
        setTimeout(addLine, 400);
        io.unobserve(outputEl);
      }
    });
  }, { threshold: 0.4 });
  io.observe(outputEl);
}

/* ── Init ──────────────────────────────── */
window.initAiLabCnnHands = function() {
  var content = document.getElementById('cnn-hands-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
  if (typeof initCnnHandsCodeCopy === 'function') initCnnHandsCodeCopy();
  if (typeof initCnnHandsTrainingAnim === 'function') initCnnHandsTrainingAnim();
};
