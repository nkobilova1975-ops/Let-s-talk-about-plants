/**
 * Lightweight zero-dependency canvas confetti burst.
 * Automatically respects prefers-reduced-motion.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
}

const COLORS = ['#059669', '#34D399', '#84CC16', '#FBBF24', '#10B981', '#0D9488'];

export function triggerConfetti(durationMs = 2200): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const originX = canvas.width * 0.5;
  const originY = canvas.height * 0.38;

  const particles: Particle[] = Array.from({length: 85}, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 10;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      alpha: 1,
    };
  });

  const start = performance.now();
  let frameId = 0;

  const render = (now: number) => {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.alpha = Math.max(0, 1 - elapsed / durationMs);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.55);
      ctx.restore();
    }

    if (elapsed < durationMs) {
      frameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(frameId);
      canvas.remove();
    }
  };

  frameId = requestAnimationFrame(render);
}
