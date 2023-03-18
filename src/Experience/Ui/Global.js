import Experience from "../Experience";

export default class Global {
  constructor() {
    this.experience = new Experience();

    this.removeTabEvent()
//     this.scrollToZero()
  }

  removeTabEvent() {
    var links = document.getElementsByTagName("a");

    for (var i = 0, j = links.length; i < j; i++) {
      links[i].setAttribute("tabindex", "-1");
    }
  }

  scrollToZero(){
	this.scrollY = window.scrollY
	window.scroll(0,this.scrollY)
  }
}
