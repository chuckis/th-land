export const SLIDES = 5;
let ci = 0;

export function buildDots() {
  const dots = document.getElementById('carouselDots');
  if (!dots) return;
  dots.innerHTML = Array.from({length: SLIDES}, (_, i) =>
    `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join('');
}

export function goSlide(i) {
  ci = i;
  const sl = document.getElementById('carouselSlides');
  if (sl) sl.style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
}

export function moveCarousel(dir) {
  goSlide((ci + dir + SLIDES) % SLIDES);
}

setInterval(() => moveCarousel(1), 4200);
