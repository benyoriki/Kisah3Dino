/* Tiga Dino Sahabat Hebat — Petualangan Mencari Pelangi Ajaib
   HTML5 + CSS3 + JavaScript murni. Tanpa framework, tanpa CDN. */
(function () {
'use strict';

var HOME_URL = 'https://belajarbermain.online/';
var TITLE_TEXT = 'Tiga Dino Sahabat Hebat. Petualangan Mencari Pelangi Ajaib.';
var CLOSING = 'Adik-adik, kalian juga bisa menjadi hebat seperti Dino Biru, Dino Merah, dan Dino Kuning! Teruslah belajar, berani mencoba, sayangi teman-teman, dan jangan menyerah ketika menghadapi kesulitan. Karena setiap langkah kecil bisa membawa kita menuju petualangan yang luar biasa. Sampai jumpa, teman-teman cilik!';
/* ===== Teks pembukaan (ubah di sini) ===== */
var INTRO = {
  kicker:  'Dongeng Interaktif untuk Anak',
  title:   'Tiga Dino Sahabat Hebat',
  sub:     'Petualangan Mencari Pelangi Ajaib 🌈',
  purpose: 'Cerita ini mengajak adik-adik belajar berani mencoba, tidak mudah menyerah, saling membantu, berpikir sebelum bertindak, dan menjaga alam bersama sahabat.',
  credit:  'Dibuat oleh <b>Belajar Bermain</b> • belajarbermain.online',
  musicAt: 3000,    // lagu_01 mulai 3 detik setelah website dibuka
  revealAt: 12000   // setelah lagu_01 selesai (±9 dtk): masuk perlahan ke gambar pertama + lagu_02
};
var MORALS = [
  ['💪', 'Berani mencoba', 'Jangan takut belajar hal baru.'],
  ['🌟', 'Tidak mudah menyerah', 'Kalau belum berhasil, cobalah lagi dengan cara yang lebih baik.'],
  ['🤝', 'Saling membantu', 'Teman yang baik saling mendukung.'],
  ['🤔', 'Berpikir sebelum bertindak', 'Perhatikan keadaan dan pilih jalan yang aman.'],
  ['🌳', 'Menjaga alam', 'Keindahan alam harus dijaga bersama.']
];

/* ============ DATA CERITA (satu sumber untuk teks, timer, navigasi) ============
   lines : urutan narasi & dialog sesuai naskah. Baris yang memuat tanda kutip “ ” dianggap dialog.
   fx    : efek suasana (rain | stars | fireflies | sparkle), light: cahaya pelangi lembut.   */
function img(n) { return 'assets/images/adegan-' + (n < 10 ? '0' : '') + n + '.jpg'; }
var SCENES = [
 { id:1, title:'Tiga Sahabat Hebat', alt:'Dino Biru, Dino Merah, dan Dino Kuning berdiri ceria di lembah penuh bunga.', fx:'fireflies', lines:[
  'Pada suatu pagi yang cerah, di sebuah lembah yang indah, hiduplah tiga sahabat dinosaurus. Mereka adalah Dino Biru yang pemberani, Dino Merah yang kuat dan bersemangat, serta Dino Kuning yang pintar dan selalu tersenyum.',
  'Setiap hari mereka bermain bersama. Namun, hari itu mereka ingin melakukan sesuatu yang berbeda. Mereka ingin menjelajahi dunia dan menemukan sebuah tempat ajaib yang konon memiliki pelangi paling indah di seluruh lembah!',
  '“Teman-teman, bagaimana kalau hari ini kita bertualang?” ajak Dino Biru.',
  '“Horeee! Aku siap!” seru Dino Merah sambil melompat kegirangan.',
  'Dino Kuning tertawa bahagia. “Ayo! Petualangan baru menanti kita!”' ]},
 { id:2, title:'Peta Rahasia', alt:'Ketiga dino melihat peta tua dengan tanda pelangi dan tanda silang.', fx:'fireflies', lines:[
  'Sebelum berangkat, Dino Kuning mengeluarkan sebuah peta tua yang ditemukan di dekat rumahnya.',
  '“Lihat! Di peta ini ada tanda pelangi dan tanda silang. Mungkin di sanalah tempat ajaib itu berada!” katanya dengan mata berbinar.',
  'Dino Merah mendekat sambil mengangguk-angguk. “Wah, seperti mencari harta karun!”',
  'Dino Biru memperhatikan jalur pada peta. “Kalau kita mengikuti petunjuknya bersama-sama, pasti kita bisa sampai ke sana.”',
  'Mereka membawa bekal, mengencangkan tas kecil Dino Biru, lalu berangkat dengan langkah penuh semangat. Tak seorang pun tahu kejutan apa yang menunggu mereka di ujung perjalanan.' ]},
 { id:3, title:'Menyusuri Hutan Ceria', alt:'Tiga dino berjalan di hutan hijau dengan bunga dan kupu-kupu.', fx:'fireflies', lines:[
  'Ketiga sahabat memasuki hutan yang dipenuhi pepohonan hijau, bunga warna-warni, dan kupu-kupu yang beterbangan.',
  '“Wah, lihat bunga itu! Cantik sekali!” seru Dino Kuning.',
  'Dino Merah berputar kecil dengan gembira. “Dan lihat kupu-kupu itu! Aku ingin mengikutinya!”',
  '“Tunggu, Merah! Kita harus tetap bersama dan mengikuti peta,” kata Dino Biru dengan lembut.',
  'Dino Merah pun tertawa malu. “Hehehe, benar juga!”',
  'Mereka melanjutkan perjalanan sambil menyapa burung-burung dan mendengarkan suara alam. Mereka belajar bahwa petualangan terasa lebih menyenangkan ketika dilakukan bersama teman-teman.' ]},
 { id:4, title:'Menyeberangi Sungai', alt:'Para dino melompati batu-batu di sungai jernih dekat air terjun.', fx:'sparkle', lines:[
  'Tak lama kemudian, mereka tiba di sebuah sungai jernih dengan air terjun yang mengalir deras. Untuk melanjutkan perjalanan, mereka harus melewati batu-batu besar di tengah sungai.',
  'Dino Merah langsung maju. “Aku bisa melompat jauh!”',
  'Namun, ketika menginjak batu yang licin, kakinya hampir terpeleset.',
  '“Hati-hati, Merah!” seru Dino Biru.',
  'Dino Kuning menunjuk batu yang lebih lebar. “Coba lewat batu yang itu. Kelihatannya lebih aman!”',
  'Dino Biru berjalan lebih dulu untuk menunjukkan jalannya. Dino Merah mengikuti dengan hati-hati, sementara Dino Kuning memberi semangat dari belakang.',
  'Akhirnya, mereka berhasil menyeberang. “Kita berhasil!” teriak mereka bertiga.',
  'Mereka pun belajar bahwa keberanian harus disertai kehati-hatian.' ]},
 { id:5, title:'Hujan Tak Terduga', alt:'Tiga dino berteduh di bawah daun besar saat hujan turun.', fx:'rain', lines:[
  'Ketika mereka melanjutkan perjalanan, awan mendung tiba-tiba menutupi langit. Tak lama kemudian, hujan turun membasahi hutan.',
  '“Aduh, hujan! Aku tidak mau tas kecilku basah!” kata Dino Biru.',
  'Dino Kuning menemukan daun besar yang bisa mereka gunakan sebagai payung. Mereka pun duduk berdekatan di bawah daun itu.',
  'Dino Merah menggoyangkan ekornya dan berkata, “Kalau kita menunggu bersama, hujan tidak terasa membosankan!”',
  'Mereka tertawa sambil mendengarkan suara rintik hujan. Dino Kuning bahkan membuat permainan menebak suara: apakah itu suara katak, burung, atau tetesan air?',
  'Ketika hujan mulai reda, mereka kembali bersemangat. Mereka sadar bahwa perubahan rencana bukan alasan untuk berhenti bergembira.' ]},
 { id:6, title:'Malam Penuh Bintang', alt:'Para dino berkemah di dekat api unggun di bawah bulan dan bintang.', fx:'stars', lines:[
  'Hari mulai gelap, sehingga ketiga sahabat memutuskan untuk beristirahat di tempat perkemahan yang aman.',
  'Mereka memasang tenda kecil dan duduk bersama di dekat api unggun yang dijaga dengan aman oleh orang dewasa di dekat perkemahan.',
  'Dino Merah memandang langit. “Wah, bintangnya banyak sekali!”',
  'Dino Biru menunjuk bulan yang bersinar. “Mungkin pelangi yang kita cari berada di balik pegunungan itu.”',
  'Dino Kuning tersenyum. “Besok kita lanjutkan perjalanan. Sekarang waktunya beristirahat agar tubuh kita kuat!”',
  'Mereka saling bercerita, mengucapkan selamat malam, lalu tidur dengan nyaman. Malam itu mereka bermimpi tentang petualangan yang lebih seru.' ]},
 { id:7, title:'Menolong Teman Baru', alt:'Para dino bertemu kelinci putih di dekat batang pohon tumbang.', fx:'fireflies', lines:[
  'Keesokan paginya, mereka kembali berjalan. Di dekat sebuah batang pohon tumbang, mereka melihat seekor kelinci putih kecil yang kebingungan.',
  '“Kenapa kamu terlihat sedih?” tanya Dino Kuning.',
  '“Aku tidak tahu bagaimana melewati batang pohon ini untuk pulang,” jawab kelinci.',
  'Dino Merah segera mendekat. “Jangan khawatir! Kami akan membantumu.”',
  'Dino Biru memeriksa jalan di sekeliling batang pohon, sementara Dino Kuning menunjukkan jalur kecil yang aman di sampingnya. Dino Merah menemani kelinci melewati jalan tersebut.',
  '“Terima kasih, teman-teman!” kata kelinci dengan gembira.',
  'Mereka pun melanjutkan perjalanan dengan hati hangat. Menolong orang lain ternyata membuat hari mereka semakin menyenangkan.' ]},
 { id:8, title:'Jembatan Persahabatan', alt:'Dino Biru membantu Dino Merah melewati celah berbatu, Dino Kuning menunggu.', fx:'sparkle', lines:[
  'Di depan mereka terbentang celah berbatu yang harus dilewati. Tidak ada jembatan, hanya jalur sempit yang menghubungkan kedua sisi.',
  'Dino Merah menelan ludah. “Hmm, sepertinya agak menakutkan.”',
  'Dino Biru tidak memaksanya. “Tidak apa-apa merasa takut. Kita cari jalan yang lebih aman.”',
  'Dino Kuning melihat sekeliling dan menemukan jalan memutar yang landai. Mereka berjalan perlahan, saling menunggu, dan memastikan tak seorang pun tertinggal.',
  'Ketika akhirnya tiba di seberang, Dino Merah bersorak, “Ternyata aku bisa melewati rasa takutku!”',
  '“Betul!” kata Dino Biru. “Berani bukan berarti tidak takut, tetapi berusaha mengambil langkah yang tepat.”',
  'Mereka pun saling memberi tos dengan bangga.' ]},
 { id:9, title:'Petunjuk dari Burung Biru', alt:'Burung biru hinggap di dahan dan memberi petunjuk kepada tiga dino.', fx:'fireflies', lines:[
  'Saat beristirahat di bawah pohon, mereka mendengar suara, “Cuit-cuit! Kalian sedang mencari apa?”',
  'Seekor burung biru cantik hinggap di dahan.',
  'Dino Biru menjawab, “Kami sedang mencari tempat pelangi yang ada di peta.”',
  'Burung itu mengepakkan sayapnya. “Aku pernah melihat cahaya warna-warni di balik lembah. Ikuti jalan menuju bukit besar, lalu carilah gua yang memiliki batu berkilau!”',
  '“Terima kasih, Burung Biru!” seru Dino Kuning.',
  'Burung itu terbang melintasi pepohonan, seolah-olah menunjukkan arah kepada mereka.',
  'Ketiga sahabat kembali berjalan dengan harapan baru. Mereka belajar bahwa mendengarkan orang lain bisa membantu menemukan jalan keluar.' ]},
 { id:10, title:'Bertemu Keluarga Dino', alt:'Dinosaurus hijau besar dan anak-anaknya menyapa tiga sahabat.', fx:'fireflies', lines:[
  'Dalam perjalanan menuju bukit, mereka bertemu dinosaurus hijau yang lebih besar bersama anak-anaknya.',
  '“Halo, teman-teman! Kalian mau ke mana?” tanya dinosaurus besar dengan ramah.',
  'Dino Kuning menunjukkan peta mereka. “Kami mencari tempat pelangi ajaib!”',
  'Dinosaurus besar tersenyum. “Kalian berada di jalur yang benar. Namun, dekat gua nanti jalannya cukup gelap. Berjalanlah bersama dan jangan terburu-buru.”',
  'Dino Merah menyapa anak-anak dinosaurus kecil. Mereka tertawa dan bermain sebentar sebelum berpamitan.',
  '“Semoga kalian menemukan pelangi!” kata keluarga dinosaurus itu.',
  'Ketiga sahabat melanjutkan perjalanan dengan hati gembira. Kini mereka tahu bahwa dunia penuh dengan teman baik yang siap berbagi petunjuk.' ]},
 { id:11, title:'Gua Misterius', alt:'Tiga dino berdiri di depan gua besar dengan cahaya kecil berkilauan.', fx:'sparkle', lines:[
  'Akhirnya, mereka tiba di depan sebuah gua besar yang dikelilingi tanaman hijau. Dari dalam gua tampak cahaya kecil berkilauan.',
  'Dino Merah berbisik, “Apakah ada harta karun di dalamnya?”',
  'Dino Biru memegang lentera kecil. “Kita boleh penasaran, tetapi harus tetap berhati-hati.”',
  'Dino Kuning mengangguk. “Kita masuk hanya sejauh yang aman dan tetap bersama-sama.”',
  'Dengan langkah perlahan, mereka memperhatikan dinding gua yang dihiasi batu-batu berkilau. Setiap langkah membuat mereka menemukan sesuatu yang baru.',
  'Tiba-tiba, cahaya warna-warni terlihat dari sudut gua.',
  '“Teman-teman! Lihat itu!” seru Dino Kuning.',
  'Mereka saling berpandangan dengan mata berbinar. Apa yang akan mereka temukan di sana?' ]},
 { id:12, title:'Kristal Cahaya Pelangi', alt:'Kristal besar memancarkan cahaya pelangi di tengah gua berkilau.', fx:'sparkle', light:true, lines:[
  'Di tengah gua, mereka menemukan sebuah kristal besar yang memancarkan cahaya merah, jingga, kuning, hijau, biru, dan ungu.',
  '“Indah sekali!” bisik Dino Biru.',
  'Dino Merah melompat kegirangan. “Apakah ini harta karun yang kita cari?”',
  'Dino Kuning memperhatikan cahaya yang memantul di dinding gua. “Mungkin kristal ini yang membuat langit di luar terlihat berwarna-warni!”',
  'Mereka tidak mengambil kristal itu. Sebaliknya, mereka duduk sejenak untuk menikmati keindahannya dan memastikan tempat itu tetap terjaga.',
  'Dino Biru tersenyum. “Ternyata, menemukan sesuatu yang indah tidak selalu berarti kita harus memilikinya.”',
  'Mereka merasa bahagia karena berhasil menemukan keajaiban alam bersama-sama.' ]},
 { id:13, title:'Pelangi Impian', alt:'Tiga dino duduk di bukit memandang pelangi raksasa di atas lembah.', fx:'sparkle', light:true, lines:[
  'Setelah keluar dari gua, mereka mendaki bukit kecil. Tiba-tiba, sinar matahari menembus sisa awan hujan dan sebuah pelangi raksasa muncul di atas lembah.',
  'Merah, jingga, kuning, hijau, biru, nila, dan ungu membentang indah di langit.',
  '“Itu dia! Pelangi yang kita cari!” teriak Dino Merah.',
  'Dino Kuning bertepuk tangan. “Warnanya jauh lebih indah daripada yang kubayangkan!”',
  'Dino Biru memandang kedua sahabatnya. “Perjalanan kita panjang, tetapi kita berhasil karena tidak menyerah dan selalu bekerja sama.”',
  'Mereka duduk berdampingan, menikmati pemandangan yang menakjubkan.',
  'Pada saat itu, mereka menyadari bahwa perjalanan bersama teman-teman sama berharganya dengan tempat indah yang mereka temukan.' ]},
 { id:14, title:'Hadiah Terindah', alt:'Tiga dino berpelukan gembira di bawah cahaya senja dengan hati bersinar.', fx:'sparkle', lines:[
  'Ketiga sahabat berpelukan dengan gembira. Dino Merah tertawa, Dino Kuning tersenyum lebar, dan Dino Biru merasa sangat bersyukur.',
  '“Hari ini aku belajar bahwa kita bisa melakukan banyak hal jika saling membantu,” kata Dino Merah.',
  '“Aku belajar bahwa kita harus teliti dan tidak terburu-buru,” tambah Dino Kuning.',
  'Dino Biru mengangguk. “Dan aku belajar bahwa sahabat yang baik selalu saling mendukung.”',
  'Mereka kemudian membuat janji untuk selalu membantu teman, menjaga alam, dan tidak mudah menyerah saat menghadapi kesulitan.',
  'Bagi mereka, hadiah terindah bukanlah kristal ajaib, melainkan persahabatan yang semakin kuat.' ]},
 { id:15, title:'Mimpi Petualangan Berikutnya', alt:'Tiga dino memandang matahari terbenam dari atas bukit.', fx:'fireflies', lines:[
  'Senja mulai tiba. Langit berubah menjadi jingga, merah muda, dan keemasan.',
  'Ketiga sahabat duduk di atas bukit sambil memandang matahari yang perlahan tenggelam.',
  'Dino Kuning berkata, “Menurut kalian, petualangan apa lagi yang bisa kita lakukan besok?”',
  'Dino Merah langsung menjawab, “Mencari air terjun rahasia! Atau membantu hewan-hewan di hutan!”',
  'Dino Biru tertawa. “Apa pun petualangannya, kita harus merencanakannya dengan baik.”',
  'Mereka pulang dengan hati penuh kenangan indah. Meskipun kaki mereka lelah, senyum mereka tak pernah hilang.',
  'Malam nanti, mereka akan beristirahat. Besok, siapa tahu, petualangan baru sudah menunggu!' ]},
 { id:16, title:'Bersama Sahabat, Kita Hebat!', alt:'Tiga dino melambai ceria di bawah pelangi dengan papan Bersama Sahabat, Setiap Petualangan Jadi Lebih Hebat.', fx:'sparkle', light:true, lines:[
  'Sejak hari itu, Dino Biru, Dino Merah, dan Dino Kuning semakin dikenal sebagai tiga sahabat yang selalu membawa keceriaan.',
  'Mereka tahu bahwa setiap perjalanan pasti memiliki tantangan. Terkadang ada jalan yang sulit, hujan yang datang tiba-tiba, atau rasa takut yang membuat mereka ragu.',
  'Namun, mereka juga tahu bahwa selalu ada cara untuk belajar, mencoba kembali, meminta bantuan, dan saling menyemangati.',
  '“Aku berani mencoba!” seru Dino Biru.',
  '“Aku siap membantu!” kata Dino Merah.',
  '“Dan aku akan mencari jalan yang baik!” tambah Dino Kuning.',
  'Mereka tertawa bersama di bawah pelangi yang indah.',
  'Tamat. Sampai jumpa di petualangan berikutnya!' ]}
];
var TOTAL = SCENES.length;
var AR = [1.82,1.36,1.16,1.32,1.77,1.7,1.56,1.7,1.52,1.62,1.66,1.89,1.78,1.32,1.19,1.39];   // rasio lebar/tinggi tiap gambar (untuk tata letak)

/* ============ Pengaturan waktu baca (adaptif jumlah kata) ============ */
var WPM = 170, BASE_MS = 900, MIN_MS = 2600, MAX_MS = 16000, TAIL_MS = 1500, TITLE_MS = 4800, MAX_WORDS = 40;
var SPEEDS = [
  { key:'slow',   label:'Lambat', mul:1.35, rate:0.8 },
  { key:'normal', label:'Normal', mul:1,    rate:0.92 },
  { key:'fast',   label:'Cepat',  mul:0.78, rate:1.05 }
];
function wc(t) { return t.split(/\s+/).length; }
function readMs(t) { return Math.max(MIN_MS, Math.min(MAX_MS, wc(t) / (WPM / 60) * 1000 + BASE_MS)); }
function splitLong(t) {                      // pecah baris panjang per kalimat (tanpa lookbehind: aman untuk TV lama)
  if (wc(t) <= MAX_WORDS) return [t];
  var words = t.split(/\s+/), out = [], cur = [];
  for (var i = 0; i < words.length; i++) {
    cur.push(words[i]);
    if (/[.!?”]$/.test(words[i]) && cur.length >= 14 && words.length - i > 8) { out.push(cur.join(' ')); cur = []; }
  }
  if (cur.length) out.push(cur.join(' '));
  return out;
}
SCENES.forEach(function (sc) {
  sc.image = img(sc.id); sc.ar = AR[sc.id - 1];
  sc.segs = [];
  sc.lines.forEach(function (l) {
    splitLong(l).forEach(function (p) { sc.segs.push({ t: p, d: p.indexOf('“') > -1, w: wc(p) }); });
  });
  sc.duration = sc.segs.reduce(function (a, s) { return a + readMs(s.t); }, TAIL_MS);   // ms pada kecepatan Normal
});

/* ============ Elemen & status ============ */
function $(id) { return document.getElementById(id); }
var body = document.body, app = $('app');
var layers = [$('layerA'), $('layerB')], cur = null;
var textEl = $('text'), glass = $('glass'), bar = $('progress'), barI = bar.firstElementChild;
var S = { intro: false, music: true, scene: 0, seg: 0, playing: true, speed: 1, voice: false, ended: false, endPane: 1, auto: false };
var timer = 0, capTimer = 0, token = 0, uiT = 0, toastT = 0, chapT = 0, leaving = false;
body.className = '';
var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ============ Musik latar (lagu_01 pembuka, lagu_02 selama cerita) ============ */
var MUSIC_VOL = 0.55, curTrack = 0, AUDIO = {};
function mkAudio(src) {
  var a = new Audio(); a.preload = 'none'; a.loop = true; a.src = src; a.volume = 0;
  a.addEventListener('error', function () { a.bad = true; });
  return a;
}
try { AUDIO[1] = mkAudio('assets/audio/lagu_01.mp3'); AUDIO[2] = mkAudio('assets/audio/lagu_02.mp3'); } catch (e) {}
function musicVol() { return S.voice ? 0.2 : MUSIC_VOL; }   // musik mengecil saat narator bicara
function fadeTo(a, v, ms, cb) {
  clearInterval(a.fi);
  var from = a.volume, steps = Math.max(1, Math.round(ms / 50)), i = 0;
  a.fi = setInterval(function () {
    i++; try { a.volume = Math.max(0, Math.min(1, from + (v - from) * i / steps)); } catch (e) {}
    if (i >= steps) { clearInterval(a.fi); if (cb) cb(); }
  }, 50);
}
function playTrack(n) {
  var a = AUDIO[n]; if (!S.music || !a || a.bad) return;
  var p; a.preload = 'auto';
  try { p = a.play(); } catch (e) { return; }
  function ok() { body.classList.remove('need-tap'); fadeTo(a, musicVol(), 1600); }
  function fail() { body.classList.add('need-tap'); if (!S.intro) toast('Ketuk layar untuk menyalakan musik 🎵'); }
  if (p && p.then) p.then(ok, fail); else ok();
}
function stopTrack(n, ms) { var a = AUDIO[n]; if (!a) return; fadeTo(a, 0, ms || 800, function () { try { a.pause(); } catch (e) {} }); }
function musicSwitch(n) { if (curTrack && curTrack !== n) stopTrack(curTrack, 1500); curTrack = n; playTrack(n); }
function musicStopAll() { for (var k in AUDIO) { clearInterval(AUDIO[k].fi); try { AUDIO[k].pause(); } catch (e) {} } }
function setMusicUI() {
  body.classList.toggle('music-off', !S.music);
  var els = document.querySelectorAll('.js-music');
  for (var i = 0; i < els.length; i++) { els[i].setAttribute('aria-pressed', S.music); els[i].setAttribute('aria-label', S.music ? 'Matikan musik' : 'Nyalakan musik'); }
}
function toggleMusic() {
  S.music = !S.music; setMusicUI();
  if (S.music) { if (curTrack) playTrack(curTrack); toast('Musik menyala 🎵'); }
  else { stopTrack(1, 500); stopTrack(2, 500); toast('Musik dimatikan'); }
  if (!S.intro) showUI();
}
function duck() { var a = AUDIO[curTrack]; if (a && !a.paused && S.music) fadeTo(a, musicVol(), 600); }
function unlockAudio() { var a = AUDIO[curTrack]; if (S.music && curTrack && a && a.paused && !a.bad && !leaving) playTrack(curTrack); }
['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { document.addEventListener(ev, unlockAudio, true); });

/* ============ Pembukaan: layar hitam → keterangan → masuk perlahan ke gambar pertama ============ */
var introT = [];
function startIntro() {
  S.intro = true; body.classList.add('in-intro');
  $('iKicker').textContent = INTRO.kicker; $('iTitle').textContent = INTRO.title; $('iSub').textContent = INTRO.sub;
  $('iPurpose').textContent = INTRO.purpose; $('iCredit').innerHTML = INTRO.credit;
  introT.push(setTimeout(function () { if (S.intro) musicSwitch(1); }, INTRO.musicAt));
  introT.push(setTimeout(function () { endIntro(false); }, INTRO.revealAt));
}
function endIntro(skipped) {
  if (!S.intro) return;
  S.intro = false; introT.forEach(clearTimeout); introT = [];
  var el = $('intro'); body.classList.remove('in-intro', 'need-tap');
  if (skipped) el.classList.add('fast');
  el.classList.add('out');
  musicSwitch(2);
  enterScene(0, { noTitle: true, delay: skipped ? 700 : 2000 });
  setTimeout(function () { el.classList.add('gone'); }, skipped ? 1600 : 3400);
}

function clearTimers() { clearTimeout(timer); clearTimeout(capTimer); timer = capTimer = 0; token++; }

/* ============ Narasi suara (Web Speech API, opsional) ============ */
var synth = window.speechSynthesis, canSpeak = !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
var idVoice = null, voicesKnown = false, curUtt = null;
function pickVoice() {
  if (!canSpeak) return;
  var vs = synth.getVoices() || []; voicesKnown = vs.length > 0; idVoice = null;
  for (var i = 0; i < vs.length; i++) { if (/^id/i.test(vs[i].lang)) { idVoice = vs[i]; break; } }
}
if (canSpeak) { pickVoice(); if (synth.addEventListener) synth.addEventListener('voiceschanged', pickVoice); }
function stopSpeech() { if (canSpeak) { try { synth.cancel(); } catch (e) {} } curUtt = null; }
function speak(text, cb) {
  if (!canSpeak) { cb(); return; }
  try {
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/[“”"]/g, '').replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, ''));
    u.lang = 'id-ID'; if (idVoice) u.voice = idVoice;
    u.rate = SPEEDS[S.speed].rate; u.pitch = 1.08;
    u.onend = u.onerror = function () { cb(); };
    curUtt = u; synth.speak(u);
  } catch (e) { cb(); }
}

/* Jalankan satu bagian: tunggu waktu baca DAN suara selesai (jika aktif), lalu lanjut */
function runTimed(text, ms, done) {
  var my = ++token; stopSpeech();
  var t = false, s = !S.voice;
  function go() {
    if (my !== token || !S.playing) return;
    if (t && s) { clearTimeout(timer); clearTimeout(capTimer); done(); }
  }
  timer = setTimeout(function () { t = true; go(); }, ms);
  if (S.voice) {
    capTimer = setTimeout(function () { t = s = true; go(); }, ms * 2 + 6000);   // pengaman jika suara macet
    speak(text, function () { if (my !== token) return; s = true; go(); });
  }
}

/* ============ Tampilan adegan ============ */
var cache = {};
function preload(i) {
  if (i < 0 || i >= TOTAL || cache[i]) return;
  var im = new Image(); im.decoding = 'async'; im.src = SCENES[i].image; cache[i] = im;
}
var DIRS = [['-1.2%', '-.8%'], ['1.2%', '-.6%'], ['0', '-1.2%'], ['-1%', '.9%'], ['1%', '.7%']];
function buildLayer(el, sc, i) {
  var im = el.querySelector('img');
  el.classList.remove('broken');
  im.classList.remove('kb');
  im.onerror = function () { el.classList.add('broken'); };
  im.onload = function () { el.classList.remove('broken'); };
  im.alt = sc.alt;
  im.src = sc.image;
  el.querySelector('.bgblur').style.backgroundImage = 'url("' + sc.image + '")';
  var d = DIRS[i % DIRS.length];
  im.style.setProperty('--kx', d[0]); im.style.setProperty('--ky', d[1]);
  im.style.setProperty('--kd', (sc.duration / 1000 + 6) + 's');
  return im;
}
function afterImg(im, cb, max) {
  var fired = false;
  function once() { if (fired) return; fired = true; cb(); }
  if (im.complete) { once(); return; }
  im.addEventListener('load', once); im.addEventListener('error', once); setTimeout(once, max);
}

function setProgress(sceneIdx, segIdx) {
  var sc = SCENES[sceneIdx], f = (sceneIdx + (segIdx + 1) / (sc.segs.length + 1)) / TOTAL;
  var pct = Math.round(f * 100);
  barI.style.width = pct + '%'; bar.setAttribute('aria-valuenow', pct);
}
function updateUI() {
  var sc = SCENES[S.scene];
  $('counter').textContent = 'Adegan ' + sc.id + ' dari ' + TOTAL + ' • ' + sc.title;
}
function flashChapter(sc) {
  var c = $('chapter'); c.textContent = 'Adegan ' + sc.id + ' • ' + sc.title;
  c.classList.add('on'); clearTimeout(chapT);
  chapT = setTimeout(function () { c.classList.remove('on'); }, 3200);
}
function renderText(seg, ms, instant) {
  glass.classList.toggle('dia', seg.d);
  glass.classList.toggle('static', !!instant);
  textEl.textContent = '';
  var words = seg.t.split(/\s+/), span = Math.min(ms * 0.55, words.length * 300);
  for (var i = 0; i < words.length; i++) {
    var s = document.createElement('span'); s.className = 'w';
    s.textContent = words[i];
    if (!instant) s.style.animationDelay = Math.round(i * span / words.length) + 'ms';
    textEl.appendChild(s);
    if (i < words.length - 1) textEl.appendChild(document.createTextNode(' '));   // spasi antarkata (perbaikan bug kata menempel)
  }
}
function clearText() { textEl.textContent = ''; glass.classList.remove('dia'); }
function showTitle(on) { $('titleCard').classList.toggle('on', on); body.classList.toggle('title-on', on); }

function applyLayout(sc) {
  var vw = window.innerWidth, vh = window.innerHeight, side = false, pw = 0;
  sc = sc || SCENES[S.scene];
  if (vw > vh && sc.ar) {
    var bph = Math.min(320, Math.max(120, vh * 0.31));
    var wBottom = Math.min(vw, (vh - bph - 12) * sc.ar);
    pw = Math.round(Math.max(vw * 0.3, Math.min(vw - vh * sc.ar, vw * 0.42)));
    var wSide = Math.min(vw - pw, (vh - 12) * sc.ar);
    side = wSide > wBottom * 1.1;
  }
  body.classList.toggle('side', side);
  if (side) body.style.setProperty('--pw', pw + 'px');
}
window.addEventListener('resize', function () { applyLayout(); });

function enterScene(i, opts) {
  opts = opts || {};
  clearTimers(); stopSpeech(); showTitle(false);
  S.ended = false; body.classList.remove('is-end'); $('ending').classList.remove('on', 'p1', 'p2');
  S.scene = i; S.seg = 0;
  var sc = SCENES[i], my = token;
  var target = layers[0] === cur ? layers[1] : layers[0];
  var im = buildLayer(target, sc, i); applyLayout(sc);
  clearText(); updateUI(); setProgress(i, -1); preload(i + 1); preload(i + 2);
  afterImg(im, function () {
    if (my !== token) return;
    target.classList.add('active'); if (cur && cur !== target) cur.classList.remove('active'); cur = target;
    void im.offsetWidth; im.classList.add('kb');
    fx.set(sc.fx, S.playing); $('light').classList.toggle('on', !!sc.light);
    flashChapter(sc);
    if (!S.playing) { renderText(sc.segs[0], 0, true); return; }
    timer = setTimeout(function () {
      if (my !== token) return;
      playSegment(i === 0 && !opts.noTitle ? -1 : 0);
    }, opts.delay || (opts.instant ? 200 : 900));
  }, 3000);
}

function playSegment(k) {
  var sc = SCENES[S.scene];
  if (k < 0 && S.scene !== 0) k = 0;
  S.seg = k;
  if (k < 0) {
    clearText(); showTitle(true);
    runTimed(TITLE_TEXT, TITLE_MS * SPEEDS[S.speed].mul, function () {
      showTitle(false); S.seg = 0; var my = token;
      timer = setTimeout(function () { if (my === token) playSegment(0); }, 600);
    });
    return;
  }
  showTitle(false);
  var seg = sc.segs[k], last = k === sc.segs.length - 1;
  var ms = (readMs(seg.t) + (last ? TAIL_MS : 0)) * SPEEDS[S.speed].mul;
  setProgress(S.scene, k);
  renderText(seg, ms, false);
  runTimed(seg.t, ms, function () { if (last) next(); else playSegment(k + 1); });
}

/* ============ Penutup ============ */
(function buildEnding() {
  var ul = $('morals');
  MORALS.forEach(function (m, i) {
    var li = document.createElement('li'); li.style.animationDelay = (0.5 + i * 0.6) + 's';
    li.innerHTML = '<b></b><span></span>'; li.firstChild.textContent = m[0] + ' ' + m[1]; li.lastChild.textContent = m[2];
    ul.appendChild(li);
  });
  $('closing').textContent = CLOSING;
})();
var MORAL_SPEECH = 'Bersama sahabat, kita hebat! Pesan moral: ' + MORALS.map(function (m) { return m[1] + '. ' + m[2]; }).join(' ');
function showEnding() {
  clearTimers(); stopSpeech(); showTitle(false); clearText();
  S.ended = true; S.endPane = 1; body.classList.add('is-end');
  S.playing = true; body.classList.remove('paused');
  barI.style.width = '100%'; bar.setAttribute('aria-valuenow', 100);
  fx.set(null); $('light').classList.add('on');
  $('counter').textContent = 'Tamat';
  playEnding(1);
}
function playEnding(pane) {
  S.endPane = pane;
  var e = $('ending'); e.classList.add('on'); e.classList.remove('p1', 'p2'); e.classList.add('p' + pane);
  if (pane === 1) {
    runTimed(MORAL_SPEECH, (readMs(MORAL_SPEECH) + 1500) * SPEEDS[S.speed].mul, function () { playEnding(2); });
  } else {
    S.playing = true; body.classList.remove('paused');
    runTimed(CLOSING, 1000, function () {});
    setTimeout(function () { if (S.ended && S.endPane === 2 && !leaving) { try { $('btnReplay').focus({ preventScroll: true }); } catch (x) {} } }, 900);
  }
}

/* ============ Kontrol pemutaran ============ */
function next() { if (S.ended) return; if (S.scene < TOTAL - 1) enterScene(S.scene + 1); else showEnding(); }
function prev() {
  if (S.ended) { enterScene(TOTAL - 1, { noTitle: true }); return; }
  enterScene(Math.max(0, S.scene - 1));
}
function pause(silent) {
  if (!S.playing || S.ended && S.endPane === 2) return;
  S.playing = false; body.classList.add('paused'); clearTimers(); stopSpeech(); fx.run();
  $('btnPlay').setAttribute('aria-label', 'Putar'); if (!silent) showUI();
}
function play() {
  if (S.playing) return;
  S.playing = true; body.classList.remove('paused'); $('btnPlay').setAttribute('aria-label', 'Jeda');
  if (S.ended) playEnding(S.endPane); else playSegment(S.seg);
  fx.run(); showUI();
}
function toggle() { if (S.playing) pause(); else play(); }
function restart() {
  S.playing = true; body.classList.remove('paused'); $('btnPlay').setAttribute('aria-label', 'Jeda');
  $('light').classList.remove('on');
  enterScene(0);
}
function goHome() {
  musicStopAll(); introT.forEach(clearTimeout);                         // hentikan semua, fade-out, lalu navigasi sungguhan
  if (leaving) return; leaving = true;
  S.playing = false; clearTimers(); stopSpeech(); fx.stop(); clearTimeout(uiT);
  $('fade').classList.add('on');
  setTimeout(function () { window.location.href = HOME_URL; }, 450);
}
function cycleSpeed() {
  S.speed = (S.speed + 1) % SPEEDS.length;
  var b = $('btnSpeed'); b.textContent = SPEEDS[S.speed].label; b.setAttribute('aria-label', 'Kecepatan cerita: ' + SPEEDS[S.speed].label);
  toast('Kecepatan: ' + SPEEDS[S.speed].label); showUI();
}
function toggleVoice() {
  if (!canSpeak) { toast('Suara narasi belum tersedia di perangkat ini. Ceritanya tetap bisa dibaca 😊'); return; }
  if (!S.voice) {
    if (voicesKnown && !idVoice) { toast('Suara bahasa Indonesia belum ada di perangkat ini. Cerita tetap berjalan tanpa suara 😊'); return; }
    S.voice = true;
  } else S.voice = false;
  body.classList.toggle('voice-on', S.voice);
  var b = $('btnVoice'); b.setAttribute('aria-pressed', S.voice); b.setAttribute('aria-label', S.voice ? 'Matikan suara narasi' : 'Aktifkan suara narasi');
  if (!S.voice) stopSpeech();
  duck();
  if (S.playing) { if (S.ended) playEnding(S.endPane); else playSegment(S.seg); }
  showUI();
}
var fsEl = document.documentElement;
function fsOn() { return document.fullscreenElement || document.webkitFullscreenElement; }
function toggleFs() {
  try {
    var p;
    if (fsOn()) p = (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else p = (fsEl.requestFullscreen || fsEl.webkitRequestFullscreen).call(fsEl);
    if (p && p.catch) p.catch(function () {});
  } catch (e) {}
}

/* ============ UI: tampil saat disentuh, hilang otomatis ============ */
function showUI() {
  body.classList.add('show-ui'); clearTimeout(uiT);
  if (S.playing) uiT = setTimeout(hideUI, 4500);
}
function hideUI() { body.classList.remove('show-ui'); }
function toast(msg) {
  var t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT);
  toastT = setTimeout(function () { t.classList.remove('on'); }, 3800);
}

$('btnHome').onclick = $('btnHome2').onclick = goHome;
$('btnPlay').onclick = toggle;
$('btnPrev').onclick = prev;
$('btnNext').onclick = next;
$('btnSpeed').onclick = cycleSpeed;
$('btnVoice').onclick = toggleVoice;
$('btnMusic').onclick = $('introMusic').onclick = toggleMusic;
$('introSkip').onclick = function () { endIntro(true); };
$('btnFull').onclick = toggleFs;
$('btnReplay').onclick = restart;
if (canSpeak) $('btnVoice').hidden = false;
if (fsEl.requestFullscreen || fsEl.webkitRequestFullscreen) $('btnFull').hidden = false;

document.addEventListener('pointerdown', function (e) {
  if (leaving || S.intro) return;
  if (e.target.closest && e.target.closest('.ui')) { showUI(); return; }
  if (e.target.closest && e.target.closest('.cta')) return;
  if (body.classList.contains('show-ui') && S.playing) hideUI(); else showUI();
});
document.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' && !leaving && !S.intro) { if (!body.classList.contains('show-ui')) showUI(); else if (S.playing) { clearTimeout(uiT); uiT = setTimeout(hideUI, 4500); } } });
document.addEventListener('focusin', function (e) { if (e.target.closest && e.target.closest('.ui')) showUI(); });

/* ============ Keyboard & remote Smart TV ============ */
function focusables() {
  var sel = body.classList.contains('is-end') ? '#ending.p2 .cta, #topbar .btn' : '#topbar .btn, #transport .btn';
  var all = document.querySelectorAll(sel), out = [];
  for (var i = 0; i < all.length; i++) if (!all[i].hidden && all[i].offsetParent !== null) out.push(all[i]);
  return out;
}
function kbFocused() {
  var a = document.activeElement;
  if (!a || a.tagName !== 'BUTTON') return false;
  try { return a.matches(':focus-visible'); } catch (e) { return true; }
}
function focusPrimary() {
  var el = body.classList.contains('is-end') ? $('btnReplay') : $('btnPlay');
  try { el.focus({ preventScroll: true }); } catch (e) {}
}
var KEYCODE = { 13:'Enter', 8:'Backspace', 10009:'Backspace', 461:'Backspace', 415:'MediaPlay', 19:'MediaPause', 10252:'MediaPlayPause', 417:'MediaTrackNext', 412:'MediaTrackPrevious', 37:'ArrowLeft', 38:'ArrowUp', 39:'ArrowRight', 40:'ArrowDown' };
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey || leaving) return;
  var t = e.target, tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
  var k = e.key; if (!k || k === 'Unidentified') k = KEYCODE[e.keyCode] || k;
  if (S.intro) {
    if (k === 'Home' || k === 'Backspace') { e.preventDefault(); goHome(); }
    else if (tag !== 'BUTTON' && (k === 'Enter' || k === ' ' || k === 'ArrowRight')) { e.preventDefault(); endIntro(true); }
    else if (k === 'm' || k === 'M') toggleMusic();
    return;
  }
  var onBtn = tag === 'BUTTON', kb = kbFocused();
  switch (k) {
    case ' ': case 'Spacebar': if (onBtn) return; e.preventDefault(); showUI(); toggle(); break;
    case 'MediaPlayPause': e.preventDefault(); toggle(); break;
    case 'MediaPlay': e.preventDefault(); play(); break;
    case 'MediaPause': e.preventDefault(); pause(); break;
    case 'MediaTrackNext': e.preventDefault(); next(); break;
    case 'MediaTrackPrevious': e.preventDefault(); prev(); break;
    case 'ArrowRight': case 'ArrowLeft': case 'ArrowUp': case 'ArrowDown':
      e.preventDefault();
      var fwd = k === 'ArrowRight' || k === 'ArrowDown';
      if (kb) {                              // fokus remote/keyboard: pindah antar tombol
        var f = focusables(), idx = f.indexOf(document.activeElement);
        if (f.length) f[(idx + (fwd ? 1 : -1) + f.length) % f.length].focus({ preventScroll: true });
        showUI();
      } else if (k === 'ArrowUp' || k === 'ArrowDown') { showUI(); focusPrimary(); }
      else { showUI(); if (fwd) next(); else prev(); }
      break;
    case 'Enter': if (onBtn) return; e.preventDefault(); showUI(); focusPrimary(); break;
    case 'Escape': if (!fsOn()) hideUI(); break;
    case 'Home': case 'Backspace': e.preventDefault(); goHome(); break;
    case 'f': case 'F': if (!$('btnFull').hidden) toggleFs(); break;
    case 'm': case 'M': toggleMusic(); break;
    case 'v': case 'V': toggleVoice(); break;
  }
});

/* ============ Efek suasana (kanvas ringan, hanya jalan saat perlu) ============ */
var fx = (function () {
  var cv = $('fx'), ctx = cv.getContext ? cv.getContext('2d') : null;
  var type = null, parts = [], raf = 0, W = 0, H = 0, last = 0, tm = 0, sprites = {};
  function rnd(n) { return Math.random() * n; }
  function sprite(color) {
    if (sprites[color]) return sprites[color];
    var c = document.createElement('canvas'); c.width = c.height = 48;
    var g = c.getContext('2d'), gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 48, 48); return (sprites[color] = c);
  }
  var RB = ['rgba(255,90,90,.9)', 'rgba(255,170,40,.9)', 'rgba(255,240,90,.9)', 'rgba(110,230,120,.9)', 'rgba(90,190,255,.9)', 'rgba(190,120,255,.9)'];
  function resize() {
    if (!ctx) return;
    var d = Math.min(window.devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function make(tp) {
    var area = W * H / 1000000, n, i; parts = [];
    n = tp === 'rain' ? Math.min(130, Math.round(60 + area * 40)) : tp === 'stars' ? 48 : tp === 'fireflies' ? 20 : 30;
    for (i = 0; i < n; i++) parts.push({ x: rnd(W), y: tp === 'stars' ? rnd(H * 0.5) : rnd(H), p: rnd(6.28), s: 0.4 + rnd(1), c: RB[i % 6], l: 10 + rnd(14) });
  }
  function draw(dt) {
    ctx.clearRect(0, 0, W, H); tm += dt; var i, p;
    if (type === 'rain') {
      ctx.strokeStyle = 'rgba(210,230,255,.5)'; ctx.lineWidth = 1.3; ctx.beginPath();
      for (i = 0; i < parts.length; i++) { p = parts[i]; ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2, p.y + p.l); p.y += (9 + p.s * 7) * dt; p.x -= 1.2 * dt; if (p.y > H) { p.y = -20; p.x = rnd(W + 40); } }
      ctx.stroke();
    } else if (type === 'stars') {
      ctx.fillStyle = '#fff';
      for (i = 0; i < parts.length; i++) { p = parts[i]; ctx.globalAlpha = 0.25 + 0.65 * Math.abs(Math.sin(tm * 0.03 * p.s + p.p)); ctx.beginPath(); ctx.arc(p.x, p.y, 0.7 + p.s, 0, 6.28); ctx.fill(); }
      ctx.globalAlpha = 1;
    } else if (type === 'fireflies') {
      var sp = sprite('rgba(255,235,110,.8)');
      for (i = 0; i < parts.length; i++) { p = parts[i]; p.x += Math.sin(tm * 0.01 * p.s + p.p) * 0.5 * dt; p.y += Math.cos(tm * 0.012 * p.s + p.p) * 0.35 * dt - 0.08 * dt;
        if (p.y < -20) p.y = H + 10; if (p.x < -20) p.x = W + 10; if (p.x > W + 20) p.x = -10;
        ctx.globalAlpha = 0.25 + 0.6 * Math.abs(Math.sin(tm * 0.025 * p.s + p.p)); var z = 14 + p.s * 10; ctx.drawImage(sp, p.x - z / 2, p.y - z / 2, z, z); }
      ctx.globalAlpha = 1;
    } else if (type === 'sparkle') {
      for (i = 0; i < parts.length; i++) { p = parts[i]; p.y -= 0.12 * p.s * dt; p.x += Math.sin(tm * 0.01 + p.p) * 0.2 * dt; if (p.y < -20) { p.y = H + 10; p.x = rnd(W); }
        ctx.globalAlpha = 0.15 + 0.7 * Math.abs(Math.sin(tm * 0.03 * p.s + p.p)); var q = 10 + p.s * 14; ctx.drawImage(sprite(p.c), p.x - q / 2, p.y - q / 2, q, q); }
      ctx.globalAlpha = 1;
    }
  }
  function loop(ts) { raf = requestAnimationFrame(loop); var dt = Math.min((ts - last) / 16.7, 3); last = ts; draw(dt); }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
  function run() {
    stop();
    if (!ctx || !type || reduce || !S.playing || document.hidden || S.ended) return;
    last = performance.now(); raf = requestAnimationFrame(loop);
  }
  function set(tp, playing) {
    type = tp; stop();
    if (ctx) { ctx.clearRect(0, 0, W, H); if (tp) make(tp); }
    run();
  }
  window.addEventListener('resize', function () { resize(); if (type) make(type); });
  resize();
  return { set: set, run: run, stop: stop };
})();

/* ============ Siklus hidup ============ */
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    if (S.playing && !leaving && !S.intro) { S.auto = true; pause(true); }
    fx.stop(); var ca = AUDIO[curTrack]; if (ca) { try { ca.pause(); } catch (e) {} }
  } else {
    if (S.auto) { S.auto = false; play(); }
    if (S.music && curTrack && !leaving) playTrack(curTrack);
  }
});
document.addEventListener('fullscreenchange', function () { $('btnFull').setAttribute('aria-label', fsOn() ? 'Keluar layar penuh' : 'Layar penuh'); });
window.addEventListener('pageshow', function (e) { if (e.persisted && leaving) { leaving = false; $('fade').classList.remove('on'); S.playing = false; pause(); } });

window.onerror = function () { return true; };    // jangan tampilkan error ke anak
preload(0); preload(1);
setMusicUI();
applyLayout(SCENES[0]);
startIntro();
if (innerHeight > innerWidth && innerWidth < 700) setTimeout(function () { toast('Putar HP ke mode landscape agar tampilan lebih besar 📱'); }, 1500);
})();
