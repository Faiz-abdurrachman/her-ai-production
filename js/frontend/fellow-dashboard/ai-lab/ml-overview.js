(function() {
  'use strict';

  window.initMlOverview = function() {
    const toc = document.getElementById('mlToc');
    if (!toc || toc.dataset.ready) return;
    toc.dataset.ready = 'true';

    // Make topic cards clickable
    document.querySelectorAll('.topic-item').forEach(item => {
      const link = item.querySelector('a');
      if (!link || item.dataset.clickReady) return;
      item.dataset.clickReady = 'true';
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        if (!e.target.closest('a, button, input, textarea')) {
          link.click();
        }
      });
    });

    // TOC scroll-spy (ML uses .module class)
    const links = toc.querySelectorAll('.ai-toc-link');
    const modules = Array.from(document.querySelectorAll('.module[id]'));
    const fill = document.getElementById('mlProgressFill');
    const tocFill = document.getElementById('mlTocProgressFill');
    const tocPct = document.getElementById('mlTocProgressPct');

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

    // Scroll reveal animation
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.ml-reveal').forEach(el => io.observe(el));

    update();
  };
})();
