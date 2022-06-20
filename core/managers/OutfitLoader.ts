import { GLTF_ASSET } from "../enums";
import AssetsManager from "./AssetsManager";

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
            GLTF_ASSET.NPC_DEENASTY_HEAD,
            GLTF_ASSET.OPPONENT_HEAD,
            GLTF_ASSET.PLAYER_TICARET_HEAD,
            GLTF_ASSET.HEAD_BREAKER_A,
            GLTF_ASSET.HEAD_BREAKER_B,
            GLTF_ASSET.HEAD_BREAKER_C,
        ]
        this.outfitCollection = new Map()
        this.loadOutfits()
    }

    loadOutfits(): void {
        this.outfitList.forEach((item: GLTF_ASSET) => {
            const model = AssetsManager.getGltf(item).data.scene
            this.outfitCollection.set(model.children[0].name, model)
        });
    }
}

// export const loadedCollection = new Outfitloader()
