import Experience from "../Experience"
import {gsap} from 'gsap'

export default class Scroll{
	constructor(){
		this.experience =  new Experience()
		this.scrollElement = document.querySelector('.scroll-wrap')
		this.wheelValue = 0
		this.scrollY = 0
		// this.mouseWheel()	
	}

	touchStartEvent(){
		window.addEventListener('touchstart', (e)=>{
			this.touchStart = e.touches[0].clientY
			this.prevDistance = 0
		})
	}

	touchMoveEvent(){
		window.addEventListener('touchmove', (e)=>{
			this.touchmove = e.touches[0].clientY
			this.scrollDistance = this.touchmove - this.touchStart
			if(this.scrollY > 0 || this.scrollDistance < 0){
				if(this.scrollY < this.scrollElement.offsetHeight - this.experience.sizes.height || this.prevDistance < this.scrollDistance ){	
				this.scrollY += (this.scrollDistance - this.prevDistance) * -1
				this.prevDistance = this.scrollDistance
				this.scrollTo = this.preventFromScrollingBottom()
				}
				this.scroll()
				this.experience.about.reveal()
			}
		})
	}

	mouseWheel(){
		window.addEventListener('wheel' , (e)=>{
			this.wheelValue = e.deltaY * 0.9
			if(this.scrollY > 0 || this.wheelValue > 0){
			if(this.scrollY < this.scrollElement.offsetHeight - this.experience.sizes.height || this.wheelValue <0 )	
			this.scrollY += this.wheelValue
			this.scrollTo = this.preventFromScrollingBottom()
			}
			this.scroll()
			this.experience.about.reveal()
			
		})
	}
	

	scroll(){
		gsap.to(this.scrollElement, {y: -this.scrollTo, duration: 0.8, ease: "power2.out"})
			this.experience.camera.stopCamera()
			if(!this.experience.camera.stop){
			this.experience.camera.updateCameraPosition()
		}
	}

	preventFromScrollingBottom() {
		if (this.scrollY >= this.scrollElement.offsetHeight - this.experience.sizes.height) {
		    return this.scrollElement.offsetHeight - this.experience.sizes.height
		} else {
		    return this.scrollY
		}
	    }


	scrollToElement(element){
		this.scrollY = element.offsetTop
		if(this.experience.sizes.screenView == 'portrait' && element.className == 'about'){
			this.scrollY -= 300
		}

		gsap.to(this.scrollElement, {y: -this.scrollY, duration: 0, ease: "power2.out"})
			this.experience.camera.stopCamera()
			if(!this.experience.camera.stop){
			this.experience.camera.updateCameraPosition()
		}
		this.experience.about.reveal()					
	}
}