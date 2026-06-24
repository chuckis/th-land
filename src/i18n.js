import { renderSteps, renderFeatures, renderAudience, renderMissing } from './render.js';

export const LANGS = {
  en: { label: 'EN' },
  ru: { label: 'RU' },
  uk: { label: 'UA' },
};

export let currentLang = 'en';
export let t = {};

export async function loadLang(lang) {
  try {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}locales/${lang}.json`);
    if (!res.ok) throw new Error(res.status);
    t = await res.json();
  } catch (e) {
    console.warn('Could not load locale:', lang, e);
  }
}

export function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('.i18n[data-key]').forEach(el => {
    const v = t[el.dataset.key];
    if (v && typeof v === 'string') el.textContent = v;
  });

  renderSteps('tutors');
  renderSteps('students');
  renderFeatures();
  renderAudience();
  renderMissing();
}

export async function setLang(lang) {
  currentLang = lang;
  await loadLang(lang);
  applyTranslations();
}

export function toggleLangMenu() {
  const wrap = document.getElementById('langWrap');
  const open = wrap.classList.toggle('open');
  document.getElementById('langTrigger').setAttribute('aria-expanded', open);
}

export function pickLang(lang) {
  currentLang = lang;
  document.getElementById('langCurrent').textContent = LANGS[lang].label;
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  toggleLangMenu();
  setLang(lang);
  localStorage.setItem('lang', lang);
}
