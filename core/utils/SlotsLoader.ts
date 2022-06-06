import { Group, Object3D, Mesh } from "three"
import { AssetsManager } from "../managers";
import {  TEXTURE_ASSET } from "../enums";


export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static populateSingleSlots(slot: Object3D, baseObject: Object3D | Group | Mesh): void {
        slot.children = []
        slot.add(baseObject)
    }

    public static populateSlots(slots: Object3D[], baseObject: Object3D | Group | Mesh): void  {
        slots.forEach(object => {
            // -Lead- : dispose ? remove ?
            object.children = []
            object.add(baseObject.clone())
        });
    }
    public static generateBuilding(slots: Object3D[], buildingVariations: Object3D[]): void  {
    // public static generateBuilding(slots: Object3D[], buildingVariations: Object3D): void  {
        slots.forEach(slot => {
            const params = slot.name.split('_')
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
                    texture = AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_TEXTURE).data
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
}