import { fragmentShader, vertexShader } from "./blub-shader";
import { World } from "./world";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig as config,
  // @ts-ignore
} from "@lookingglass/webxr";

import "./style.css";

let world: World;
let mesh: THREE.Mesh;

let uniforms = {
  time: { type: "f", value: 1.0 },
  modelViewProjectMatrixInverse: { type: "m4", value: new THREE.Matrix4() },
};

async function Init() {
  world = new World();

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  });

  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;

  world.scene.add(mesh);
  world.camera.lookAt(mesh.position);

  // VR Button
  config.tileHeight = 512;
  config.numViews = 45;
  config.targetX = 0;
  config.targetY = 0;
  config.targetZ = 0;
  config.targetDiam = 5;
  config.fovy = (40 * Math.PI) / 180;
  new LookingGlassWebXRPolyfill();

  document.body.append(VRButton.createButton(world.renderer));

  // Start the animation loop
  world.renderer.setAnimationLoop(() => {
    Animate();
  });
}

let modelViewProjectMatrixInverse = new THREE.Matrix4();

function Animate() {
  uniforms.time.value += 0.05;
  modelViewProjectMatrixInverse
    .multiplyMatrices(
      world.camera.projectionMatrix,
      world.camera.matrixWorldInverse
    )
    .multiply(mesh.matrixWorld);
  modelViewProjectMatrixInverse.invert();
  uniforms.modelViewProjectMatrixInverse.value = modelViewProjectMatrixInverse;

  world.update();
}

window.addEventListener("DOMContentLoaded", async () => {
  await Init();
  Animate();
});
