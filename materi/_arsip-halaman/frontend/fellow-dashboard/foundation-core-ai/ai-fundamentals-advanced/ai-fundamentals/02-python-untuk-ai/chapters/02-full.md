# Chapter 2 — Development Environment

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 2 — Development Environment

#### Learning Objectives

-   Mengenali Python, terminal, VS Code, virtual environment, Jupyter, dan Colab.
-   Menjalankan program `.py` dan cell notebook.
-   Mengelola package dasar dengan `pip` dan `requirements.txt`.

#### Kenapa Materi Ini Penting?

Kode yang benar tetap tidak berjalan jika environment salah. Banyak pemula mengira error instalasi adalah kegagalan coding, padahal masalahnya hanya lokasi file, interpreter, atau package.

#### Hubungan dengan AI

Project AI memakai banyak library. Environment menjaga versi dan dependency satu project agar tidak bertabrakan dengan project lain.

#### Analogi

Virtual environment seperti kotak alat khusus untuk satu project. Kamu tidak mencampur alat project kampus dengan alat project kerja.

#### Penjelasan Konsep

-   **Python:** interpreter yang menjalankan kode.
-   **Terminal:** tempat memberi perintah kepada komputer.
-   **VS Code:** editor untuk file `.py` dan project.
-   **Virtual environment:** ruang dependency terisolasi.
-   **Jupyter Notebook:** dokumen berisi cell kode dan penjelasan; cocok untuk eksplorasi data.
-   **Google Colab:** notebook di browser dengan environment siap pakai dan opsi akselerator seperti GPU. Ketersediaan dan batas GPU dapat berubah; GPU juga belum dibutuhkan di modul ini.

File `.py` cocok untuk program yang ingin dijalankan ulang sebagai satu kesatuan. Notebook cocok untuk eksperimen bertahap, visualisasi, dan catatan belajar. Kode produksi biasanya perlu dipindahkan dari eksperimen notebook menjadi modul yang lebih terstruktur.

#### Visual Thinking

    Folder project
    ├── .venv/            environment lokal
    ├── data/             dataset
    ├── notebooks/        eksplorasi
    ├── src/              file .py
    └── requirements.txt  daftar package

#### Contoh Nyata

Kamu memakai Pandas versi tertentu untuk tugas kelas. Virtual environment memastikan project lain tidak ikut berubah saat package dipasang.

#### Contoh AI

Notebook sering dipakai untuk mengeksplorasi dataset sebelum pipeline data dibuat lebih terstruktur.

#### Kode Python

    python -m venv .venv

    # macOS/Linux
    source .venv/bin/activate

    # Windows PowerShell
    .venv\Scripts\Activate.ps1

    python -m pip install numpy pandas
    python -m pip freeze > requirements.txt
    python app.py

#### Penjelasan Kode Baris per Baris

1.  `python -m venv .venv` membuat environment.
2.  Perintah `activate` memilih environment tersebut.
3.  `python -m pip install` memasang package pada interpreter aktif.
4.  `pip freeze` mencatat package dan versinya.
5.  `python app.py` menjalankan file program.

#### Common Mistakes

-   Menjalankan `pip` dari interpreter berbeda.
-   Meng-commit folder `.venv`.
-   Menganggap cell notebook selalu berjalan dari atas ke bawah; cell dapat dieksekusi dalam urutan berbeda.

#### Best Practices

-   Gunakan satu virtual environment per project.
-   Jalankan notebook dari awal secara berkala untuk menguji urutan cell.
-   Simpan dependency penting dalam `requirements.txt`.

#### Mini Challenge

Buat folder project, virtual environment, file `hello.py`, lalu jalankan dari terminal. Jika memakai Colab, buat notebook dan jalankan `print("Environment siap")`.

#### Ringkasan

Environment yang rapi membuat eksperimen dapat diulang dan mengurangi konflik dependency.

#### Persiapan Chapter Berikutnya

Setelah ruang kerja siap, kita belajar memecah masalah seperti komputer: input, process, output.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 2 — Development Environment</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Mengenali Python, terminal, VS Code, virtual environment, Jupyter, dan Colab.</li>
<li>Menjalankan program <code>.py</code> dan cell notebook.</li>
<li>Mengelola package dasar dengan <code>pip</code> dan <code>requirements.txt</code>.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Kode yang benar tetap tidak berjalan jika environment salah. Banyak pemula mengira error instalasi adalah kegagalan coding, padahal masalahnya hanya lokasi file, interpreter, atau package.</p>
<h2>Hubungan dengan AI</h2>
<p>Project AI memakai banyak library. Environment menjaga versi dan dependency satu project agar tidak bertabrakan dengan project lain.</p>
<h2>Analogi</h2>
<p>Virtual environment seperti kotak alat khusus untuk satu project. Kamu tidak mencampur alat project kampus dengan alat project kerja.</p>
<h2>Penjelasan Konsep</h2>
<ul>
<li><strong>Python:</strong> interpreter yang menjalankan kode.</li>
<li><strong>Terminal:</strong> tempat memberi perintah kepada komputer.</li>
<li><strong>VS Code:</strong> editor untuk file <code>.py</code> dan project.</li>
<li><strong>Virtual environment:</strong> ruang dependency terisolasi.</li>
<li><strong>Jupyter Notebook:</strong> dokumen berisi cell kode dan penjelasan; cocok untuk eksplorasi data.</li>
<li><strong>Google Colab:</strong> notebook di browser dengan environment siap pakai dan opsi akselerator seperti GPU. Ketersediaan dan batas GPU dapat berubah; GPU juga belum dibutuhkan di modul ini.</li>
</ul>
<p>File <code>.py</code> cocok untuk program yang ingin dijalankan ulang sebagai satu kesatuan. Notebook cocok untuk eksperimen bertahap, visualisasi, dan catatan belajar. Kode produksi biasanya perlu dipindahkan dari eksperimen notebook menjadi modul yang lebih terstruktur.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">Folder project
├── .venv/            environment lokal
├── data/             dataset
├── notebooks/        eksplorasi
├── src/              file .py
└── requirements.txt  daftar package
</code></pre>
<h2>Contoh Nyata</h2>
<p>Kamu memakai Pandas versi tertentu untuk tugas kelas. Virtual environment memastikan project lain tidak ikut berubah saat package dipasang.</p>
<h2>Contoh AI</h2>
<p>Notebook sering dipakai untuk mengeksplorasi dataset sebelum pipeline data dibuat lebih terstruktur.</p>
<h2>Kode Python</h2>
<pre><code class="language-bash">python -m venv .venv

# macOS/Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1

python -m pip install numpy pandas
python -m pip freeze &gt; requirements.txt
python app.py
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>python -m venv .venv</code> membuat environment.</li>
<li>Perintah <code>activate</code> memilih environment tersebut.</li>
<li><code>python -m pip install</code> memasang package pada interpreter aktif.</li>
<li><code>pip freeze</code> mencatat package dan versinya.</li>
<li><code>python app.py</code> menjalankan file program.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Menjalankan <code>pip</code> dari interpreter berbeda.</li>
<li>Meng-commit folder <code>.venv</code>.</li>
<li>Menganggap cell notebook selalu berjalan dari atas ke bawah; cell dapat dieksekusi dalam urutan berbeda.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Gunakan satu virtual environment per project.</li>
<li>Jalankan notebook dari awal secara berkala untuk menguji urutan cell.</li>
<li>Simpan dependency penting dalam <code>requirements.txt</code>.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat folder project, virtual environment, file <code>hello.py</code>, lalu jalankan dari terminal. Jika memakai Colab, buat notebook dan jalankan <code>print(&quot;Environment siap&quot;)</code>.</p>
<h2>Ringkasan</h2>
<p>Environment yang rapi membuat eksperimen dapat diulang dan mengurangi konflik dependency.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Setelah ruang kerja siap, kita belajar memecah masalah seperti komputer: input, process, output.</p>
<hr>

````
