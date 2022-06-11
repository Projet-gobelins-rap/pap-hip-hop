import { Initializers } from "~/core/defs";
import { AssetsManager, SceneManager } from "~/core/managers";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial, Object3D, OrthographicCamera,
  PerspectiveCamera, Plane, Raycaster,
  Scene, Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET, VIDEO_ASSET } from "../../enums";
import { degToRad } from "three/src/math/MathUtils";
import { Npc } from "../../models/npc"

import { Outfitloader } from "../../managers/OutfitLoader"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import SlotsLoader from "../SlotsLoader";
import battleStore from "../../../store/battleStore";
import BattleScene from "../../scene/BattleScene";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
//@ts-ignore
import emitter from 'tiny-emitter/instance'

export default class BattleSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, battleStore: battleStore }, void> {

  public cameraInitialPosition: Vector3
  private _scene: Scene
  private _camera: PerspectiveCamera
  private _controls: OrbitControls
  private _humanoid:GLTF = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data
  private _coach: Npc
  private _opponent: Npc
  private _player: Npc

  public _npcArray:Array<Npc> = []
  private _currentNpc:Array<Npc> = []

  private _raycaster:Raycaster = new Raycaster();
  private _corner:Vector2 = new Vector2();
  private _cornerPoint:Vector3 = new Vector3();
  private _plane:Plane = new Plane().setFromNormalAndCoplanarPoint(new Vector3(0, -330, 1), new Vector3(0, -330, 1));


  init(): void {

    // TRICKS pour que l'event battle::initNpcs soit catch par le template vue.js
     new Promise((resolve, reject)=>{
       BattleScene.setSceneContext(this._createSceneContext())
       this._addSceneElements()

       this._addObjectToScene()
       this._disposeObject()
       BattleScene.context.start()
       resolve()
    }).then(()=>{
       this.setupNpc()
     })

  }

  setupNpc():void {
    emitter.emit('battle::initNpcs',this._npcArray)
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext():SceneManager {
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


          if (el.name === 'opponent' ){
            this._corner.set(-0.5, -0.5); // NDC of the bottom-left corner
            this._raycaster.setFromCamera(this._corner, this._camera);
            this._raycaster.ray.intersectPlane(this._plane, this._cornerPoint);
            el.model.position.copy(this._cornerPoint).add(new Vector3(1, -430, -1));
            // console.log('OPPONENT')
          }
          if (el.name === 'player' ){
            this._corner.set(0.5, -0.5); // NDC of the bottom-left corner
            this._raycaster.setFromCamera(this._corner, this._camera);
            this._raycaster.ray.intersectPlane(this._plane, this._cornerPoint);
            el.model.position.copy(this._cornerPoint).add(new Vector3(1, -430, -1));
            // console.log('PLAYEER')
          }

          // console.log('render')
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

  private _createCamera():PerspectiveCamera {
    this._camera = new PerspectiveCamera(
      70,
      this._data.canvas.width / this._data.canvas.height,
      1,
      1000
    )

    this._camera.position.z = -280

    return this._camera
  }

  /**
   * Create scene
   */
  private _createScene():Scene {
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
  private _createRender():WebGLRenderer {
    return new WebGLRenderer({
      canvas: this._data.canvas,
      antialias: true,
      alpha: true,
      // powerPreference: 'high-performance'
    })
  }

  private _addSceneElements():void {
    console.log('add scene elements')
    this._registerNpcs()
    this._registerGltfCoach()
    this._registerGltfPlayer()
    this._registerGltfOpponent()
  }

  /**
   * This function creates three new Npc objects, and pushes them into the _npcArray
   */
  private _registerNpcs():void {
    this._coach = new Npc(this._humanoid, 'coach', 't-pose')
    this._player = new Npc(this._humanoid, 'player', 't-pose')
    this._opponent = new Npc(this._humanoid, 'opponent', 't-pose')

    this._npcArray.push(this._coach,this._player,this._opponent)
    console.log(this._npcArray,'NPCs ARRAY')
  }

  private _registerGltfCoach():void {

    this._coach.model.scale.set(50, 50, 50)
    this._coach.model.position.set(20, -330, -0)
    this._coach.model.rotateY(degToRad(180))
    console.log(this._coach.model,'QQ')
    console.log(this._coach.model.getObjectByName('head_coach'),'VVVVV')
    this._scene.add(this._coach.model)
    this._currentNpc.push(this._coach)
  }

  private _registerGltfPlayer():void {
    this._player.model.scale.set(120, 120, 120)
    this._player.model.position.set(20, -330, -0)
    this._player.model.rotateY(degToRad(130))
    this._player.animationPlayed = 'rap'
  }

  private _registerGltfOpponent():void {
    this._opponent.model.scale.set(120, 120, 120)
    this._opponent.model.position.set(20, -330, -0)
    this._opponent.model.rotateY(degToRad(-130))
    this._opponent.animationPlayed = 'rap'
  }


  /**
   * It adds an object to the scene.
   */
  private _addObjectToScene():void {
    emitter.on('battle::addObject',(modelName:string)=>{
      this._npcArray.forEach((el)=>{
        if (modelName === el.name) {
          console.log(el,'OBJECT ELEMENT')
          this._scene.add(el.model)
          this._currentNpc.push(el)
        }
      })
    })
  }

  /**
   * It's a function that listen to an event and when the event is triggered, it will remove the model from the scene.
   */
  private _disposeObject():void {
    emitter.on('battle::disposeObject',(modelName:string)=>{
      console.log("EVENT EST PASSER !")
      console.log(modelName,'<-- MODEL - NAME')
      this._npcArray.forEach((el)=>{
        if (modelName === el.name) {
          el.removeCharacter(this._scene,el.model)
          this._currentNpc.shift()
          console.log(this._currentNpc,'NPC ARRAY')
          console.log('MODEL IS REMOVE')
          console.log(this._scene,'<--- updated scene')
        }
      })
    })
  }

}
