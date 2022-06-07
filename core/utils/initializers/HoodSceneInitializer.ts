import { Initializers } from "~/core/defs";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodScene from "~/core/scene/HoodScene";
import HoodSceneConfig from "../../config/hood-scene/hood-scene.config";
import { AssetsManager, SceneManager } from "~/core/managers";
import { AmbientLight, ArrowHelper, Box3, BoxBufferGeometry, BoxGeometry, Camera, DirectionalLight, DoubleSide, Group, Line3, Matrix4, Mesh, MeshBasicMaterial, MeshMatcapMaterial, Object3D, PerspectiveCamera, Raycaster, Scene, Vector3, WebGLRenderer } from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET } from "../../enums";
import SlotsLoader from "../SlotsLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "../../models/player";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH, MeshBVHVisualizer } from "three-mesh-bvh"
import { Npc } from "../../models/npc";

export default class HoodSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, hoodSceneStore: hoodSceneStore }, void> {

  private _scene: Scene
  private _controls: OrbitControls
  private _camera: PerspectiveCamera
  public player: Player
  public collider: any
  private _collectibles: Group = new Group()
  private _collectibleColliders: Group = new Group()
  private _collectibleCollection: { env: Mesh[], collectibles: Mesh[] | Object3D[] }
  public cameraFollow: boolean = true;

  // private _keysPressed: any

  init(): void {
    HoodScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    this._registerPresetPositions()

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

        if (this.player && this.cameraFollow) {
          this.player.updateControls(ctx.deltaTime, ctx.keysPressed)
          this.handleCollision()

          // let arrow = new ArrowHelper(this.player.raycaster.ray.direction, this.player.raycaster.ray.origin, 8, 0xff0000);
          // ctx.scene.add(arrow);
        }

        for (const point of this._data.hoodSceneStore.activeInteractionPoints) {
            const screenPosition = point.canvasCoords().clone()
            screenPosition.project(HoodScene.context.camera)
            const updateData = {
              name: point.name,
              transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
              transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
            }
            this._data.hoodSceneStore.updatePositionsInteractivePoint(updateData)
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
  * Register preset camera positions
  */
  private _registerPresetPositions() {
    HoodSceneConfig.cameraPositions.forEach(presetPosition => {   
      HoodScene.context.registerPresetCameraPositions(presetPosition)
        console.log(HoodScene.context);
    })
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
 
  addCube() {

    const playerGltf = AssetsManager.getGltf(GLTF_ASSET.HUMANOIDE).data
    const tree = AssetsManager.getGltf(GLTF_ASSET.TREE).data.scene
    const plot = AssetsManager.getGltf(GLTF_ASSET.BITE).data.scene
    const fence = AssetsManager.getGltf(GLTF_ASSET.SLOT_FENCE).data.scene
    const bush = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUSH).data.scene
    const light = AssetsManager.getGltf(GLTF_ASSET.SLOT_PUBLIC_LIGHT).data.scene
    const electricPlot = AssetsManager.getGltf(GLTF_ASSET.SLOT_ELECTRIC_PLOT).data.scene
    const bench = AssetsManager.getGltf(GLTF_ASSET.SLOT_BENCH).data.scene
    const city = AssetsManager.getGltf(GLTF_ASSET.CITY).data.scene
    // const floorNM = AssetsManager.getTexture(TEXTURE_ASSET.CITY_FLOOR_NORMAL_MAP).data
    // const floorDM = AssetsManager.getTexture(TEXTURE_ASSET.CITY_FLOOR_DISPLACEMENT).data
    const vinyle = AssetsManager.getGltf(GLTF_ASSET.VINYLE).data.scene
    const building1 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_1).data.scene
    const building2 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_2).data.scene
    const building3 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_3).data.scene
    const building4 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_4).data.scene

    city.scale.set(0.04, 0.04, 0.04)
    console.log(city);
    this._scene.add(city);

    this._collectibles = city.getObjectByName('group_collec')
    const treeSlots = city.getObjectByName('group_tree').children
    const plotSlots = city.getObjectByName('group_plot').children
    const buildingSlots = city.getObjectByName('group_building').children
    const busSlots = city.getObjectByName('group_bus').children
    const bushSlots = city.getObjectByName('group_bush').children
    const benchSlots = city.getObjectByName('group_bench').children
    const fenceSlots = city.getObjectByName('group_fence').children
    const electricPlotSlots = city.getObjectByName('group_electric_light').children
    const lightSlots = city.getObjectByName('group_public_light').children

    // SlotsLoader.populateSlots(treeSlots, tree, AssetsManager.getTexture(TEXTURE_ASSET.COLOR_TEXTURE).data)
    SlotsLoader.populateSlots(plotSlots, plot, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_PLOT_TEXTURE).data)
    // SlotsLoader.populateSlots(busSlots, tree, AssetsManager.getTexture(TEXTURE_ASSET.COLOR_TEXTURE).data)
    SlotsLoader.populateSlots(bushSlots, bush, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUSH_TEXTURE).data)
    SlotsLoader.populateSlots(benchSlots, bench, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BENCH_TEXTURE).data)
    SlotsLoader.populateSlots(fenceSlots, fence, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_FENCE_TEXTURE).data)
    SlotsLoader.populateSlots(electricPlotSlots, electricPlot, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_ELECTRIC_PLOT_TEXTURE).data)
    SlotsLoader.populateSlots(lightSlots, light, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_PUBLIC_LIGHT_TEXTURE).data)
    SlotsLoader.generateBuilding(buildingSlots, [building1, building2, building3, building4])
    SlotsLoader.generateCollectible(this._collectibles.children)
  
    this._scene.traverse(object => {
      if (object.isMesh) {
        let oldTexture = object.material.map
        object.material = new MeshMatcapMaterial({ color: 0xffffff })
        object.material.map = oldTexture
      }
    })

    // const floor = city.getObjectByName('floor')
    // floor.material.needsUpdate = true;
    // floorDM.flipY = false
    // floorNM.flipY = false
    // floor.material.displacementMap = floorDM
    // floor.material.normalMap = floorNM
    // floor.material.side = DoubleSide

    const eric = new Npc(playerGltf, 'eric', 't-pose')
    eric.model.scale.set(25, 25, 25)
    eric.model.position.set(-0, -100, -0)

    const npc_battle = new Npc(playerGltf, 'battle', 't-pose')
    npc_battle.model.scale.set(25, 25, 25)
    npc_battle.model.position.set(-0, -0, -0)

    const npc_ticaret = new Npc(playerGltf, 'ticaret', 't-pose')
    npc_ticaret.model.scale.set(25, 25, 25)
    npc_ticaret.model.position.set(-0, -0, -0)

    const npc_deenasty = new Npc(playerGltf, 'deenasty', 't-pose')
    npc_deenasty.model.scale.set(25, 25, 25)
    npc_deenasty.model.position.set(-0, -0, -0)

    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_eric"), eric.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_battle"), npc_battle.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_ticaret"), npc_ticaret.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_deenasty"), npc_deenasty.model)

    this.player = new Player(playerGltf, 'player', 't-pose', this._camera, this._controls)

    this._scene.add(this.player.model);

    console.log(city);

    this.bvhCollider(city)
    this.collectiblesCollider()

    // const directionalLight = new DirectionalLight( 0xffffff, 1 );
    // this._scene.add( directionalLight );

  }

  collectiblesCollider() {
    this._collectibles.children.forEach(object => {
      const colliderGeometry = Helpers.generateBoxCollider(object)
      
      const mat = new MeshBasicMaterial({color: 'red', wireframe: true, transparent: true, visible: false})
      const collider = new Mesh(colliderGeometry, mat)
      collider.name = object.name
      this._collectibleColliders.add(collider)
    
    })
    this._scene.add(this._collectibleColliders) 
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

        
        geometries.push(Helpers.generateBoxCollider(object))

        // const mesh = new Mesh(boxGeometry, new MeshBasicMaterial({ wireframe: true }));
        // this._scene.add(mesh)

        // console.log(boxGeometry);
      }
    })
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
    mergedGeometry.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: false });

    // this.collider = new Mesh(mergedGeometry);
    // this.collider.material.wireframe = true;
    // this.collider.material.color.setHex(0x00ff00)
    // this.collider.material.opacity = 0.5;
    // this.collider.material.transparent = true;
    // this._scene.add(this.collider);
 
    this._collectibleCollection = { 
      env: [this.collider],
      collectibles: this._collectibleColliders.children
    }
  }

  lootCollectible(collectible: string) {
    let obj = this._collectibles.getObjectByName(collectible)
    this._collectibles.remove(obj)
    HoodScene.onToastNotify(collectible)
  }

  handleCollision() {
    if (this._collectibleCollection) {
      // const intersectCollision = this.player.raycaster.intersectObjects(this._collectibleCollection.env);
      // if (intersectCollision.length > 0) {
      //   if (intersectCollision[0].distance < 0.8) {
      //     this.player.blocked = true;
      //   } else {
      //     this.player.blocked = false;
      //   }
      // }

      const intersect = this.player.raycaster.intersectObjects(this._collectibleCollection.collectibles);
      if (intersect.length > 0) {
        if (intersect[0].distance < 1) {
          this.lootCollectible(intersect[0].object.name)
        }
      }
    }
  }
}
