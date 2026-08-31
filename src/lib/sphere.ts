export const DEG = Math.PI / 180;
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export type Vec3 = [number, number, number];

export interface OrientationBasis {
  cosYaw: number;
  sinYaw: number;
  cosTilt: number;
  sinTilt: number;
}

export const orientOut = { x: 0, y: 0, z: 0 };

export function makeOrientationBasis(
  yaw: number,
  tiltDeg: number,
): OrientationBasis {
  const tilt = tiltDeg * DEG;
  return {
    cosYaw: Math.cos(yaw),
    sinYaw: Math.sin(yaw),
    cosTilt: Math.cos(tilt),
    sinTilt: Math.sin(tilt),
  };
}

export function orientPoint(
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

export function generateSpherePoints(count: number): Array<{
  base: Vec3;
  size: number;
}> {
  const points: Array<{ base: Vec3; size: number }> = [];

  for (let i = 0; i < count; i++) {
    const yFrac = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - yFrac * yFrac);
    const theta = GOLDEN_ANGLE * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const y = yFrac;

    points.push({
      base: [x, y, z],
      size: 2 + Math.random() * 0.2,
    });
  }

  return points;
}

export const STAGE_SIZE = 140;
export const CARD_WIDTH = 220;
export const BASE_PERSPECTIVE = 520;
export const HERO_DOT_COUNT = 480;
export const HERO_SPHERE_RADIUS = 75;
export const HERO_ROTATE_X = 18;
export const HERO_SPIN_DURATION = 11;

export const HERO_SCALE = STAGE_SIZE / CARD_WIDTH;
