import { Character } from "./character";
import {Group, Object3D, Scene} from "three";

export class Npc extends Character {
  constructor(playerGltf: Object3D, name: string, currentAction: string) {
        super(playerGltf, name, currentAction)
    }

  removeCharacter(scene:Scene,model:Group) {
    // this.animationsMap.get(this.currentAction)!.enabled = false
    scene.remove(model)
  }
}
