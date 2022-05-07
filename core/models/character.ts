import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DoubleSide, MeshBasicMaterial } from 'three'
// import { loadedCollection } from '../managers/OutfitLoader'
import { getTextureColorSpec } from '../config/global/textureColorMapping'

// import texture from '../../textures/texture.png'
// import {getTextureColorSpec} from './texureMapEnum'
// import { mainTexture } from './utils'

import * as outfitsData from '../../data/outfitsData.json';

export class Character {
    public model: THREE.Group
    public name: string
    public mixer: THREE.AnimationMixer
    public animationsMap: Map<string, THREE.AnimationAction> = new Map() // Walk, Run, Idle
    public currentAction: string
    public outfitParams: any
    public material: any
    public loadedCollection: any

    constructor(model: THREE.Object3D, name: string, loadedCollection: any /*, mixer: THREE.AnimationMixer, animationsMap: Map<string, THREE.AnimationAction>, currentAction: string*/) {
        //@ts-ignore
        this.model = model
        this.name = name
        this.loadedCollection = loadedCollection
        // this.mixer = mixer
        // this.animationsMap = animationsMap
        // this.currentAction = currentAction
        this.material = null

        this.setParamsByName()
        // this.display()
        // this.loadMaterial()

        setTimeout(() => {
            console.log(this.loadedCollection);
            
            this.loadOutfit()
        }, 1000);
    }

    public loadMaterial() {
        const loader = new THREE.TextureLoader()

        loader.load(texture, async (tex) => {
            tex.magFilter = THREE.NearestFilter
            tex.offset = this.outfitParams.colorMap.offset;
            tex.repeat = this.outfitParams.colorMap.repeat;
            this.material = new THREE.MeshMatcapMaterial({
                map: tex
            })
        })
    }
    public loadOutfit() {

        this.model.traverse(child => {
            // "mixamorigHeadTop_End"

            if (child.name === "mixamorigHeadTop_End") {
                child.add(this.loadedCollection.outfitCollection.get(this.outfitParams.head))

                child.children[0].position.y = -110
                child.children[0].position.z = -30
            }

            // if (child.name === 'sleeves' || child.name === 'body') {
            //     child.material = this.material
            // }
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

    private setParamsByName() {
        for (const key in outfitsData.pnj) {
            if (outfitsData.pnj[key].name === this.name) {
                console.log(this.name);
                this.outfitParams = outfitsData.pnj[key]
                this.outfitParams.colorMap = getTextureColorSpec(this.outfitParams.color)
                console.log(this.outfitParams.colorMap);

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