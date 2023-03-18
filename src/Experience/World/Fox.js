import Experience from "../Experience"
import * as THREE from 'three'
export default class Fox {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.debug = this.experience.debug

		if(this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('fox')
		}
		// setup

		this.resource = this.resources.items.foxModel
		this.setModel()
		this.setAnimation()
				
	}

	setModel(){
		this.model = this.resource.scene		
		this.model.scale.set(0.02,0.02,0.02)
		this.scene.add(this.model)

		this.model.traverse((child) =>{
			if(child instanceof THREE.Mesh  ){
				child.castShadow = true
			}
		})
	}

	setAnimation(){
		this.animation = {}
		this.animation.mixer = new THREE.AnimationMixer(this.model)
		// this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
		this.animation.action = {}
		this.animation.action.idle = this.animation.mixer.clipAction(this.resource.animations[0])
		this.animation.action.running = this.animation.mixer.clipAction(this.resource.animations[1])
		this.animation.action.walking = this.animation.mixer.clipAction(this.resource.animations[2])
		this.animation.action.current  =this.animation.action.idle
		this.animation.action.current.play()

		this.animation.play = (name) =>{
			const newAction =  this.animation.action[name]
			const oldAction = this.animation.action.current

			newAction.reset()
			newAction.play()
			newAction.crossFadeFrom(oldAction,1)

			this.animation.action.current = newAction

		}

		// debug
		if(this.debug.active){
			const debugObject ={
				playIdle: ()=>{this.animation.play('idle')},
				playWalking: ()=>{this.animation.play('walking')},
				playRunning: ()=>{this.animation.play('running')},
			}
			this.debugFolder.add(debugObject, 'playIdle')
			this.debugFolder.add(debugObject, 'playWalking')
			this.debugFolder.add(debugObject, 'playRunning')
		}
	}

	update(){
		this.animation.mixer.update(this.time.delta * 0.001)
	}
}