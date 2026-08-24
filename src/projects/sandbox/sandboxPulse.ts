import * as THREE from 'three';

type EaseFn = (t: number) => number;

interface ControlPoint {
  value: number;
  u: number;
  ease: EaseFn;
}

const linear = (t: number) => t;

const quadraticIn = (t: number) => t * t;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return lerp(outMin, outMax, t);
}

class AnimationCurve {
  private controlPoints: ControlPoint[] = [];
  private needsUpdate = true;

  add(value: number, u: number, ease: EaseFn = linear) {
    this.controlPoints.push({ value, u, ease });
    this.needsUpdate = true;
  }

  getValue(u: number) {
    if (this.controlPoints.length === 0) return 0;
    if (this.needsUpdate) {
      this.controlPoints.sort((a, b) => a.u - b.u);
      this.needsUpdate = false;
    }

    if (u <= this.controlPoints[0].u) {
      return this.controlPoints[0].value;
    }

    for (let i = 0; i < this.controlPoints.length - 1; i++) {
      const low = this.controlPoints[i];
      const high = this.controlPoints[i + 1];
      if (u < high.u) {
        const mixU = low.ease(mapRange(u, low.u, high.u, 0, 1));
        return lerp(low.value, high.value, mixU);
      }
    }

    return this.controlPoints[this.controlPoints.length - 1].value;
  }
}

const scaleCurve = new AnimationCurve();
scaleCurve.add(-0.5, 0);
scaleCurve.add(0.75, 0.05, quadraticIn);
scaleCurve.add(-0.5, 1);

const emissiveCurve = new AnimationCurve();
emissiveCurve.add(0.01, 0);
emissiveCurve.add(0.3, 0.75);
emissiveCurve.add(0.01, 1);

const SCALE_CURVE_MIN = -0.5;
const SCALE_CURVE_MAX = 0.75;
const EMISSIVE_CURVE_MIN = 0.01;
const EMISSIVE_CURVE_MAX = 0.3;

export interface PulseLetter {
  mesh: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
}

export interface PulseState {
  enabled: boolean;
  beat: number;
  scaleBoost: number;
  emissiveBoost: number;
  restEmissive: number;
}

export function createPulseState(restEmissive: number): PulseState {
  return {
    enabled: true,
    beat: 1,
    scaleBoost: 0.45,
    emissiveBoost: 0.45,
    restEmissive,
  };
}

function getPulseValues(pulse: PulseState, u: number) {
  const scaleValue = mapRange(
    scaleCurve.getValue(u),
    SCALE_CURVE_MIN,
    SCALE_CURVE_MAX,
    1,
    1 + pulse.scaleBoost,
  );
  const emissiveAdd = mapRange(
    emissiveCurve.getValue(u),
    EMISSIVE_CURVE_MIN,
    EMISSIVE_CURVE_MAX,
    0,
    pulse.emissiveBoost,
  );

  return { scaleValue, emissiveAdd };
}

export function resetPulseVisuals(letters: PulseLetter[], pulse: PulseState) {
  letters.forEach((letter) => {
    letter.mesh.scale.setScalar(1);
    letter.material.emissiveIntensity = pulse.restEmissive;
  });
}

export function applyPulse(
  pulse: PulseState,
  elapsedSeconds: number,
  letters: PulseLetter[],
) {
  if (!pulse.enabled) {
    resetPulseVisuals(letters, pulse);
    return;
  }

  const u = (elapsedSeconds % pulse.beat) / pulse.beat;
  const { scaleValue, emissiveAdd } = getPulseValues(pulse, u);

  letters.forEach((letter) => {
    letter.mesh.scale.setScalar(scaleValue);
    letter.material.emissiveIntensity = pulse.restEmissive + emissiveAdd;
  });
}
