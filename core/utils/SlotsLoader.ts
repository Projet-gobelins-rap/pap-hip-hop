import { Group, Object3D, Mesh, Texture, MeshBasicMaterial } from "three"
import { AssetsManager } from "../managers";
import { TEXTURE_ASSET, GLTF_ASSET } from "../enums";
import Helpers from "./Helpers";


export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static populateSingleSlots(slot: Object3D, baseObject: Object3D | Group | Mesh, texture: Texture| null = null): void {
        slot.children = []
        if(texture) {
            texture.flipY = false
            baseObject.children[0].material.map = texture
        }
        slot.add(baseObject)
    }

    public static populateSlots(slots: Object3D[], baseObject: Object3D | Group | Mesh, texture: Texture): void {
        texture.flipY = false
        baseObject.children[0].material.map = texture
        slots.forEach(object => {
            object.children = []
            object.add(baseObject.clone())
            const colliderGeometry = Helpers.generateBoxCollider(object)
        });
    }
    
    public static generateBuilding(slots: Object3D[], buildingVariations: Object3D[], isGraffed: boolean = false): void {
        slots.forEach(slot => {
            const params = slot.name.split('_')
            const variation = slot.name.split(':')
            slot.children = []
            let texture = null

            switch (params[3]) {
                case "1":
                    texture = AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_1_TEXTURE).data
                    texture.flipY = false
                    buildingVariations[0].children[0].material.map = texture
                    slot.add(buildingVariations[0].clone())
                    break;
                case "2":

                    texture = isGraffed ? AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_NEPAL).data : AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_TEXTURE).data
                    texture.flipY = false
                    buildingVariations[1].children[0].material.map = texture
                    slot.add(buildingVariations[1].clone())
                    break;
                case "3":
                    texture = AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_3_TEXTURE).data
                    texture.flipY = false
                    buildingVariations[2].children[0].material.map = texture
                    slot.add(buildingVariations[2].clone())
                    break;
                case "4":
                    texture = AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_4_TEXTURE).data
                    texture.flipY = false
                    buildingVariations[3].children[0].material.map = texture
                    slot.add(buildingVariations[3].clone())
                    break;
                default:
                    break;
            }
        });
    }

    public static generateCollectible(slots: Object3D[], collectedItems: string[]): void {
        slots.forEach(slot => {
            if(!(collectedItems?.includes(slot.name))) {
                let model = AssetsManager.getGltf(slot.name).data.scene.clone()
                slot.add(model) 
                // model.children[0].material.color = 'red'
                model.children[0].position.y = 70
            } else {
                slot.children = []
            }
        });
    }
}