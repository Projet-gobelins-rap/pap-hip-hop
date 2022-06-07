import { Group, Object3D, Mesh, Texture } from "three"
import { AssetsManager } from "../managers";
import { TEXTURE_ASSET, GLTF_ASSET } from "../enums";


export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static populateSingleSlots(slot: Object3D, baseObject: Object3D | Group | Mesh): void {
        slot.children = []
        slot.add(baseObject)
    }

    public static populateSlots(slots: Object3D[], baseObject: Object3D | Group | Mesh, texture: Texture): void {
        texture.flipY = false
        baseObject.children[0]?.material.map = texture
        slots.forEach(object => {
            // -Lead- : dispose ? remove ?
            object.children = []
            object.add(baseObject.clone())
        });
    }
    public static generateBuilding(slots: Object3D[], buildingVariations: Object3D[]): void {
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

    public static generateCollectible(slots: Object3D[]): void {
        slots.forEach(slot => {
            const params = slot.name.split('_')
            let model = null
            switch (params[1]) {
                case "tape":
                    model = AssetsManager.getGltf(GLTF_ASSET.COLLECTABLE_WALKMAN).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30
                    break;
                case "camera":
                    model = AssetsManager.getGltf(GLTF_ASSET.COLLECTABLE_CAMCORDER).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30
                    break;
                case "boombox":
                    model = AssetsManager.getGltf(GLTF_ASSET.COLLECTABLE_BOOMBOX).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30

                    break;
                case "spray":
                    model = AssetsManager.getGltf(GLTF_ASSET.COLLECTABLE_SPRAY).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30

                    break;
                case "note":
                    model = AssetsManager.getGltf(GLTF_ASSET.COLLECTABLE_NOTE).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30

                    break;
                case "vinyle":
                    model = AssetsManager.getGltf(GLTF_ASSET.VINYLE).data.scene.clone()
                    slot.add(model)
                    model.position.y = 30

                    break;
                default:
                    break;
            }
        });
    }
}