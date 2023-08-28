import { fragmentShader, vertexShader } from "./blub-shader";
import { World } from "./world";
import * as THREE from "three";

import "./style.css";

let world: World;
let mesh: THREE.Mesh;

let uniforms = {
  time: { type: "f", value: 1.0 },
  modelViewProjectMatrixInverse: { type: "m4", value: [] },
  // , resolution: { type: "v2", value: new THREE.Vector2() }
};

function Init() {
  world = new World();

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),

    // depthTest: false,
    // side: THREE.DoubleSide
  });

  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

  // use a billboard instead?
  mesh.frustumCulled = false;

  world.scene.add(mesh);
  world.camera.lookAt(mesh.position);

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
