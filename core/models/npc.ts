import { Character } from "./character";

export class Npc extends Character {
 constructor(playerGltf: Object3D, name: string, currentAction: string) {
        super(playerGltf, name, currentAction)
    }
}