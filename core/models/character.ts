import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DoubleSide, Group, MeshBasicMaterial, Scene} from 'three'
// import { loadedCollection } from '../managers/OutfitLoader'
import { getTextureColorSpec } from '../config/global/textureColorMapping'
import AssetsManager from '../managers/AssetsManager'
import { TEXTURE_ASSET } from '../enums/asset'
import Helpers from '../utils/Helpers'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

// import texture from '../../textures/texture.png'
// import {getTextureColorSpec} from './texureMapEnum'
// import { mainTexture } from './utils'

import * as outfitsData from '../../data/outfitsData.json';

export class Character {

    // properties
    public model: THREE.Group
    public gltfAnimations: THREE.AnimationClip[]
    public name: string
    public texture: THREE.Texture
    public mixer: THREE.AnimationMixer
    public animationsMap: Map<string, THREE.AnimationAction> = new Map() // Walk, Run, Idle
    public currentAction: string = ''
    public outfitParams: any
    public material: any
    public loadedCollection: any
    public animationPlayed: string = 'idle'
    public textures: any;

    constructor(playerGltf: any, name: string, currentAction: string) {
        //@ts-ignore
        this.model = SkeletonUtils.clone(playerGltf.scene)
        this.gltfAnimations = playerGltf.animations;
        this.mixer = new THREE.AnimationMixer(this.model);
        this.currentAction = currentAction

        this.name = name
        this.material = null

        this.init()
        // this.display()
    }

    public init() {
        this.initAnimations()
        this.loadedCollection = AssetsManager.getLoadedCollection().outfitCollection
        this.texture = AssetsManager.getTexture(TEXTURE_ASSET.COLOR_TEXTURE).data

        this.setParamsByName()
    }

    public initAnimations() {
        this.gltfAnimations.forEach((a: THREE.AnimationClip) => {
            this.animationsMap.set(a.name, this.mixer.clipAction(a))

          console.log(this.animationsMap,'<--- animations')
        })
    }

    public loadOutfit() {

        this.textures = {
            arms: AssetsManager.getTexture(this.outfitParams.body.textureArms).data,
            body: AssetsManager.getTexture(this.outfitParams.body.textureBody).data,
        }

        this.model.traverse(child => {
            if (child.name === "mixamorigHeadTop_End") {
                child.add(this.loadedCollection.get(this.outfitParams.head.model))
            }

            if (child.name === 'body') {
                this.textures.body.flipY = false
                child.material = new THREE.MeshMatcapMaterial({ map: this.textures.body })
            }

            if (child.name === 'arms') {
                this.textures.arms.flipY = false
                child.material = new THREE.MeshMatcapMaterial({ map: this.textures.arms })
            }
        })
    }

    public removeCharacter(scene:Scene,model:Group) {
      scene.remove(model)
    }

    public setParamsByName():void {
        for (const key in outfitsData.pnj) {
            if (outfitsData.pnj[key].name === this.name) {
                this.outfitParams = outfitsData.pnj[key]

                Helpers.traverse(this.outfitParams, (key, value) => {
                    if (typeof value == "object") {
                        if (value.color) value.colorMap = getTextureColorSpec(value.color)
                    }
                })
            }
        }

        this.loadOutfit()
    }

    // TODO : Setup mixer
    public update(delta: number) {

        if (this.currentAction != this.animationPlayed) {
            const toPlay = this.animationsMap.get(this.animationPlayed)
            const current = this.animationsMap.get(this.currentAction)

            current.fadeOut(this.fadeDuration)
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = this.animationPlayed
        }

        this.mixer.update(delta)
    }

}
