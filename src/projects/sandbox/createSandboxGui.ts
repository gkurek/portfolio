import GUI from 'lil-gui';
import * as THREE from 'three';
import type { Controller } from 'lil-gui';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { applySandboxDefaults, sandboxDefaults } from './sandboxDefaults';
import type { SandboxBackground } from './createSandboxBackground';
import { pickRandomColorPair } from './sandboxColorPairs';
import { syncSandboxMaterials, applySandboxMaterialColor } from './createSandboxText';
import { resetPulseVisuals, type PulseLetter, type PulseState } from './sandboxPulse';

interface SandboxGuiOptions {
  scene: THREE.Scene;
  ambientLight: THREE.AmbientLight;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  material: THREE.MeshStandardMaterial;
  controls: OrbitControls;
  letters: PulseLetter[];
  pulse: PulseState;
  background: SandboxBackground;
}

function colorToHex(color: THREE.ColorRepresentation) {
  return `#${new THREE.Color(color).getHexString()}`;
}

type SceneParams = { background: string };
type ColorParam = { color: string; intensity: number };
type MaterialParams = {
  color: string;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;
};
type LightParams = {
  color: string;
  intensity: number;
  x: number;
  y: number;
  z: number;
};
type ControlsParams = {
  rotateSpeed: number;
  zoomSpeed: number;
  damping: boolean;
  dampingFactor: number;
};
type PulseParams = {
  enabled: boolean;
  beat: number;
  scaleBoost: number;
  emissiveBoost: number;
};

export function createSandboxGui({
  scene,
  ambientLight,
  keyLight,
  fillLight,
  rimLight,
  material,
  controls,
  letters,
  pulse,
  background,
}: SandboxGuiOptions) {
  const gui = new GUI({ title: 'sandbox' });
  const controllers: Controller[] = [];

  const sceneParams: SceneParams = {
    background: colorToHex(scene.background as THREE.Color),
  };

  controllers.push(
    gui
      .addColor(sceneParams, 'background')
      .name('background')
      .onChange((value: string) => {
        scene.background = new THREE.Color(value);
        background.setColor(value);
      }),
  );

  const materialParams: MaterialParams = {
    color: colorToHex(material.color),
    emissiveIntensity: material.emissiveIntensity,
    metalness: material.metalness,
    roughness: material.roughness,
  };

  const materialFolder = gui.addFolder('material');
  controllers.push(
    materialFolder
      .addColor(materialParams, 'color')
      .name('color')
      .onChange((value: string) => {
        applySandboxMaterialColor(material, letters, value);
      }),
    materialFolder
      .add(materialParams, 'emissiveIntensity', 0, 1, 0.01)
      .name('emissive')
      .onChange((value: number) => {
        pulse.restEmissive = value;
        material.emissiveIntensity = value;
        if (!pulse.enabled) {
          syncSandboxMaterials(material, letters, true);
        }
      }),
    materialFolder
      .add(materialParams, 'metalness', 0, 1, 0.01)
      .onChange((value: number) => {
        material.metalness = value;
        syncSandboxMaterials(material, letters);
      }),
    materialFolder
      .add(materialParams, 'roughness', 0, 1, 0.01)
      .onChange((value: number) => {
        material.roughness = value;
        syncSandboxMaterials(material, letters);
      }),
  );
  materialFolder.open();

  const ambientParams: ColorParam = {
    color: sandboxDefaults.ambientLight.color,
    intensity: sandboxDefaults.ambientLight.intensity,
  };

  const ambientFolder = gui.addFolder('ambient light');
  controllers.push(
    ambientFolder
      .addColor(ambientParams, 'color')
      .name('color')
      .onChange((value: string) => {
        ambientLight.color.set(value);
      }),
    ambientFolder
      .add(ambientParams, 'intensity', 0, 2, 0.01)
      .onChange((value: number) => {
        ambientLight.intensity = value;
      }),
  );

  const bindDirectionalLight = (
    folder: GUI,
    light: THREE.DirectionalLight,
    name: keyof typeof sandboxDefaults.lights,
    open = false,
  ) => {
    const defaults = sandboxDefaults.lights[name];
    const params: LightParams = {
      color: defaults.color,
      intensity: defaults.intensity,
      x: defaults.position.x,
      y: defaults.position.y,
      z: defaults.position.z,
    };

    const lightFolder = folder.addFolder(name);
    controllers.push(
      lightFolder
        .addColor(params, 'color')
        .name('color')
        .onChange((value: string) => {
          light.color.set(value);
        }),
      lightFolder
        .add(params, 'intensity', 0, 2, 0.01)
        .onChange((value: number) => {
          light.intensity = value;
        }),
      lightFolder
        .add(params, 'x', -20, 20, 0.1)
        .onChange((value: number) => {
          light.position.x = value;
        }),
      lightFolder
        .add(params, 'y', -20, 20, 0.1)
        .onChange((value: number) => {
          light.position.y = value;
        }),
      lightFolder
        .add(params, 'z', -20, 20, 0.1)
        .onChange((value: number) => {
          light.position.z = value;
        }),
    );

    if (open) {
      lightFolder.open();
    }

    return params;
  };

  const lightsFolder = gui.addFolder('lights');
  const lightParams = {
    key: bindDirectionalLight(lightsFolder, keyLight, 'key', true),
    fill: bindDirectionalLight(lightsFolder, fillLight, 'fill'),
    rim: bindDirectionalLight(lightsFolder, rimLight, 'rim'),
  };
  lightsFolder.open();

  const controlsParams: ControlsParams = {
    rotateSpeed: sandboxDefaults.controls.rotateSpeed,
    zoomSpeed: sandboxDefaults.controls.zoomSpeed,
    damping: sandboxDefaults.controls.damping,
    dampingFactor: sandboxDefaults.controls.dampingFactor,
  };

  const pulseParams: PulseParams = {
    enabled: pulse.enabled,
    beat: pulse.beat,
    scaleBoost: pulse.scaleBoost,
    emissiveBoost: pulse.emissiveBoost,
  };

  const pulseFolder = gui.addFolder('pulse');
  controllers.push(
    pulseFolder
      .add(pulseParams, 'enabled')
      .name('enabled')
      .onChange((value: boolean) => {
        pulse.enabled = value;
        if (!value) {
          resetPulseVisuals(letters, pulse);
        }
      }),
    pulseFolder
      .add(pulseParams, 'beat', 0.2, 3, 0.05)
      .name('beat (s)')
      .onChange((value: number) => {
        pulse.beat = value;
      }),
    pulseFolder
      .add(pulseParams, 'scaleBoost', 0, 1.5, 0.01)
      .name('scale')
      .onChange((value: number) => {
        pulse.scaleBoost = value;
      }),
    pulseFolder
      .add(pulseParams, 'emissiveBoost', 0, 1, 0.01)
      .name('glow')
      .onChange((value: number) => {
        pulse.emissiveBoost = value;
      }),
  );
  pulseFolder.open();

  const controlsFolder = gui.addFolder('controls');
  controllers.push(
    controlsFolder
      .add(controlsParams, 'rotateSpeed', 0.1, 2, 0.05)
      .onChange((value: number) => {
        controls.rotateSpeed = value;
      }),
    controlsFolder
      .add(controlsParams, 'zoomSpeed', 0.1, 2, 0.05)
      .onChange((value: number) => {
        controls.zoomSpeed = value;
      }),
    controlsFolder
      .add(controlsParams, 'damping')
      .name('damping')
      .onChange((value: boolean) => {
        controls.enableDamping = value;
      }),
    controlsFolder
      .add(controlsParams, 'dampingFactor', 0.01, 0.2, 0.01)
      .name('damping factor')
      .onChange((value: number) => {
        controls.dampingFactor = value;
      }),
  );

  const syncGuiFromScene = () => {
    sceneParams.background = colorToHex(scene.background as THREE.Color);
    materialParams.color = colorToHex(material.color);
    materialParams.emissiveIntensity = material.emissiveIntensity;
    materialParams.metalness = material.metalness;
    materialParams.roughness = material.roughness;
    ambientParams.color = colorToHex(ambientLight.color);
    ambientParams.intensity = ambientLight.intensity;

    (['key', 'fill', 'rim'] as const).forEach((name) => {
      const params = lightParams[name];
      const light =
        name === 'key' ? keyLight : name === 'fill' ? fillLight : rimLight;

      params.color = colorToHex(light.color);
      params.intensity = light.intensity;
      params.x = light.position.x;
      params.y = light.position.y;
      params.z = light.position.z;
    });

    controlsParams.rotateSpeed = controls.rotateSpeed;
    controlsParams.zoomSpeed = controls.zoomSpeed;
    controlsParams.damping = controls.enableDamping;
    controlsParams.dampingFactor = controls.dampingFactor;

    pulse.restEmissive = sandboxDefaults.material.emissiveIntensity;
    pulse.enabled = sandboxDefaults.pulse.enabled;
    pulse.beat = sandboxDefaults.pulse.beat;
    pulse.scaleBoost = sandboxDefaults.pulse.scaleBoost;
    pulse.emissiveBoost = sandboxDefaults.pulse.emissiveBoost;
    pulseParams.enabled = pulse.enabled;
    pulseParams.beat = pulse.beat;
    pulseParams.scaleBoost = pulse.scaleBoost;
    pulseParams.emissiveBoost = pulse.emissiveBoost;

    controllers.forEach((controller) => controller.updateDisplay());
  };

  gui.add(
    {
      resetDefaults: () => {
        applySandboxDefaults({
          scene,
          ambientLight,
          keyLight,
          fillLight,
          rimLight,
          material,
          controls,
          background,
        });
        syncSandboxMaterials(material, letters, true);
        syncGuiFromScene();
        if (!pulse.enabled) {
          resetPulseVisuals(letters, pulse);
        }
      },
    },
    'resetDefaults',
  ).name('reset defaults');

  gui.add(
    {
      randomizeColors: () => {
        const pair = pickRandomColorPair({
          background: colorToHex(scene.background as THREE.Color),
          material: colorToHex(material.color),
        });

        scene.background = new THREE.Color(pair.background);
        sceneParams.background = pair.background;
        background.setColor(pair.background);

        applySandboxMaterialColor(material, letters, pair.material);
        materialParams.color = pair.material;

        fillLight.color.set(pair.material);
        lightParams.fill.color = pair.material;

        controllers.forEach((controller) => controller.updateDisplay());
      },
    },
    'randomizeColors',
  ).name('randomize colors');

  return gui;
}
