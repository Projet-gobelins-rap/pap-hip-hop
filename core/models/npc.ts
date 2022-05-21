import { Character } from "./character";
import {Camera, Object3D} from "three";
import * as outfitsData from '../../data/outfitsData.json';

export class Npc extends Character {


  public camera?:Camera
  // public params:object
 constructor(playerGltf: Object3D, name: string, currentAction: string,camera?: Camera) {
        super(playerGltf, name, currentAction)

        this.camera = camera
        // this.params = this.outfitParams
   if (this.outfitParams.clickable) {
     this.createInteractPoint()
   }
   console.log(this.outfitParams,'<--- outfitParams from NPC')
    }


    createInteractPoint():void {

    }


}
