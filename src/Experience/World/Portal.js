import Experience from "../Experience";
import * as THREE from "three";
import portalVertexShader from "../Shaders/portal/vertex.glsl";
import portalFragmentShader from "../Shaders/portal/fragment.glsl";
export default class Portal {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // setup

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("portal");
    }

    this.resource = this.resources.items.portal;
    this.setTexture();
    this.setMaterial();
    this.setModel();
  }

  setTexture() {
    this.texture = {};
    this.texture.map = this.resources.items.portalTexture;
    this.texture.map.flipY = false;
    this.texture.map.encoding = THREE.sRGBEncoding;
  }


  setMaterial() {
    this.portalColorStart = "#000000";
    this.portalColorEnd = "#ffffff";
    this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
    this.portalLightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(this.portalColorStart) },
        uColorEnd: { value: new THREE.Color(this.portalColorEnd) },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    });
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture.map,
    });
    this.model = this.resource.scene;
    this.bakedMesh = this.model.children.find(
      (child) => child.name === "baked"
    );
    this.poleLightA = this.model.children.find(
      (child) => child.name === "polight"
    );
    this.poleLightB = this.model.children.find(
      (child) => child.name === "polightB"
    );
    this.portalLight = this.model.children.find(
      (child) => child.name === "portalLight"
    );
    this.bakedMesh.material = this.material;
    this.poleLightA.material = this.poleLightMaterial;
    this.poleLightB.material = this.poleLightMaterial;
    this.portalLight.material = this.portalLightMaterial;
  }

  setPosition(){
    if(this.experience.sizes.screenView === "portrait"){
    this.model.scale.set(1, 1, 1);
    this.model.position.x = 1.25;
    this.model.position.y = -7.2;
    this.model.position.z = 3;
    }
    else{
    this.model.scale.set(1.6, 1.6, 1.6);
    this.model.position.x = 4;
    this.model.position.y = -9;
    this.model.position.z = 3;
    }
  }

  setModel() {
    this.setPosition()
    this.scene.add(this.model);
   
    // this.model.position.z = 6.5
   

    this.model.rotation.x = 0.2;
    this.model.rotation.y = -0.6;

    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, "x")
        .min(0)
        .max(10)
        .step(0.001)
        .name("portalX");
      this.debugFolder
        .add(this.model.position, "y")
        .min(-10)
        .max(10)
        .step(0.001)
        .name("portalY");
      this.debugFolder
        .add(this.model.position, "z")
        .min(-100)
        .max(10)
        .step(0.001)
        .name("portalZ");

      this.debugFolder
        .add(this.model.rotation, "x")
        .min(0)
        .max(10)
        .step(0.01)
        .name("portalRolX");
      this.debugFolder
        .add(this.model.rotation, "y")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("portalRolY");
      this.debugFolder
        .add(this.model.rotation, "z")
        .min(0)
        .max(10)
        .step(0.01)
        .name("portalRolZ");
    }
  }

  resize() {
		this.setPosition()
	}

  update() {
    this.portalLightMaterial.uniforms.uTime.value =
      this.experience.time.elapsed * 0.001;
  }
}
