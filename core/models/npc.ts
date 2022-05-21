import { Character } from "./character";
import {Object3D} from "three";

export class Npc extends Character {
 constructor(playerGltf: Object3D, name: string, currentAction: string) {
        super(playerGltf, name, currentAction)
    }
}
