# Laporan Integrasi — Kisah 3 Dino v6

## 1. Keputusan utama: 42 aset kolase tidak dipasang
Dipindai satu per satu (isi, label, ukuran). Temuan:
- Ukuran hanya **63–211 px** (rata-rata pembesaran saat tampil di kartu ±880 px: **3,2×**, hingga 6,2×) → buram/pecah. README aset sendiri menyebut "belum disarankan sebagai aset final".
- **41 dari 42** punya lencana label ("08a", dst.) tertanam di pojok; 02c, 08a, 16b memuat sisa panel tetangga; 14b/14c hasil crop terlalu sempit.
- Kode di kolase **tidak sama** dengan nama aset resolusi tinggi yang sudah ada (mis. kolase "01a" = Dino Biru, sedangkan `01a-dino-merah-melompat` = Dino Merah). Memasukkannya berisiko tertukar.
- Memotong label akan menurunkan resolusi lebih jauh; meregangkan/upscale melanggar ketentuan.
Karena itu tidak ada yang dipasang. Gambar yang sudah tajam (16 utama + 14 tambahan) tetap dipakai.

## 2. Gambar yang dipakai per adegan (30 file, semua ada .webp + .jpg)
| Adegan | Gambar (urutan tampil) |
|---|---|
| 1 | adegan-01 → 01a-dino-merah-melompat → 01b-dino-kuning-menunjuk → kembali adegan-01 (±55% segmen terakhir) |
| 2 | adegan-02 → 02a-peta-closeup → 02b-dino-merah-berbicara → 02c-dino-biru-menunjuk-peta → 02d-tiga-dino-berangkat |
| 3 | adegan-03 → 03b-dino-merah-mengejar-kupu-kupu → 03a-dino-biru-ekspresi-dekat → adegan-03 |
| 4 | adegan-04 → 04a-dino-merah-terpeleset-di-sungai → adegan-04 |
| 5 | adegan-05 → 05a-berteduh-di-bawah-daun-saat-hujan → adegan-05 |
| 6 | adegan-06 → 06a-berkemah-di-bawah-bintang |
| 7 | adegan-07 → 07a-menolong-kelinci-di-batang-pohon → adegan-07 |
| 9 | adegan-09 → 09a-burung-biru-memberi-petunjuk → adegan-09 |
| 11 | adegan-11 → 11a-menemukan-gua-kristal |
| 8, 10, 12–16 | hanya gambar utama (belum ada gambar tambahan tajam) |

## 3. Gambar yang tidak dipakai
Seluruh 42 potongan kolase (alasan di bagian 1). Untuk adegan 8, 10, 12–16 (dan momen lain), kebutuhan gambar resolusi tinggi dirinci di `docs/PESANAN-ASET.md`; pemetaan 'shots' yang sudah divalidasi ada di `docs/shots-siap-tempel.json` — tinggal tempel setelah file gambarnya tersedia.

## 4. Perubahan file
- `data/cerita.json`: kredit → “Dibuat oleh tim benyoriki.com” (tautan tab baru). Naskah tidak diubah.
- `index.html`: baris “Sistem & website developer…” dihapus (3 tempat).
- `style.css`: gaya baris pengembang dihapus; gaya tautan kredit dipertahankan.
- `script.js`: `INTRO_TRACK = null` (lagu_01.mp3 tidak ada di proyek → tidak ada 404).
- `assets/images/`: +30 berkas `.jpg` (cadangan browser tanpa WebP).
- `README.md`, `docs/` (baru): dokumentasi, pesanan aset, pemetaan siap tempel, laporan ini.
- Tidak berubah: audio, font, gambar `.webp`, tema, tata letak, kontrol, sistem `shots`/`revertAt`.

## 5. Pengujian (Chromium headless; belum di perangkat fisik/Smart TV)
- 112 segmen / 16 adegan diputar penuh pada kecepatan **Normal dan Cepat**, plus interaksi pada Lambat: **0 gambar salah**, gambar berganti tepat saat kalimat pemicu, Adegan 1 kembali ke gambar utama di akhir.
- Jeda 20 dtk: teks & gambar diam; Lanjut: meneruskan segmen yang sama; Berikutnya/Sebelumnya (juga saat dijeda): gambar awal adegan benar; Ulangi: kembali ke adegan 1; keyboard (←, →, Spasi, ↓ fokus tombol) berfungsi.
- Tanpa error JavaScript, tanpa 404, tanpa peringatan validasi `[Tiga Dino]`; hanya `lagu_02.mp3` diminta (audio tak terputus saat gambar berganti).
- Simulasi browser tanpa WebP: gambar `.jpg` dimuat (200, tidak ada 404).
- Gambar lambat dimuat → gambar lama bertahan lalu crossfade; gambar gagal → gambar sebelumnya dipertahankan (diuji pada v5, kode tidak berubah).
- Tampilan HP/PC/TV diperiksa lewat tangkapan layar pada v5; layout tidak diubah di v6.
- Semua 'match' di `docs/shots-siap-tempel.json` divalidasi terhadap segmen naskah (0 masalah).

## 6. Catatan
- `lagu_02.mp3` di proyek Anda 8,2 MB (320 kbps, 205 dtk); hanya diunduh setelah tombol mulai ditekan. Bisa dikecilkan (±2,5 MB di 96 kbps) bila ingin lebih ringan di data seluler.
- Tombol Beranda masih menuju belajarbermain.online (tidak diminta diubah).

## 7. Unggah ke GitHub Pages
1. Ekstrak ZIP; isi folder `Tiga-Dino/` adalah isi repositori (index.html di root repo).
2. Salin/timpa ke repo `Kisah3Dino` (commit & push), atau unggah lewat GitHub → Add file → Upload files.
3. Settings → Pages → Branch `main` / root. Tunggu 1–2 menit, buka https://benyoriki.github.io/Kisah3Dino/ lalu hard-refresh (di HP: tutup tab & buka ulang) agar cache lama hilang.
