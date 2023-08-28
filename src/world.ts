import * as THREE from "three";
import { FlyControls } from "three/addons/controls/FlyControls.js";

//
// Fish Tank
// Contains the scene, camera, lights, and renderer
//
export class World {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public cameraControls: FlyControls;
  public renderer: THREE.WebGLRenderer;

  // public mouseX: number;
  // public mouseY: number;
  // public lat: number;
  // public lon: number;
  // public phy: number;
  // public theta: number;

  constructor() {
    // Initalize Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = this.initCamera();

    // Fog
    // this.initFog();

    // Background Color
    // this.scene.background = new THREE.Color(0xffffff);

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
  // Initialize Scene Fog
  //
  private initFog(): void {
    const near = 4;
    const far = 10;
    // const color = 0x87ace8; // blue
    const color = 0x00; // blue
    // this.scene.background = new THREE.Color(color);
    this.scene.fog = new THREE.Fog(color, near, far);
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
  private initCameraControls(): FlyControls {
    const cc = new FlyControls(this.camera, this.renderer.domElement);
    cc.movementSpeed = 0.7;
    cc.rollSpeed = Math.PI / 24;
    cc.autoForward = false;
    cc.dragToLook = true;

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
    // this.cameraControls.handleResize(); // Camera Trackball

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
