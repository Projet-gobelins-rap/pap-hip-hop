import {Initializers} from "~/core/defs";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierScene from "~/core/scene/GrenierScene";
import {SceneManager} from "~/core/managers";
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import Helpers from "~/core/utils/Helpers";

export default class GrenierSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, grenierSceneStore: grenierSceneStore }, void> {

  private _scene:Scene
  init():void {
    GrenierScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    // this._addLights(true)
    // this._registerPresetPositions()
    // this._optimizeScene()
    //this._configGUI()

    GrenierScene.context.start()
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
    const camera = new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      1000
    )
    camera.position.set(0, 0, 5)

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

  private _addSceneElements() {
    console.log('add scene elements')
    this.addCube()
  }

  addCube(){
    // this._scene.
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    this._scene.add( cube );

  }

}
