/* Tiga Dino Sahabat Hebat — Petualangan Mencari Pelangi Ajaib
   HTML5 + CSS3 + JavaScript murni. Tanpa framework, tanpa CDN. */
(function () {
'use strict';
var HOME_URL = 'https://belajarbermain.online/';   // tombol Beranda → situs utama (tab yang sama)
var DATA_URL = 'data/cerita.json';

function boot(D) {
/* Data cerita (teks, adegan, pesan moral) dimuat dari data/cerita.json — lihat pemuat di akhir file. */
var TITLE_TEXT = D.titleText, CLOSING = D.closing, INTRO = D.intro, CAST = D.cast;
var MORALS = D.morals.map(function (m) { return [m.icon, m.title, m.text]; });
var SCENES = D.scenes, AR = SCENES.map(function (s) { return s.ar; });
var WEBP = (function () { try { var c = document.createElement('canvas'); c.width = c.height = 1; return c.toDataURL('image/webp').indexOf('data:image/webp') === 0; } catch (e) { return false; } })();
function img(n) { return 'assets/images/adegan-' + (n < 10 ? '0' : '') + n + (WEBP ? '.webp' : '.jpg'); }
function speaker(t) {                        // siapa yang berbicara (untuk label berwarna)
  if (t.indexOf('“') < 0) return null;
  var m = t.replace(/“[^”]*”/g, ' ').match(/Dino (Biru|Merah|Kuning)/);
  return m ? 'Dino ' + m[1] : null;
}
var TOTAL = SCENES.length;

/* ============ Pengaturan waktu baca (adaptif jumlah kata) ============ */
var WPM = 170, BASE_MS = 900, MIN_MS = 2600, MAX_MS = 16000, TAIL_MS = 1500, TITLE_MS = 4800, MAX_WORDS = 24;
var SPEEDS = [
  { key:'slow',   label:'Lambat', mul:1.35, rate:0.8 },
  { key:'normal', label:'Normal', mul:1,    rate:0.92 },
  { key:'fast',   label:'Cepat',  mul:0.78, rate:1.05 }
];
function wc(t) { return t.split(/\s+/).length; }
function readMs(t) { return Math.max(MIN_MS, Math.min(MAX_MS, wc(t) / (WPM / 60) * 1000 + BASE_MS)); }
function sentences(t) {                      // pecah per kalimat; tanda kutip “ ” tidak pernah dipotong
  var out = [], buf = '', depth = 0, i, ch, nx;
  for (i = 0; i < t.length; i++) {
    ch = t.charAt(i); buf += ch;
    if (ch === '“') depth++; else if (ch === '”') depth = Math.max(0, depth - 1);
    if (depth === 0 && /[.!?]/.test(ch)) {
      var j = i + 1; while (j < t.length && /[.!?”]/.test(t.charAt(j))) { buf += t.charAt(j); if (t.charAt(j) === '”') depth = Math.max(0, depth - 1); j++; }
      i = j - 1;
      nx = t.slice(j).replace(/^\s+/, '').charAt(0);
      if (!nx || /[A-Z“]/.test(nx)) { out.push(buf.replace(/^\s+|\s+$/g, '')); buf = ''; }
    }
  }
  if (buf.replace(/\s+/g, '')) out.push(buf.replace(/^\s+|\s+$/g, ''));
  return out;
}
function splitLong(t) {                      // kelompokkan kalimat menjadi bagian pendek (maks. MAX_WORDS kata)
  if (wc(t) <= MAX_WORDS) return [t];
  var ss = sentences(t), out = [], cur = '';
  for (var i = 0; i < ss.length; i++) {
    if (cur && wc(cur) + wc(ss[i]) > MAX_WORDS) { out.push(cur); cur = ''; }
    cur = cur ? cur + ' ' + ss[i] : ss[i];
  }
  if (cur) out.push(cur);
  return out;
}
SCENES.forEach(function (sc) {
  sc.image = img(sc.id); sc.ar = AR[sc.id - 1];
  sc.segs = [];
  sc.lines.forEach(function (l) {
    splitLong(l).forEach(function (p) { sc.segs.push({ t: p, d: p.indexOf('“') > -1, w: wc(p), who: speaker(p) }); });
  });
  sc.duration = sc.segs.reduce(function (a, s) { return a + readMs(s.t); }, TAIL_MS);   // ms pada kecepatan Normal
});

/* ============ Elemen & status ============ */
function $(id) { return document.getElementById(id); }
var body = document.body, app = $('app');
var layers = [$('layerA'), $('layerB')], cur = null;
var textEl = $('text'), glass = $('glass'), bar = $('progress'), fills = [];
(function () { for (var i = 0; i < TOTAL; i++) { var c = document.createElement('i'), b = document.createElement('b'); b.style.background = 'hsl(' + Math.round(i * 22) + ',92%,62%)'; c.appendChild(b); bar.appendChild(c); fills.push(b); } })()
var S = { intro: false, music: true, scene: 0, seg: 0, playing: true, speed: 1, voice: false, ended: false, endPane: 1, auto: false };
var timer = 0, capTimer = 0, token = 0, uiT = 0, toastT = 0, chapT = 0, leaving = false;
body.className = '';
var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ============ Musik latar (lagu_01 pembuka, lagu_02 selama cerita) ============ */
var MUSIC_VOL = 0.55, curTrack = 0, AUDIO = {};
function mkAudio(src, loop) {                // dibuat tetapi TIDAK diunduh sampai benar-benar diputar
  var a = new Audio(); a.preload = 'none'; a.loop = loop; a.volume = 0; a.srcPath = src;
  a.addEventListener('error', function () { a.bad = true; if (curTrack === 1 && a === AUDIO[1]) musicSwitch(2); });
  return a;
}
try { AUDIO[1] = mkAudio('assets/audio/lagu_01.mp3', false); AUDIO[2] = mkAudio('assets/audio/lagu_02.mp3', true); } catch (e) {}
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
  var p; if (!a.src) a.src = a.srcPath; a.preload = 'auto';          // unduh baru di sini
  try { p = a.play(); } catch (e) { return; }
  function ok() { fadeTo(a, musicVol(), 1600); }
  function fail(err) { if (err && (err.name === 'NotSupportedError' || err.name === 'AbortError')) { if (err.name === 'NotSupportedError') a.bad = true; return; } toast('Ketuk layar untuk menyalakan musik 🎵'); }
  if (p && p.then) p.then(ok, fail); else ok();
}
function stopTrack(n, ms) { var a = AUDIO[n]; if (!a) return; fadeTo(a, 0, ms || 800, function () { try { a.pause(); } catch (e) {} }); }
function onTrack1End() { if (curTrack === 1 && !leaving) musicSwitch(2); }
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

/* ============ Layar pembuka: tombol Play 3D / MULAI CERITA memulai cerita ============ */
var introT = [];
function startIntro() {
  S.intro = true; body.classList.add('in-intro');
  $('iKicker').textContent = INTRO.kicker; $('iTitle').textContent = INTRO.title; $('iSub').textContent = INTRO.sub;
  $('iPurpose').textContent = INTRO.purpose; $('iCredit').innerHTML = INTRO.credit;
  setTimeout(function () { try { $('startBtn').focus({ preventScroll: true }); } catch (e) {} }, 2400);   // remote TV: Enter langsung memulai
}
function startStory() {
  if (!S.intro || leaving) return;
  S.intro = false; var el = $('intro');
  body.classList.remove('in-intro');
  try { document.activeElement && document.activeElement.blur(); } catch (e) {}
  el.classList.add('out');
  if (S.music) {                                  // lagu_01 sebagai pembuka, lalu lagu_02 mengalun sampai cerita selesai
    var a1 = AUDIO[1];
    if (a1 && !a1.bad) { a1.addEventListener('ended', onTrack1End); curTrack = 1; playTrack(1); introT.push(setTimeout(onTrack1End, 11000)); }
    else musicSwitch(2);
  } else curTrack = 2;
  enterScene(0, { delay: 1100 });
  if (innerHeight > innerWidth && innerWidth < 700) setTimeout(function () { toast('Putar HP ke mode landscape agar tampilan lebih besar 📱'); }, 2400);
  setTimeout(function () { el.classList.add('gone'); }, 2000);
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
  el.classList.remove('broken'); el.setAttribute('data-ar', sc.ar);
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
  var sc = SCENES[sceneIdx], part = sceneIdx >= TOTAL ? 0 : (segIdx + 1) / (sc.segs.length + 1);
  for (var i = 0; i < fills.length; i++) fills[i].style.width = (i < sceneIdx ? 100 : i === sceneIdx ? Math.round(part * 100) : 0) + '%';
  bar.setAttribute('aria-valuenow', Math.round((sceneIdx + part) / TOTAL * 100));
}
function setCounter(a, b, short) {
  var c = $('counter'); c.firstChild.textContent = a; c.firstChild.setAttribute('data-short', short || a); c.lastChild.textContent = b || '';
  c.setAttribute('aria-label', a + (b ? ': ' + b : ''));
}
function updateUI() {
  var sc = SCENES[S.scene];
  setCounter('Adegan ' + sc.id + ' dari ' + TOTAL, sc.title, sc.id + '/' + TOTAL);
}
function flashChapter(sc) {
  var c = $('chapter'); c.textContent = 'Adegan ' + sc.id + ' • ' + sc.title;
  c.classList.add('on'); clearTimeout(chapT);
  chapT = setTimeout(function () { c.classList.remove('on'); }, 3200);
}
function renderText(seg, ms, instant) {
  glass.classList.toggle('dia', seg.d);
  glass.classList.toggle('static', !!instant);
  var who = $('who');
  if (seg.who) { who.hidden = false; who.textContent = seg.who; glass.style.setProperty('--c', CAST[seg.who]); }
  else { who.hidden = true; glass.style.removeProperty('--c'); }
  glass.classList.toggle('has-who', !!seg.who);
  textEl.textContent = '';
  var words = seg.t.split(/\s+/), span = Math.min(ms * 0.7, words.length * 320);
  for (var i = 0; i < words.length; i++) {
    var s = document.createElement('span'); s.className = 'w';
    s.textContent = words[i];
    if (!instant) s.style.animationDelay = Math.round(i * span / words.length) + 'ms';
    textEl.appendChild(s);
    if (i < words.length - 1) textEl.appendChild(document.createTextNode(' '));   // spasi antarkata (perbaikan bug kata menempel)
  }
}
function clearText() { textEl.textContent = ''; glass.classList.remove('dia', 'has-who'); glass.style.removeProperty('--c'); $('who').hidden = true; }
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
function fitCards() {
  for (var i = 0; i < layers.length; i++) {
    var el = layers[i], f = el.querySelector('.frame'), c = el.querySelector('.card'), cs = window.getComputedStyle(f);
    var w = f.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
    var h = f.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
    var ar = parseFloat(el.getAttribute('data-ar')) || 1.5, cw = Math.max(0, Math.min(w, h * ar));
    c.style.width = cw + 'px'; c.style.height = (cw / ar) + 'px';
  }
}
window.addEventListener('resize', function () { applyLayout(); fitCards(); });

function enterScene(i, opts) {
  opts = opts || {};
  clearTimers(); stopSpeech(); showTitle(false);
  S.ended = false; body.classList.remove('is-end'); $('ending').classList.remove('on', 'p1', 'p2');
  S.scene = i; S.seg = 0;
  var sc = SCENES[i], my = token;
  var target = layers[0] === cur ? layers[1] : layers[0];
  var im = buildLayer(target, sc, i); applyLayout(sc); fitCards();
  clearText(); updateUI(); setProgress(i, -1); preload(i + 1);
  afterImg(im, function () {
    if (my !== token) return;
    target.classList.add('active'); if (cur && cur !== target) cur.classList.remove('active'); cur = target;
    void im.offsetWidth; im.classList.add('kb');
    fx.set(sc.fx, S.playing); $('light').classList.toggle('on', !!sc.light);
    flashChapter(sc);
    setTimeout(function () { if (my === token) preload(i + 2); }, 2500);     // gambar berikutnya diunduh bertahap
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
  var ul = $('morals'), COL = ['#ff6b6b', '#ffa52e', '#4cc3ff', '#b388ff', '#5fd97a'];
  MORALS.forEach(function (m, i) {
    var li = document.createElement('li'); li.style.animationDelay = (0.4 + i * 0.35) + 's'; li.style.setProperty('--c', COL[i % 5]);
    var em = document.createElement('span'); em.className = 'em'; em.textContent = m[0];
    var box = document.createElement('div'), t = document.createElement('b'), d = document.createElement('small');
    t.textContent = m[1]; d.textContent = m[2]; box.appendChild(t); box.appendChild(d); t.style.display = 'block';
    li.appendChild(em); li.appendChild(box); ul.appendChild(li);
  });
  $('closing').textContent = CLOSING;
})();
var MORAL_SPEECH = 'Bersama sahabat, kita hebat! Pesan moral: ' + MORALS.map(function (m) { return m[1] + '. ' + m[2]; }).join(' ');
function showEnding() {
  clearTimers(); stopSpeech(); showTitle(false); clearText();
  S.ended = true; S.endPane = 1; body.classList.add('is-end');
  S.playing = true; body.classList.remove('paused');
  setProgress(TOTAL, 0); bar.setAttribute('aria-valuenow', 100);
  $('endImg').src = SCENES[TOTAL - 1].image; $('ending').style.setProperty('--endbg', 'url("' + SCENES[TOTAL - 1].image + '")');
  fx.set('confetti'); $('light').classList.remove('on');
  setCounter('Tamat', '');
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
(function () { var m = document.querySelectorAll('.js-music'); for (var i = 0; i < m.length; i++) m[i].onclick = toggleMusic; })();
$('startPlay').onclick = $('startBtn').onclick = startStory;
$('btnFull').onclick = toggleFs;
$('btnReplay').onclick = restart;
if (canSpeak) $('btnVoice').hidden = false;
if (fsEl.requestFullscreen || fsEl.webkitRequestFullscreen) $('btnFull').hidden = false;

document.addEventListener('pointerdown', function (e) {
  if (leaving || S.intro) return;
  if (e.target.closest && e.target.closest('.ui')) { showUI(); return; }
  if (e.target.closest && e.target.closest('.cta')) return;
  if (e.pointerType !== 'mouse' && body.classList.contains('show-ui') && S.playing) hideUI(); else showUI();   // sentuhan: ketuk = tampil/sembunyi; mouse: selalu tampil
});
document.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' && !leaving && !S.intro) { if (!body.classList.contains('show-ui')) showUI(); else if (S.playing) { clearTimeout(uiT); uiT = setTimeout(hideUI, 4500); } } });
document.addEventListener('focusin', function (e) { if (e.target.closest && e.target.closest('.ui')) showUI(); });

/* ============ Keyboard & remote Smart TV ============ */
function focusables() {
  var sel = body.classList.contains('is-end') ? '#ending.p2 .cta, #endMusic' : '#topbar .btn, #transport .btn';
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
    else if (tag !== 'BUTTON' && (k === 'Enter' || k === ' ' || k === 'ArrowRight')) { e.preventDefault(); startStory(); }
    else if (tag === 'BUTTON' && (k === 'ArrowDown' || k === 'ArrowUp' || k === 'ArrowLeft' || k === 'ArrowRight')) {
      e.preventDefault(); var order = [$('startPlay'), $('startBtn')], ix = order.indexOf(t);
      if (ix > -1) order[(ix + 1) % 2].focus({ preventScroll: true });
    }
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
    n = tp === 'rain' ? Math.min(130, Math.round(60 + area * 40)) : tp === 'stars' ? 48 : tp === 'fireflies' ? 20 : tp === 'confetti' ? 30 : 30;
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
    } else if (type === 'confetti') {
      ctx.globalAlpha = 0.7;
      for (i = 0; i < parts.length; i++) { p = parts[i]; p.y += (1.1 + p.s * 1.5) * dt; p.x += Math.sin(tm * 0.02 + p.p) * 0.7 * dt; p.r = (p.r || 0) + 0.05 * dt * p.s;
        if (p.y > H + 20) { p.y = -20; p.x = rnd(W); }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-4, -2.5, 8 + p.s * 3, 5); ctx.restore(); }
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
    if (!ctx || !type || reduce || !S.playing || document.hidden || (S.ended && type !== 'confetti')) return;
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
  body.classList.toggle('hidden-page', document.hidden);
  if (document.hidden) {
    if (S.playing && !leaving && !S.intro && !S.ended) { S.auto = true; pause(true); }
    fx.stop(); var ca = AUDIO[curTrack]; if (ca) { try { ca.pause(); } catch (e) {} }
  } else {
    if (S.auto) { S.auto = false; play(); }
    if (S.music && curTrack && !leaving) playTrack(curTrack);
  }
});
document.addEventListener('fullscreenchange', function () { $('btnFull').setAttribute('aria-label', fsOn() ? 'Keluar layar penuh' : 'Layar penuh'); });
window.addEventListener('pageshow', function (e) { if (e.persisted && leaving) { leaving = false; $('fade').classList.remove('on'); S.playing = false; pause(); } });

window.onerror = function () { return true; };    // jangan tampilkan error ke anak
preload(0);
setMusicUI();
applyLayout(SCENES[0]);
startIntro();

}

/* ============ Pemuat data (XHR agar jalan di browser TV lama) ============ */
function showLoadError(msg) {
  var a = document.getElementById('app'); if (!a) return;
  var d = document.createElement('div');
  d.setAttribute('role', 'alert');
  d.style.cssText = 'position:fixed;inset:0;z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;background:#0b1f33;color:#fff;font:600 20px/1.5 system-ui,sans-serif';
  var p = document.createElement('p'); p.style.cssText = 'max-width:28em;margin:0'; p.textContent = msg; d.appendChild(p);
  var r = document.createElement('button'); r.type = 'button'; r.textContent = 'Coba lagi';
  var h = document.createElement('a'); h.href = HOME_URL; h.textContent = 'Kembali ke Beranda';
  [r, h].forEach(function (e) { e.style.cssText = 'display:inline-block;padding:14px 28px;border-radius:999px;border:0;background:#ffd23f;color:#1b2a41;font:800 18px system-ui,sans-serif;text-decoration:none;cursor:pointer'; });
  r.onclick = function () { location.reload(); };
  d.appendChild(r); d.appendChild(h); a.appendChild(d); try { r.focus(); } catch (e) {}
}
function valid(D) {
  if (!D || !D.scenes || !D.scenes.length || !D.intro || !D.morals || !D.closing || !D.cast || !D.titleText) return false;
  for (var i = 0; i < D.scenes.length; i++) { var s = D.scenes[i]; if (!s || !s.id || !s.title || !s.lines || !s.lines.length || !s.ar) return false; }
  return true;
}
(function load() {
  var x = new XMLHttpRequest();
  x.open('GET', DATA_URL, true);
  x.onreadystatechange = function () {
    if (x.readyState !== 4) return;
    var D = null;
    if (x.status === 200 || (x.status === 0 && x.responseText)) { try { D = JSON.parse(x.responseText); } catch (e) {} }
    if (valid(D)) boot(D);
    else showLoadError('Cerita belum bisa dimuat. Periksa internet, lalu coba lagi ya 🦖');
  };
  try { x.send(); } catch (e) { showLoadError('Cerita belum bisa dimuat. Coba lagi ya 🦖'); }
})();
})();
