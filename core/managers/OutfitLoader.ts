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
            GLTF_ASSET.VICTOR_HAIR,
            GLTF_ASSET.NPC_COACH_HEAD,
            GLTF_ASSET.NPC_PLAYER_HEAD,
            GLTF_ASSET.OPPONENT_HEAD,
            GLTF_ASSET.PLAYER_TICARET_HEAD,
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
        console.log('collect ', this.outfitCollection);

    }
}

// export const loadedCollection = new Outfitloader()
