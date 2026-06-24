const canvas = document.getElementById('particles-canvas');
if (!canvas) throw new Error('#particles-canvas not found');

const ctx = canvas.getContext('2d');
let W, H, nodes, raf;
const COUNT = 52;
const MAX_DIST = 130;

function getAccent() {
  return document.documentElement.dataset.theme === 'dark'
    ? { r:74,  g:144, b:217 }
    : { r:59,  g:125, b:216 };
}

function resize() {
  const hero = canvas.parentElement;
  W = canvas.width  = hero.offsetWidth;
  H = canvas.height = hero.offsetHeight;
}

function mkNode() {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.12 + Math.random() * 0.2;
  return {
    x: Math.random() * W, y: Math.random() * H,
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    r: 1.5 + Math.random() * 2,
    pulse: Math.random() * Math.PI * 2,
  };
}

function init() {
  resize();
  nodes = Array.from({ length: COUNT }, mkNode);
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  const { r, g, b } = getAccent();
  const baseAlpha = document.documentElement.dataset.theme === 'dark' ? 0.55 : 0.45;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < MAX_DIST) {
        const a = (1 - d / MAX_DIST) * baseAlpha * 0.45;
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach(n => {
    n.pulse += 0.018;
    const glow = Math.sin(n.pulse) * 0.5 + 0.5;
    const a = (0.35 + glow * 0.45) * baseAlpha * 1.6;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r + glow * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.fill();
  });

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < -10) n.x = W + 10;
    if (n.x > W+10) n.x = -10;
    if (n.y < -10) n.y = H + 10;
    if (n.y > H+10) n.y = -10;
  });

  raf = requestAnimationFrame(draw);
}

init();
draw();
window.addEventListener('resize', resize);
