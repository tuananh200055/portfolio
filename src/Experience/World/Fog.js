import Experience from "../Experience";
import * as THREE from 'three'

export default class Fog{
	constructor(){
		this.experience = new Experience();
		this.scene = this.experience.scene
		this.debug = this.experience.debug

		if(this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('fog')
		}


		this.setIntance()
	}

	setIntance(){

		this.scene.fog = new THREE.Fog( new THREE.Color('blue'), 10, 17 );
		if(this.debug.active) {
			this.debugFolder.add(this.scene.fog, 'near').min(-100).max(100).step(0.001).name('near')
			this.debugFolder.add(this.scene.fog, 'far').min(-100).max(100).step(0.001).name('far')
			}
	}
}