import { Initializers } from "~/core/defs";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierScene from "~/core/scene/GrenierScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial, OrthographicCamera,
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

export default class BattleSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, battleStore: battleStore }, void> {

  public cameraInitialPosition: Vector3
  private _scene: Scene
  private _controls: OrbitControls
  private _papy: Npc
  init(): void {

    BattleScene.setSceneContext(this._createSceneContext())

    this._addSceneElements()

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
        if (this._papy) {
          this._papy.update(ctx.deltaTime)
        }
        // console.log(camera.position)
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

  // width / - 2, width / 2, height / 2, height / - 2, 1, 1000
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
    // this._controls.target = GrenierSceneConfig.cameraPositions[0].coords().lookAtPosition
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
    this._addGltfGrenierScene()
  }

  private _addGltfGrenierScene() {
    const papyGltf = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data


    console.log(papyGltf);

    this._scene.traverse(object => {
      if (object.isMesh) {
        let oldTexture = object.material.map
        object.material = new MeshBasicMaterial({ color: 0xffffff })
        object.material.map = oldTexture
      }
    })

    this._papy = new Npc(papyGltf, 'papy', 't-pose')
    this._papy.model.scale.set(50, 50, 50)
    this._papy.model.position.set(20, -330, -0)
    this._papy.model.rotateY(degToRad(180))
    this._scene.add(this._papy.model)
    // SlotsLoader.populateSingleSlots(grenierScene.getObjectByName("npc_victor"), this._papy.model)
  }

}
