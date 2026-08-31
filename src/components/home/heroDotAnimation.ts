const FALLBACK_DOT_COLOR = "oklch(75% 0.18 350)";
const DEG = Math.PI / 180;

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

interface OrientationBasis {
  cosYaw: number;
  sinYaw: number;
  cosTilt: number;
  sinTilt: number;
}

const orientOut = { x: 0, y: 0, z: 0 };

function makeOrientationBasis(yaw: number, tiltDeg: number): OrientationBasis {
  const tilt = tiltDeg * DEG;
  return {
    cosYaw: Math.cos(yaw),
    sinYaw: Math.sin(yaw),
    cosTilt: Math.cos(tilt),
    sinTilt: Math.sin(tilt),
  };
}

function orientPoint(
  x: number,
  y: number,
  z: number,
  basis: OrientationBasis,
): void {
  const x1 = x * basis.cosYaw + z * basis.sinYaw;
  const z1 = -x * basis.sinYaw + z * basis.cosYaw;
  orientOut.x = x1;
  orientOut.y = y * basis.cosTilt - z1 * basis.sinTilt;
  orientOut.z = y * basis.sinTilt + z1 * basis.cosTilt;
}

function getDotColor(): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  return value || FALLBACK_DOT_COLOR;
}

function setDotTransform(
  particle: DotParticle,
  radialScale = 1,
  basis?: OrientationBasis,
) {
  const { base, radius, scale, el } = particle;
  const extent = radius * radialScale * scale;
  const x = base[0] * radius * radialScale * scale;
  const y = base[1] * radius * radialScale * scale;
  const z = base[2] * radius * radialScale * scale;

  if (basis) {
    orientPoint(x, y, z, basis);
    const { x: x1, y: y1, z: z1 } = orientOut;
    const normalizedZ = extent > 0 ? z1 / extent : 0;
    const depth = (normalizedZ + 1.4) / 2.8;
    const sizeScale = 0.75 + depth * 1.15;
    const dotSize = particle.size * scale * sizeScale;
    el.style.opacity = String(Math.max(0, Math.min(1, 0.53 + depth * 0.49)));
    el.style.width = `${dotSize}px`;
    el.style.height = `${dotSize}px`;
    el.style.margin = `${-dotSize / 2}px 0 0 ${-dotSize / 2}px`;
    el.style.transform = `translate3d(${x1}px,${y1}px,${z1}px)`;
    return;
  }

  el.style.transform = `translate3d(${x}px,${y}px,${z}px)`;
}

function makeDot(particle: DotParticle, dotColor: string): HTMLSpanElement {
  const { size, scale, el } = particle;
  const s = size * scale;
  el.style.cssText = `position:absolute;left:0;top:0;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;border-radius:50%;background:${dotColor};pointer-events:none`;
  setDotTransform(particle);
  return el;
}

function buildSphere(
  stage: HTMLElement,
  n: number,
  radius: number,
  scale: number,
): DotParticle[] {
  const particles: DotParticle[] = [];
  const frag = document.createDocumentFragment();
  const dotColor = getDotColor();
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const yFrac = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - yFrac * yFrac);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const y = yFrac;
    const size = 2 + Math.random() * 0.2;
    const particle: DotParticle = {
      el: document.createElement("span"),
      base: [x, y, z],
      radius,
      size,
      scale,
    };
    particles.push(particle);
    frag.appendChild(makeDot(particle, dotColor));
  }
  stage.appendChild(frag);
  return particles;
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
  const basis = makeOrientationBasis(yaw, tiltDeg);

  let best = particles[0];
  let bestDist = Infinity;

  for (const particle of particles) {
    const extent = particle.radius * particle.scale;
    const x = particle.base[0] * extent;
    const y = particle.base[1] * extent;
    const z = particle.base[2] * extent;
    orientPoint(x, y, z, basis);

    if (orientOut.z < 0) continue;

    const factor = perspective / (perspective - orientOut.z);
    const sx = cx + orientOut.x * factor;
    const sy = cy + orientOut.y * factor;
    const dist = (sx - mx) ** 2 + (sy - my) ** 2;

    if (dist < bestDist) {
      bestDist = dist;
      best = particle;
    }
  }

  return best;
}

export function resetParticles(
  particles: DotParticle[],
  yaw: number,
  tiltDeg: number,
) {
  const basis = makeOrientationBasis(yaw, tiltDeg);
  for (const particle of particles) {
    setDotTransform(particle, 1, basis);
  }
}

const WAVE_DURATION = 1.6;
const WAVE_SPEED = 3.8;
const WAVE_WIDTH = 0.048;
const WAVE_AMP = 0.34;

export function applyShockwaves(
  particles: DotParticle[],
  waves: Shockwave[],
  dt: number,
  yaw: number,
  tiltDeg: number,
): Shockwave[] {
  for (const wave of waves) {
    wave.t += dt;
  }
  const active = waves.filter((wave) => wave.t < WAVE_DURATION);
  const basis = makeOrientationBasis(yaw, tiltDeg);

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
      const front = wave.t * WAVE_SPEED;
      const gaussian = Math.exp(-((ang - front) ** 2) / WAVE_WIDTH);
      displacement += gaussian * WAVE_AMP * Math.max(0, 1 - wave.t / WAVE_DURATION);
    }
    setDotTransform(particle, 1 + displacement, basis);
  }

  return active;
}

export function pushShockwave(
  waves: Shockwave[],
  dir: [number, number, number],
): Shockwave[] {
  const next = [...waves, { dir, t: 0 }];
  if (next.length > 4) next.shift();
  return next;
}

const STAGE_SIZE = 140;
const CARD_WIDTH = 220;
const BASE_PERSPECTIVE = 520;
const scale = STAGE_SIZE / CARD_WIDTH;

export interface HeroDotVariant {
  scale: number;
  perspective: number;
  rotateX: number;
  spinDuration: number;
  build: (stage: HTMLElement, scale: number) => DotParticle[];
}

export const HOME_HERO_VARIANT: HeroDotVariant = {
  scale,
  perspective: BASE_PERSPECTIVE * scale,
  rotateX: 18,
  spinDuration: 11,
  build: (stage, heroScale) => buildSphere(stage, 480, 75, heroScale),
};
