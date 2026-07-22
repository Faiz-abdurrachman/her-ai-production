# Reinforcement Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-4.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 4 - 35 menit

#### Reinforcement Learning

Pertanyaan pembuka: apa risiko ketika reward tidak mewakili tujuan manusia?

##### ** Tujuan Pembelajaran

-   Memahami agent, environment, state, action, reward, policy, dan episode.
-   Membedakan reinforcement learning dari supervised learning.
-   Menjelaskan exploration, exploitation, Q-learning, DQN, dan self-play secara konseptual.

**

**Konsep Utama.** Reinforcement learning melatih agent mengambil tindakan berurutan untuk memaksimalkan reward jangka panjang, bukan hanya menebak label satu kali.

##### Inti Konsep

Agent mengamati state, memilih action, menerima reward, lalu memperbarui policy. Tantangannya adalah keputusan hari ini dapat memengaruhi hasil beberapa langkah ke depan.

Exploration berarti mencoba tindakan baru untuk belajar. Exploitation berarti memakai tindakan yang tampak terbaik berdasarkan pengalaman. Keduanya perlu seimbang.

Agent**Action**Environment**Reward + State**Policy Update

**

**Analogi.** Belajar RL seperti belajar strategi permainan. Kamu tidak hanya diberi jawaban benar, tetapi mendapat konsekuensi dari tindakan dan belajar dari rangkaian keputusan.

###### Contoh Nyata: robot navigasi

Robot mendapat reward saat mendekati target dan penalti saat menabrak penghalang.

###### Contoh Nyata: rekomendasi adaptif

Sistem dapat menyesuaikan rekomendasi berdasarkan respons peserta, tetapi reward harus hati-hati agar tidak mengejar klik saja.

##### Lebih Teknis

    observe state
    choose action using policy
    receive reward and next_state
    estimate future value
    update policy or q_value

Q-learning memperkirakan nilai tindakan pada state tertentu. DQN memakai neural network untuk memperkirakan Q-value. AlphaGo menunjukkan kekuatan self-play dan kombinasi supervised learning, reinforcement learning, serta search.

##### Kesalahan Umum

1.  Mengira reward sederhana selalu mewakili tujuan nyata.
2.  Mengabaikan eksplorasi sehingga agent terlalu cepat puas.
3.  Menganggap RL cocok untuk semua produk.
4.  Tidak memeriksa dampak jangka panjang.

##### Mini-check

Untuk asisten belajar, apa state, action, reward, dan risiko reward hacking yang mungkin muncul?

##### Ringkasan

-   RL cocok untuk keputusan berurutan.
-   Reward shaping sangat menentukan perilaku agent.
-   Exploration dan exploitation harus seimbang.

##### Glossary

Policy  
Strategi agent memilih tindakan.

Reward  
Sinyal umpan balik untuk tindakan agent.

Q-value  
Perkiraan nilai tindakan pada state tertentu.

##### Referensi

1.  Watkins and Dayan, *Q-learning*, 1992.
2.  Sutton and Barto, *Reinforcement Learning: An Introduction*.
3.  Mnih et al., *Human-level Control through Deep Reinforcement Learning*, 2015.
4.  Silver et al., *Mastering the Game of Go with Deep Neural Networks and Tree Search*, 2016.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evolution-chapter"><header class="ai-evolution-chapter-head"><span>Chapter 4 - 35 menit</span><h2>Reinforcement Learning</h2><p>Pertanyaan pembuka: apa risiko ketika reward tidak mewakili tujuan manusia?</p></header><section class="ai-evolution-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Memahami agent, environment, state, action, reward, policy, dan episode.</li><li>Membedakan reinforcement learning dari supervised learning.</li><li>Menjelaskan exploration, exploitation, Q-learning, DQN, dan self-play secara konseptual.</li></ul></section><section class="ai-evolution-callout"><i class="fas fa-route"></i><div><strong>Konsep Utama.</strong> Reinforcement learning melatih agent mengambil tindakan berurutan untuk memaksimalkan reward jangka panjang, bukan hanya menebak label satu kali.</div></section><section class="ai-evolution-section"><h3>Inti Konsep</h3><p>Agent mengamati state, memilih action, menerima reward, lalu memperbarui policy. Tantangannya adalah keputusan hari ini dapat memengaruhi hasil beberapa langkah ke depan.</p><p>Exploration berarti mencoba tindakan baru untuk belajar. Exploitation berarti memakai tindakan yang tampak terbaik berdasarkan pengalaman. Keduanya perlu seimbang.</p><div class="ai-evolution-flow"><span>Agent</span><i class="fas fa-arrow-right"></i><span>Action</span><i class="fas fa-arrow-right"></i><span>Environment</span><i class="fas fa-arrow-right"></i><span>Reward + State</span><i class="fas fa-arrow-right"></i><span>Policy Update</span></div></section><section class="ai-evolution-callout"><i class="fas fa-compass"></i><div><strong>Analogi.</strong> Belajar RL seperti belajar strategi permainan. Kamu tidak hanya diberi jawaban benar, tetapi mendapat konsekuensi dari tindakan dan belajar dari rangkaian keputusan.</div></section><section class="ai-evolution-grid"><article><h4>Contoh Nyata: robot navigasi</h4><p>Robot mendapat reward saat mendekati target dan penalti saat menabrak penghalang.</p></article><article><h4>Contoh Nyata: rekomendasi adaptif</h4><p>Sistem dapat menyesuaikan rekomendasi berdasarkan respons peserta, tetapi reward harus hati-hati agar tidak mengejar klik saja.</p></article></section><section class="ai-evolution-section"><h3>Lebih Teknis</h3><pre><code>observe state
choose action using policy
receive reward and next_state
estimate future value
update policy or q_value</code></pre><p>Q-learning memperkirakan nilai tindakan pada state tertentu. DQN memakai neural network untuk memperkirakan Q-value. AlphaGo menunjukkan kekuatan self-play dan kombinasi supervised learning, reinforcement learning, serta search.</p></section><section class="ai-evolution-section"><h3>Kesalahan Umum</h3><ol><li>Mengira reward sederhana selalu mewakili tujuan nyata.</li><li>Mengabaikan eksplorasi sehingga agent terlalu cepat puas.</li><li>Menganggap RL cocok untuk semua produk.</li><li>Tidak memeriksa dampak jangka panjang.</li></ol></section><section class="ai-evolution-check"><h3>Mini-check</h3><p>Untuk asisten belajar, apa state, action, reward, dan risiko reward hacking yang mungkin muncul?</p></section><section class="ai-evolution-section"><h3>Ringkasan</h3><ul><li>RL cocok untuk keputusan berurutan.</li><li>Reward shaping sangat menentukan perilaku agent.</li><li>Exploration dan exploitation harus seimbang.</li></ul></section><section class="ai-evolution-glossary"><h3>Glossary</h3><dl><dt>Policy</dt><dd>Strategi agent memilih tindakan.</dd><dt>Reward</dt><dd>Sinyal umpan balik untuk tindakan agent.</dd><dt>Q-value</dt><dd>Perkiraan nilai tindakan pada state tertentu.</dd></dl></section><section class="ai-evolution-references"><h3>Referensi</h3><ol><li>Watkins and Dayan, <em>Q-learning</em>, 1992.</li><li>Sutton and Barto, <em>Reinforcement Learning: An Introduction</em>.</li><li>Mnih et al., <em>Human-level Control through Deep Reinforcement Learning</em>, 2015.</li><li>Silver et al., <em>Mastering the Game of Go with Deep Neural Networks and Tree Search</em>, 2016.</li></ol></section></article>

````
