import Experience from "../Experience";
import { gsap } from "gsap";
export default class Menu {
  constructor() {
    this.menu = document.querySelector(".menu");
    this.navigation = document.querySelector("nav");
    this.experience = new Experience();
    this.menuItem = document.querySelectorAll("ul li");
    this.section = document.querySelectorAll("section");
    this.transitionElement = document.querySelector(".transition-container");
    this.currentElement = 0;
    this.openMenu();
    this.clickMenuItem();
    this.clickGetInTouch();
  }

  openMenu() {
    this.menu.addEventListener("click", () => {
      this.menu.classList.toggle("active");
      this.navigation.classList.toggle("show-menu");
      this.transitionElement.classList.remove("hide");
    });
  }

  closeMenu() {
    if (this.menu.className.includes("active")) {
      this.menu.classList.remove("active");
      this.navigation.classList.remove("show-menu");
    }
  }

  showOverlay() {
    //     gsap.fromTo(
    //       this.transitionElement,
    //       { x: "-100%", y: "100%" },
    //       { x: "100%", y: "-200%", duration: 2.5, ease: "power2.out" }
    //     );
    //     setTimeout(() => this.transitionElement.classList.add("hide"), 2500);
    this.transitionElement.classList.add("show");
    setTimeout(() => this.transitionElement.classList.remove("show"), 2000);
  }

  clickMenuItem() {
    this.menuItem.forEach((element, index) => {
      element.addEventListener("click", () => {
        if (this.currentElement != index) {
          setTimeout(
            () =>
              this.experience.scrollWrap.scrollToElement(this.section[index]),
            500
          );
          this.showOverlay();
          this.closeMenu();
          this.currentElement = index;
        }
      });
    });
  }

  clickGetInTouch() {
    let contactElement = document.querySelector(".contact");
    let giTouch = document.querySelector(".giTouch");
    giTouch.addEventListener("click", () => {
      setTimeout(
        () => this.experience.scrollWrap.scrollToElement(contactElement),
        500
      );
      this.showOverlay();
    });
  }
}
