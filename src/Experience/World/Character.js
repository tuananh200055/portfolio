import Experience from "../Experience";
import * as THREE from "three";
import { gsap } from "gsap";
export default class Character {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.moving = true;

    // setup

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("character");
    }

    this.resource = this.resources.items.character;
    this.setTexture();
    this.setMaterial();
    this.setModel();
    this.setAnimation();
  }

  setTexture() {
    this.texture = {};
    this.texture.map = this.resources.items.characterTexture;
    this.texture.map.flipY = false;
    this.texture.map.encoding = THREE.sRGBEncoding;
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture.map,
    });
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      child.material = this.material;
    });
  }

  setPositionResize() {
    this.scaleSize = {
      x: 1,
      y: 1,
      z: 1,
    };
    if (this.experience.sizes.screenView === "portrait") {
      this.scaleSize.x = 0.6;
      this.scaleSize.y = 0.6;
      this.scaleSize.z = 0.6;

      this.model.scale.set(
        this.scaleSize.x,
        this.scaleSize.y,
        this.scaleSize.z
      );
      this.model.position.x = 1.932;
      this.model.position.y = -1.88;
      this.model.position.z = 2.548;
    } else {
      this.model.scale.set(
        this.scaleSize.x,
        this.scaleSize.y,
        this.scaleSize.z
      );
      this.model.position.x = 5.562;
      this.model.position.y = -0.77;
      this.model.position.z = 2.262;
    }
  }

  setPositionOnPortal() {
    this.scaleSize.x = 1;
    this.scaleSize.y = 1;
    this.scaleSize.z = 1;
    if (this.experience.sizes.screenView === "portrait") {
      this.scaleSize.x = 0.6;
      this.scaleSize.y = 0.6;
      this.scaleSize.z = 0.6;
      this.model.position.x = 0.612;
      this.model.position.y = -7.4;
      this.model.position.z = 4.044;
    } else {
      this.model.position.x = 3;
      this.model.position.y = -9.3;
      this.model.position.z = 4;
    }
  }

  setModel() {
    this.setPositionResize();
    this.scene.add(this.model);
    this.model.rotation.set(0.2, 2, 0);
    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, "x")
        .min(0)
        .max(10)
        .step(0.001)
        .name("charX");
      this.debugFolder
        .add(this.model.position, "y")
        .min(-10)
        .max(10)
        .step(0.001)
        .name("charY");
      this.debugFolder
        .add(this.model.position, "z")
        .min(0)
        .max(10)
        .step(0.001)
        .name("charZ");

      this.debugFolder
        .add(this.model.rotation, "x")
        .min(0)
        .max(10)
        .step(0.01)
        .name("charRolX");
      this.debugFolder
        .add(this.model.rotation, "y")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("charRolY");
      this.debugFolder
        .add(this.model.rotation, "z")
        .min(0)
        .max(10)
        .step(0.01)
        .name("charRolZ");
    }
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.action = {};
    this.animation.action.sit = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.action.stand = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.action.current = this.animation.action.sit;
    this.animation.action.current.play();

    this.animation.play = (name) => {
      const newAction = this.animation.action[name];
      const oldAction = this.animation.action.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.action.current = newAction;
    };
  }

  setPosition() {
    // hide char at welcome
    if (
      // this.experience.scrollWrap.wheelValue > 0 &&
      this.experience.scrollWrap.scrollY >= this.experience.sizes.height / 7 &&
      this.moving == true &&
      this.experience.scrollWrap.scrollY < this.experience.about.positionOnSize
    ) {
      gsap.to(this.model.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.4,
        ease: "power1.out",
      });
    } 

    else if (
      this.experience.scrollWrap.scrollY <=
        this.experience.about.positionOnSize - this.experience.about.positionOnSize / 4 &&
      this.moving == false
    ) {
      this.moving = true;
      gsap.to(this.model.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.4,
        ease: "power1.out",
      });
      this.animation.play("sit");
    }
    // show char welcome
    else if (
      //       this.wheelY < 0 &&
      this.experience.scrollWrap.scrollY <
      this.experience.sizes.height / 4
    ) {
      this.setPositionResize();
      this.model.rotation.set(0.2, 2, 0);
      gsap.to(this.model.scale, {
        x: this.scaleSize.x,
        y: this.scaleSize.y,
        z: this.scaleSize.z,
        duration: 0.4,
        ease: "power1.out",
      });
      this.moving = true;
    } else if (
      this.experience.scrollWrap.scrollY >= this.experience.about.positionOnSize &&
      this.moving
    ) {
      this.model.rotation.set(0.2, -0.2, 0);
      this.setPositionOnPortal();
      gsap.to(this.model.scale, {
        x: this.scaleSize.x,
        y: this.scaleSize.y,
        z: this.scaleSize.z,
        duration: 0.4,
        ease: "power1.out",
      });
      this.moving = false;
      this.animation.play("stand");
    } 
  }

  resize() {
    this.setPositionOnPortal()
    this.moving = true;
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
    this.setPosition();
  }
}
