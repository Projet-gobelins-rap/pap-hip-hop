import { Initializers } from "~/core/defs";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierScene from "~/core/scene/GrenierScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET } from "../../enums";
import { degToRad } from "three/src/math/MathUtils";
import GrenierSceneConfig from "../../config/grenier-scene/grenier-scene.config";
import { Npc } from "../../models/npc"

import { Outfitloader } from "../../managers/OutfitLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SlotsLoader from "../SlotsLoader";

export default class GrenierSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, grenierSceneStore: grenierSceneStore }, void> {

  public cameraInitialPosition: Vector3
  private _scene: Scene
  private _controls: OrbitControls
  private _papy: Npc

  init(): void {
    GrenierScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    GrenierScene.context.start()
    this._registerPresetPositions()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext() {
    // Set canvas dimensions
    // this._data.canvas.width = window.innerWidth
    // this._data.canvas.height = window.innerHeight
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

      onStart: (ctx) => {
        console.log(this._scene, '<--- scene')
      },

      onRender: (ctx) => {

        // Add interactions points tracking
        if (this._papy) {
          this._papy.update(ctx.deltaTime)
        }

        for (const point of this._data.grenierSceneStore.activeInteractionPoints) {
          const screenPosition = point.canvasCoords().clone()
          screenPosition.project(GrenierScene.context.camera)
          const updateData = {
            name: point.name,
            transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
            transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
          }
          this._data.grenierSceneStore.updatePositionsInteractivePoint(updateData)
        }
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

    console.log(GrenierSceneConfig);
    
    camera.position.copy(GrenierSceneConfig.grenierCameras.initial.newCameraPosition)
    this.cameraInitialPosition = camera.position

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
  private _createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    this._controls = new OrbitControls(camera, canvas)
    this._controls.target = new Vector3(0, 0, 0)
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

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    console.log(GrenierSceneConfig.grenierCameras);
    
    // for (const presetPosition in GrenierSceneConfig.grenierCameras) {
    //   GrenierScene.context.registerPresetCameraPositions(presetPosition)
    // }
  }

  private _addSceneElements() {
    this._addGltfGrenierScene()
  }

  private _addGltfGrenierScene() {
    const grenierScene = AssetsManager.getGltf(GLTF_ASSET.GRENIER).data.scene
    const papyGltf = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data
    const grenierTexture = AssetsManager.getTexture(TEXTURE_ASSET.GRENIER_TEXTURE).data
    // const grenierNormalMap = AssetsManager.getTexture(TEXTURE_ASSET.GRENIER_NORMAL).data
    console.log(grenierScene);
    grenierTexture.flipY = false
    // grenierNormalMap.flipY = false
    grenierScene.getObjectByName("grenier").material.map = grenierTexture
    // grenierScene.getObjectByName("grenier").material.normalMap = grenierNormalMap

    grenierScene.position.set(-40, -10, 40)
    grenierScene.scale.set(0.25, 0.25, 0.25)
    grenierScene.rotateY(Math.PI / 2)
    this._scene.add(grenierScene)

    this._papy = new Npc(papyGltf, 'papy', 'tpose')
    this._papy.model.scale.set(17, 17, 17)
    this._papy.model.position.set(-0, -0, -0)
    SlotsLoader.populateSingleSlots(grenierScene.getObjectByName("npc_victor"), this._papy.model)

    this._scene.traverse(object => {
      if (object.isMesh) {
        let oldTexture = object.material.map
        object.material = new MeshBasicMaterial({ color: 0xffffff })
        object.material.map = oldTexture
      }
    })
  }
}