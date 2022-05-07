import * as THREE from 'three'
import { GLTF_ASSET } from "../enums";
import AssetsManager from "./AssetsManager";

export class Outfitloader {
    public outfitList: any
    public outfitCollection: any

    constructor() {
        this.outfitList = [
            GLTF_ASSET.BOB,
            GLTF_ASSET.AFRO,
            GLTF_ASSET.HUMANOIDE,
        ]
        console.log(this.outfitList);
        
        this.outfitCollection = new Map()
        this.loadOutfits()
    }

    loadOutfits() {
        this.outfitList.forEach((item: GLTF_ASSET) => {
            const model = AssetsManager.getGltf(item).data.scene
            this.outfitCollection.set(model.children[0].name, model)
        });
    }
}

// export const loadedCollection = new Outfitloader()