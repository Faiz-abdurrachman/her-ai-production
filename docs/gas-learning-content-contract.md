# GAS Learning Content Contract

Halaman admin `#/learning-content` sudah mencoba sinkron ke GAS melalui endpoint proxy `/__gas`.
Jika action belum tersedia di `Code.gs`, data tetap disimpan di `localStorage` browser admin.

## Sheet

Nama sheet yang disarankan: `learning_content`

Header:

```text
id, course, module, lesson, type, duration, tag, description, body, heroImage, assetLink, references, published, updatedAt
```

## Actions

### `getLearningContent`

Request:

```json
{ "action": "getLearningContent" }
```

Response:

```json
{ "status": "success", "items": [] }
```

### `saveLearningContent`

Request:

```json
{
  "action": "saveLearningContent",
  "adminId": "admin-id",
  "items": []
}
```

Behavior:

- Upsert berdasarkan `id`.
- Simpan `body` apa adanya agar HTML ringan dan LaTeX seperti `\\( y = f(x) + \\epsilon \\)` tetap aman.
- `published` dipakai untuk mengaktifkan atau mematikan materi di dashboard peserta.
- Catat audit trail: `Mengubah Learning Content`.

Response:

```json
{ "status": "success", "items": [] }
```

### `deleteLearningContent`

Request:

```json
{ "action": "deleteLearningContent", "id": "learning-id", "adminId": "admin-id" }
```

Response:

```json
{ "status": "success" }
```
