import GUI from 'lil-gui';
import * as THREE from 'three';
import type { Controller } from 'lil-gui';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { applySandboxDefaults, sandboxDefaults } from './sandboxDefaults';
import { pickRandomColorPair } from './sandboxColorPairs';

interface SandboxGuiOptions {
  scene: THREE.Scene;
  ambientLight: THREE.AmbientLight;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  material: THREE.MeshStandardMaterial;
  controls: OrbitControls;
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

export function createSandboxGui({
  scene,
  ambientLight,
  keyLight,
  fillLight,
  rimLight,
  material,
  controls,
}: SandboxGuiOptions) {
  const gui = new GUI({ title: 'sandbox' });
  const controllers: Controller[] = [];

  const sceneParams: SceneParams = {
    background: sandboxDefaults.scene.background,
  };

  controllers.push(
    gui
      .addColor(sceneParams, 'background')
      .name('background')
      .onChange((value: string) => {
        scene.background = new THREE.Color(value);
      }),
  );

  const materialParams: MaterialParams = {
    color: sandboxDefaults.material.color,
    emissiveIntensity: sandboxDefaults.material.emissiveIntensity,
    metalness: sandboxDefaults.material.metalness,
    roughness: sandboxDefaults.material.roughness,
  };

  const materialFolder = gui.addFolder('material');
  controllers.push(
    materialFolder
      .addColor(materialParams, 'color')
      .name('color')
      .onChange((value: string) => {
        const nextColor = new THREE.Color(value);
        material.color.copy(nextColor);
        material.emissive.copy(nextColor);
      }),
    materialFolder
      .add(materialParams, 'emissiveIntensity', 0, 1, 0.01)
      .name('emissive')
      .onChange((value: number) => {
        material.emissiveIntensity = value;
      }),
    materialFolder
      .add(materialParams, 'metalness', 0, 1, 0.01)
      .onChange((value: number) => {
        material.metalness = value;
      }),
    materialFolder
      .add(materialParams, 'roughness', 0, 1, 0.01)
      .onChange((value: number) => {
        material.roughness = value;
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
        });
        syncGuiFromScene();
      },
    },
    'resetDefaults',
  ).name('reset defaults');

  gui.add(
    {
      randomizeColors: () => {
        const pair = pickRandomColorPair({
          background: sceneParams.background,
          material: materialParams.color,
        });

        scene.background = new THREE.Color(pair.background);
        sceneParams.background = pair.background;

        const nextColor = new THREE.Color(pair.material);
        material.color.copy(nextColor);
        material.emissive.copy(nextColor);
        materialParams.color = pair.material;

        controllers.forEach((controller) => controller.updateDisplay());
      },
    },
    'randomizeColors',
  ).name('randomize colors');

  return gui;
}
