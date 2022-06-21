import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationAction, AnimationClip, AnimationMixer, DoubleSide, Group, Mesh, MeshBasicMaterial, MeshMatcapMaterial, Object3D, Scene, Texture } from 'three'
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
    public model: Group
    public gltfAnimations: AnimationClip[]
    public name: string
    public texture: Texture
    public mixer: AnimationMixer
    public animationsMap: Map<string, AnimationAction> = new Map() // Walk, Run, Idle
    public currentAction: string = ''

    public material: MeshMatcapMaterial
    public loadedCollection: any
    public animationPlayed: string = 'idle'
    public outfitParams: any
    public textures: {
        arms: Texture,
        body: Texture,
        legs: Texture,
    };
    private _fadeDuration: number = 0.2;

    constructor(playerGltf: any, name: string, currentAction: string) {
        //@ts-ignore
        this.model = SkeletonUtils.clone(playerGltf.scene)
        this.gltfAnimations = playerGltf.animations;
        this.mixer = new AnimationMixer(this.model);
        this.currentAction = currentAction

        this.name = name
        this.material = null

        this.init()
    }

    public init(): void {
        this.initAnimations()
        // get all outfits models
        this.loadedCollection = AssetsManager.getLoadedCollection().outfitCollection
        // get pixels colors texture
        this.texture = AssetsManager.getTexture(TEXTURE_ASSET.COLOR_TEXTURE).data
        this.setParamsByName()
    }


    // map animations by name for easier use
    public initAnimations(): void {
        this.gltfAnimations.forEach((a: AnimationClip) => {
            this.animationsMap.set(a.name, this.mixer.clipAction(a))
        })
    }

    // apply body parts textures and outfits model matching with outfitParams
    public loadOutfit(): void {

        this.textures = {
            arms: AssetsManager.getTexture(this.outfitParams.body.textureArms).data,
            body: AssetsManager.getTexture(this.outfitParams.body.textureBody).data,
            legs: AssetsManager.getTexture(this.outfitParams.body.textureLegs ? this.outfitParams.body.textureLegs : TEXTURE_ASSET.BLUE_JEAN_TEXTURE).data,
        }
        console.log();


        this.model.traverse((child: Object3D | Mesh) => {
            // append in top head bone for sticking with rigged mesh
            if (child.name === "mixamorigHeadTop_End") {
                child.children = []
                child.add(this.loadedCollection.get(this.outfitParams.head.model).clone())
            }

            if (child.name === 'body') {
                this.textures.body.flipY = false
                child.material = new MeshMatcapMaterial({ map: this.textures.body })
            }

            if (child.name === 'pant') {
                // this.textures.arms.flipY = false
                child.material = new MeshMatcapMaterial({ map: this.textures.legs })
            }

            if (child.name === 'hand') {
                this.textures.arms.flipY = false
                child.material = new MeshMatcapMaterial({ map: AssetsManager.getTexture(TEXTURE_ASSET.HAND_SKIN_COLOR).data })
            }
            if (child.name === 'arms') {
                this.textures.arms.flipY = false
                child.material = new MeshMatcapMaterial({ map: this.textures.arms })
            }
        })
    }

    public removeCharacter(scene: Scene, model: Group): void {
        scene.remove(model)
    }

    public setParamsByName(): void {
        for (const key in outfitsData.pnj) {
            if (outfitsData.pnj[key].name === this.name) {
                this.outfitParams = outfitsData.pnj[key]

                // get color from pixels colors texture
                // may not been used anymore because of using complexes textures
                Helpers.traverse(this.outfitParams, (key, value) => {
                    if (typeof value == "object") {
                        if (value.color) value.colorMap = getTextureColorSpec(value.color)
                    }
                })
            }
        }

        this.loadOutfit()
    }

    public update(delta: number): void {

        if (this.currentAction != this.animationPlayed) {
            const toPlay = this.animationsMap.get(this.animationPlayed)
            const current = this.animationsMap.get(this.currentAction)
            console.log(this._fadeDuration);
            
            current.fadeOut(this._fadeDuration)
            toPlay.reset().fadeIn(this._fadeDuration).play();

            this.currentAction = this.animationPlayed
        }

        this.mixer.update(delta)
    }
}
