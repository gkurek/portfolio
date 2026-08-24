import * as THREE from 'three';

const TEXTURE_SIZE = 512;

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function layeredNoise(x: number, y: number, layers = 5) {
  let value = 0;
  let amplitude = 0.55;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < layers; i++) {
    value += smoothNoise(x * frequency, y * frequency) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2.1;
  }

  return value / norm;
}

function createOrganicTexture(baseColor: THREE.Color) {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(TEXTURE_SIZE, TEXTURE_SIZE);
  const data = image.data;

  const r = baseColor.r * 255;
  const g = baseColor.g * 255;
  const b = baseColor.b * 255;

  for (let y = 0; y < TEXTURE_SIZE; y++) {
    for (let x = 0; x < TEXTURE_SIZE; x++) {
      const nx = x / TEXTURE_SIZE;
      const ny = y / TEXTURE_SIZE;

      const macro = layeredNoise(nx * 3.2, ny * 3.2, 4);
      const fiber = layeredNoise(nx * 18 + ny * 4, ny * 22, 3);
      const grain = hash(x * 0.73, y * 0.91);

      const variation = (macro - 0.5) * 0.14 + (fiber - 0.5) * 0.06 + (grain - 0.5) * 0.04;
      const shade = 1 + variation;

      const i = (y * TEXTURE_SIZE + x) * 4;
      data[i] = Math.min(255, Math.max(0, r * shade));
      data[i + 1] = Math.min(255, Math.max(0, g * shade));
      data[i + 2] = Math.min(255, Math.max(0, b * shade));
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = 4;

  return texture;
}

export interface SandboxBackground {
  mesh: THREE.Mesh;
  setColor: (hex: string) => void;
  dispose: () => void;
}

export function createSandboxBackground(
  color: string,
  distance: number,
  size: number,
): SandboxBackground {
  const baseColor = new THREE.Color(color);
  let texture = createOrganicTexture(baseColor);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.92,
    metalness: 0.02,
    side: THREE.FrontSide,
  });

  const geometry = new THREE.PlaneGeometry(size, size);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -distance;
  mesh.receiveShadow = false;

  const setColor = (hex: string) => {
    baseColor.set(hex);
    texture.dispose();
    texture = createOrganicTexture(baseColor);
    material.map = texture;
    material.needsUpdate = true;
  };

  const dispose = () => {
    geometry.dispose();
    material.map?.dispose();
    material.dispose();
  };

  return { mesh, setColor, dispose };
}
