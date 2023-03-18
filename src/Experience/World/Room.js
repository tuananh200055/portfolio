import Experience from "../Experience"
import * as THREE from 'three'
import {gsap} from 'gsap'
export default class Room {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.debug = this.experience.debug

		// setup

		if(this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('room')
		}

		this.resource = this.resources.items.room
		this.setTexture()
		this.setMaterial()
		this.setModel()
		this.setAnimation()
		this.scrollScreen()
		
	}

	setTexture(){
		
		this.texture = {}
		this.texture.map = this.resources.items.roomTexture
		this.texture.map.flipY = false
		this.texture.map.encoding = THREE.sRGBEncoding

		this.desktopTexture = {}
		this.desktopTexture.map = this.resources.items.desktopScreenTexture
		// this.desktopTexture.map.flipY = false
		this.desktopTexture.map.encoding = THREE.sRGBEncoding
		// this.desktopTexture.map.offset.x = 0.1
		
		
		
	}

	setMaterial(){
		this.material = new THREE.MeshBasicMaterial({
			map: this.texture.map
		})
		this.desktopScreenMaterial = new THREE.MeshBasicMaterial({
			map: this.desktopTexture.map,
		})
		this.model = this.resource.scene
		this.model.traverse((child)=>{
			child.material = this.material
		})
		this.desktopScreen =  this.model.children.find((child)=>{
			return child.name === "Cube120"
		})

		this.desktopScreen.material = this.desktopScreenMaterial
	
	}

	setPosition() {
		if(this.experience.sizes.screenView === "portrait"){
			this.model.scale.set(0.6,0.6,0.6)		
			this.model.position.x = 1.3
			this.model.position.y = -2.5
			this.model.position.z = 3
			}		
			else{
			this.model.scale.set(1,1,1)		
			this.model.position.x = 4.5
			this.model.position.y = -1.8
			this.model.position.z = 3
			}
	}

	setModel(){
		this.setPosition()
		this.scene.add(this.model)
		this.model.rotation.set(0.2,-1,0)
		if(this.debug.active) {
		this.debugFolder.add(this.model.position, 'x').min(0).max(10).step(0.01).name('roomX')
		this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.01).name('roomY')
		this.debugFolder.add(this.model.position, 'z').min(0).max(10).step(0.01).name('roomZ')

		this.debugFolder.add(this.model.rotation, 'x').min(0).max(10).step(0.01).name('rolX')
		this.debugFolder.add(this.model.rotation, 'y').min(-10).max(10).step(0.01).name('rolY')
		this.debugFolder.add(this.model.rotation, 'z').min(0).max(10).step(0.01).name('rolZ')
		}
	}

	screenMove(){
		gsap.to(this.desktopTexture.map.offset , {y:  "random(0, 0.5)", duration: 0.8, ease: "power2.out"})
	}
	
	scrollScreen(){
		this.startScreen = setInterval(()=>this.screenMove() , 4000)
	}

	stopScreen(){
		console.log("a")
		clearInterval(this.startScreen);
		
	}

	setAnimation(){
		this.animation = {}
		this.animation.mixer = new THREE.AnimationMixer(this.model)
		this.animation.action = {}
		this.animation.action.mousemove = this.animation.mixer.clipAction(this.resource.animations[7])
		this.animation.action.current  =this.animation.action.mousemove
		this.animation.action.current.play()
	}

	resize() {
		this.setPosition()
	}

	update(){
		this.animation.mixer.update(this.time.delta * 0.001)
		// this.screenMove()
	}
}
		