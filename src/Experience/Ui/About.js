import Experience from "../Experience";

export default class About {
  constructor() {
    this.experience = new Experience();
    this.about = document.querySelector(".about");
    this.position = this.about.offsetTop;
    this.heightOffset = this.about.offsetHeight;
    this.height = this.heightOffset + this.position;
    this.checkPositionOnSize();
  }

  checkPositionOnSize() {
    this.positionOnSize = this.position;
    if (this.experience.sizes.screenView === "portrait") {
      this.positionOnSize = this.position - 300;
    }
  }

  reveal(){
    this.reveals = document.querySelectorAll('.reveal')

    for(let i =0 ; i<this.reveals.length ; i++){
      let revealTop = this.reveals[i].getBoundingClientRect().top
      if(revealTop < window.innerHeight - this.reveals[i].offsetHeight){
        this.reveals[i].classList.add('active')
      }
      else{
        this.reveals[i].classList.remove('active')
      }

      
    }
  }

  update() {
    this.position = this.about.offsetTop;
    this.heightOffset = this.about.offsetHeight;
    this.height = this.heightOffset + this.position;
    this.checkPositionOnSize();
  }
}
