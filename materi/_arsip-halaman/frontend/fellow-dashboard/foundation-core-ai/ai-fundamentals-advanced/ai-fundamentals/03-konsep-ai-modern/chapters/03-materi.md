# AI Agents: Dari Model yang Menjawab ke Sistem yang Bertindak

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/03-materi.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Topik 3 · 30 menit

#### AI Agents: Dari Model yang Menjawab ke Sistem yang Bertindak

Agent AI mengubah model dari mesin respons menjadi sistem yang dapat memilih tindakan, memakai tool, memperbarui state, dan berhenti saat tujuan tercapai.

**Tujuan pembelajaran**

-   Membedakan model call, chatbot, workflow, agent, dan multi-agent.
-   Memahami agent loop, tool schema, state, memory, handoff, dan human approval.
-   Mengenali kegagalan tool use dan risiko autonomy.

**

**Pertanyaan pemantik:** Jika tugas harus membaca formulir, mengecek jadwal, membuat draft pesan, dan meminta approval staf, bagian mana yang harus deterministic workflow dan bagian mana yang boleh memakai agent?

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Bentuk sistem
Karakteristik
Kapan dipakai</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Model call
Satu input, satu output
Tugas sederhana dan stateless</td>
<td align="left">Chatbot
Model call dengan conversation state
Percakapan tanya jawab</td>
<td align="left">Workflow
Langkah ditentukan developer
Proses patuh aturan dan berulang</td>
</tr>
</tbody>
</table>

Tidak semua aplikasi AI memerlukan agent. Untuk proses sensitif seperti mengubah status peserta, workflow deterministik dengan approval manusia lebih aman daripada agent bebas.

##### Agent Loop

GoalObserve contextDecide actionCall tool / respondReceive resultUpdate stateCheck completion

Agent loop harus punya stopping condition. Tanpa batas iterasi, budget, atau kriteria selesai, agent bisa mengulang tool call, menghabiskan biaya, atau melakukan tindakan yang tidak perlu.

**

**Analogi sederhana**

Agent seperti asisten operasional. Ia membaca tujuan, melihat data yang tersedia, memilih alat, mencatat hasil, lalu memutuskan apakah tugas selesai atau harus eskalasi ke manusia.

##### Tools dan Function Calling

Tool yang baik perlu nama jelas, deskripsi, JSON schema, parameter wajib, validasi, error handling, idempotency, authorization, dan audit log. Tool call bukan jaminan jawaban benar; agent masih bisa salah memilih tool, mengisi parameter salah, mengabaikan error, atau membaca hasil secara keliru.

``` {.ai-modern-code}
{
  "name": "get_fellowship_schedule",
  "description": "Mengambil jadwal fellowship berdasarkan tanggal",
  "parameters": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "Tanggal dengan format YYYY-MM-DD"
      }
    },
    "required": ["date"]
  }
}
```

Contoh ini hanya simulasi schema. Jangan membuat request provider atau menyimpan secret langsung dari frontend.

##### Planning, State, Memory, dan Handoff

###### Fixed workflow

Aman untuk proses yang harus konsisten, misalnya validasi field wajib.

###### Model-generated plan

Berguna untuk tugas terbuka, tetapi perlu batas dan review.

###### Dynamic replanning

Agent mengubah rencana setelah menerima hasil tool.

###### Planner-executor

Satu komponen membuat rencana, komponen lain mengeksekusi langkah.

State dan memory mencakup conversation context, short-term state, long-term memory, user profile, database eksternal, vector retrieval, dan artifact/file state. Privasi, retention, consent, dan stale memory harus dijelaskan pada user.

Multi-agent dapat memakai manager agent, specialist agent, agent-as-tool, sequential collaboration, atau parallel collaboration. Namun multi-agent tidak otomatis lebih baik; biaya, koordinasi, debugging, dan observability menjadi lebih sulit.

##### Guardrails, Human-in-the-Loop, dan Observability

**Butuh approval**Mengirim email massal, menghapus data, transaksi, mengubah status peserta, publikasi pengumuman.

**Guardrail**Input validation, output validation, tool permission, spending limit, scope restriction.

**Observability**Tracing, tool-call logs, latency, token usage, task success, recovery rate.

**Recovery**Fallback, retry terbatas, escalation, rollback, human review.

> "reasoning and acting" Yao et al., 2022

Maknanya: agent menghubungkan proses berpikir dengan tindakan. Karena tindakannya bisa berdampak nyata, governance dan approval bukan tambahan kosmetik.

##### Studi Platform Agent

OpenAI Agents SDK dapat dipahami lewat konsep agents, tools, handoffs, guardrails, sessions, tracing, dan human-in-the-loop. Anthropic tool use menekankan structured tool call, tool result round trip, schema, tool choice, serta MCP untuk integrasi context/tool. Google ADK menekankan tool-enabled agents, graph workflow, sequential/loop/parallel workflow, sessions, memory, evaluation, observability, dan deployment. LangChain/LangGraph membantu memodelkan state, middleware, guardrail, human-in-the-loop, dan explicit graph untuk workflow kompleks.

****Common mistakes:** menjadikan semua workflow sebagai agent, memberi tool berbahaya tanpa approval, tidak mencatat trace, dan tidak membedakan memory jangka pendek dengan database resmi.

Belajar Aktif

##### Quick Check: workflow atau agent?

Sistem membaca formulir, memvalidasi kelengkapan, meminta approval staf, lalu mengirim pemberitahuan. Pilih bagian deterministic dan bagian agentic.

Tampilkan feedback

Validasi field, approval, dan pengiriman final sebaiknya deterministic. Model/agent cocok untuk ekstraksi isi formulir, menyusun draft pesan, menjelaskan kekurangan, atau memilih tool pembantu dengan batas izin.

##### Mini Challenge

Rancang agent layanan fellowship dengan satu goal, dua tools, tool schema, stopping condition, satu guardrail, satu approval manusia, dua failure modes, dan logging yang dibutuhkan. Latihan nomor 7 dan 8 akan membantumu menyusunnya lebih lengkap.

**Ringkasan:** agent berguna saat tugas dinamis membutuhkan tool dan keputusan bertahap, tetapi workflow deterministik tetap lebih aman untuk proses yang berdampak langsung.

Tool calling  
Mekanisme model meminta sistem menjalankan fungsi eksternal.

State  
Kondisi kerja yang dipakai agent untuk melanjutkan tugas.

Handoff  
Perpindahan tugas ke agent lain atau manusia.

**Referensi:** Yao et al. (2022), Schick et al. (2023), OpenAI Agents SDK documentation, Anthropic tool use documentation, Google ADK documentation, LangGraph documentation.

[Lanjut ke Sistem AI Masa Kini **](javascript:void(0))

## Lampiran Sumber HTML Lengkap

````html
<div class="chapter-content fade-in ai-modern-chapter">
    <header class="ai-modern-chapter-hero">
        <span>Topik 3 · 30 menit</span>
        <h2>AI Agents: Dari Model yang Menjawab ke Sistem yang Bertindak</h2>
        <p>Agent AI mengubah model dari mesin respons menjadi sistem yang dapat memilih tindakan, memakai tool, memperbarui state, dan berhenti saat tujuan tercapai.</p>
        <div class="ai-modern-objectives">
            <strong>Tujuan pembelajaran</strong>
            <ul>
                <li>Membedakan model call, chatbot, workflow, agent, dan multi-agent.</li>
                <li>Memahami agent loop, tool schema, state, memory, handoff, dan human approval.</li>
                <li>Mengenali kegagalan tool use dan risiko autonomy.</li>
            </ul>
        </div>
    </header>

    <section class="ai-modern-section">
        <div class="ai-modern-question"><i class="fas fa-circle-question"></i><p><strong>Pertanyaan pemantik:</strong> Jika tugas harus membaca formulir, mengecek jadwal, membuat draft pesan, dan meminta approval staf, bagian mana yang harus deterministic workflow dan bagian mana yang boleh memakai agent?</p></div>
        <div class="ai-modern-table-wrap">
            <table class="ai-modern-table">
                <thead><tr><th>Bentuk sistem</th><th>Karakteristik</th><th>Kapan dipakai</th></tr></thead>
                <tbody>
                    <tr><td>Model call</td><td>Satu input, satu output</td><td>Tugas sederhana dan stateless</td></tr>
                    <tr><td>Chatbot</td><td>Model call dengan conversation state</td><td>Percakapan tanya jawab</td></tr>
                    <tr><td>Workflow</td><td>Langkah ditentukan developer</td><td>Proses patuh aturan dan berulang</td></tr>
                    <tr><td>Agent</td><td>Model memilih tindakan/tool dalam loop</td><td>Tugas dinamis dengan beberapa jalur</td></tr>
                    <tr><td>Multi-agent</td><td>Beberapa agent dengan pembagian peran</td><td>Workflow kompleks yang butuh spesialisasi</td></tr>
                </tbody>
            </table>
        </div>
        <p>Tidak semua aplikasi AI memerlukan agent. Untuk proses sensitif seperti mengubah status peserta, workflow deterministik dengan approval manusia lebih aman daripada agent bebas.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Agent Loop</h3>
        <div class="ai-modern-pipeline ai-modern-agent-loop"><span>Goal</span><span>Observe context</span><span>Decide action</span><span>Call tool / respond</span><span>Receive result</span><span>Update state</span><span>Check completion</span></div>
        <p>Agent loop harus punya stopping condition. Tanpa batas iterasi, budget, atau kriteria selesai, agent bisa mengulang tool call, menghabiskan biaya, atau melakukan tindakan yang tidak perlu.</p>
        <div class="ai-modern-callout"><i class="fas fa-lightbulb"></i><div><strong>Analogi sederhana</strong><p>Agent seperti asisten operasional. Ia membaca tujuan, melihat data yang tersedia, memilih alat, mencatat hasil, lalu memutuskan apakah tugas selesai atau harus eskalasi ke manusia.</p></div></div>
    </section>

    <section class="ai-modern-section">
        <h3>Tools dan Function Calling</h3>
        <p>Tool yang baik perlu nama jelas, deskripsi, JSON schema, parameter wajib, validasi, error handling, idempotency, authorization, dan audit log. Tool call bukan jaminan jawaban benar; agent masih bisa salah memilih tool, mengisi parameter salah, mengabaikan error, atau membaca hasil secara keliru.</p>
        <pre class="ai-modern-code"><code>{
  "name": "get_fellowship_schedule",
  "description": "Mengambil jadwal fellowship berdasarkan tanggal",
  "parameters": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "Tanggal dengan format YYYY-MM-DD"
      }
    },
    "required": ["date"]
  }
}</code></pre>
        <p>Contoh ini hanya simulasi schema. Jangan membuat request provider atau menyimpan secret langsung dari frontend.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Planning, State, Memory, dan Handoff</h3>
        <div class="ai-modern-card-grid">
            <article><h4>Fixed workflow</h4><p>Aman untuk proses yang harus konsisten, misalnya validasi field wajib.</p></article>
            <article><h4>Model-generated plan</h4><p>Berguna untuk tugas terbuka, tetapi perlu batas dan review.</p></article>
            <article><h4>Dynamic replanning</h4><p>Agent mengubah rencana setelah menerima hasil tool.</p></article>
            <article><h4>Planner-executor</h4><p>Satu komponen membuat rencana, komponen lain mengeksekusi langkah.</p></article>
        </div>
        <p>State dan memory mencakup conversation context, short-term state, long-term memory, user profile, database eksternal, vector retrieval, dan artifact/file state. Privasi, retention, consent, dan stale memory harus dijelaskan pada user.</p>
        <p>Multi-agent dapat memakai manager agent, specialist agent, agent-as-tool, sequential collaboration, atau parallel collaboration. Namun multi-agent tidak otomatis lebih baik; biaya, koordinasi, debugging, dan observability menjadi lebih sulit.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Guardrails, Human-in-the-Loop, dan Observability</h3>
        <div class="ai-modern-comparison">
            <article><strong>Butuh approval</strong><span>Mengirim email massal, menghapus data, transaksi, mengubah status peserta, publikasi pengumuman.</span></article>
            <article><strong>Guardrail</strong><span>Input validation, output validation, tool permission, spending limit, scope restriction.</span></article>
            <article><strong>Observability</strong><span>Tracing, tool-call logs, latency, token usage, task success, recovery rate.</span></article>
            <article><strong>Recovery</strong><span>Fallback, retry terbatas, escalation, rollback, human review.</span></article>
        </div>
        <blockquote class="ai-modern-quote">"reasoning and acting" <cite>Yao et al., 2022</cite></blockquote>
        <p>Maknanya: agent menghubungkan proses berpikir dengan tindakan. Karena tindakannya bisa berdampak nyata, governance dan approval bukan tambahan kosmetik.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Studi Platform Agent</h3>
        <p>OpenAI Agents SDK dapat dipahami lewat konsep agents, tools, handoffs, guardrails, sessions, tracing, dan human-in-the-loop. Anthropic tool use menekankan structured tool call, tool result round trip, schema, tool choice, serta MCP untuk integrasi context/tool. Google ADK menekankan tool-enabled agents, graph workflow, sequential/loop/parallel workflow, sessions, memory, evaluation, observability, dan deployment. LangChain/LangGraph membantu memodelkan state, middleware, guardrail, human-in-the-loop, dan explicit graph untuk workflow kompleks.</p>
        <div class="ai-modern-warning"><i class="fas fa-triangle-exclamation"></i><span><strong>Common mistakes:</strong> menjadikan semua workflow sebagai agent, memberi tool berbahaya tanpa approval, tidak mencatat trace, dan tidak membedakan memory jangka pendek dengan database resmi.</span></div>
    </section>

    <section class="ai-modern-active" data-modern-check="agent-workflow">
        <div><span>Belajar Aktif</span><h3>Quick Check: workflow atau agent?</h3><p>Sistem membaca formulir, memvalidasi kelengkapan, meminta approval staf, lalu mengirim pemberitahuan. Pilih bagian deterministic dan bagian agentic.</p></div>
        <button type="button" data-modern-reveal>Tampilkan feedback</button>
        <p class="ai-modern-feedback" hidden>Validasi field, approval, dan pengiriman final sebaiknya deterministic. Model/agent cocok untuk ekstraksi isi formulir, menyusun draft pesan, menjelaskan kekurangan, atau memilih tool pembantu dengan batas izin.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Mini Challenge</h3>
        <p>Rancang agent layanan fellowship dengan satu goal, dua tools, tool schema, stopping condition, satu guardrail, satu approval manusia, dua failure modes, dan logging yang dibutuhkan. Latihan nomor 7 dan 8 akan membantumu menyusunnya lebih lengkap.</p>
        <div class="ai-modern-summary"><strong>Ringkasan:</strong> agent berguna saat tugas dinamis membutuhkan tool dan keputusan bertahap, tetapi workflow deterministik tetap lebih aman untuk proses yang berdampak langsung.</div>
        <dl class="ai-modern-glossary"><dt>Tool calling</dt><dd>Mekanisme model meminta sistem menjalankan fungsi eksternal.</dd><dt>State</dt><dd>Kondisi kerja yang dipakai agent untuk melanjutkan tugas.</dd><dt>Handoff</dt><dd>Perpindahan tugas ke agent lain atau manusia.</dd></dl>
        <p class="ai-modern-references"><strong>Referensi:</strong> Yao et al. (2022), Schick et al. (2023), OpenAI Agents SDK documentation, Anthropic tool use documentation, Google ADK documentation, LangGraph documentation.</p>
        <a class="ai-modern-cta" href="javascript:void(0)" onclick="window.loadModernChapter(4)">Lanjut ke Sistem AI Masa Kini <i class="fas fa-arrow-right"></i></a>
    </section>
</div>

````
