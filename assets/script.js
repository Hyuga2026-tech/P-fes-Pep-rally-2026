(function () {
  /* ---- 開催日(日本時間)。差し替える場合はここを変更 ---- */
  var EVENT_START = new Date("2026-11-11T19:00:00+09:00");

  /* ---- 写真。assets/photos/ の画像を差し替え、ここのファイル名と説明を編集 ---- */
  var PHOTOS = [
    { src: "assets/photos/photo-1.svg", },
    { src: "assets/photos/photo-2.svg",},
    { src: "assets/photos/photo-3.svg",},
    { src: "assets/photos/photo-4.svg", },
    { src: "assets/photos/photo-5.svg", }
  ];

   /* ---- カウントダウン(日本時間のカレンダー上の日数で数える) ---- */
  var countEl = document.getElementById("count");
  function jstDay(d) {
    var j = new Date(d.getTime() + 9 * 3600000);
    return Date.UTC(j.getUTCFullYear(), j.getUTCMonth(), j.getUTCDate());
  }
  var days = Math.round((jstDay(EVENT_START) - jstDay(new Date())) / 86400000);
  if (days > 0) {
    document.getElementById("count-n").textContent = String(days);
  } else if (days === 0) {
    countEl.innerHTML = "<b>本日開催</b>";
  } else {
    countEl.innerHTML = "ご参加ありがとうございました";
  }

  /* ---- 写真スライダー ---- */
  var track = document.getElementById("track");
  var viewport = document.getElementById("viewport");
  var dotsEl = document.getElementById("dots");
  var toggle = document.getElementById("toggle");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0, timer = null, playing = !reduce, hovering = false;

  PHOTOS.forEach(function (p, i) {
    var fig = document.createElement("figure");
    fig.className = "slide";
    fig.setAttribute("role", "group");
    fig.setAttribute("aria-label", (i + 1) + " / " + PHOTOS.length);
    var img = document.createElement("img");
    img.src = p.src; img.alt = p.caption; img.loading = "lazy";
    var cap = document.createElement("figcaption");
    cap.textContent = p.caption;
    var tag = document.createElement("span");
    tag.textContent = p.tag;
    cap.appendChild(tag);
    fig.appendChild(img); fig.appendChild(cap);
    track.appendChild(fig);

    var d = document.createElement("button");
    d.type = "button";
    d.setAttribute("aria-label", (i + 1) + "枚目の写真を表示");
    d.addEventListener("click", function () { go(i, true); });
    dotsEl.appendChild(d);
  });

  function go(i, user) {
    var slides = track.children;
    index = (i + slides.length) % slides.length;
    var max = Math.max(0, track.scrollWidth - viewport.clientWidth);
    var x = Math.min(slides[index].offsetLeft, max);
    track.style.transform = "translateX(" + (-x) + "px)";
    Array.prototype.forEach.call(dotsEl.children, function (b, k) {
      b.setAttribute("aria-current", k === index ? "true" : "false");
    });
    if (user) restart();
  }
  function tick() { if (!hovering && !document.hidden) go(index + 1); }
  function restart() {
    clearInterval(timer);
    if (playing) timer = setInterval(tick, 4200);
  }
  function setPlaying(v) {
    playing = v;
    toggle.textContent = v ? "❚❚" : "▶";
    toggle.setAttribute("aria-label", v ? "自動再生を止める" : "自動再生を始める");
    restart();
  }
  document.getElementById("prev").addEventListener("click", function () { go(index - 1, true); });
  document.getElementById("next").addEventListener("click", function () { go(index + 1, true); });
  toggle.addEventListener("click", function () { setPlaying(!playing); });
  viewport.addEventListener("mouseenter", function () { hovering = true; });
  viewport.addEventListener("mouseleave", function () { hovering = false; });
  window.addEventListener("resize", function () { go(index); });
  setPlaying(playing);
  go(0);

  /* ---- 住所コピー ---- */
  var copyBtn = document.getElementById("copy");
  copyBtn.addEventListener("click", function () {
    var el = document.getElementById("addr");
    var text = el.textContent;
    function done() { copyBtn.textContent = "コピーしました"; setTimeout(function () { copyBtn.textContent = "住所をコピー"; }, 1800); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
  });
})();
