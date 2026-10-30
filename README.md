# Tiga Dino Sahabat Hebat — Petualangan Mencari Pelangi Ajaib

Dongeng interaktif bergaya film untuk anak. HTML5 + CSS3 + JavaScript murni (tanpa framework, tanpa CDN, tanpa backend).

## Struktur
```
Tiga-Dino/
├── index.html
├── style.css
├── script.js          ← logika: pemuat data, timer, navigasi, narasi suara, efek (tanpa teks cerita)
├── data/cerita.json   ← SEMUA teks & metadata cerita (16 adegan, intro, pesan moral, penutup)
├── assets/images/     ← adegan-01.webp … 16.webp (utama) + ilustrasi tambahan per momen (01a, 02a–02d, 03a, 03b, … 11a)
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


## Ilustrasi dinamis (v5) — gambar berganti mengikuti narasi
Satu adegan kini bisa punya banyak gambar. Gambar **utama** (`adegan-NN.webp`) tetap menjadi gambar awal dan cadangan; ilustrasi tambahan muncul tepat saat kalimatnya dibacakan, dengan crossfade halus ±0,55 detik.

**Cara kerja** (tanpa timer tetap): `playSegment()` memberi tahu sistem segmen mana yang sedang tampil → sistem memilih gambar untuk segmen itu → bila berbeda dari gambar yang tampil, gambar baru dimuat (preload) lalu di-crossfade. Karena terikat pada segmen, kecepatan Lambat/Normal/Cepat, Jeda/Lanjut, Berikutnya/Sebelumnya, dan Ulangi otomatis tetap sinkron. Musik dan suara narasi tidak disentuh. Jika gambar belum siap, gambar lama dipertahankan sampai gambar baru siap; jika gagal dimuat, gambar lama tetap tampil.

### Format pemetaan (`data/cerita.json` → tiap adegan, properti `shots`)
```json
"shots": [
  { "match": "Lihat! Di peta ini ada tanda pelangi", "image": "assets/images/adegan-02a-peta-closeup.webp", "alt": "…", "ar": 1.78 },
  { "match": "Dino Merah pun tertawa malu", "image": "main" }
]
```
- `match` — potongan teks (huruf besar/kecil & tanda kutip lengkung tidak berpengaruh) yang dicari di **segmen aktual** hasil `splitLong()`. Gambar berlaku mulai segmen yang memuat teks itu, **sampai** shot berikutnya. Boleh melintasi batas segmen; yang dipakai segmen tempat `match` dimulai.
- `image` — path gambar, atau `"main"` untuk kembali ke gambar utama adegan.
- `alt` (opsional) — teks alternatif. `ar` (opsional) — rasio lebar/tinggi; rasio asli gambar selalu dibaca otomatis saat dimuat.
- `revertAt` (opsional, 0–1) — shot berakhir di tengah segmen terakhirnya (proporsional terhadap kecepatan), lalu kembali ke gambar utama. Dipakai pada Adegan 1 agar ditutup dengan gambar ketiga dino.
- Urutan `shots` harus mengikuti urutan cerita. Segmen sebelum shot pertama memakai gambar utama.
- Nama file harus berawalan nomor adegannya (mis. `07a-…` atau `adegan-07a-…` untuk Adegan 7); shot yang salah adegan ditolak otomatis.

Validasi berjalan saat halaman dimuat: teks tak ditemukan, teks ganda, urutan mundur, atau nama file salah adegan → peringatan di console browser (`[Tiga Dino] …`) dan shot itu dilewati; cerita tetap jalan. Laporan lengkap: `window.TigaDino.report` di console.

### Menambah aset baru
1. Salin `.webp` ke `assets/images/` dengan nama berawalan nomor adegan (mis. `12a-closeup-kristal.webp`). Jangan memakai nama yang sudah ada.
2. Tambahkan entri di `shots` adegan itu dengan `match` yang unik. Tidak perlu mengubah `script.js`.
3. Buka situs, cek console (tidak boleh ada peringatan `[Tiga Dino]`).
Ukuran disarankan 1600×900 (16:9) ≤ 450 KB; rasio lain (mis. 1:1) tetap tampil utuh, tidak dipotong.

### Pemetaan saat ini
| Adegan | Kalimat pemicu (`match`) | Gambar |
|---|---|---|
| 1 | (awal – “Pada suatu pagi…” s.d. “…bertualang?” ajak Dino Biru) | adegan-01 (utama) |
| 1 | “Horeee! Aku siap!” … melompat kegirangan | 01a-dino-merah-melompat |
| 1 | “Dino Kuning tertawa bahagia.” (kembali ke utama di ±55% segmen) | 01b-dino-kuning-menunjuk → adegan-01 |
| 2 | (awal – Dino Kuning mengeluarkan peta tua) | adegan-02 (utama) |
| 2 | “Lihat! Di peta ini ada tanda pelangi…” | adegan-02a-peta-closeup |
| 2 | “Dino Merah mendekat sambil mengangguk-angguk…” | adegan-02b-dino-merah-berbicara |
| 2 | “Dino Biru memperhatikan jalur pada peta…” | adegan-02c-dino-biru-menunjuk-peta |
| 2 | “Mereka membawa bekal…” (berlanjut ke “Tak seorang pun tahu…”) | adegan-02d-tiga-dino-berangkat |
| 3 | (awal – hutan, bunga, “Wah, lihat bunga itu!”) | adegan-03 (utama) |
| 3 | “Dino Merah berputar kecil dengan gembira…” | 03b-dino-merah-mengejar-kupu-kupu |
| 3 | “Tunggu, Merah! Kita harus tetap bersama…” | 03a-dino-biru-ekspresi-dekat |
| 3 | “Dino Merah pun tertawa malu…” s.d. akhir | adegan-03 (utama) |
| 4 | (awal – sungai, air terjun, “Aku bisa melompat jauh!”) | adegan-04 (utama) |
| 4 | “Namun, ketika menginjak batu yang licin…” s.d. “Coba lewat batu yang itu…” | 04a-dino-merah-terpeleset-di-sungai |
| 4 | “Dino Biru berjalan lebih dulu…” s.d. akhir | adegan-04 (utama) |
| 5 | (awal – awan mendung, hujan, Dino Biru khawatir) | adegan-05 (utama) |
| 5 | “Dino Kuning menemukan daun besar…” s.d. permainan menebak suara | 05a-berteduh-di-bawah-daun-saat-hujan |
| 5 | “Ketika hujan mulai reda…” | adegan-05 (utama) |
| 6 | (awal – hari gelap, tenda, api unggun) | adegan-06 (utama) |
| 6 | “Dino Merah memandang langit…” s.d. akhir (bulan, istirahat, tidur) | 06a-berkemah-di-bawah-bintang |
| 7 | (awal – kelinci, “Kami akan membantumu”) | adegan-07 (utama) |
| 7 | “Dino Biru memeriksa jalan di sekeliling batang pohon…” s.d. “Dino Merah menemani kelinci…” | 07a-menolong-kelinci-di-batang-pohon |
| 7 | “Terima kasih, teman-teman!” s.d. akhir | adegan-07 (utama) |
| 9 | (awal – suara “Cuit-cuit!”) | adegan-09 (utama) |
| 9 | “Seekor burung biru cantik hinggap di dahan.” s.d. “Terima kasih, Burung Biru!” | 09a-burung-biru-memberi-petunjuk |
| 9 | “Burung itu terbang melintasi pepohonan…” s.d. akhir | adegan-09 (utama) |
| 11 | (awal – depan gua s.d. “Kita masuk hanya sejauh yang aman…”) | adegan-11 (utama) |
| 11 | “Dengan langkah perlahan, mereka memperhatikan dinding gua…” s.d. akhir | 11a-menemukan-gua-kristal |
| 8, 10, 12–16 | belum ada aset khusus | gambar utama masing-masing |
