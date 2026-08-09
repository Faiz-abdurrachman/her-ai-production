# Kuis Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness

> **Jumlah soal:** 10  
> **Format:** 4 opsi, 1 jawaban terbaik  
> **Bloom distribution:** 2 Understand, 4 Apply, 4 Analyze  
> **Apply/Analyze:** 8/10 = 80%

---

# Soal 1

HerAI menyimpan `quiz_score = 8/10` tentang Alya. Pernyataan paling tepat adalah:

A. Record tersebut adalah Alya dalam bentuk digital.  
B. Record tersebut merepresentasikan sebagian informasi tentang Alya.  
C. Karena datanya numerik, record tersebut sudah cukup untuk semua task.  
D. Data tersebut otomatis menjadi probability keberhasilan.

**Jawaban benar:** B  
**LO:** LO-01.1  
**Difficulty:** Basic  
**Bloom:** Understand

**Mengapa B benar:** data adalah representation dari sebagian keadaan yang direkam, bukan participant secara utuh.

**Mengapa A salah:** representation bukan real-world person.  
**Mengapa C salah:** usefulness bergantung pada task dan information yang dibutuhkan.  
**Mengapa D salah:** quiz score tidak otomatis probability.

---

# Soal 2

Task: sebelum peserta memulai material, prediksi `mastery_after_material`.

Columns:

- `participant_id`
- `previous_quiz_ratio`
- `previous_completion_ratio`
- `post_material_quiz_ratio`
- `mastery_after_material`

Column yang **paling tidak valid** sebagai pre-material feature adalah:

A. `previous_quiz_ratio`  
B. `previous_completion_ratio`  
C. `participant_id`  
D. `post_material_quiz_ratio`

**Jawaban benar:** D  
**LO:** LO-01.2  
**Difficulty:** Intermediate  
**Bloom:** Apply

**Mengapa D benar:** nilainya baru diketahui setelah material sehingga tidak tersedia pada prediction time.

**A salah:** dapat menjadi candidate feature.  
**B salah:** dapat menjadi candidate feature.  
**C salah:** identifier memang bukan otomatis feature, tetapi masalah paling jelas yang ditanyakan adalah temporal invalidity pada post-material value.

---

# Soal 3

Mana completion proportion yang paling besar?

A. $\frac{7}{8}$  
B. $\frac{8}{10}$  
C. $\frac{9}{12}$  
D. $\frac{16}{20}$

**Jawaban benar:** A  
**LO:** LO-01.3  
**Difficulty:** Intermediate  
**Bloom:** Apply

**Rationale:**

$$
\frac{7}{8}=87.5\%
$$

sedangkan:

$$
\frac{8}{10}=80\%
$$

$$
\frac{9}{12}=75\%
$$

$$
\frac{16}{20}=80\%
$$

**Distractor logic:** B dan D menarik karena numerator besar; C menarik jika peserta tidak mengonversi denominator berbeda.

---

# Soal 4

Diberikan:

$$
s=0.6q+0.4c
$$

dengan:

$$
q=0.8,\qquad c=0.75
$$

Tim menyatakan: “$s=0.78$, jadi probability success adalah 78%.”

Evaluasi terbaik:

A. Benar karena coefficients berjumlah 1.  
B. Benar karena output berada antara 0 dan 1.  
C. Salah; formula hanya mendefinisikan toy score kecuali probability semantics ditetapkan dan divalidasi.  
D. Salah karena weighted formula tidak boleh menghasilkan decimal.

**Jawaban benar:** C  
**LO:** LO-01.4  
**Difficulty:** Intermediate  
**Bloom:** Analyze

**A salah:** weighted average tidak otomatis probability model.  
**B salah:** range tidak menentukan semantics.  
**C benar:** output harus dibaca sesuai definisi quantity.  
**D salah:** decimal output valid.

---

# Soal 5

Manakah pernyataan yang benar tentang function?

A. Setiap output hanya boleh berasal dari satu input.  
B. Function harus selalu mempunyai numerical input.  
C. Setiap valid input harus memiliki tepat satu output.  
D. $f(x)$ berarti $f\times x$.

**Jawaban benar:** C  
**LO:** LO-01.5  
**Difficulty:** Basic  
**Bloom:** Understand

**A salah:** beberapa inputs boleh menghasilkan output sama.  
**B salah:** input dapat non-numerical.  
**C benar:** ini requirement inti function.  
**D salah:** parentheses menunjukkan evaluation at input.

---

# Soal 6

Dua points:

$$
(0.2,0.35)
$$

dan:

$$
(0.8,0.65)
$$

Seseorang berkata, “Graph ini terlihat curam, jadi perubahan output sangat besar dan input pasti menyebabkan output.”

Tanggapan terbaik:

A. Benar, karena graph cukup untuk membuktikan causation.  
B. Rate numeriknya $0.5$, tetapi steepness visual tergantung scale dan causation tidak dapat disimpulkan dari graph saja.  
C. Salah hanya karena slope harus selalu lebih dari 1.  
D. Benar jika vertical axis dipotong.

**Jawaban benar:** B  
**LO:** LO-01.6  
**Difficulty:** Challenge  
**Bloom:** Analyze

**Perhitungan:**

$$
\frac{0.65-0.35}{0.8-0.2}
=
\frac{0.30}{0.60}
=
0.5
$$

**A salah:** association bukan proof causation.  
**B benar:** menggabungkan numeric rate dan graph-literacy safety.  
**C salah:** slope tidak harus lebih dari 1.  
**D salah:** axis truncation justru perlu diwaspadai.

---

# Soal 7

Jika:

$$
2^5=32
$$

maka:

$$
\log_2(32)
$$

adalah:

A. $2$  
B. $16$  
C. $32$  
D. $5$

**Jawaban benar:** D  
**LO:** LO-01.7  
**Difficulty:** Basic  
**Bloom:** Apply

**Mengapa D benar:** logarithm menanyakan exponent yang membuat $2$ menjadi $32$.

**A salah:** itu base.  
**B salah:** bukan hasil inverse relation.  
**C salah:** itu output exponentiation, bukan log value.

---

# Soal 8

Diberikan:

$$
q_1=0.8,\quad q_2=0.6,\quad q_3=0.9,\quad q_4=0.7
$$

Pernyataan yang benar adalah:

A. $\sum_{i=1}^{4}q_i=3.0$, sedangkan mean preview-nya $0.75$.  
B. $\sum_{i=1}^{4}q_i=0.75$ karena sigma berarti average.  
C. $\sum_{i=1}^{4}q_i=4.0$ karena ada empat observations.  
D. Sigma tidak dapat digunakan pada decimals.

**Jawaban benar:** A  
**LO:** LO-01.7 + Integrated  
**Difficulty:** Intermediate  
**Bloom:** Analyze

**A benar:** sum $=3.0$ dan $3.0/4=0.75$.  
**B salah:** sigma adalah sum.  
**C salah:** jumlah item bukan jumlah values.  
**D salah:** decimals dapat dijumlahkan.

---

# Soal 9

Mana conversion yang benar?

A. $0.8=0.8\%$  
B. $0.8=80\%$  
C. $80\%=80$  
D. $0.8\%=0.08$

**Jawaban benar:** B  
**LO:** LO-01.3  
**Difficulty:** Basic  
**Bloom:** Apply

**A salah:** $0.8\%=0.008$.  
**B benar:** multiply decimal by $100\%$.  
**C salah:** $80\%=0.8$.  
**D salah:** $0.8\%=0.008$.

---

# Soal 10

Tim HerAI menulis:

1. `High = 3`, `Medium = 2`, `Basic = 1`;
2. toy score peserta $=0.82$;
3. graph study time vs quiz score positive;
4. lalu menyimpulkan: “High tiga kali Basic, probability success 82%, dan study time menyebabkan quiz naik.”

Evaluasi terbaik:

A. Semua benar karena sudah dinyatakan secara numerik.  
B. Hanya probability claim yang salah.  
C. Hanya category coding yang salah.  
D. Ketiga klaim melampaui apa yang didukung: category code tidak otomatis ratio, toy score bukan otomatis probability, dan positive graph tidak membuktikan causation.

**Jawaban benar:** D  
**LO:** Integrated LO-01.1, LO-01.3, LO-01.6  
**Difficulty:** Challenge  
**Bloom:** Analyze

**A salah:** numerical form tidak menjamin semantics.  
**B salah:** category dan causation claim juga salah.  
**C salah:** probability dan causation claim juga salah.  
**D benar:** ketiga kesalahan berasal dari semantic overreach.

---

# Rekap Blueprint Kuis

| Soal | LO | Difficulty | Bloom | Correct |
|---|---|---|---|---|
| 1 | 01.1 | Basic | Understand | B |
| 2 | 01.2 | Intermediate | Apply | D |
| 3 | 01.3 | Intermediate | Apply | A |
| 4 | 01.4 | Intermediate | Analyze | C |
| 5 | 01.5 | Basic | Understand | C |
| 6 | 01.6 | Challenge | Analyze | B |
| 7 | 01.7 | Basic | Apply | D |
| 8 | 01.7 + Integrated | Intermediate | Analyze | A |
| 9 | 01.3 | Basic | Apply | B |
| 10 | Integrated | Challenge | Analyze | D |

Correct-answer positions:

`B, D, A, C, C, B, D, A, B, D`

Tidak menggunakan sequence sederhana seperti `A,B,C,D` berulang atau satu posisi dominan.
