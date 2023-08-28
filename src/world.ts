import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

//
// Fish Tank
// Contains the scene, camera, lights, and renderer
//
export class World {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public cameraControls: TrackballControls;
  public renderer: THREE.WebGLRenderer;

  constructor() {
    // Initalize Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = this.initCamera();

    // Renderer init
    this.renderer = this.initRenderer();
    document.body.appendChild(this.renderer.domElement);

    // Camera controls
    this.cameraControls = this.initCameraControls();

    // Resize
    window.addEventListener("resize", () => this.onWindowResize());
  }

  //
  // Initialize the Scene camera
  //
  private initCamera(): THREE.PerspectiveCamera {
    const c = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000000
    );
    c.position.set(0, 0, 3);
    c.lookAt(this.scene.position);
    return c;
  }

  //
  // Initialize Renderer
  //
  private initRenderer(): THREE.WebGLRenderer {
    const r = new THREE.WebGLRenderer();
    r.xr.enabled = true;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.setPixelRatio(window.devicePixelRatio);
    r.setSize(window.innerWidth, window.innerHeight);
    return r;
  }

  //
  // Initialize Camera Controls
  //
  private initCameraControls(): TrackballControls {
    const cc = new TrackballControls(this.camera, this.renderer.domElement);
    cc.target.set(0, 0, 0);

    cc.rotateSpeed = 1.0;
    cc.zoomSpeed = 1.2;
    cc.panSpeed = 0.8;

    return cc;
  }

  //
  // Update Camera Controls and Render
  //
  public update(): void {
    // this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  //
  // Update screen and camera to new size
  //
  public onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.cameraControls.handleResize(); // Camera Trackball

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
