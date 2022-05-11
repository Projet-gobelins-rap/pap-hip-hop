import { Initializers } from "~/core/defs";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodScene from "~/core/scene/HoodScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET } from "../../enums";
import SlotsLoader from "../SlotsLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "../../models/player";

export default class HoodSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, hoodSceneStore: hoodSceneStore }, void> {

  private _scene: Scene
  private _controls: OrbitControls
  private _camera: Camera
  public player: Player
  
  init(): void {
    HoodScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    // this._addLights(true)
    // this._registerPresetPositions()
    // this._optimizeScene()
    //this._configGUI()

    HoodScene.context.start()
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
      canvas: this._data.canvas,
      camera: camera,
      controls: controls,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: true,

      onStart: (ctx) => {
        this._controls = ctx.controls
        console.log(ctx.controls);
        
        setTimeout(() => {
          console.log("oui");
        }, 2000);
        if (ctx.isOrbitControlActivated)
          console.log("oui");
      },

      onRender: (ctx) => {
        // Add interactions points tracking
        // console.log(ctx,'<-- Render')

        if(this.player) {
          this.player.update(ctx.deltaTime)
        }
      },
      onResume: (ctx) => {

      },
      onWindowResize: (ctx) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth
        console.log('edrftyguhijokp');
        

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
   * Create gui
   */
  private _configGUI() {
    // let sceneFolder = GrenierScene.context.gui.addFolder("Scene")
    // sceneFolder.add(GrenierScene.context.scene.position, 'x', -500, 500, 0.01).listen()
    // sceneFolder.add(GrenierScene.context.scene.position, 'y', -500, 500, 0.01).listen()
    // sceneFolder.add(GrenierScene.context.scene.position, 'z', -500, 500, 0.01).listen()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    this._camera = new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      1000
    )
    this._camera.position.set(0, 0, 5)

    return this._camera
  }

  /**
   * Create scene
   */
  private _createScene() {
    this._scene = new Scene()
    return this._scene
  }

  /**
   * Create scene
   */
  private _createControls(camera, canvas) {
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

  private _addSceneElements() {
    console.log('add scene elements')

    document.addEventListener('click', () => {
      this.addCube()
    }, { once: true })
  }

  addCube() {

    const playerGltf = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data
    const test = AssetsManager.getGltf(GLTF_ASSET.SLOT_TEST).data.scene
    const tree = AssetsManager.getGltf(GLTF_ASSET.TREE).data.scene
    
    this._scene.add(test);
    test.scale.set(0.25, 0.25, 0.25)

    const g = new BoxGeometry(10, 10, 10)
    const m = new MeshBasicMaterial({ color: 'red' })
    const cube = new Mesh(g, m)

    const treeSlots = test.getObjectByName('Cloner-tree').children
    const otherSlots = test.getObjectByName('Cloner-plot').children

    SlotsLoader.populateSlots(treeSlots, tree)
    SlotsLoader.populateSlots(otherSlots, cube)

    this.player = new Player(playerGltf, 'player', 'tpose', this._camera, this._controls)
    this._scene.add(this.player.model);
  }
}
