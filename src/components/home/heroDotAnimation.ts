const DOT_COLOR = 'oklch(75% 0.18 350)';

function makeDot(x: number, y: number, z: number, size: number, scale: number): HTMLSpanElement {
  const dot = document.createElement('span');
  const s = size * scale;
  dot.style.cssText = `position:absolute;left:0;top:0;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;border-radius:50%;background:${DOT_COLOR};box-shadow:0 0 ${s * 1.6}px ${DOT_COLOR.replace(')', ' / .7)')};opacity:.88;transform:translate3d(${x * scale}px,${y * scale}px,${z * scale}px)`;
  return dot;
}

function buildSphere(stage: HTMLElement, n: number, radius: number, scale: number) {
  const frag = document.createDocumentFragment();
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const yFrac = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - yFrac * yFrac);
    const theta = golden * i;
    const x = Math.cos(theta) * r * radius;
    const z = Math.sin(theta) * r * radius;
    const y = yFrac * radius;
    const size = 2 + Math.random() * 2;
    frag.appendChild(makeDot(x, y, z, size, scale));
  }
  stage.appendChild(frag);
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
  build: (stage: HTMLElement, scale: number) => void;
}

export const HOME_HERO_VARIANT: HeroDotVariant = {
  scale,
  perspective: BASE_PERSPECTIVE.square * scale,
  rotateX: 18,
  rotateZ: 0,
  spinDuration: 11,
  build: (stage, heroScale) => buildSphere(stage, 480, 75, heroScale),
};
