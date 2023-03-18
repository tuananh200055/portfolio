import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";
import Room from "./Room";
import Character from "./Character";
import Portal from "./Portal";
import Fog from "./Fog";
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;


    this.resources.on("ready", () => {
      // setup
      this.floor = new Floor()
      // this.fox = new Fox()
      this.room = new Room()
      this.character = new Character()
      this.portal = new Portal()
      // this.fog = new Fog()
      this.environment = new Environment()

    });
  }

  resize(){
    this.room.setPosition()
    this.portal.setPosition()
    this.character.resize()
  }

  update(){
    if(this.room){
      this.room.update()
      this.portal.update()
      this.character.update()
    }
  }
}
