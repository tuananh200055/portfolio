import Experience from "../Experience"
import * as THREE from 'three'
export default class Floor{
	constructor(){
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.pixelRatio = this.experience.sizes.pixelRatio
		
		if(this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('floor')
		}

		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}
	setGeometry(){
		// this.geometry = new THREE.PlaneGeometry(14*2,11)
		this.geometry = new THREE.PlaneGeometry(14*2,14)

	}

	setMaterial(){
		this.material = new THREE.MeshBasicMaterial({color :'#000' , depthWrite: false})
	}

	setMesh(){
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.y = -11
		this.mesh.position.z = 3
		this.scene.add(this.mesh)

		if(this.debug.active) {
			this.debugFolder.add(this.mesh.position, 'x').min(0).max(10).step(0.001).name('floorX')
			this.debugFolder.add(this.mesh.position, 'y').min(-10).max(10).step(0.001).name('floorY')
			this.debugFolder.add(this.mesh.position, 'z').min(-100).max(10).step(0.001).name('floorZ')
	
			this.debugFolder.add(this.mesh.rotation, 'x').min(0).max(10).step(0.01).name('floorRolX')
			this.debugFolder.add(this.mesh.rotation, 'y').min(-10).max(10).step(0.01).name('floorRolY')
			this.debugFolder.add(this.mesh.rotation, 'z').min(0).max(10).step(0.01).name('floorRolZ')
			}
	}
}