import { t } from './i18n.js';

export function renderSteps(role) {
  const steps = t[`steps_${role}`];
  const el = document.getElementById(`steps-${role}`);
  if (!el || !steps) return;
  el.innerHTML = steps.map(([title, desc], i) => `
    <div class="step-card">
      <span class="step-num">0${i + 1}</span>
      <div class="step-body"><h4>${title}</h4><p>${desc}</p></div>
    </div>`).join('');
}

export function renderFeatures() {
  const el = document.getElementById('featuresGrid');
  if (!el || !t.features) return;
  el.innerHTML = t.features.map(([icon, cls, name, desc]) => `
    <div class="feature-row">
      <div class="feature-name">${icon ? `<span class="feature-icon ${cls}">${icon}</span>` : ''}${name}</div>
      <div class="feature-desc">${desc}</div>
    </div>`).join('');
}

export function renderAudience() {
  const el = document.getElementById('audienceCards');
  if (!el || !t.audience) return;
  el.innerHTML = t.audience.map(([icon, title, desc]) => `
    <div class="audience-card">
      ${icon ? `<div class="aud-icon">${icon}</div>` : ''}
      <div class="aud-title">${title}</div>
      <div class="aud-desc">${desc}</div>
    </div>`).join('');
}

export function renderMissing() {
  const el = document.getElementById('missingList');
  if (!el || !t.missing) return;
  el.innerHTML = t.missing.map(text =>
    `<li class="missing-item"><span class="missing-dot">○</span>${text}</li>`
  ).join('');
}

export function switchTab(role, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.how-steps').forEach(el => el.classList.remove('visible'));
  document.getElementById(`steps-${role}`)?.classList.add('visible');
}
