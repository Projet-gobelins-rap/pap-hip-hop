import { Group, Object3D, Mesh, Texture, MeshBasicMaterial } from "three"
import { AssetsManager } from "../managers";
import { TEXTURE_ASSET, GLTF_ASSET } from "../enums";
import Helpers from "./Helpers";
import emitter from 'tiny-emitter/instance'

export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static buildingTextureArray:Array<object> = [
      {
        id:1,
      texturePath: [
        AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_1_TEXTURE).data,
        AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_TEXTURE).data,
        AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_3_TEXTURE).data,
        AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_4_TEXTURE).data
      ]},
      {
        id:2,
        texturePath: [
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_1_TEXTURE).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_NEPAL).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_3_TEXTURE).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_4_TEXTURE).data
        ]},
      {
        id:3,
        texturePath: [
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_1_TEXTURE).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_2_TEXTURE).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_3_TEXTURE).data,
          AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUILDING_TYPE_4_TEXTURE).data
        ]},
    ]

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

    public static generateBuilding(slots: Object3D[], buildingVariations: Object3D[]): void {

      let currentTextureArray:Array<object> = []
      console.log('TESTTTT DES LOG 999999999')
      emitter.on('hood::textureEvolution',(textureStep:number)=>{

        console.log('EVENT hood est lancé')
        this.buildingTextureArray.forEach((el)=>{
          console.log(el)
          if (el.id === textureStep){
            currentTextureArray = el.texturePath
            return
          }
        })

        slots.forEach(slot => {
          const params = slot.name.split('_')
          const variation = slot.name.split(':')
          slot.children = []
          let texture = null
          //
          // console.log('TESTTTT DES LOG 222222222')
          // console.log(currentTextureArray,'current text array after ')

          switch (params[3]) {
            case "1":
              texture = currentTextureArray[0]
              texture.flipY = false
              buildingVariations[0].children[0].material.map = texture
              slot.add(buildingVariations[0].clone())
              break;
            case "2":
              texture = currentTextureArray[1]
              texture.flipY = false
              buildingVariations[1].children[0].material.map = texture
              slot.add(buildingVariations[1].clone())
              break;
            case "3":
              texture = currentTextureArray[2]
              texture.flipY = false
              buildingVariations[2].children[0].material.map = texture
              slot.add(buildingVariations[2].clone())
              break;
            case "4":
              texture = currentTextureArray[3]
              texture.flipY = false
              buildingVariations[3].children[0].material.map = texture
              slot.add(buildingVariations[3].clone())
              break;
            default:
              break;
          }
        });


      })
      console.log('TESTTTT DES LOG 77777777777')

      console.log(currentTextureArray,'current text array after ')



    }

    public static generateCollectible(slots: Object3D[]): void {
        slots.forEach(slot => {
            let model = AssetsManager.getGltf(slot.name).data.scene.clone()
            slot.add(model)
            model.position.y = 30
        });
    }
}
