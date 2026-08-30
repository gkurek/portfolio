const DOT_COLOR = 'oklch(75% 0.18 350)';

export interface DotParticle {
  el: HTMLSpanElement;
  base: [number, number, number];
  radius: number;
  size: number;
  scale: number;
}

export interface Shockwave {
  dir: [number, number, number];
  t: number;
}

function setDotTransform(particle: DotParticle, radialScale = 1) {
  const { base, radius, scale, el } = particle;
  const x = base[0] * radius * radialScale;
  const y = base[1] * radius * radialScale;
  const z = base[2] * radius * radialScale;
  el.style.transform = `translate3d(${x * scale}px,${y * scale}px,${z * scale}px)`;
}

function makeDot(particle: DotParticle): HTMLSpanElement {
  const { size, scale, el } = particle;
  const s = size * scale;
  el.style.cssText = `position:absolute;left:0;top:0;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;border-radius:50%;background:${DOT_COLOR};box-shadow:0 0 ${s * 1.6}px ${DOT_COLOR.replace(')', ' / .7)')};opacity:.88;pointer-events:none`;
  setDotTransform(particle);
  return el;
}

function buildSphere(stage: HTMLElement, n: number, radius: number, scale: number): DotParticle[] {
  const particles: DotParticle[] = [];
  const frag = document.createDocumentFragment();
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const yFrac = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - yFrac * yFrac);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const y = yFrac;
    const size = 2 + Math.random() * 2;
    const particle: DotParticle = {
      el: document.createElement('span'),
      base: [x, y, z],
      radius,
      size,
      scale,
    };
    particles.push(particle);
    frag.appendChild(makeDot(particle));
  }
  stage.appendChild(frag);
  return particles;
}

const DEG = Math.PI / 180;

export function getSpinYaw(spinEl: HTMLElement): number {
  const raw = getComputedStyle(spinEl).transform;
  if (!raw || raw === 'none') return 0;
  const matrix = new DOMMatrixReadOnly(raw);
  return Math.atan2(matrix.m13, matrix.m33);
}

export function findNearestParticle(
  particles: DotParticle[],
  stageRect: DOMRect,
  clientX: number,
  clientY: number,
  yaw: number,
  tiltDeg: number,
  perspective: number,
): DotParticle {
  const mx = clientX - stageRect.left;
  const my = clientY - stageRect.top;
  const cx = stageRect.width / 2;
  const cy = stageRect.height / 2;
  const tilt = tiltDeg * DEG;
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);

  let best = particles[0];
  let bestDist = Infinity;

  for (const particle of particles) {
    const x = particle.base[0] * particle.radius * particle.scale;
    const y = particle.base[1] * particle.radius * particle.scale;
    const z = particle.base[2] * particle.radius * particle.scale;

    const x1 = x * cosYaw + z * sinYaw;
    const z1 = -x * sinYaw + z * cosYaw;
    const y2 = y * cosTilt - z1 * sinTilt;
    const z2 = y * sinTilt + z1 * cosTilt;

    if (z2 < 0) continue;

    const factor = perspective / (perspective - z2);
    const sx = cx + x1 * factor;
    const sy = cy + y2 * factor;
    const dist = (sx - mx) ** 2 + (sy - my) ** 2;

    if (dist < bestDist) {
      bestDist = dist;
      best = particle;
    }
  }

  return best;
}

export function resetParticles(particles: DotParticle[]) {
  for (const particle of particles) {
    setDotTransform(particle, 1);
  }
}

export function applyShockwaves(particles: DotParticle[], waves: Shockwave[], dt: number): Shockwave[] {
  const active = waves.filter((wave) => {
    wave.t += dt;
    return wave.t < 2.4;
  });

  for (const particle of particles) {
    let displacement = 0;
    for (const wave of active) {
      const ang = Math.acos(
        Math.max(
          -1,
          Math.min(
            1,
            particle.base[0] * wave.dir[0] +
              particle.base[1] * wave.dir[1] +
              particle.base[2] * wave.dir[2],
          ),
        ),
      );
      const front = wave.t * 2.2;
      const gaussian = Math.exp(-((ang - front) ** 2) / 0.055);
      displacement += gaussian * 0.34 * Math.max(0, 1 - wave.t / 2.4);
    }
    setDotTransform(particle, 1 + displacement);
  }

  return active;
}

export function pushShockwave(waves: Shockwave[], dir: [number, number, number]): Shockwave[] {
  const next = [...waves, { dir, t: 0 }];
  if (next.length > 4) next.shift();
  return next;
}

const STAGE_SIZE = 140;
const CARD_WIDTH = { square: 220 } as const;
const BASE_PERSPECTIVE = { square: 520 } as const;
const scale = STAGE_SIZE / CARD_WIDTH.square;

export interface HeroDotVariant {
  scale: number;
  perspective: number;
  rotateX: number;
  rotateZ: number;
  spinDuration: number;
  build: (stage: HTMLElement, scale: number) => DotParticle[];
}

export const HOME_HERO_VARIANT: HeroDotVariant = {
  scale,
  perspective: BASE_PERSPECTIVE.square * scale,
  rotateX: 18,
  rotateZ: 0,
  spinDuration: 11,
  build: (stage, heroScale) => buildSphere(stage, 480, 75, heroScale),
};
