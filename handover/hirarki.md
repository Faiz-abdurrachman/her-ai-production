# Hierarki Kurikulum dan Persistensi HerAI

> **Diperbarui:** 16 Agustus 2026
> Dokumen ini menjelaskan identity/scoring source lokal. Existing GAS deployment sudah
> diverifikasi pada version `2026.3.11-math-response-persistence`.

## Model hierarki

```text
Category: Foundation & Core AI
└── Module: Math for AI (`math-for-ai`)
    ├── Submodule 01..07
    │   ├── Info
    │   ├── Topic 01..n
    │   ├── Practice
    │   ├── Quiz
    │   ├── Discussion
    │   └── References
    └── Aggregate quiz (`chapter_id: quiz`)
```

## Progress identity

Hanya topik memakai numeric ID dan memperoleh chapter points:

```text
chapter_id = (nomor submodule × 100) + nomor topik
```

Contoh:

| Item | `chapter_id` | Leaderboard |
|---|---:|---:|
| Submodule 01 Topic 01 | `101` | 15 |
| Submodule 01 Topic 07 | `107` | 15 |
| Submodule 02 Topic 01 | `201` | 15 |
| Submodule 07 Topic 07 | `707` | 15 |
| Submodule 01 Info | `info-01` | 0 |
| Submodule 01 Practice | `practice-01` | 5 |
| Submodule 01 Quiz | `quiz-01` | 0 langsung; bahan aggregate |
| Submodule 01 Discussion | `discussion-01` | 0 |
| Submodule 01 References | `references-01` | 0 |
| Aggregate tujuh quiz | `quiz` | score rata-rata |

Topic ranges:

- Submodule 01: `101–107`
- Submodule 02: `201–208`
- Submodule 03: `301–308`
- Submodule 04: `401–408`
- Submodule 05: `501–508`
- Submodule 06: `601–608`
- Submodule 07: `701–707`

ID di luar ranges tersebut tidak dihitung sebagai topik Math.

## Formula leaderboard

Hanya row `status=completed` yang dihitung:

```text
points = aggregate quiz score
       + (valid completed topics × 15)
       + (completed practice records × 5)
```

Info, references, discussion, per-submodule quiz, invalid IDs, dan in-progress rows
tidak memberi poin.

## Idempotence dan sync

- Backend upsert key: participant + module + chapter. Save berulang memperbarui row
  yang sama, bukan menambah row baru.
- Local state menyimpan `completed[]` dan `pending[]`.
- Server acknowledgment sukses menghapus item dari pending.
- Kegagalan server mempertahankan completion lokal, menampilkan status pending, dan
  menyediakan retry.
- Aggregate quiz hanya ditulis setelah ketujuh `quiz-01..quiz-07` memiliki score.

## Persistence jawaban Math — local implementation 16 Agustus 2026

- Setiap submodule memakai `exercise_id` stabil `practice-01..practice-07`.
- Setiap latihan mempunyai delapan key exact `answer-01..answer-08`.
- Draft boleh parsial; submit ditolak backend sampai seluruh delapan jawaban terisi.
- Submission di-upsert berdasarkan participant + module + exercise, lalu progress
  memakai chapter `practice-SS` hanya setelah body submission berhasil disimpan.
- Dua respons diskusi per submodule memakai prompt stabil
  `discussion-SS-01` dan `discussion-SS-02`.
- Diskusi di-upsert berdasarkan participant + module + prompt. Progress
  `discussion-SS` baru selesai setelah kedua prompt tersimpan.
- Acknowledgment penyimpanan body dan acknowledgment progress dipisahkan. Jika body
  berhasil tetapi progress gagal, UI wajib mengatakan body tersimpan dan progress
  masih pending.
- Draft/respons lokal dipertahankan saat server gagal dan remote read-back dapat
  memulihkan submission setelah reload.

## Release boundary

Generic progress marker tetap bukan pengganti persistence body. Kontrak khusus latihan
dan diskusi committed lokal pada `5a8998c`; existing GAS deployment sudah exact
`2026.3.11-math-response-persistence`. Full authorized QA membuktikan invalid-ID
rejection, 90 canonical progress IDs completed, 7 exact 8-answer practice read-back,
14 unique discussion prompts, serta tujuh score kuis dan aggregate 100. Satu invalid
`topic-01` row dari stale-backend preflight tetap menjadi residue QA non-canonical.
Readiness browser 01–07 lulus untuk 89 route dan 210 blok visual/interaktif. Source
lokal sekarang mengaktifkan `releasedSubmodules` 01–07 untuk release frontend penuh;
production tetap locked sampai commit aktivasi tersebut benar-benar di-push/deploy.
