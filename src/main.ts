import { fragmentShader, vertexShader } from "./blub-shader";
import { World } from "./world";
import * as THREE from "three";

let world: World;

function Init() {
  world = new World();

  var uniforms = {
    time: { type: "f", value: 1.0 },
    modelViewProjectMatrixInverse: { type: "m4", value: [] },
    // , resolution: { type: "v2", value: new THREE.Vector2() }
  };

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),

    // depthTest: false,
    // side: THREE.DoubleSide
  });

  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

  // use a billboard instead?
  mesh.frustumCulled = false;

  world.scene.add(mesh);
  world.camera.lookAt(mesh.position);

  // Start the animation loop
  world.renderer.setAnimationLoop(() => {
    Animate();
  });
}

function Animate() {
  world.update();
}

window.addEventListener("DOMContentLoaded", async () => {
  await Init();
  Animate();
});
