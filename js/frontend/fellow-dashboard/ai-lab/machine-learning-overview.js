(function() {
  'use strict';

  window.initMachineLearningOverview = function() {
    const toc = document.getElementById('mlToc');
    if (!toc || toc.dataset.ready) return;
    toc.dataset.ready = 'true';

    const links = toc.querySelectorAll('.ai-toc-link');
    const modules = Array.from(document.querySelectorAll('#mlContent .ai-module[id]'));
    const fill = document.getElementById('mlProgressFill');
    const tocFill = document.getElementById('mlTocProgressFill');
    const tocPct = document.getElementById('mlTocProgressPct');

    document.querySelectorAll('.ml-overview .ai-topic-item.is-linked').forEach(item => {
      const link = item.querySelector('a');
      if (!link || item.dataset.clickReady) return;
      item.dataset.clickReady = 'true';
      item.addEventListener('click', event => {
        if (!event.target.closest('a, button, input, textarea')) {
          link.click();
        }
      });
    });

    function update() {
      const y = window.scrollY + 120;
      let activeIndex = 0;
      modules.forEach((module, index) => {
        if (module.offsetTop <= y) activeIndex = index;
      });

      links.forEach((link, index) => link.classList.toggle('active', index === activeIndex));
      const pct = Math.round((activeIndex / Math.max(1, modules.length - 1)) * 100);
      if (fill) fill.style.width = pct + '%';
      if (tocFill) tocFill.style.width = pct + '%';
      if (tocPct) tocPct.textContent = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });

    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    update();
  };
})();
