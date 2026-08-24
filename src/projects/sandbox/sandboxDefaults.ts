import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { SandboxBackground } from './createSandboxBackground';
import { defaultColorPair } from './sandboxColorPairs';

export const sandboxDefaults = {
  scene: {
    background: defaultColorPair.background,
    backgroundDistance: 3.5,
    backgroundSize: 28,
  },
  material: {
    color: defaultColorPair.material,
    emissiveIntensity: 0.28,
    metalness: 0.05,
    roughness: 0.55,
  },
  ambientLight: {
    color: '#ffffff',
    intensity: 0.55,
  },
  lights: {
    key: {
      color: '#ffffff',
      intensity: 0.9,
      position: { x: 5, y: 4, z: 8 },
    },
    fill: {
      color: defaultColorPair.material,
      intensity: 0.45,
      position: { x: -6, y: 0, z: 4 },
    },
    rim: {
      color: '#ffffff',
      intensity: 0.35,
      position: { x: 0, y: -2, z: -6 },
    },
  },
  controls: {
    rotateSpeed: 0.65,
    zoomSpeed: 0.8,
    damping: true,
    dampingFactor: 0.06,
    minAzimuthAngle: -Math.PI / 2,
    maxAzimuthAngle: Math.PI / 2,
    minPolarAngle: Math.PI / 4,
    maxPolarAngle: Math.PI - Math.PI / 4,
  },
  text: {
    nameSize: 0.38,
    titleSize: 0.21,
    depth: 0.07,
    lineSpacing: 0.14,
    letterSpacing: 0.08,
    curveSegments: 6,
  },
  camera: {
    fov: 42,
    initialDistanceFactor: 0.33,
    minDistanceFactor: 0.04,
    maxDistanceFactor: 10,
  },
  pulse: {
    enabled: true,
    beat: 1,
    scaleBoost: 0.45,
    emissiveBoost: 0.45,
  },
} as const;

interface SandboxSettingsTarget {
  scene: THREE.Scene;
  ambientLight: THREE.AmbientLight;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  material: THREE.MeshStandardMaterial;
  controls: OrbitControls;
  background?: SandboxBackground;
}

export function applySandboxDefaults({
  scene,
  ambientLight,
  keyLight,
  fillLight,
  rimLight,
  material,
  controls,
  background,
}: SandboxSettingsTarget) {
  const { scene: sceneDefaults, material: materialDefaults, ambientLight: ambientDefaults, lights, controls: controlsDefaults } =
    sandboxDefaults;

  scene.background = new THREE.Color(sceneDefaults.background);
  background?.setColor(sceneDefaults.background);

  const materialColor = new THREE.Color(materialDefaults.color);
  material.color.copy(materialColor);
  material.emissive.copy(materialColor);
  material.emissiveIntensity = materialDefaults.emissiveIntensity;
  material.metalness = materialDefaults.metalness;
  material.roughness = materialDefaults.roughness;

  ambientLight.color.set(ambientDefaults.color);
  ambientLight.intensity = ambientDefaults.intensity;

  keyLight.color.set(lights.key.color);
  keyLight.intensity = lights.key.intensity;
  keyLight.position.set(
    lights.key.position.x,
    lights.key.position.y,
    lights.key.position.z,
  );

  fillLight.color.set(lights.fill.color);
  fillLight.intensity = lights.fill.intensity;
  fillLight.position.set(
    lights.fill.position.x,
    lights.fill.position.y,
    lights.fill.position.z,
  );

  rimLight.color.set(lights.rim.color);
  rimLight.intensity = lights.rim.intensity;
  rimLight.position.set(
    lights.rim.position.x,
    lights.rim.position.y,
    lights.rim.position.z,
  );

  controls.rotateSpeed = controlsDefaults.rotateSpeed;
  controls.zoomSpeed = controlsDefaults.zoomSpeed;
  controls.enableDamping = controlsDefaults.damping;
  controls.dampingFactor = controlsDefaults.dampingFactor;
  controls.minAzimuthAngle = controlsDefaults.minAzimuthAngle;
  controls.maxAzimuthAngle = controlsDefaults.maxAzimuthAngle;
  controls.minPolarAngle = controlsDefaults.minPolarAngle;
  controls.maxPolarAngle = controlsDefaults.maxPolarAngle;
}
