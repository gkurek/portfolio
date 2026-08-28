/**
 * Dot-cloud animations ported from the Claude Design handoff in /temp
 * (radar-handoff.zip -> "Personal Site Concepts.dc.html").
 *
 * Each variant renders as raw DOM nodes (not Vue-reactive) so a single
 * shared stage element can be cleared and rebuilt when the active
 * variant changes, keeping exactly one animation mounted at a time.
 */

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

function buildTorus(stage: HTMLElement, n: number, R: number, r: number, scale: number) {
  const frag = document.createDocumentFragment();
  const uSteps = 34;
  const vSteps = Math.ceil(n / uSteps);
  for (let ui = 0; ui < uSteps; ui++) {
    const u = (ui / uSteps) * Math.PI * 2;
    for (let vi = 0; vi < vSteps; vi++) {
      const v = (vi / vSteps) * Math.PI * 2;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const z = (R + r * Math.cos(v)) * Math.sin(u);
      const y = r * Math.sin(v);
      const size = 2 + Math.random() * 2;
      frag.appendChild(makeDot(x, y, z, size, scale));
    }
  }
  stage.appendChild(frag);
}

function buildHelix(stage: HTMLElement, n: number, radius: number, height: number, turns: number, scale: number) {
  const frag = document.createDocumentFragment();
  const perStrand = Math.floor(n / 2);
  for (let s = 0; s < 2; s++) {
    const offset = s * Math.PI;
    for (let i = 0; i < perStrand; i++) {
      const t = i / (perStrand - 1);
      const angle = t * Math.PI * 2 * turns + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (t - 0.5) * height;
      const size = 2 + Math.random() * 2;
      frag.appendChild(makeDot(x, y, z, size, scale));
    }
  }
  stage.appendChild(frag);
}

function buildLatitudeRings(stage: HTMLElement, rings: number, perRing: number, radius: number, scale: number) {
  const frag = document.createDocumentFragment();
  for (let ri = 0; ri < rings; ri++) {
    const phi = (Math.PI * (ri + 1)) / (rings + 1);
    const y = Math.cos(phi) * radius;
    const r = Math.sin(phi) * radius;
    for (let i = 0; i < perRing; i++) {
      const theta = (i / perRing) * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      frag.appendChild(makeDot(x, y, z, 2 + Math.random() * 2, scale));
    }
  }
  stage.appendChild(frag);
}

function buildMeridians(stage: HTMLElement, count: number, perMeridian: number, radius: number, scale: number) {
  const frag = document.createDocumentFragment();
  for (let mi = 0; mi < count; mi++) {
    const rot = (mi / count) * Math.PI;
    for (let i = 0; i < perMeridian; i++) {
      const phi = (i / (perMeridian - 1)) * Math.PI;
      const y = Math.cos(phi) * radius;
      const r = Math.sin(phi) * radius;
      const x = Math.cos(rot) * r;
      const z = Math.sin(rot) * r;
      frag.appendChild(makeDot(x, y, z, 2 + Math.random() * 2, scale));
    }
  }
  stage.appendChild(frag);
}

function buildWireGrid(stage: HTMLElement, lat: number, lon: number, radius: number, scale: number) {
  buildLatitudeRings(stage, lat, 40, radius, scale);
  buildMeridians(stage, lon, 24, radius, scale);
}

function buildNestedSpheres(
  stage: HTMLElement,
  nOuter: number,
  rOuter: number,
  nInner: number,
  rInner: number,
  scale: number,
) {
  buildSphere(stage, nOuter, rOuter, scale);
  buildSphere(stage, nInner, rInner, scale);
}

// One animated wrapper per x-column keeps the animation count low.
function makeColumn(x: number, amp: number, dur: number, delay: number, scale: number) {
  const outer = document.createElement('span');
  outer.style.cssText = `position:absolute;left:0;top:0;transform-style:preserve-3d;transform:translate3d(${(x * scale).toFixed(1)}px,0,0)`;
  const inner = document.createElement('span');
  inner.style.cssText = `position:absolute;left:0;top:0;transform-style:preserve-3d;--a:${(amp * scale).toFixed(1)};animation:gk-wave ${dur}s ease-in-out ${(-delay).toFixed(2)}s infinite`;
  outer.appendChild(inner);
  return { column: inner, wrapper: outer };
}

function plotDot(col: HTMLElement, y: number, z: number, size: number, opacity: number, scale: number) {
  const s = size * scale;
  const dot = document.createElement('span');
  dot.style.cssText = `position:absolute;left:0;top:0;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;margin:${(-s / 2).toFixed(1)}px 0 0 ${(-s / 2).toFixed(1)}px;border-radius:50%;background:${DOT_COLOR};box-shadow:0 0 ${(s * 1.7).toFixed(1)}px ${DOT_COLOR.replace(')', ' / .6)')};opacity:${opacity.toFixed(2)};transform:translate3d(0,${(y * scale).toFixed(1)}px,${(z * scale).toFixed(1)}px)`;
  col.appendChild(dot);
}

interface WaveSheetOptions {
  cols: number;
  rows: number;
  bands?: number;
  layers?: number;
  halfW: number;
  halfD: number;
  thickness?: number;
  amp: number;
  dur: number;
  waves: number;
  skew?: number;
}

function buildWaveSheet(stage: HTMLElement, o: WaveSheetOptions, scale: number) {
  const frag = document.createDocumentFragment();
  const { cols, rows, bands = 3, layers = 1, halfW, halfD, thickness = 0, amp, dur, waves, skew = 0.22 } = o;
  const rowsPer = Math.max(1, Math.round(rows / bands));
  for (let ci = 0; ci < cols; ci++) {
    const tx = ci / (cols - 1);
    const x = (tx - 0.5) * halfW * 2;
    for (let bi = 0; bi < bands; bi++) {
      const tb = bands === 1 ? 0.5 : bi / (bands - 1);
      const { column, wrapper } = makeColumn(
        x,
        amp * (0.72 + 0.4 * Math.sin(tb * Math.PI)),
        dur,
        ((tx * waves + tb * skew) % 1) * dur,
        scale,
      );
      for (let ri = 0; ri < rowsPer; ri++) {
        const tz = (bi * rowsPer + ri) / (bands * rowsPer - 1);
        const z = (tz - 0.5) * halfD * 2;
        const base =
          Math.sin(tx * Math.PI * waves * 2 + tz * 2.2) * amp * 0.5 +
          Math.cos(tz * Math.PI * 1.4 + tx * 3.3) * amp * 0.3;
        for (let li = 0; li < layers; li++) {
          const ly = layers === 1 ? 0 : (li / (layers - 1) - 0.5) * thickness;
          const j = (Math.random() - 0.5) * 3.4;
          plotDot(
            column,
            base + ly + j * 0.5,
            z + j,
            1.6 + Math.random() * 1.4,
            0.3 + 0.58 * (1 - Math.abs(tz - 0.5) * 1.3),
            scale,
          );
        }
      }
      frag.appendChild(wrapper);
    }
  }
  stage.appendChild(frag);
}

interface TwistRibbonOptions {
  cols: number;
  cross: number;
  halfW: number;
  span: number;
  amp: number;
  dur: number;
  waves: number;
  twists: number;
}

function buildRadar(stage: HTMLElement, _scale: number) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('span');
    ring.className = 'dot-radar__ring';
    if (i > 0) ring.style.animationDelay = `${i * 0.8}s`;
    frag.appendChild(ring);
  }
  const dot = document.createElement('span');
  dot.className = 'dot-radar__dot';
  frag.appendChild(dot);
  stage.appendChild(frag);
}

function buildTwistRibbon(stage: HTMLElement, o: TwistRibbonOptions, scale: number) {
  const frag = document.createDocumentFragment();
  const { cols, cross, halfW, span, amp, dur, waves, twists } = o;
  for (let ci = 0; ci < cols; ci++) {
    const tx = ci / (cols - 1);
    const x = (tx - 0.5) * halfW * 2;
    const roll = tx * Math.PI * twists;
    const base = Math.sin(tx * Math.PI * waves * 2) * amp * 0.55;
    const { column, wrapper } = makeColumn(x, amp * 0.85, dur, ((tx * waves) % 1) * dur, scale);
    for (let vi = 0; vi < cross; vi++) {
      const tv = (vi / (cross - 1) - 0.5) * span;
      const z = Math.cos(roll) * tv;
      const y = Math.sin(roll) * tv + base;
      const j = (Math.random() - 0.5) * 3;
      plotDot(column, y + j * 0.5, z + j, 1.5 + Math.random() * 1.5, 0.4 + 0.48 * (1 - Math.abs(tv) / (span / 2)), scale);
    }
    frag.appendChild(wrapper);
  }
  stage.appendChild(frag);
}

/** Target footprint (px) for dot-cloud stages on the homepage and dots page. */
export const STAGE_SIZE = 140;

/** Original design card widths, per family, that the source radii/spans were tuned for. */
const CARD_WIDTH = {
  square: 220,
  wide: 164,
  wave: 276,
} as const;

const BASE_PERSPECTIVE = {
  square: 520,
  wide: 420,
  wave: 600,
} as const;

type Family = keyof typeof CARD_WIDTH;

export interface DotVariant {
  id: string;
  number: number;
  name: string;
  family: Family;
  scale: number;
  perspective: number;
  rotateX: number;
  rotateZ: number;
  spinDuration: number | null;
  build: (stage: HTMLElement, scale: number) => void;
}

function familyMeta(family: Family) {
  const scale = STAGE_SIZE / CARD_WIDTH[family];
  return { scale, perspective: BASE_PERSPECTIVE[family] * scale };
}

export const DOT_VARIANTS: DotVariant[] = [
  {
    id: '7a',
    number: 1,
    name: 'Sphere',
    family: 'square',
    ...familyMeta('square'),
    rotateX: 18,
    rotateZ: 0,
    spinDuration: 11,
    build: (stage, scale) => buildSphere(stage, 480, 75, scale),
  },
  {
    id: '7b',
    number: 2,
    name: 'Torus',
    family: 'square',
    ...familyMeta('square'),
    rotateX: 55,
    rotateZ: 0,
    spinDuration: 9,
    build: (stage, scale) => buildTorus(stage, 480, 55, 24, scale),
  },
  {
    id: '7c',
    number: 3,
    name: 'Double helix',
    family: 'square',
    ...familyMeta('square'),
    rotateX: 8,
    rotateZ: 0,
    spinDuration: 8,
    build: (stage, scale) => buildHelix(stage, 420, 55, 190, 2.4, scale),
  },
  {
    id: '2a',
    number: 4,
    name: 'Golden spiral',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 18,
    rotateZ: 0,
    spinDuration: 11,
    build: (stage, scale) => buildSphere(stage, 480, 100, scale),
  },
  {
    id: '2b',
    number: 5,
    name: 'Latitude rings',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 14,
    rotateZ: 0,
    spinDuration: 13,
    build: (stage, scale) => buildLatitudeRings(stage, 9, 40, 100, scale),
  },
  {
    id: '2c',
    number: 6,
    name: 'Meridians',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 22,
    rotateZ: 0,
    spinDuration: 15,
    build: (stage, scale) => buildMeridians(stage, 11, 26, 100, scale),
  },
  {
    id: '2d',
    number: 7,
    name: 'Wire grid',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 16,
    rotateZ: 0,
    spinDuration: 10,
    build: (stage, scale) => buildWireGrid(stage, 6, 8, 100, scale),
  },
  {
    id: '2e',
    number: 8,
    name: 'Dense scatter',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 18,
    rotateZ: 0,
    spinDuration: 20,
    build: (stage, scale) => buildSphere(stage, 900, 100, scale),
  },
  {
    id: '2f',
    number: 9,
    name: 'Nested spheres',
    family: 'wide',
    ...familyMeta('wide'),
    rotateX: 18,
    rotateZ: 0,
    spinDuration: 12,
    build: (stage, scale) => buildNestedSpheres(stage, 320, 100, 220, 62, scale),
  },
  {
    id: '3a',
    number: 10,
    name: 'Ribbon sheet',
    family: 'wave',
    ...familyMeta('wave'),
    rotateX: 60,
    rotateZ: -4,
    spinDuration: null,
    build: (stage, scale) =>
      buildWaveSheet(stage, { cols: 52, rows: 21, bands: 3, halfW: 200, halfD: 40, amp: 27, dur: 6.5, waves: 1.5 }, scale),
  },
  {
    id: '3b',
    number: 11,
    name: 'Volumetric body',
    family: 'wave',
    ...familyMeta('wave'),
    rotateX: 66,
    rotateZ: 3,
    spinDuration: null,
    build: (stage, scale) =>
      buildWaveSheet(
        stage,
        { cols: 44, rows: 15, bands: 3, layers: 2, thickness: 14, halfW: 200, halfD: 44, amp: 30, dur: 7.5, waves: 1.1, skew: 0.34 },
        scale,
      ),
  },
  {
    id: '3c',
    number: 12,
    name: 'Twisting ribbon',
    family: 'wave',
    ...familyMeta('wave'),
    rotateX: 52,
    rotateZ: -2,
    spinDuration: null,
    build: (stage, scale) =>
      buildTwistRibbon(stage, { cols: 58, cross: 16, halfW: 205, span: 66, amp: 26, dur: 7, waves: 1.3, twists: 1.6 }, scale),
  },
  {
    id: 'radar',
    number: 13,
    name: 'Radar',
    family: 'square',
    ...familyMeta('square'),
    rotateX: 0,
    rotateZ: 0,
    spinDuration: null,
    build: buildRadar,
  },
];

export const HOME_HERO_VARIANT = DOT_VARIANTS[0];
