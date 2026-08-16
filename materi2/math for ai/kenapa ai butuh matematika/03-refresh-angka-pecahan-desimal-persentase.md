# Topic 03 — Pecahan, Desimal, dan Persentase: Membaca Proporsi dengan Benar

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `03-refresh-angka-pecahan-desimal-persentase.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 45–60 menit membaca + 25–35 menit latihan/interaksi  
> **Prerequisite:** Topic 01 — Dunia Nyata Menjadi Representasi; Topic 02 — Data, Observation, Feature, dan Target  
> **Forward dependency:** Topic 04 — Variable, Expression, dan Equation

---

# 1. Mengapa topik ini ada?

Pada Topic 02 kita memiliki data seperti:

- Alya menjawab benar `8` dari `10` soal;
- Alya menyelesaikan `6` dari `8` unit;
- Bima menjawab benar `6` dari `10` soal;
- Citra menyelesaikan `8` dari `8` unit.

Kalau kita hanya melihat angka pembilangnya, kita dapat membuat kesimpulan yang salah.

Apakah `8` selalu lebih baik daripada `6`?

Belum tentu.

`8 dari 20` berbeda makna dengan `8 dari 10`.

Begitu juga:

`6 dari 8`

tidak seharusnya dibandingkan dengan:

`8 dari 20`

hanya dengan melihat angka `6` dan `8`.

Kita membutuhkan cara untuk membaca **bagian dibanding keseluruhan**.

Itulah fungsi utama pecahan, desimal, rasio, dan persentase.

OpenStax menjelaskan bahwa fraction bar merepresentasikan pembagian, sehingga pecahan dapat diubah menjadi decimal dengan membagi numerator oleh denominator. OpenStax juga mendefinisikan percent sebagai ratio dengan denominator `100`. [R1][R2]

Dalam AI dan data science, kemampuan ini muncul terus-menerus ketika kita membaca:

- completion rate;
- accuracy;
- error rate;
- class proportion;
- data split;
- confidence-like score;
- probability;
- normalized values;
- weighted quantities.

Tetapi ada satu aturan besar:

> **Bentuk angka yang mirip tidak otomatis memiliki makna yang sama.**

Nilai `0.75` dapat berarti completion ratio, model score, normalized feature, atau probability—tergantung bagaimana nilai tersebut didefinisikan.

Karena itu Topic 03 bukan sekadar latihan konversi.

Kita akan belajar **menghitung sekaligus membaca maknanya**.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 03, kamu diharapkan mampu:

1. menjelaskan numerator dan denominator pada pecahan dalam konteks data;
2. membaca pecahan sebagai bagian-terhadap-keseluruhan dan sebagai operasi pembagian;
3. mengubah fraction menjadi decimal dan percentage;
4. mengubah decimal menjadi percentage dan sebaliknya;
5. membandingkan dua proporsi yang memiliki denominator berbeda;
6. menyederhanakan pecahan sederhana tanpa mengubah nilainya;
7. menjelaskan arti `per 100` pada persentase;
8. membedakan `0.75`, `75%`, dan `0.75%`;
9. menjelaskan mengapa persentase tidak otomatis berarti probability;
10. menjelaskan mengapa nilai dengan rentang $0$ sampai $1$ tidak otomatis merupakan probability;
11. menghitung quiz rate dan completion rate pada mini dataset HerAI;
12. menginterpretasikan hasil perhitungan dalam bahasa manusia;
13. menjelaskan bagaimana perubahan denominator dapat mengubah makna sebuah rasio;
14. menyiapkan angka-angka HerAI agar siap digunakan sebagai variables pada Topic 04.

---

# 3. Hook — Mana yang Sebenarnya Lebih Tinggi?

Bandingkan dua peserta.

### Alya

Alya menyelesaikan:

`6 dari 8 unit`

### Bima

Bima menyelesaikan:

`7 dari 10 unit`

Siapa yang memiliki completion lebih tinggi?

Kalau hanya melihat jumlah unit selesai:

$$
7 > 6
$$

Bima terlihat lebih tinggi.

Tetapi kita belum mempertimbangkan total unit yang harus diselesaikan.

Alya:

$$
\frac{6}{8}
$$

Bima:

$$
\frac{7}{10}
$$

Sekarang kita memiliki **dua perbandingan terhadap keseluruhan**.

Topik ini akan memberi kita cara untuk membandingkannya secara benar.

---

# 4. Predict Before Calculate

Jangan langsung menghitung.

Gunakan intuisi dulu.

## Prediksi A

Mana yang lebih besar?

**A.** $\frac{6}{8}$  
**B.** $\frac{7}{10}$  
**C.** Sama  
**D.** Tidak dapat dibandingkan

Simpan jawabanmu.

---

## Prediksi B

Apakah:

$$
0.75 = 75\%
$$

**A.** Ya  
**B.** Tidak  
**C.** Hanya jika denominator-nya 10  
**D.** Hanya untuk probability

---

## Prediksi C

Apakah:

$$
0.75 = 0.75\%
$$

**A.** Ya  
**B.** Tidak  
**C.** Hanya jika nilainya dari model AI  
**D.** Hanya jika completion

---

## Prediksi D

HerAI mencatat:

`completion = 75%`

Apakah ini berarti:

> “Peluang Alya berhasil adalah 75%.”

**A.** Ya  
**B.** Tidak otomatis  
**C.** Ya, karena persentase selalu probability  
**D.** Ya, jika angkanya antara 0 dan 100

Simpan jawabanmu. Kita akan cek semuanya nanti.

---

# 5. Intuisi — Bagian, Keseluruhan, dan Perbandingan

Bayangkan sebuah course memiliki 8 unit.

Alya menyelesaikan 6 unit.

Kita ingin mengatakan:

> “Berapa bagian dari seluruh unit yang sudah selesai?”

Kita dapat menulis:

$$
\frac{6}{8}
$$

Di sini:

- `6` adalah bagian yang sudah selesai;
- `8` adalah keseluruhan unit yang menjadi acuan.

Pecahan memberi konteks yang hilang jika kita hanya mengatakan:

> “Alya selesai 6.”

Karena “6” tanpa denominator tidak mengatakan totalnya.

Enam dari delapan sangat berbeda dengan enam dari seratus.

---

# 6. Vocabulary Dasar

## 6.1 Fraction — Pecahan

Pecahan berbentuk:

$$
\frac{a}{b}
$$

dengan:

$$
b \ne 0
$$

Di sini:

- $a$ = numerator atau pembilang;
- $b$ = denominator atau penyebut.

Dalam konteks part-to-whole:

- numerator = bagian yang sedang dihitung;
- denominator = keseluruhan yang menjadi acuan.

Untuk completion Alya:

$$
\frac{6}{8}
$$

maka:

- numerator = $6$ unit selesai;
- denominator = $8$ total unit.

---

## 6.2 Ratio — Rasio

Ratio membandingkan dua quantities.

OpenStax menuliskan ratio $a$ terhadap $b$ dalam bentuk seperti:

$$
\frac{a}{b}
$$

atau bentuk verbal “$a$ to $b$”. [R3]

Dalam course ini kita paling sering menggunakan bentuk fraction karena mudah diteruskan ke decimal dan percentage.

Contoh:

$$
\frac{8\text{ correct}}{10\text{ questions}}
$$

---

## 6.3 Decimal — Desimal

Fraction bar berarti pembagian. [R1]

Jadi:

$$
\frac{3}{4}
$$

berarti:

$$
3 \div 4
$$

dan hasilnya:

$$
0.75
$$

Decimal memberi cara lain untuk menyatakan ratio yang sama.

---

## 6.4 Percentage — Persentase

Percent berarti **per one hundred** atau “per 100”. OpenStax mendefinisikan percent sebagai ratio dengan denominator $100$. [R2]

Jadi:

$$
75\%
$$

berarti:

$$
\frac{75}{100}
$$

dan:

$$
\frac{75}{100} = 0.75
$$

Maka tiga bentuk berikut menyatakan nilai numerik yang sama:

$$
\frac{3}{4} = 0.75 = 75\%
$$

Namun cara membacanya dapat berbeda tergantung konteks.

---

# 7. Math Reading Skill — Jangan Baca Angkanya Saja

Lihat:

$$
\frac{8}{10}
$$

Bacaan matematika:

> delapan per sepuluh.

Bacaan kontekstual:

> delapan jawaban benar dari total sepuluh soal.

Lalu:

$$
0.8
$$

Bacaan matematika:

> nol koma delapan.

Bacaan kontekstual:

> proporsi jawaban benar adalah nol koma delapan dari skala satu keseluruhan.

Lalu:

$$
80\%
$$

Bacaan kontekstual:

> delapan puluh dari setiap seratus bagian ekuivalen.

Kita tidak mengubah kejadian dasarnya.

Kita hanya mengubah **representation numeriknya**.

---

# 8. Fraction sebagai Division

Prinsip penting:

$$
\frac{a}{b} = a \div b
$$

selama:

$$
b \ne 0
$$

OpenStax secara eksplisit menggunakan ide ini untuk mengubah fractions menjadi decimals. [R1]

Contoh:

$$
\frac{6}{8}
$$

berarti:

$$
6 \div 8
$$

Kita hitung:

$$
6 \div 8 = 0.75
$$

Jadi:

$$
\frac{6}{8} = 0.75
$$

Lalu ubah ke percentage:

$$
0.75 \times 100\% = 75\%
$$

Sehingga:

$$
\frac{6}{8} = 0.75 = 75\%
$$

---

# 9. Worked Example 1 — Alya: 6 dari 8 Unit

Alya menyelesaikan 6 dari 8 unit.

## Langkah 1 — Tulis sebagai fraction

$$
\frac{6}{8}
$$

## Langkah 2 — Sederhanakan jika berguna

Pembilang dan penyebut sama-sama dapat dibagi $2$:

$$
\frac{6}{8}
=
\frac{6 \div 2}{8 \div 2}
$$

$$
\frac{6}{8}
=
\frac{3}{4}
$$

Nilainya tidak berubah.

Kita hanya memakai bentuk ekuivalen yang lebih sederhana.

## Langkah 3 — Ubah menjadi decimal

$$
\frac{3}{4}
=
3 \div 4
$$

$$
3 \div 4 = 0.75
$$

Maka:

$$
\frac{6}{8} = 0.75
$$

## Langkah 4 — Ubah menjadi percentage

$$
0.75 \times 100\% = 75\%
$$

Hasil lengkap:

$$
\frac{6}{8}
=
\frac{3}{4}
=
0.75
=
75\%
$$

## Interpretasi

> Alya telah menyelesaikan 75% dari delapan unit yang menjadi acuan completion.

Yang **belum** boleh kita katakan:

> “Alya memiliki peluang sukses 75%.”

Completion percentage bukan otomatis probability.

---

# 10. Kenapa Equivalent Fractions Penting?

Bandingkan:

$$
\frac{6}{8}
$$

dan:

$$
\frac{3}{4}
$$

Secara tampilan berbeda.

Tetapi:

$$
\frac{6}{8}
=
0.75
$$

dan:

$$
\frac{3}{4}
=
0.75
$$

Jadi keduanya equivalent.

Kita dapat membagi numerator dan denominator dengan faktor yang sama tanpa mengubah ratio, selama pembaginya bukan nol.

Secara umum:

$$
\frac{a}{b}
=
\frac{a \div k}{b \div k}
$$

untuk nilai $k$ yang valid dan tidak nol ketika pembagian tersebut terdefinisi.

Untuk beginner course ini, fokusnya bukan manipulasi aljabar kompleks.

Fokusnya:

> bentuk pecahan dapat berubah tanpa mengubah proporsi yang direpresentasikan.

---

# 11. Worked Example 2 — Siapa Completion-nya Lebih Tinggi?

Kembali ke hook.

### Alya

$$
\frac{6}{8}
$$

### Bima

$$
\frac{7}{10}
$$

Kita tidak akan membandingkan numerator saja.

## Alya

$$
\frac{6}{8}
=
0.75
$$

Lalu:

$$
0.75 \times 100\% = 75\%
$$

Jadi:

$$
\frac{6}{8} = 75\%
$$

## Bima

$$
\frac{7}{10}
=
0.7
$$

Lalu:

$$
0.7 \times 100\% = 70\%
$$

Jadi:

$$
\frac{7}{10} = 70\%
$$

Sekarang bandingkan:

$$
75\% > 70\%
$$

Maka dalam konteks completion ratio:

> Alya memiliki proporsi completion lebih tinggi daripada Bima, walaupun jumlah unit selesai Bima lebih besar.

Ini alasan denominator sangat penting.

---

# 12. Change One Thing — Denominator Mengubah Makna

Misalkan Alya menjawab benar 8 soal.

### Situasi A

8 benar dari 10 soal:

$$
\frac{8}{10}
=
0.8
=
80\%
$$

### Situasi B

8 benar dari 20 soal:

$$
\frac{8}{20}
=
0.4
=
40\%
$$

Numerator sama:

$$
8
$$

Tetapi denominator berubah:

$$
10 \rightarrow 20
$$

Akibatnya proporsi berubah:

$$
80\% \rightarrow 40\%
$$

Jadi:

> **Numerator tanpa denominator sering tidak cukup untuk menilai bagian terhadap keseluruhan.**

Ini akan terus muncul dalam AI ketika kita membaca rates dan metrics.

---

# 13. Decimal ↔ Percentage

## 13.1 Decimal menjadi Percentage

Untuk mengubah decimal menjadi percent:

$$
\text{percentage}
=
\text{decimal}
\times
100\%
$$

Contoh:

$$
0.75 \times 100\% = 75\%
$$

Contoh lain:

$$
0.8 \times 100\% = 80\%
$$

---

## 13.2 Percentage menjadi Decimal

Untuk mengubah percentage menjadi decimal:

$$
\text{decimal}
=
\frac{\text{percentage number}}{100}
$$

Contoh:

$$
75\%
=
\frac{75}{100}
=
0.75
$$

Contoh:

$$
8\%
=
\frac{8}{100}
=
0.08
$$

Ini titik yang sering membuat beginner keliru.

---

# 14. Misconception Penting — 0.75 Bukan 0.75%

Bandingkan:

$$
0.75
$$

dan:

$$
0.75\%
$$

Karena:

$$
0.75\%
=
\frac{0.75}{100}
$$

maka:

$$
0.75\% = 0.0075
$$

Jadi:

$$
0.75 \ne 0.75\%
$$

Sebaliknya:

$$
0.75 = 75\%
$$

Ini bukan detail kosmetik.

Kesalahan faktor $100$ dapat membuat interpretation sangat salah.

---

# 15. Worked Example 3 — Quiz Rate dan Completion Rate Alya

Kita punya:

- quiz correct = $8$;
- quiz total = $10$;
- completion done = $6$;
- completion total = $8$.

## Quiz ratio

$$
\frac{8}{10}
=
0.8
=
80\%
$$

## Completion ratio

$$
\frac{6}{8}
=
0.75
=
75\%
$$

Sekarang kita punya dua quantities pada bentuk yang mudah dibandingkan:

- quiz rate = $80\%$;
- completion rate = $75\%$.

Kita boleh mengatakan:

> Secara numerik, quiz rate Alya 5 percentage points lebih tinggi daripada completion rate-nya.

Karena:

$$
80\% - 75\% = 5\%
$$

Dalam bahasa yang lebih presisi untuk perbandingan persentase, kita dapat menyebut selisih ini **5 percentage points**.

Tetapi kita tidak boleh langsung menyimpulkan:

> Quiz performance “5% lebih baik” daripada completion.

Itu pernyataan yang membutuhkan definisi “lebih baik” dan jenis perbandingan yang jelas.

---

# 16. Percentage Points vs Percent Change — Preview yang Aman

Ada dua kalimat yang sering terdengar mirip:

1. naik dari $75\%$ menjadi $80\%$;
2. naik sebesar $5\%$.

Keduanya tidak selalu berarti hal yang sama.

Selisih langsung:

$$
80\% - 75\% = 5
$$

percentage points.

Sedangkan relative percent increase dibanding nilai awal adalah:

$$
\frac{80 - 75}{75} \times 100\%
$$

$$
=
\frac{5}{75} \times 100\%
$$

$$
\approx 6.67\%
$$

Jadi kenaikan dari $75\%$ ke $80\%$ adalah:

- naik $5$ percentage points;
- setara sekitar $6.67\%$ relative increase terhadap nilai awal.

Kita tidak akan memperdalam percent change sekarang.

Tujuannya hanya agar kamu sadar bahwa bahasa persentase perlu konteks.

---

# 17. Bisa Kah Persentase Lebih dari 100%?

Ya.

Percent berarti “per 100”, bukan “harus selalu maksimal 100”.

OpenStax memberi contoh percent di atas $100\%$, misalnya $125\%$. [R2]

Contoh:

Jika sebuah ukuran berubah dari 100 menjadi 125, nilai baru adalah:

$$
\frac{125}{100}
=
1.25
=
125\%
$$

Tetapi beberapa quantities memang secara definisi dibatasi.

Contoh completion:

Jika `completion_done` tidak boleh melebihi `completion_total`, maka completion ratio berada pada:

$$
0 \le
\frac{\text{completion done}}{\text{completion total}}
\le 1
$$

yang ekuivalen dengan:

$$
0\% \le \text{completion percentage} \le 100\%
$$

Jadi batas bukan berasal dari simbol `%` saja.

Batas berasal dari **semantics quantity** yang sedang diukur.

---

# 18. Percentage Bukan Otomatis Probability

Ini salah satu conceptual safety gate terpenting.

Misalkan:

`completion = 75%`

Itu berarti:

> 75% dari unit acuan telah selesai.

Itu **bukan** berarti:

> peluang Alya berhasil adalah 75%.

Dua pernyataan tersebut mempunyai semantics berbeda.

Probability memang sering dinyatakan dalam bentuk decimal antara $0$ dan $1$ atau percentage antara $0\%$ dan $100\%$.

Tetapi tidak semua number pada range tersebut adalah probability.

Contoh:

- completion ratio = $0.75$;
- similarity score = $0.75$;
- normalized feature = $0.75$;
- probability = $0.75$.

Empat nilai memiliki angka yang sama.

Tetapi interpretasinya berbeda.

Google ML documentation, misalnya, membedakan berbagai jenis numerical model outputs; logistic regression secara khusus menghasilkan probability antara $0$ dan $1$, sedangkan numerical outputs pada model lain dapat memiliki semantics berbeda. [R4]

Jadi:

> **Range angka tidak menentukan semantics-nya. Definisi quantity-lah yang menentukan.**

---

# 19. Normalized Value Juga Bukan Otomatis Probability

Di machine learning, feature values sering diubah agar berada pada scale yang mirip.

Google ML Crash Course menjelaskan bahwa linear scaling dapat memetakan nilai ke range seperti $0$ sampai $1$. [R5]

Misalnya suatu quantity menghasilkan scaled value:

$$
0.75
$$

Nilai itu belum tentu probability.

Ia bisa sekadar berarti:

> nilai feature berada pada posisi tertentu dalam scaling scheme yang dipakai.

Karena itu kita harus menghindari aturan keliru:

> “Kalau angkanya antara 0 dan 1, berarti probability.”

Tidak.

---

# 20. HerAI Mini Dataset — Mengubah Raw Counts Menjadi Rates

Gunakan dataset yang kita kunci pada Topic 02.

| participant | quiz_correct | quiz_total | completion_done | completion_total | study_duration_min |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 |
| Bima | 6 | 10 | 5 | 8 | 30 |
| Citra | 9 | 10 | 8 | 8 | 55 |
| Dewi | 7 | 10 | 4 | 8 | 40 |

Kita akan menghitung dua derived quantities:

- quiz ratio;
- completion ratio.

---

# 21. Worked Example 4 — Seluruh Dataset HerAI

## 21.1 Alya

Quiz:

$$
\frac{8}{10}
=
0.8
=
80\%
$$

Completion:

$$
\frac{6}{8}
=
0.75
=
75\%
$$

---

## 21.2 Bima

Quiz:

$$
\frac{6}{10}
=
0.6
=
60\%
$$

Completion:

$$
\frac{5}{8}
$$

Hitung:

$$
5 \div 8 = 0.625
$$

Maka:

$$
\frac{5}{8}
=
0.625
=
62.5\%
$$

---

## 21.3 Citra

Quiz:

$$
\frac{9}{10}
=
0.9
=
90\%
$$

Completion:

$$
\frac{8}{8}
=
1
=
100\%
$$

---

## 21.4 Dewi

Quiz:

$$
\frac{7}{10}
=
0.7
=
70\%
$$

Completion:

$$
\frac{4}{8}
=
0.5
=
50\%
$$

---

## 21.5 Tabel hasil

| participant | quiz ratio | quiz % | completion ratio | completion % |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 80% | 0.75 | 75% |
| Bima | 0.60 | 60% | 0.625 | 62.5% |
| Citra | 0.90 | 90% | 1.00 | 100% |
| Dewi | 0.70 | 70% | 0.50 | 50% |

Sekarang counts yang memiliki denominator berbeda sudah memiliki bentuk proporsi yang lebih mudah dibaca.

Tetapi kita masih belum membuat model recommendation.

Kita baru memperbaiki **numerical readability**.

---

# 22. Jangan Kehilangan Raw Context

Setelah mengubah:

$$
\frac{8}{10}
\rightarrow
0.8
$$

kita memperoleh representasi yang ringkas.

Tetapi raw context tetap penting.

Mengapa?

Karena:

$$
\frac{8}{10} = 0.8
$$

dan:

$$
\frac{80}{100} = 0.8
$$

mempunyai ratio yang sama.

Namun jumlah observations/items yang mendasari keduanya berbeda.

Untuk banyak analisis, denominator membawa informasi penting.

Jadi sistem yang matang dapat menyimpan:

- raw count;
- denominator;
- derived ratio.

Bukan hanya salah satunya.

---

# 23. Change One Thing — Ratio Sama, Evidence Tidak Sama

Bandingkan dua quiz outcome.

### Participant A

$$
\frac{1}{1} = 100\%
$$

### Participant B

$$
\frac{100}{100} = 100\%
$$

Keduanya sama-sama $100\%$.

Apakah keduanya membawa jumlah evidence yang sama?

Tidak.

Participant A hanya memiliki satu item.

Participant B memiliki seratus item.

Topik probability dan statistics nanti akan memberi kita bahasa yang lebih kuat untuk membahas uncertainty dan sample information.

Sekarang cukup pahami:

> **Persentase dapat menyamakan scale, tetapi dapat menyembunyikan denominator jika kita tidak menyimpannya.**

---

# 24. Math Reading Skill — Tiga Representasi, Satu Quantity

Ambil completion Alya:

$$
\frac{6}{8}
=
0.75
=
75\%
$$

Baca tiga bentuk tersebut.

## Fraction

> Alya menyelesaikan 6 dari total 8 unit.

## Decimal

> Proporsi completion Alya adalah 0.75 dari skala satu keseluruhan.

## Percentage

> Alya menyelesaikan 75 dari setiap 100 bagian ekuivalen dari keseluruhan.

Ketiganya menyatakan quantity yang sama.

Tetapi fraction mempertahankan informasi raw numerator/denominator secara lebih terlihat.

---

# 25. Bahasa Manusia → Matematika

Kalimat:

> Bima menyelesaikan lima dari delapan unit.

Tulis:

$$
\frac{5}{8}
$$

Ubah ke decimal:

$$
\frac{5}{8}
=
5 \div 8
=
0.625
$$

Ubah ke percentage:

$$
0.625 \times 100\%
=
62.5\%
$$

Jadi:

$$
\frac{5}{8}
=
0.625
=
62.5\%
$$

---

# 26. Matematika → Bahasa Manusia

Diketahui:

$$
\frac{9}{10}
=
0.9
=
90\%
$$

Jika quantity-nya adalah quiz correctness Citra, bacaan yang tepat:

> Citra menjawab benar 9 dari 10 soal, ekuivalen dengan proporsi 0.9 atau 90% pada quiz tersebut.

Bukan:

> Citra memiliki 90% peluang menjadi sukses.

Itu bukan semantics dari field quiz correctness.

---

# 27. Misconception Challenge

## Challenge 1 — “8 lebih besar dari 6, jadi 8/20 lebih tinggi dari 6/8”

Bandingkan:

$$
\frac{8}{20}
=
0.4
=
40\%
$$

dan:

$$
\frac{6}{8}
=
0.75
=
75\%
$$

Jadi:

$$
75\% > 40\%
$$

Numerator lebih besar tidak menjamin proporsi lebih besar.

---

## Challenge 2 — “0.8 berarti 0.8%”

Tidak.

$$
0.8 = 80\%
$$

Sedangkan:

$$
0.8\% = 0.008
$$

---

## Challenge 3 — “Semua persentase maksimal 100%”

Tidak.

Persentase umum dapat melebihi $100\%$.

Tetapi beberapa metrics, seperti completion fraction dengan numerator tidak lebih besar dari denominator, memang dibatasi sampai $100\%$ oleh definisi metric tersebut.

---

## Challenge 4 — “75% completion = 75% probability success”

Tidak.

Completion dan probability adalah quantities berbeda.

---

## Challenge 5 — “Semua angka 0–1 adalah probability”

Tidak.

Nilai $0.75$ dapat menjadi:

- ratio;
- normalized value;
- similarity score;
- probability;
- model score.

Kita harus membaca definisi quantity.

---

## Challenge 6 — “Kalau ratio-nya sama, semua informasinya sama”

Tidak.

$$
\frac{1}{1}
=
\frac{100}{100}
=
100\%
$$

tetapi denominators berbeda.

---

# 28. Try It Yourself

## Practice A — Fraction → Decimal → Percentage

Ubah:

$$
\frac{3}{5}
$$

### Hint 1

Fraction bar berarti division.

### Hint 2

Hitung:

$$
3 \div 5
$$

### Expected answer

$$
\frac{3}{5}
=
0.6
=
60\%
$$

---

## Practice B — Completion

Dewi menyelesaikan 4 dari 8 unit.

Hitung completion ratio.

### Expected answer

$$
\frac{4}{8}
=
\frac{1}{2}
=
0.5
=
50\%
$$

---

## Practice C — Mana yang lebih tinggi?

Alya:

$$
\frac{6}{8}
$$

Bima:

$$
\frac{7}{10}
$$

### Expected reasoning

$$
\frac{6}{8}
=
75\%
$$

$$
\frac{7}{10}
=
70\%
$$

Maka Alya lebih tinggi dalam completion proportion.

---

## Practice D — Perbaiki kesalahan

Seorang peserta menulis:

$$
\frac{9}{10}
=
0.9\%
$$

Apa kesalahannya?

### Strong answer

$$
\frac{9}{10}
=
0.9
=
90\%
$$

`0.9%` justru setara dengan `0.009`.

---

## Practice E — Semantics

Diketahui:

`completion = 0.8`

Bolehkah langsung mengatakan:

> “Probability of success = 80%”?

### Expected answer

Tidak.

Kita hanya tahu completion ratio bernilai $0.8$ jika field tersebut didefinisikan demikian.

Probability membutuhkan quantity dan model semantics yang berbeda.

---

## Practice F — Denominator matters

Mana yang lebih meyakinkan sebagai bukti performa stabil?

- $1/1 = 100\%$
- $100/100 = 100\%$

Jangan jawab hanya dengan percentage.

### Expected reasoning

Persentasenya sama, tetapi denominator berbeda. Dataset kedua mengandung lebih banyak item pengamatan. Kita belum membahas formal uncertainty, tetapi percentage saja menyembunyikan perbedaan tersebut.

---

# 29. Visual & Interactive Specification untuk Web

## [NUMBER MANIPULATOR] Fraction → Decimal → Percentage

**Learning purpose:**  
Menunjukkan bahwa tiga bentuk dapat merepresentasikan quantity yang sama.

**Initial state:**

Numerator = `6`  
Denominator = `8`

**Display:**

$$
\frac{6}{8}
=
0.75
=
75\%
$$

**Learner action:**  
Ubah numerator dan denominator dengan slider atau input angka.

**Expected behavior:**  
Decimal dan percentage update real-time.

**Validation:**  
Denominator tidak boleh $0$.

---

## [INTERACTIVE VISUAL] Denominator Matters

**Learning purpose:**  
Mematahkan kebiasaan membandingkan numerator saja.

**Initial state:**

Card A:

$$
\frac{6}{8}
$$

Card B:

$$
\frac{7}{10}
$$

**Learner action:**  
Pilih mana yang lebih besar sebelum membuka hasil.

**Reveal:**

$$
75\% > 70\%
$$

**Expected feedback:**  
“Bandingkan proporsi, bukan hanya jumlah bagian.”

---

## [COMPARE VIEW] Same Numerator, Different Whole

**Initial state:**

$$
\frac{8}{10}
\quad\text{vs}\quad
\frac{8}{20}
$$

**Learner action:**  
Klik `Convert`.

**Expected behavior:**

Left:

$$
80\%
$$

Right:

$$
40\%
$$

Highlight denominator sebagai penyebab perbedaan.

---

## [STEP-BY-STEP REVEAL] 0.75 vs 0.75%

**Initial state:**  
Tampilkan dua kartu:

`0.75`

dan:

`0.75%`

**Learner prediction:**  
“Apakah sama?”

**Reveal 1:**

$$
0.75 = 75\%
$$

**Reveal 2:**

$$
0.75\% = 0.0075
$$

**Learning purpose:**  
Mencegah factor-$100$ error.

---

## [COMPARE VIEW] Same Percentage, Different Denominator

**Initial state:**

$$
\frac{1}{1}
=
100\%
$$

dan:

$$
\frac{100}{100}
=
100\%
$$

**Learner action:**  
Klik `What information is hidden?`

**Expected behavior:**  
UI menyorot denominators `1` dan `100`.

**Feedback:**  
“Persentase sama tidak berarti jumlah evidence sama.”

---

## [INTERACTIVE VISUAL] Meaning Tagger

**Cards:**

- `completion = 0.75`
- `similarity_score = 0.75`
- `normalized_feature = 0.75`
- `predicted_probability = 0.75`

**Learner action:**  
Pilih apakah tiap card otomatis boleh dibaca sebagai “75% chance”.

**Expected behavior:**  
Hanya card yang secara eksplisit didefinisikan sebagai probability boleh dibaca sebagai probability.

---

# 30. HerAI Running Case — State Setelah Topic 03

Sekarang running dataset kita berkembang.

## Raw values

| participant | quiz_correct | quiz_total | completion_done | completion_total | study_duration_min |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 |
| Bima | 6 | 10 | 5 | 8 | 30 |
| Citra | 9 | 10 | 8 | 8 | 55 |
| Dewi | 7 | 10 | 4 | 8 | 40 |

## Derived values

| participant | quiz_ratio | completion_ratio |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Kita belum menggunakan formula recommendation.

Kita baru memiliki quantities yang lebih mudah dibandingkan.

Pada Topic 04, values seperti:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

akan diberi nama sebagai variables.

Lalu kita akan mulai membaca expressions sederhana.

---

# 31. Checkpoint

## Checkpoint 1

Apa arti denominator pada:

$$
\frac{6}{8}
$$

dalam completion Alya?

**Jawaban:**  
Total 8 unit yang menjadi acuan completion.

---

## Checkpoint 2

Ubah:

$$
\frac{3}{4}
$$

menjadi decimal dan percent.

**Jawaban:**

$$
\frac{3}{4}
=
0.75
=
75\%
$$

---

## Checkpoint 3

Apakah:

$$
0.75 = 0.75\%
$$

**Jawaban:** Tidak.

---

## Checkpoint 4

Mana lebih besar?

$$
\frac{6}{8}
$$

atau:

$$
\frac{7}{10}
$$

**Jawaban:**

$$
75\% > 70\%
$$

jadi $\frac{6}{8}$ lebih besar.

---

## Checkpoint 5

Apakah `completion = 0.8` berarti probability success $80\%$?

**Jawaban:** Tidak otomatis.

---

## Checkpoint 6

Apakah percentage dapat lebih dari $100\%$?

**Jawaban:** Ya, bergantung pada quantity yang direpresentasikan.

---

## Checkpoint 7

Mengapa:

$$
\frac{1}{1}
$$

dan:

$$
\frac{100}{100}
$$

tidak menyimpan informasi mentah yang sama walaupun sama-sama $100\%$?

**Jawaban:** Denominator dan jumlah item yang mendasarinya berbeda.

---

# 32. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan numerator dan denominator.
- [ ] **I can** membaca fraction sebagai division.
- [ ] **I can** mengubah fraction menjadi decimal.
- [ ] **I can** mengubah decimal menjadi percentage.
- [ ] **I can** mengubah percentage menjadi decimal.
- [ ] **I can** membandingkan ratios dengan denominator berbeda.
- [ ] **I can** menjelaskan mengapa denominator penting.
- [ ] **I can** membedakan $0.75$ dari $0.75\%$.
- [ ] **I can** menjelaskan bahwa percent berarti per $100$.
- [ ] **I can** menjelaskan mengapa percentage tidak otomatis probability.
- [ ] **I can** menjelaskan mengapa nilai pada range $0$–$1$ tidak otomatis probability.
- [ ] **I can** mempertahankan raw numerator dan denominator ketika context membutuhkannya.
- [ ] **I can** menghitung quiz ratio dan completion ratio pada mini dataset HerAI.
- [ ] **I can** menjelaskan hasil perhitungan dengan kalimat manusia, bukan hanya angka.

Jika tiga atau lebih item belum nyaman, ulangi:

- Worked Example 1;
- Worked Example 2;
- Misconception Challenge;
- Try It Yourself.

---

# 33. Why This Matters Later

Topic 03 terlihat sederhana, tetapi dependency-nya panjang.

## Topic 04 — Variables, Expressions, Equations

Sekarang kita memiliki:

$$
q = 0.80
$$

untuk quiz ratio Alya,

dan:

$$
c = 0.75
$$

untuk completion ratio Alya.

Topic 04 akan mengajarkan bagaimana angka tersebut diberi variable names dan digunakan dalam expression.

---

## Topic 05 — Function

Function akan menerima inputs dan menghasilkan output.

Kemampuan membaca decimal dan ratio membuat input-output numerik lebih mudah dipahami.

---

## Submodule 03 — Statistics

Mean, proportion, percentage, dan distribution summaries membutuhkan number literacy yang kuat.

---

## Submodule 04 — Probability

Probability sering direpresentasikan pada range:

$$
0 \le P(A) \le 1
$$

atau dalam percentage.

Tetapi karena Topic 03 sudah memisahkan **format angka** dari **semantics**, kita tidak akan mudah menyamakan semua nilai $0$–$1$ dengan probability.

---

## Submodule 06 — Optimization

Loss dan objective sering menggabungkan banyak numerical quantities.

Kesalahan conversion factor, denominator, atau scale dapat merusak interpretation jauh sebelum optimization dimulai.

---

# 34. Summary

Pada Topic 03 kita belajar bahwa fraction, decimal, dan percentage bukan tiga konsep yang terpisah.

Mereka dapat menjadi tiga cara merepresentasikan quantity yang sama.

Contoh Alya:

$$
\frac{6}{8}
=
\frac{3}{4}
=
0.75
=
75\%
$$

Kita belajar bahwa:

1. fraction menghubungkan bagian dan keseluruhan;
2. fraction bar berarti division;
3. denominator menentukan konteks keseluruhan;
4. decimal dapat diperoleh dari division;
5. percent berarti per $100$;
6. $0.75 = 75\%$, bukan $0.75\%$;
7. numerator lebih besar tidak otomatis berarti proportion lebih besar;
8. percentage dapat melebihi $100\%$ pada quantity tertentu;
9. percentage bukan otomatis probability;
10. value pada range $0$–$1$ bukan otomatis probability;
11. persentase dapat menyembunyikan denominator;
12. raw counts dan derived ratios dapat sama-sama penting.

Untuk HerAI, kita sekarang memiliki:

### Alya

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

Kita sengaja belum membuat expression dari kedua quantities tersebut.

Itulah langkah berikutnya.

---

# 35. Bridge ke Topic 04

Sekarang kita terus menulis:

- quiz ratio Alya = $0.80$;
- completion ratio Alya = $0.75$.

Cara ini bisa cepat menjadi panjang.

Matematika memberi kita cara untuk memberi **nama simbolik** pada quantity.

Misalnya:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

Sekarang kita dapat mulai membaca sesuatu seperti:

$$
s = 0.6q + 0.4c
$$

Tetapi sebelum menghitung expression tersebut, kita harus memahami:

- apa itu variable?
- apa itu constant?
- apa itu coefficient?
- apa itu expression?
- apa beda expression dan equation?
- apa artinya substitution?

Itulah fokus:

> **Topic 04 — Variable, Expression, dan Equation**

---

# 36. References

## [R1] OpenStax — *Prealgebra*, Section 5.3: Decimals and Fractions  
**Authors:** Lynn Marecek, MaryAnne Anthony-Smith  
**Publisher:** OpenStax  
**Concept supported:** fraction bar sebagai division; conversion fraction → decimal.

https://openstax.org/books/prealgebra/pages/5-3-decimals-and-fractions

## [R2] OpenStax — *Prealgebra*, Section 6.1: Understand Percent  
**Authors:** Lynn Marecek, MaryAnne Anthony-Smith  
**Publisher:** OpenStax  
**Concept supported:** percent sebagai ratio dengan denominator $100$; fraction/decimal/percent conversion; percent di atas $100\%$.

https://openstax.org/books/prealgebra/pages/6-1-understand-percent

## [R3] OpenStax — *Prealgebra*, Section 5.6: Ratios and Rate  
**Authors:** Lynn Marecek, MaryAnne Anthony-Smith  
**Publisher:** OpenStax  
**Concept supported:** ratio sebagai comparison of quantities dan penulisan ratio dalam fraction form.

https://openstax.org/books/prealgebra/pages/5-6-ratios-and-rate

## [R4] Google for Developers — Machine Learning Glossary: ML Fundamentals  
**Institution:** Google  
**Concept supported:** numerical model outputs memiliki semantics yang bergantung pada jenis model; logistic regression secara khusus menghasilkan probability pada range $0$–$1$.

https://developers.google.com/machine-learning/glossary/fundamentals

## [R5] Google for Developers — Machine Learning Crash Course: Numerical Data — Normalization  
**Institution:** Google  
**Concept supported:** numerical features dapat ditransformasikan ke similar scales, termasuk linear scaling ke range seperti $0$–$1$; scaled value tidak identik secara definisi dengan probability.

https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

---

# 37. QA Notes

## Academic QA

- Fraction dijelaskan sebagai division dan part-to-whole hanya ketika context mendukung.
- Denominator wajib bukan nol.
- Percentage didefinisikan sebagai per $100$.
- Tidak menyatakan semua percentage dibatasi $0$–$100\%$.
- Completion dibatasi $0$–$100\%$ hanya karena semantics `done/total` dengan `done <= total`.
- Tidak menyamakan percentage dengan probability.
- Tidak menyamakan normalized value dengan probability.
- Tidak menyamakan model score dengan probability.
- Tidak menganggap ratio yang sama berarti raw evidence yang sama.
- Tidak menarik causal/generalization claim dari toy dataset HerAI.
- Normalization hanya dipakai sebagai AI connection, bukan diajarkan formal sebagai core Topic 03.

## Mathematical QA

Checked identities used in the lesson:

$$
\frac{6}{8}
=
\frac{3}{4}
=
0.75
=
75\%
$$

$$
\frac{7}{10}
=
0.7
=
70\%
$$

$$
\frac{8}{20}
=
0.4
=
40\%
$$

$$
0.75\%
=
0.0075
$$

$$
\frac{5}{8}
=
0.625
=
62.5\%
$$

$$
\frac{4}{8}
=
0.5
=
50\%
$$

Relative increase preview:

$$
\frac{80 - 75}{75}
\times
100\%
\approx
6.67\%
$$

## Notation QA

Core symbols introduced/reused:

- $a$ = numerator/general first quantity;
- $b$ = denominator/general second quantity;
- $q$ = preview variable for Alya's quiz ratio;
- $c$ = preview variable for Alya's completion ratio;
- $s$ = preview output variable for Topic 04 only.

Formal variable concepts are intentionally deferred to Topic 04.

## Dependency QA

Topic 03 does **not** formally teach:

- variable algebra;
- functions;
- vector/matrix operations;
- statistics;
- probability rules;
- calibration;
- gradient;
- optimization.

It prepares number literacy for those topics.

## Markdown + KaTeX Contract

- Inline math uses `$...$`.
- Display math uses `$$...$$`.
- No intended formulas are placed in fenced code blocks.
- No intended raw LaTeX commands appear outside math delimiters.
- Commands are limited to KaTeX-safe basic notation such as `\frac`, `\div`, `\times`, `\ne`, `\le`, `\text`, `\quad`, and `\approx`.
- Browser-level rendering is still an integration test for the Vanilla JS + KaTeX frontend; this lesson does not claim that browser runtime compilation has been executed here.

---

# STOP CHECKPOINT

**Topic 03 selesai. Topic 04 belum diproduksi.**

> **Apakah Topic 03 disetujui dan kita boleh melanjutkan ke Topic 04 — Variable, Expression, dan Equation?**
