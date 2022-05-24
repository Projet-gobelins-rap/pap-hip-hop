import { Initializers } from "~/core/defs";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodScene from "~/core/scene/HoodScene";
import { AssetsManager, SceneManager } from "~/core/managers";
import { AmbientLight, ArrowHelper, Box3, BoxBufferGeometry, BoxGeometry, Camera, Group, Line3, Matrix4, Mesh, MeshBasicMaterial, MeshMatcapMaterial, Object3D, PerspectiveCamera, Raycaster, Scene, Vector3, WebGLRenderer } from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET } from "../../enums";
import SlotsLoader from "../SlotsLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "../../models/player";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH, MeshBVHVisualizer } from "three-mesh-bvh"

export default class HoodSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, hoodSceneStore: hoodSceneStore }, void> {

  private _scene: Scene
  private _controls: OrbitControls
  private _camera: PerspectiveCamera
  public player: Player
  public collider: any
  private _collectibles: Group = new Group()
  private _collectibleCollection: {env: Mesh[], collectibles: Mesh[] | Object3D[]}

  // private _keysPressed: any

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
      activateKeyboard: true,

      onStart: (ctx) => {
        this._controls = ctx.controls
        ctx._isStarted = true
      },

      onRender: (ctx) => {
        // Add interactions points tracking
        // console.log(ctx,'<-- Render')

        if (this.player) {
          this.player.updateControls(ctx.deltaTime, ctx.keysPressed)
          this.handleCollision()

          // let arrow = new ArrowHelper(this.player.raycaster.ray.direction, this.player.raycaster.ray.origin, 8, 0xff0000);
          // ctx.scene.add(arrow);
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
  private _createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
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
    const tree = AssetsManager.getGltf(GLTF_ASSET.TREE).data.scene
    const plot = AssetsManager.getGltf(GLTF_ASSET.BITE).data.scene
    const city = AssetsManager.getGltf(GLTF_ASSET.CITY).data.scene
    const vinyle = AssetsManager.getGltf(GLTF_ASSET.VINYLE).data.scene

    this._scene.add(city);
    this._collectibles.add(vinyle);
    this._scene.add(this._collectibles);

    city.scale.set(0.04, 0.04, 0.04)
    vinyle.position.z = -10
    vinyle.position.y = 3

    console.log(vinyle);

    console.log(city);
    
    const treeSlots = city.getObjectByName('bites').children
    const plotSlots = city.getObjectByName('trees').children
    // const treeSlots = city.getObjectByName('cloner_tree').children
    // const plotSlots = city.getObjectByName('cloner_bite').children

    SlotsLoader.populateSlots(treeSlots, tree)
    SlotsLoader.populateSlots(plotSlots, plot)

    this.player = new Player(playerGltf, 'player', 'tpose', this._camera, this._controls)

    this._scene.add(this.player.model);

    this._scene.traverse(object => {
      if (object.isMesh) {
        let oldTexture = object.material.map
        object.material = new MeshMatcapMaterial({ color: 0xffffff })
        object.material.map = oldTexture
      }
    })
    this.bvhCollider(city)
    document.addEventListener('click', () => {
      console.clear()
      console.log(vinyle);
      console.log(this.player.model);
      
      // vinyle.material.dispose()
      // vinyle.geometry.dispose()
      this._collectibles.remove(this._collectibles.getObjectByName('VINYLE'))
      this._scene.remove(this.player.model)
    })

  }

  bvhCollider(env) {
    const params = {
      displayCollider: true,
      displayBVH: true,
      visualizeDepth: 10,
    };

    const geometries: BoxBufferGeometry[] = [];
    env.updateMatrixWorld(true);

    env.traverse(object => {
      if (object.type == "Mesh") {

        const box3 = new Box3();
        box3.setFromObject(object)

        const dimensions = new Vector3().subVectors(box3.max, box3.min);
        const boxGeometry = new BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);

        const matrix = new Matrix4().setPosition(dimensions.addVectors(box3.min, box3.max).multiplyScalar(0.5));
        boxGeometry.applyMatrix4(matrix);

        for (const key in boxGeometry.attributes) {
          if (key !== 'position') {
            boxGeometry.deleteAttribute(key);
          }
        }
        geometries.push(boxGeometry)

        // const mesh = new Mesh(boxGeometry, new MeshBasicMaterial({ wireframe: true }));
        // this._scene.add(mesh)

        // console.log(boxGeometry);
      }
    })
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
    mergedGeometry.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: false });

    this.collider = new Mesh(mergedGeometry);
    this.collider.material.wireframe = true;
    this.collider.material.color.setHex(0x00ff00)
    this.collider.material.opacity = 0.5;
    this.collider.material.transparent = true;
    this._scene.add(this.collider);

    this._collectibleCollection = {
      env: [this.collider],
      collectibles: this._collectibles.children
    }
  }

  lootCollectible(collectible: string) {
    let obj = this._collectibles.getObjectByName(collectible)
    this._collectibles.remove(obj)
    HoodScene.onToastNotify(collectible)
  }

  handleCollision() {
    if(this._collectibleCollection) {
      const intersectCollision = this.player.raycaster.intersectObjects(this._collectibleCollection.env);
      if (intersectCollision.length > 0) {
        if (intersectCollision[0].distance < 0.8) {
          this.player.blocked = true;
        } else {
          this.player.blocked = false;
        }
      }
      const intersect = this.player.raycaster.intersectObjects(this._collectibleCollection.collectibles);
      if (intersect.length > 0) {
        if (intersect[0].distance < 0.8) {
          this.lootCollectible(intersect[0].object.name)
        }
      }
    }
  }
}
