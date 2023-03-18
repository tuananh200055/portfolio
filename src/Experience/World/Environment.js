import Experience from "../Experience";
import * as THREE from "three";
export default class Environment {
  constructor() {
    this.exprerience = new Experience();
    this.scene = this.exprerience.scene;
    this.resources = this.exprerience.resources;
    this.debug = this.exprerience.debug;

    // debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }
    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial 
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterial();
  }
}
