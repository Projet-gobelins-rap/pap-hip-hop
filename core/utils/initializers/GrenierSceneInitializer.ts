import { Initializers } from "~/core/defs";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierScene from "~/core/scene/GrenierScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET } from "../../enums";
import { degToRad } from "three/src/math/MathUtils";
import GrenierSceneConfig from "../../config/grenier-scene/grenier-scene.config";
import { Character } from "../../models/character"

import { Outfitloader } from "../../managers/OutfitLoader"

export default class GrenierSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, grenierSceneStore: grenierSceneStore }, void> {

  public cameraInitialPosition: Vector3
  private _scene: Scene
  init(): void {
    GrenierScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    // this._addLights(true)
    this._registerPresetPositions()
    // this._optimizeScene()
    //this._configGUI()

    GrenierScene.context.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext() {
    // Set canvas dimensions
    this._data.canvas.width = window.innerWidth
    this._data.canvas.height = window.innerHeight
    // this._data.canvas.width = Helpers.getWindowSizes().width
    // this._data.canvas.height = Helpers.getWindowSizes().height

    // Create camera
    const camera = this._createCamera()

    // Create scene
    const scene = this._createScene()

    // Create renderer
    const renderer = this._createRender()

    return new SceneManager({
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: true,
      onRender: (ctx) => {
        // Add interactions points tracking
        // console.log(ctx,'<-- Render')
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
  private _createCamera() {
    const camera = new PerspectiveCamera(
      70,
      this._data.canvas.width / this._data.canvas.height,
      1,
      1000
    )
    camera.position.set(50, 30, -50)
    this.cameraInitialPosition = new Vector3(50, 30, -50)
    camera.rotateX(degToRad(90))

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
    GrenierSceneConfig.cameraPositions.forEach(presetPosition => {
      GrenierScene.context.registerPresetCameraPositions(presetPosition)
    })
  }

  private _addSceneElements() {
    console.log('add scene elements')
    this._addGltfGrenierScene()
  }

  private _addGltfGrenierScene() {
    const grenierScene = AssetsManager.getGltf(GLTF_ASSET.GRENIER).data.scene
    const papy = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data.scene

    grenierScene.position.set(-40, -10, 20)
    grenierScene.scale.set(0.25, 0.25, 0.25)
    grenierScene.rotateY(Math.PI / 2)

    papy.position.set(-50, -10, -20)
    papy.scale.set(4, 4, 4)
    papy.rotateY(Math.PI / 2)
    this._scene.add(papy)

    const loadedCollection = new Outfitloader()
    new Character(papy, 'papy', loadedCollection)

    console.log(grenierScene);

    // this._scene.add(grenierSceneFbx)
    // GrenierScene.context.scene.traverse( child => {
    //
    //   if (child.name ==='socle'){
    //     child.receiveShadow = true
    //   }
    //
    // } );
    const light = new AmbientLight(0xdddddd); // soft white light
    this._scene.add(light);

    this._scene.add(grenierScene)
  }

}
