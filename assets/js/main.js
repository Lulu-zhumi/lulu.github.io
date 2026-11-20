/* ============================================================
   个人主页 — 交互脚本（无依赖）
   1) 中英切换  2) 标题下方打字机  3) 版权年份
   ============================================================ */
(function () {
  'use strict';

  // TODO: 换成你的中英文站点标题、描述，以及那行打字机文案
  var TEXT = {
    en: {
      title: 'Your Name (你的名字)',
      description: 'Personal homepage of Your Name.',
      type: 'I am interested in theoretical physics and mathematical structures.'
    },
    zh: {
      title: '你的名字 (Your Name)',
      description: '你的名字的个人主页。',
      type: '我关注理论物理与数学结构。'
    }
  };

  var STORAGE_KEY = 'academic-home-lang';
  var root = document.documentElement;
  var typedEl = document.getElementById('typed');
  var timers = [];

  function currentLang() {
    return root.getAttribute('data-lang') === 'zh' ? 'zh' : 'en';
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  /* ---------- 打字机 ---------- */
  function typeLine(lang) {
    if (!typedEl) return;
    clearTimers();
    var full = TEXT[lang].type;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !full) {
      typedEl.textContent = full;
      return;
    }

    var chars = Array.from(full);
    var i = 0;
    typedEl.textContent = '';
    function step() {
      i += 1;
      typedEl.textContent = chars.slice(0, i).join('');
      if (i < chars.length) timers.push(window.setTimeout(step, 42));
    }
    timers.push(window.setTimeout(step, 220));
  }

  function applyLang(lang) {
    if (lang !== 'en' && lang !== 'zh') lang = 'en';
    root.setAttribute('data-lang', lang);
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-set-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.title = TEXT[lang].title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', TEXT[lang].description);

    typeLine(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // head 里的内联脚本已按「记忆 > 浏览器语言」设定初始语言，这里同步按钮、标题与打字机
  applyLang(currentLang());

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-set-lang'));
    });
  });

  /* ---------- 版权年份 ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();
