import * as THREE from 'three'
import { GLTF_ASSET } from "../enums";
import AssetsManager from "./AssetsManager";
import middleware from "../../middleware/init-app";

export class Outfitloader {
    public outfitList: string[]
    public outfitCollection: Map<string, object>

    constructor() {
        this.outfitList = [
            GLTF_ASSET.BOB,
            GLTF_ASSET.AFRO,
        ]
        this.outfitCollection = new Map()
        this.loadOutfits()
    }

    loadOutfits() {
      console.log(process.env.isMobile,'ismobile')
        this.outfitList.forEach((item: GLTF_ASSET) => {
            const model = AssetsManager.getGltf(item).data.scene
            this.outfitCollection.set(model.children[0].name, model)
        });
    }
}

// export const loadedCollection = new Outfitloader()
