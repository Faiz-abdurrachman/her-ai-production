# Sumber Dinamis: ml-intro.js

> Sumber: `js/frontend/fellow-dashboard/ai-lab/ml-intro.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
'use strict';

/* ═══ HerAI ML Intro — AI Lab port ═══ */

window.initAiLabMlIntro = function() {
  var content = document.getElementById('mlintro-content');
  if (!content || content.dataset.ready) return;
  content.dataset.ready = 'true';
};

````
