import * as THREE from 'three';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { sandboxDefaults } from './sandboxDefaults';
import type { PulseLetter } from './sandboxPulse';

export interface SandboxTextBuild {
  group: THREE.Group;
  letters: PulseLetter[];
  geometries: THREE.BufferGeometry[];
  materials: THREE.MeshStandardMaterial[];
}

interface TextLine {
  text: string;
  size: number;
}

function centerGroupChildren(group: THREE.Group) {
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.children.forEach((child) => {
    child.position.sub(center);
  });
  box.setFromObject(group);
  return box.getSize(new THREE.Vector3()).y;
}

function createLetterLine(
  text: string,
  size: number,
  font: Font,
  materialTemplate: THREE.MeshStandardMaterial,
) {
  const group = new THREE.Group();
  const letters: PulseLetter[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.MeshStandardMaterial[] = [];
  const spacing = size * sandboxDefaults.text.letterSpacing;

  let cursorX = 0;

  for (const char of text) {
    if (char === ' ') {
      cursorX += size * 0.35;
      continue;
    }

    const geometry = new TextGeometry(char, {
      font,
      size,
      depth: sandboxDefaults.text.depth,
      curveSegments: sandboxDefaults.text.curveSegments,
      bevelEnabled: false,
    });
    geometry.center();
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox!;
    const width = bounds.max.x - bounds.min.x;

    const material = materialTemplate.clone();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = cursorX + width / 2;
    group.add(mesh);

    letters.push({ mesh, material });
    geometries.push(geometry);
    materials.push(material);

    cursorX += width + spacing;
  }

  const height = centerGroupChildren(group);
  return { group, letters, geometries, materials, height };
}

export function createSandboxText(
  lines: TextLine[],
  font: Font,
  materialTemplate: THREE.MeshStandardMaterial,
): SandboxTextBuild {
  const group = new THREE.Group();
  const letters: PulseLetter[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.MeshStandardMaterial[] = [];
  const builtLines: Array<{ group: THREE.Group; height: number }> = [];

  for (const line of lines) {
    const built = createLetterLine(line.text, line.size, font, materialTemplate);

    builtLines.push({ group: built.group, height: built.height });
    letters.push(...built.letters);
    geometries.push(...built.geometries);
    materials.push(...built.materials);
    group.add(built.group);
  }

  const lineSpacing = sandboxDefaults.text.lineSpacing;
  const totalHeight =
    builtLines.reduce((sum, line) => sum + line.height, 0) +
    lineSpacing * Math.max(0, builtLines.length - 1);

  let y = totalHeight / 2;
  builtLines.forEach((line, index) => {
    line.group.position.y = y - line.height / 2;
    y -= line.height + (index < builtLines.length - 1 ? lineSpacing : 0);
  });

  return { group, letters, geometries, materials };
}

export function applySandboxMaterialColor(
  template: THREE.MeshStandardMaterial,
  letters: PulseLetter[],
  hex: string,
) {
  const nextColor = new THREE.Color(hex);
  template.color.copy(nextColor);
  template.emissive.copy(nextColor);

  letters.forEach((letter) => {
    letter.material.color.copy(nextColor);
    letter.material.emissive.copy(nextColor);
  });
}

export function syncSandboxMaterials(
  source: THREE.MeshStandardMaterial,
  letters: PulseLetter[],
  syncIntensity = false,
) {
  letters.forEach((letter) => {
    const material = letter.material;
    material.color.copy(source.color);
    material.emissive.copy(source.emissive);
    material.metalness = source.metalness;
    material.roughness = source.roughness;
    if (syncIntensity) {
      material.emissiveIntensity = source.emissiveIntensity;
    }
  });
}
