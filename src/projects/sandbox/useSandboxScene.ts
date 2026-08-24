import { onMounted, onUnmounted, type Ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { createSandboxGui } from './createSandboxGui';
import { applySandboxDefaults, sandboxDefaults } from './sandboxDefaults';
import { site } from '../../config/site';

function createTextMesh(
  text: string,
  size: number,
  font: Font,
  material: THREE.MeshStandardMaterial,
) {
  const geometry = new TextGeometry(text, {
    font,
    size,
    depth: sandboxDefaults.text.depth,
    curveSegments: sandboxDefaults.text.curveSegments,
    bevelEnabled: false,
  });
  geometry.center();
  geometry.computeBoundingBox();

  return {
    mesh: new THREE.Mesh(geometry, material),
    height: geometry.boundingBox!.max.y - geometry.boundingBox!.min.y,
    geometry,
  };
}

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

    const material = new THREE.MeshStandardMaterial();
    applySandboxDefaults({
      scene,
      ambientLight,
      keyLight,
      fillLight,
      rimLight,
      material,
      controls,
    });

    const nameText = createTextMesh(
      site.name,
      sandboxDefaults.text.nameSize,
      font,
      material,
    );
    const titleText = createTextMesh(
      site.title,
      sandboxDefaults.text.titleSize,
      font,
      material,
    );

    nameText.mesh.position.y =
      (titleText.height + sandboxDefaults.text.lineSpacing) / 2;
    titleText.mesh.position.y =
      -(nameText.height + sandboxDefaults.text.lineSpacing) / 2;

    const textGroup = new THREE.Group();
    textGroup.add(nameText.mesh, titleText.mesh);
    scene.add(textGroup);

    const gui = createSandboxGui({
      scene,
      ambientLight,
      keyLight,
      fillLight,
      rimLight,
      material,
      controls,
    });

    const box = new THREE.Box3().setFromObject(textGroup);
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
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    cleanupFns.push(() => {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      gui.destroy();
      controls.dispose();
      nameText.geometry.dispose();
      titleText.geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    });
  });

  onUnmounted(() => {
    cleanupFns.forEach((fn) => fn());
  });
}
