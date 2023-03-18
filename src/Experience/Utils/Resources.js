import EventEmitter from "./EventEmitter";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {gsap} from 'gsap'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    // options
    this.sources = sources;

    // setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    // loading animation
    this.loadingElement = document.querySelector('.loading')
    this.progressLine = document.querySelector('.progress-line')

    this.setLoader();
    this.startLoading();
  }

  setLoader() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('draco/')
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file); 
        });
      }
    }
  }

  setLoadingProgress(){
    let loadingPercent = (this.loaded / this.toLoad) * 100
    gsap.to(this.progressLine, {width : `${loadingPercent}%`, duration: 0.4,
      ease: "power1.out"})
  }

  closeLoading(){
    gsap.to(this.loadingElement, {opacity: 0, duration: 0.4,delay: 0.4,
    ease: "power1.out"})
  }
  
  disappearLoading(){
    this.loadingElement.classList.add('hide')
  }

  sourceLoaded(source, file) {
	this.items[source.name] = file
	this.loaded++
  this.setLoadingProgress()
	if(this.loaded === this.toLoad){
		this.trigger('ready')
    this.closeLoading()
    setTimeout(()=> this.disappearLoading(), 1400)
	}
  }
}
