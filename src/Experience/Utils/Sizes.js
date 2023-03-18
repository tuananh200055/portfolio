import EventEmitter from "./EventEmitter";
export default class Sizes extends EventEmitter{
  constructor() {
    super()
    // setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.checkScreenView()
    //Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.checkScreenView()
      this.trigger('resize')
    });
  }

  checkScreenView(){
    if(this.width / this.height <= 1.2){
      this.screenView = 'portrait'
    }
    else{
      this.screenView = 'landscape'
    }      
}
}
