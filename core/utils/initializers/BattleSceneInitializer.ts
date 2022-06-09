import { Initializers } from "~/core/defs";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierScene from "~/core/scene/GrenierScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial, Object3D, OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
  VideoTexture,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET, VIDEO_ASSET } from "../../enums";
import { degToRad } from "three/src/math/MathUtils";
import GrenierSceneConfig from "../../config/grenier-scene/grenier-scene.config";
import { Npc } from "../../models/npc"

import { Outfitloader } from "../../managers/OutfitLoader"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import SlotsLoader from "../SlotsLoader";
import battleStore from "../../../store/battleStore";
import BattleScene from "../../scene/BattleScene";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import emitter from 'tiny-emitter/instance'

export default class BattleSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, battleStore: battleStore }, void> {

  public cameraInitialPosition: Vector3
  private _scene: Scene
  private _controls: OrbitControls
  private _humanoid:GLTF = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data
  private _coach: Npc
  private _opponent: Npc
  private _player: Npc

  public _npcArray:Array<Npc> = []
  private _currentNpc:Array<Npc> = []

  init(): void {

    BattleScene.setSceneContext(this._createSceneContext())

    this._addSceneElements()

    this.addObjectToScene()
    this.disposeObject()
    // this._optimizeScene()
    //this._configGUI()
    BattleScene.context.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext() {
    // Set canvas dimensions
    this._data.canvas.width = Helpers.getWindowSizes().width
    this._data.canvas.height = Helpers.getWindowSizes().height

    // Create camera
    const camera = this._createCamera()

    // Create scene
    const scene = this._createScene()

    // Create renderer
    const renderer = this._createRender()

    // Create controls
    const controls = this._createControls(camera, this._data.canvas)

    return new SceneManager({
      activateKeyboard: false,
      controls: controls,
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: false,
      onStart:(ctx) =>{
        console.log(this._scene,'<--- scene')
      },
      onRender: (ctx) => {
        // Add interactions points tracking
        // console.log(ctx.camera.position)
        
        this._currentNpc.forEach((el)=>{
          el.update(ctx.deltaTime)
        })


      },
      onResume: (ctx) => {

      },
      onWindowResize: (ctx) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth

        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.aspect = ctx.canvas.width / ctx.canvas.height
          camera.updateProjectionMatrix()
        }

        ctx.renderer.setSize(ctx.canvas.width, ctx.canvas.height)
        ctx.renderer.setPixelRatio(Math.min(Helpers.getWindowRatio(), ctx.defaultRatio))
      }
    })

  }

  /**
   * Create perspective camera
   */

  private _createCamera() {
    const camera = new PerspectiveCamera(
      70,
      this._data.canvas.width / this._data.canvas.height,
      1,
      1000
    )

    camera.position.z = -280

    return camera
  }

  /**
   * Create scene
   */
  private _createScene() {
    this._scene = new Scene()
    return this._scene
  }

  /**
   * Create controls
   */
  private _createControls(camera:PerspectiveCamera, canvas:HTMLCanvasElement) {
    this._controls = new OrbitControls(camera, canvas)
    return this._controls
  }

  /**
   * Create renderer
   * @private
   */
  private _createRender() {
    return new WebGLRenderer({
      canvas: this._data.canvas,
      antialias: true,
      alpha: true,
      // powerPreference: 'high-performance'
    })
  }

  private _addSceneElements():void {
    console.log('add scene elements')
    this.registerNpcs()
    this._registerGltfCoach()
    this._registerGltfPlayer()
  }

  private registerNpcs() {
    this._coach = new Npc(this._humanoid, 'coach', 't-pose')
    this._player = new Npc(this._humanoid, 'player', 't-pose')
    this._opponent = new Npc(this._humanoid, 'opponent', 't-pose')

    this._npcArray.push(this._coach,this._player,this._opponent)
    console.log(this._npcArray,'NPCs ARRAY')
  }

  private _registerGltfCoach() {

    this._coach.model.scale.set(50, 50, 50)
    this._coach.model.position.set(20, -330, -0)
    this._coach.model.rotateY(degToRad(180))
    console.log(this._coach.model,'QQ')
    console.log(this._coach.model.getObjectByName('head_coach'),'VVVVV')
    this._scene.add(this._coach.model)
    this._currentNpc.push(this._coach)
  }

  private _registerGltfPlayer() {

    this._player.model.scale.set(50, 50, 50)
    this._player.model.position.set(20, -330, -0)
    this._player.model.rotateY(degToRad(180))
    // this._scene.add(this._player.model)
  }

  public addObjectToScene() {
    emitter.on('battle::addObject',(modelName:string)=>{
      this._npcArray.forEach((el)=>{
        if (modelName === el.name) {
          console.log(el,'WXCVFDSFRE')
          this._scene.add(el.model)
          this._currentNpc.push(el)
        }
      })
    })
  }

  public disposeObject () {

    emitter.on('battle::disposeObject',(modelName:string)=>{
      console.log("EVENT EST PASSER !")
      console.log(modelName,'<-- MODEL - NAME')
      this._npcArray.forEach((el)=>{
        if (modelName === el.name) {
          this._scene.remove(el.model)
          this._currentNpc.push(el)
          console.log('MODEL IS REMOVE')
        }
      })
    })
    // this._scene.remove(this._coach.model)
  }

}
