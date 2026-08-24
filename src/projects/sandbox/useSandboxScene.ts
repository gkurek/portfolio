import { onMounted, onUnmounted, type Ref } from 'vue';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import { createSandboxGui } from './createSandboxGui';

import { createSandboxBackground } from './createSandboxBackground';

import { createSandboxText } from './createSandboxText';

import { applySandboxDefaults, sandboxDefaults } from './sandboxDefaults';

import { applyPulse, createPulseState } from './sandboxPulse';

import { site } from '../../config/site';



export function useSandboxScene(containerRef: Ref<HTMLElement | null>) {

  let animationId = 0;

  let resizeObserver: ResizeObserver | undefined;

  const cleanupFns: Array<() => void> = [];



  onMounted(async () => {

    const container = containerRef.value;

    if (!container) return;



    const scene = new THREE.Scene();



    const camera = new THREE.PerspectiveCamera(

      sandboxDefaults.camera.fov,

      1,

      0.01,

      100,

    );

    camera.position.set(0, 0, 8);



    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);



    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = false;



    const background = createSandboxBackground(

      sandboxDefaults.scene.background,

      sandboxDefaults.scene.backgroundDistance,

      sandboxDefaults.scene.backgroundSize,

    );

    scene.add(background.mesh);



    const ambientLight = new THREE.AmbientLight();

    scene.add(ambientLight);



    const keyLight = new THREE.DirectionalLight();

    scene.add(keyLight);



    const fillLight = new THREE.DirectionalLight();

    scene.add(fillLight);



    const rimLight = new THREE.DirectionalLight();

    scene.add(rimLight);



    const fontLoader = new FontLoader();

    const font = await fontLoader.loadAsync('/fonts/helvetiker_regular.typeface.json');



    const materialTemplate = new THREE.MeshStandardMaterial();

    applySandboxDefaults({

      scene,

      ambientLight,

      keyLight,

      fillLight,

      rimLight,

      material: materialTemplate,

      controls,

      background,

    });



    const sandboxText = createSandboxText(

      [

        { text: site.name, size: sandboxDefaults.text.nameSize },

        { text: site.title, size: sandboxDefaults.text.titleSize },

      ],

      font,

      materialTemplate,

    );

    scene.add(sandboxText.group);



    const pulse = createPulseState(sandboxDefaults.material.emissiveIntensity);

    pulse.enabled = sandboxDefaults.pulse.enabled;

    pulse.beat = sandboxDefaults.pulse.beat;

    pulse.scaleBoost = sandboxDefaults.pulse.scaleBoost;

    pulse.emissiveBoost = sandboxDefaults.pulse.emissiveBoost;



    const clock = new THREE.Clock();



    const gui = createSandboxGui({

      scene,

      ambientLight,

      keyLight,

      fillLight,

      rimLight,

      material: materialTemplate,

      controls,

      letters: sandboxText.letters,

      pulse,

      background,

    });



    const box = new THREE.Box3().setFromObject(sandboxText.group);

    const textSize = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(textSize.x, textSize.y, textSize.z);

    const fitDistance = maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360));



    camera.position.z = fitDistance * sandboxDefaults.camera.initialDistanceFactor;

    controls.target.set(0, 0, 0);

    controls.minDistance = fitDistance * sandboxDefaults.camera.minDistanceFactor;

    controls.maxDistance = fitDistance * sandboxDefaults.camera.maxDistanceFactor;

    controls.update();



    const resize = () => {

      const { clientWidth, clientHeight } = container;

      if (!clientWidth || !clientHeight) return;



      camera.aspect = clientWidth / clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(clientWidth, clientHeight, false);

    };



    resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    resize();



    const animate = () => {

      animationId = requestAnimationFrame(animate);

      applyPulse(pulse, clock.getElapsedTime(), sandboxText.letters);

      controls.update();

      renderer.render(scene, camera);

    };

    animate();



    cleanupFns.push(() => {

      cancelAnimationFrame(animationId);

      resizeObserver?.disconnect();

      gui.destroy();

      controls.dispose();

      background.dispose();

      sandboxText.geometries.forEach((geometry) => geometry.dispose());

      sandboxText.materials.forEach((material) => material.dispose());

      materialTemplate.dispose();

      renderer.dispose();

      container.removeChild(renderer.domElement);

    });

  });



  onUnmounted(() => {

    cleanupFns.forEach((fn) => fn());

  });

}


