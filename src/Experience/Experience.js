import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from "./Utils/Resources"
import sources from './sources'
import Debug from './Utils/Debug'
import About from "./Ui/About"
import Work from "./World/Work"
import Global from "./Ui/Global"
import Menu from "./Ui/Menu"
import Scroll from "./Ui/Scroll"
import Contact from "./Ui/Contact"
let instance = null

export default class Experience{
	constructor(canvas){

		if(instance){
			return instance
		}

		instance = this
		// global access 
		window.experience = this
		
		//options
		this.canvas = canvas
		this.body = document.querySelector('body')

		// setup 
		this.global = new Global()
		this.debug = new Debug()
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.scrollWrap = new Scroll()
		this.about = new About()
		this.contact = new Contact()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.resources = new Resources(sources)
		this.world = new World()
		this.work = new Work()
		this.menu = new Menu()		
		this.scrollY = window.scrollY
		this.scroll()
		
		// resize event 
		this.sizes.on('resize', ()=>{
			this.resize()
		})

		// time tick event
		this.time.on('tick', ()=>{
			this.update()
		})

		this.resources.on('ready', ()=>{
			this.scrollWrap.mouseWheel()
			this.scrollWrap.touchStartEvent()
			this.scrollWrap.touchMoveEvent()
		})
	}

	scroll(){
		window.addEventListener("scroll", ()=>{
			this.scrollY = window.scrollY
			this.menu.closeMenu()
		})
	}


	resize(){
		this.scrollY = window.scrollY
		this.world.resize()
		this.about.update()
		this.camera.resize()
		this.renderer.resize()
	}
	
	update(){
		this.camera.update()
		this.world.update()
		this.renderer.update()
	}

	destroy() {
		this.sizes.off('resize')
		this.time.off('tick')

		// traverse th whole scene 
		this.scene.traverse((child)=>{
			if(child instanceof THREE.Mesh){
				child.geometry.dispose()

				for( const key in child.material){
					const value = child.material[key]

					if(value && typeof value.dispose === 'function'){
						value.dispose()
					}
				}
			}
		})
		this.camera.controls.dispose()
		this.renderer.instance.dispose()

		if(this.debug.active) this.debug.ui.destroy()
	}
}