# Tiga Dino Sahabat Hebat — Petualangan Mencari Pelangi Ajaib

Dongeng interaktif bergaya film untuk anak. HTML5 + CSS3 + JavaScript murni (tanpa framework, tanpa CDN, tanpa backend).

## Struktur
```
Tiga-Dino/
├── index.html
├── style.css
├── script.js          ← logika: pemuat data, timer, navigasi, narasi suara, efek (tanpa teks cerita)
├── data/cerita.json   ← SEMUA teks & metadata cerita (16 adegan, intro, pesan moral, penutup)
├── assets/images/     ← adegan-01.webp … 16.webp (utama) + .jpg (cadangan TV lama)
├── assets/fonts/      ← Fredoka & Nunito (lisensi OFL), dipasang lokal tanpa CDN
├── assets/audio/      ← lagu_01.mp3 (pembuka), lagu_02.mp3 (musik cerita, diulang; 96 kbps ±2,3 MB)
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
- **Teks/adegan**: edit `data/cerita.json` (bukan `script.js`). Per adegan: `id`, `title`, `alt` (teks alternatif gambar), `fx` (rain | stars | fireflies | sparkle), `light` (opsional), `ar` (rasio lebar/tinggi gambar), `lines` (narasi & dialog berurutan; baris bertanda kutip “ ” dianggap dialog). Bagian lain: `intro`, `cast` (warna tokoh), `morals`, `closing`, `titleText`. Gambar diambil dari `assets/images/adegan-NN.webp/.jpg` sesuai `id`.
- **Kecepatan baca**: `WPM`, `MIN_MS`, `MAX_MS`, dan `SPEEDS` di bagian atas `script.js` (default ±170 kata/menit).
- **Narasi suara**: memakai Web Speech API bila perangkat punya suara bahasa Indonesia; bila tidak, tombol memberi pesan ramah dan cerita tetap berjalan. Fungsi `speak()` terisolasi sehingga mudah diganti dengan file audio rekaman (`assets/audio/`) di pengembangan berikutnya.
- **Pembukaan**: layar judul dengan tombol Play 3D emas dan "MULAI CERITA". Ubah teksnya di objek `INTRO` (`script.js`).
- **Musik**: `lagu_01` mulai saat tombol Play ditekan, lalu `lagu_02` mengalun dan diulang sampai selesai. Audio baru diunduh setelah tombol ditekan. Tombol ♪ menyalakan/mematikan musik (juga tombol M). Musik mengecil otomatis saat suara narator aktif. Jika browser memblokir suara otomatis, ketuk layar sekali dan musik menyala.
- **Tata letak**: HP landscape / layar lebar otomatis memakai narasi di samping gambar bila gambar jadi lebih besar; HP portrait dan PC 16:9 memakai narasi di bawah gambar.

## Desain (v3)
- Gaya "liquid glass": kaca buram bening untuk narasi, dok kontrol, dan chip; gambar tampil sebagai kartu membulat dengan zoom halus dan latar blur yang bergerak pelan.
- Dialog diberi label warna tokoh (Dino Biru / Merah / Kuning) otomatis dari naskah.
- Progres 16 segmen berwarna pelangi di bagian atas layar.
- Penutup: lencana pesan moral, kartu gambar akhir di samping teks penutup, dan confetti ringan.
- Smart TV (lebar ≥1700 px): huruf narasi lebih besar dan cincin fokus tebal untuk remote.
- Performa: efek kaca memakai tint pekat tanpa `backdrop-filter` (latar sudah diblur sekali), dan animasi latar hanya berjalan pada adegan aktif, sehingga lebih hemat baterai di HP kelas menengah.

## Perubahan v4
- Layar pembuka baru: tombol Play 3D emas + MULAI CERITA (Enter pada remote juga memulai).
- Gambar WebP dengan cadangan JPG; `lagu_02.mp3` dikecilkan dari 6,2 MB ke 2,3 MB; audio dan gambar berikutnya dimuat bertahap.
- Narasi dipecah per kalimat (maks. 24 kata), dialog tidak terpotong; panel lebih rapat di HP landscape.
- Zoom kamera lebih halus (3,5%), crossfade 1,6 detik, latar blur statis.
- Klik mouse selalu menampilkan kontrol; sentuhan tetap tampil/sembunyi.

## Perubahan v5 (integrasi dengan situs utama)
- Data cerita dipindah dari `script.js` ke `data/cerita.json` (isi identik dengan v4: 16 adegan, intro, 5 pesan moral, penutup — diverifikasi otomatis). `script.js` memuat JSON lewat XHR, memvalidasi isinya, lalu menjalankan cerita. Jika JSON gagal dimuat, tampil layar ramah dengan tombol **Coba lagi** dan **Kembali ke Beranda** (bukan layar kosong).
- **Penting saat menguji lokal:** karena data dimuat dari file, buka lewat server (mis. `python3 -m http.server` lalu http://localhost:8000/). Membuka `index.html` langsung via `file://` akan ditolak browser tertentu.
- Tombol 🏠 (dan Home/Backspace pada keyboard/remote) membuka https://belajarbermain.online/ di tab yang sama (`HOME_URL` di bagian atas `script.js`).
- Proyek ini tidak memakai service worker/manifest; cache ditangani browser (GitHub Pages ±10 menit). Situs cerita butuh internet; ia tidak tersedia offline hanya karena situs utama bisa offline.
- Cara memperbarui di GitHub Pages: unggah isi folder ini ke repositori `Kisah3Dino` (termasuk folder `data/`), commit, tunggu 1–2 menit. Tidak perlu menyentuh repositori Buku Belajar Anak.
