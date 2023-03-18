import Experience from "./Experience";
import * as THREE from 'three'
import {gsap} from 'gsap'

export default class Camera{
	
	constructor(){
		this.experience = new Experience() 
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.debug = this.experience.debug
		this.stop = false
		this.aboutPosition = this.experience.about.position
		this.aboutHeightOffset = this.experience.about.heightOffset
		this.aboutHeight = this.experience.about.height
		this.parallaxStrength = 0.3
		// setup

		if(this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera')
		}

		this.setInstance()
		this.setCursor()
	}

	setInstance() {
		// fov : goc' nhin`
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height, 
			0.1,
			100
		)
		// this.instance.position.set(6,4,8)
		this.instance.position.set(1,2,14)
		this.instance.position.y = -this.experience.scrollWrap.scrollY / this.experience.sizes.height * 9
		if(this.debug.active) {
		this.debugFolder.add(this.instance.position, 'x').min(-100).max(100).step(1).name('camX')
		this.debugFolder.add(this.instance.position, 'y').min(-100).max(100).step(1).name('camY')
		this.debugFolder.add(this.instance.position, 'z').min(-100).max(100).step(1).name('camZ')
		this.debugFolder.add(this.instance.rotation, 'x').min(-100).max(100).step(1).name('camRolX')
		this.debugFolder.add(this.instance.rotation, 'y').min(-100).max(100).step(1).name('camRolY')
		this.debugFolder.add(this.instance.rotation, 'z').min(-100).max(100).step(1).name('camRolZ')
		}
		this.cameraGroup = new THREE.Group()
		this.scene.add(this.cameraGroup)
		this.cameraGroup.add(this.instance)
	}

	resize(){
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
		this.aboutPosition = this.experience.about.position
		this.aboutHeightOffset = this.experience.about.heightOffset
		this.aboutHeight = this.experience.about.height
	}

	updateCameraPosition(){
		if(this.experience.scrollWrap.scrollY >= this.aboutPosition){
		gsap.to(this.instance.position, {y: -(this.experience.scrollWrap.scrollY - (this.aboutHeightOffset - this.experience.sizes.height))/ this.experience.sizes.height *8, duration: 0.8, ease: "power2.out"})
		// this.instance.position.y = -(this.experience.scrollY - (this.aboutHeightOffset - this.experience.sizes.height)) / this.experience.sizes.height *8
		}
		else{
			gsap.to(this.instance.position, {y: -this.experience.scrollWrap.scrollY / this.experience.sizes.height * 8, duration: 0.8, ease: "power2.out"})
			// this.instance.position.y = -this.experience.scrollY / this.experience.sizes.height * 8
		}
		// this.instance.position.y = -this.experience.scrollY / this.experience.sizes.height * 9
	}

	stopCamera(){
		if(this.experience.scrollWrap.scrollY >= this.aboutPosition &&  this.experience.scrollWrap.scrollY <= this.aboutPosition + (this.aboutHeightOffset - this.experience.sizes.height)){
			this.stop = true
			// this.instance.position.y = -this.aboutPosition / this.experience.sizes.height * 8
			gsap.to(this.instance.position, {y: -this.aboutPosition / this.experience.sizes.height * 8, duration: 0.8, ease: "power2.out"})
		}
		else{
			this.stop = false
			// console.log(this.experience.scrollY +"/"+ +this.aboutPosition + "/" + (this.aboutPosition + (this.aboutHeightOffset - this.experience.sizes.height)) + "move")
		}
	}

	setCursor(){
		document.addEventListener('mousemove',(e)=>{
			this.cursorX = e.clientX / this.experience.sizes.width - 0.5 
			this.cursorY = e.clientY / this.experience.sizes.height - 0.5		
		})
	}

	parallaxCamera(){
		this.parallaxX = this.cursorX * this.parallaxStrength
		this.parallaxY = - this.cursorY	* this.parallaxStrength
		const byX = (this.parallaxX - this.cameraGroup.position.x) * (this.experience.time.delta / 1000) * 3
		const byY = (this.parallaxY - this.cameraGroup.position.y) * (this.experience.time.delta / 1000) * 3
		if(byX<0.05 && byX>-0.05) this.cameraGroup.position.x += byX
		if(byY<0.05 && byY>-0.05) this.cameraGroup.position.y += byY

	}

	update(){
		// this.stopCamera()
		// if(!this.stop){
		// this.updateCameraPosition()
		// }

		this.parallaxCamera()
		

	}
}