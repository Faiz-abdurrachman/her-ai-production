(function() {
  'use strict';

  window.initNlpOverview = function() {
    const toc = document.getElementById('nlpToc');
    if (!toc || toc.dataset.ready) return;
    toc.dataset.ready = 'true';

    document.querySelectorAll('.ai-topic-item').forEach(item => {
      const link = item.querySelector('a');
      if (!link || item.dataset.clickReady) return;
      item.dataset.clickReady = 'true';
      item.addEventListener('click', (e) => {
        if (!e.target.closest('a, button, input, textarea')) {
          link.click();
        }
      });
    });

    const links = toc.querySelectorAll('.ai-toc-link');
    const modules = Array.from(document.querySelectorAll('.ai-module[id]'));
    const fill = document.getElementById('nlpProgressFill');
    const tocFill = document.getElementById('tocProgressFill');
    const tocPct = document.getElementById('tocProgressPct');

    function update() {
      const y = window.scrollY + 120;
      let ai = 0;
      modules.forEach((m, i) => { if (m.offsetTop <= y) ai = i; });
      links.forEach((l, i) => l.classList.toggle('active', i === ai));
      const pct = Math.round((ai / Math.max(1, modules.length - 1)) * 100);
      if (fill) fill.style.width = pct + '%';
      if (tocFill) tocFill.style.width = pct + '%';
      if (tocPct) tocPct.textContent = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    update();
  };
})();
