import './style.css';
import './particles.js';
import { toggleTheme } from './theme.js';
import { LANGS, setLang, pickLang, toggleLangMenu } from './i18n.js';
import { buildDots, moveCarousel, goSlide } from './carousel.js';
import { switchTab } from './render.js';
import { showPage } from './router.js';

/* ── Page routing ── */
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showPage(el.dataset.page);
  });
});

/* ── Language dropdown ── */
document.getElementById('langTrigger').addEventListener('click', e => {
  e.stopPropagation();
  toggleLangMenu();
});

document.querySelectorAll('.lang-option').forEach(el => {
  el.addEventListener('click', () => pickLang(el.dataset.lang));
});

document.addEventListener('click', () => {
  const wrap = document.getElementById('langWrap');
  wrap.classList.remove('open');
  document.getElementById('langTrigger').setAttribute('aria-expanded', 'false');
});

/* ── Theme ── */
document.querySelector('.theme-btn').addEventListener('click', toggleTheme);

/* ── Carousel ── */
document.querySelectorAll('[data-carousel]').forEach(el => {
  el.addEventListener('click', () => moveCarousel(Number(el.dataset.carousel)));
});

document.getElementById('carouselDots').addEventListener('click', e => {
  const dot = e.target.closest('.carousel-dot');
  if (dot) goSlide(Number(dot.dataset.slide));
});

/* ── Tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab, btn));
});

/* ── Init ── */
buildDots();

(async () => {
  const saved = localStorage.getItem('lang') || 'en';
  document.getElementById('langCurrent').textContent = LANGS[saved].label;
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === saved);
  });
  await setLang(saved);
})();
