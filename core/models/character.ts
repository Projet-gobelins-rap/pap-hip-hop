import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DoubleSide, MeshBasicMaterial } from 'three'
// import { loadedCollection } from '../managers/OutfitLoader'
import { getTextureColorSpec } from '../config/global/textureColorMapping'
import AssetManager from '../managers/AssetsManager'
import { TEXTURE_ASSET } from '../enums/asset'
import Helpers from '../utils/Helpers'

// import texture from '../../textures/texture.png'
// import {getTextureColorSpec} from './texureMapEnum'
// import { mainTexture } from './utils'

import * as outfitsData from '../../data/outfitsData.json';

export class Character {
    public model: THREE.Group
    public name: string
    public texture: THREE.Texture
    public mixer: THREE.AnimationMixer
    public animationsMap: Map<string, THREE.AnimationAction> = new Map() // Walk, Run, Idle
    public currentAction: string
    public outfitParams: any
    public material: any
    public loadedCollection: any

    constructor(model: THREE.Object3D, name: string, loadedCollection: any, texture: any /*, mixer: THREE.AnimationMixer, animationsMap: Map<string, THREE.AnimationAction>, currentAction: string*/) {
        //@ts-ignore
        this.model = model
        this.name = name
        this.loadedCollection = loadedCollection
        this.texture = texture.data
        // this.mixer = mixer
        // this.animationsMap = animationsMap
        // this.currentAction = currentAction
        this.material = null

        this._setParamsByName()
        // this.display()
        this.loadOutfit()
    }

    public loadOutfit() {
        this.model.traverse(child => {
            if (child.name === "mixamorigHeadTop_End") {
                child.add(this.loadedCollection.outfitCollection.get(this.outfitParams.head.model))
                let group = child.children[0]
                group.position.y = -110
                group.position.z = -30
            } 

            if (child.name === 'sleeves' || child.name === 'body') {
                child.material = new THREE.MeshMatcapMaterial({ map: this.texture })
                child.material.map.magFilter = THREE.NearestFilter
                child.material.map.offset = this.outfitParams.body.colorMap.offset;
                child.material.map.repeat = this.outfitParams.body.colorMap.repeat;
            }
        })

        console.log(this.model);
    }

    // TODO : Update position methode
    // public display() {
    //     console.log(this.outfitParams.position);

    //     this.model.position.set(
    //         this.outfitParams.position.x,
    //         this.outfitParams.position.y,
    //         this.outfitParams.position.z,
    //     )
    // }

    private _setParamsByName() {
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
    }

    // TODO : Setup mixer
    public update(delta: number) {
        let play = '';
        play = 'walk'

        if (this.currentAction != play) {
            const toPlay = this.animationsMap.get(play)
            const current = this.animationsMap.get(this.currentAction)

            current.fadeOut(this.fadeDuration)
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play
        }

        this.mixer.update(delta)
    }
}