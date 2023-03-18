import Experience from "../Experience";

export default class Work {
  constructor() {
    this.experience = new Experience();
    this.workProject = document.querySelectorAll(".project-item");
    this.nextButton = document.querySelector('.next')
    this.previousButton = document.querySelector('.prev')
    this.transformStep = 100;
    this.transformSpace = 10;
    this.transformPosition = 0;
    this.selectedPosition = 0;
    this.setProjectDefaultPosition();
    this.setPositionActive();
    this.nextProject()
    this.previousProject()
    
  }

  setProjectDefaultPosition() {
    for (let i = 0; i < this.workProject.length; i++) {
      this.transformPosition = i * this.transformStep;
      if (this.transformPosition != 0) {
        this.transformPosition += 10;
	      this.workProject[i].style.transform = `translateX(${this.transformPosition}%) scale(0.9)`;
      }
      else{
	      this.workProject[i].style.transform = `translateX(${this.transformPosition}%) scale(1)`;
      }
    }
  }

  changePositionProject(targetPosition){
    for (let i = 0; i < this.workProject.length; i++) {
			this.transformPosition =(i - targetPosition) * this.transformStep;
			if (this.transformPosition < 0) {
			  	this.transformPosition -= 10;
			}
			else if(this.transformPosition >0){
				this.transformPosition += 10;
			}
			if(this.transformPosition !== 0){
      this.workProject[i].classList.remove('active')
			this.workProject[i].style.transform = `translateX(${this.transformPosition}%) scale(0.9)`
			}
			else{
        this.workProject[i].classList.add('active')
				this.workProject[i].style.transform = `translateX(${this.transformPosition}%) scale(1)`	
			}			
		      }
  }

  setPositionActive() {
    this.workProject.forEach((item, index) => {
        item.addEventListener("click",  () => {
		if (index != this.selectedPosition) {
          this.changePositionProject(index)
		      this.selectedPosition = index
          this.setupButton()
		}
	});
    });
  }

  nextProject() {
    this.nextButton.addEventListener('click', ()=>{
      if (this.selectedPosition +1 !== this.workProject.length) {
        this.changePositionProject(this.selectedPosition +1)
        this.selectedPosition = this.selectedPosition +1
        if(this.selectedPosition === 1){
          this.previousButton.classList.remove('disable')
        }
        else if(this.selectedPosition === this.workProject.length -1){
          this.nextButton.classList.add('disable')
        }
      }
    })
  }

  previousProject() {
    this.previousButton.addEventListener('click', ()=>{
      if (this.selectedPosition -1 >= 0) {
        this.changePositionProject(this.selectedPosition -1)
        this.selectedPosition = this.selectedPosition -1
        if(this.selectedPosition === this.workProject.length -2){
          this.nextButton.classList.remove('disable')
        }
        else if(this.selectedPosition === 0){
          this.previousButton.classList.add('disable')
        }
      }
    })
  }

  setupButton(){
    if(this.selectedPosition === 1){
      this.previousButton.classList.remove('disable')
    }
    else if(this.selectedPosition === this.workProject.length -1){
      this.nextButton.classList.add('disable')
    }
    if(this.selectedPosition === this.workProject.length -2){
      this.nextButton.classList.remove('disable')
    }
    else if(this.selectedPosition === 0){
      this.previousButton.classList.add('disable')
    }
  }

}
