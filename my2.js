const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: Math.random() * 12 + 8,
    speedY: Math.random() * 1 + 0.5,
    speedX: Math.random() * 0.5 - 0.25,
    angle: Math.random() * Math.PI * 2,
    rotateSpeed: Math.random() * 0.02 - 0.01,
    opacity: Math.random() * 0.6 + 0.3,
  };
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 1.5, 0, p.size);
  ctx.bezierCurveTo(p.size, p.size / 1.5, p.size / 2, -p.size / 2, 0, 0);
  ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`;
  ctx.fill();

  ctx.restore();
}

function updatePetal(p) {
  p.y += p.speedY;
  p.x += p.speedX;
  p.angle += p.rotateSpeed;

  if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
    Object.assign(p, createPetal());
    p.y = -10;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  while (petals.length < 40) petals.push(createPetal());

  petals.forEach(p => {
    updatePetal(p);
    drawPetal(p);
  });

  requestAnimationFrame(animate);
}

animate();