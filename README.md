# Tiga Dino Sahabat Hebat — Petualangan Mencari Pelangi Ajaib

Dongeng interaktif bergaya film untuk anak. HTML5 + CSS3 + JavaScript murni (tanpa framework, tanpa CDN, tanpa backend).

## Struktur
```
Tiga-Dino/
├── index.html
├── style.css
├── script.js          ← data 16 adegan (SCENES), timer, navigasi, narasi suara, efek
├── assets/images/     ← adegan-01.jpg … adegan-16.jpg
├── assets/audio/      ← lagu_01.mp3 (pembuka), lagu_02.mp3 (musik cerita, diulang)
└── README.md
```

## Pemetaan gambar → adegan
Gambar di ZIP (`gambar_01.jpg` … `gambar_16.jpg`) sudah berurutan dan cocok dengan naskah; dipetakan 1:1 ke `adegan-01.jpg` … `adegan-16.jpg`.
Pengolahan ringan pada gambar: bingkai putih bersudut bulat dipangkas, lingkaran logo/watermark kecil di pojok kiri atas gambar 2–16 dibersihkan, lalu diperbesar 2× (gambar asli hanya ±350–490 px) agar lebih halus saat tampil layar besar.

## Cara memasang di GitHub Pages
1. Unggah seluruh isi folder ke repositori (mis. `tiga-dino`).
2. Settings → Pages → Branch `main` / root → Save.
3. Buka `https://<username>.github.io/tiga-dino/`.
Semua path relatif, jadi bisa juga dibuka dari subfolder situs lain.

## Kontrol
| Aksi | Sentuh / Mouse | Keyboard | Remote TV |
|---|---|---|---|
| Tampilkan kontrol | ketuk / gerakkan mouse | tombol apa saja | Enter / panah atas-bawah |
| Play/Pause | tombol ▶/⏸ | Spasi | Enter pada tombol, tombol Play/Pause |
| Adegan sebelumnya/berikutnya | tombol ⏮ ⏭ | ← → | ← → (saat kontrol tidak difokus) |
| Pindah fokus tombol | — | Tab | panah (saat fokus ada di kontrol) |
| Beranda | tombol 🏠 | Home | Backspace / tombol Back |
| Layar penuh / Musik / Suara narator | tombol | F / M / V | — |

Tombol Home menghentikan cerita, suara, dan timer, fade-out, lalu membuka https://belajarbermain.online/ di tab yang sama.

## Menyesuaikan
- **Teks/adegan**: edit array `SCENES` di `script.js` (`lines`, `title`, `fx`, `light`).
- **Kecepatan baca**: `WPM`, `MIN_MS`, `MAX_MS`, dan `SPEEDS` di bagian atas `script.js` (default ±170 kata/menit).
- **Narasi suara**: memakai Web Speech API bila perangkat punya suara bahasa Indonesia; bila tidak, tombol memberi pesan ramah dan cerita tetap berjalan. Fungsi `speak()` terisolasi sehingga mudah diganti dengan file audio rekaman (`assets/audio/`) di pengembangan berikutnya.
- **Pembukaan**: layar hitam berisi judul, tujuan cerita, dan pembuat. Ubah teksnya di objek `INTRO` (`script.js`), terutama baris `credit` (nama pembuat).
- **Musik**: `lagu_01` mulai 3 detik setelah halaman dibuka, `lagu_02` mulai saat gambar pertama masuk dan diulang sampai selesai. Tombol ♪ menyalakan/mematikan musik (juga tombol M). Musik mengecil otomatis saat suara narator aktif. Jika browser memblokir suara otomatis, ketuk layar sekali dan musik menyala.
- **Tata letak**: HP landscape / layar lebar otomatis memakai narasi di samping gambar bila gambar jadi lebih besar; HP portrait dan PC 16:9 memakai narasi di bawah gambar.
