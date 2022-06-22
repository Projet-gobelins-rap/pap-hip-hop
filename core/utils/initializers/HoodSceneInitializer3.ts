import { Initializers } from "~/core/defs";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodScene from "~/core/scene/HoodScene";
import HoodSceneConfig from "../../config/hood-scene/hood-scene.config";
import { AssetsManager, SceneManager } from "~/core/managers";
import { AmbientLight, ArrowHelper, Box3, BoxBufferGeometry, BoxGeometry, Camera, DirectionalLight, DoubleSide, Group, Line3, Matrix4, Mesh, MeshBasicMaterial, MeshMatcapMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, Vector3, VideoTexture, WebGLRenderer } from "three";
import Helpers from "~/core/utils/Helpers";
import { GLTF_ASSET, TEXTURE_ASSET, VIDEO_ASSET } from "../../enums";
import SlotsLoader from "../SlotsLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "../../models/player";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH, MeshBVHVisualizer } from "three-mesh-bvh"
import { Npc } from "../../models/npc";

export default class HoodSceneInitializer3 extends Initializers<{ canvas: HTMLCanvasElement, hoodSceneStore: hoodSceneStore }, void> {

  private _scene: Scene
  private _controls: OrbitControls
  private _camera: PerspectiveCamera
  public player: Player
  public collider: any
  private _collectibles: Group = new Group()
  private _collectibleColliders: Group = new Group()
  private _collectibleCollection: { env: Mesh[], collectibles: Mesh[] | Object3D[] }
  public cameraFollow: boolean = true;
  public ground: Mesh;
  public npcArray: Npc[] = []

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
        
        this._collectibles.children.forEach(object => {
          object.children[1].position.y = 6 + Math.sin(ctx.clock.getElapsedTime() * 3) * 4
          object.children[1].rotation.y += ctx.deltaTime * 0.5
        })


        if (this.npcArray.length > 0) {
          this.npcArray.forEach((npc: Npc) => {
            npc.update(ctx.deltaTime)
          })
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
      12,
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
    const bus = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUS).data.scene
    const light = AssetsManager.getGltf(GLTF_ASSET.SLOT_PUBLIC_LIGHT).data.scene
    const electricPlot = AssetsManager.getGltf(GLTF_ASSET.SLOT_ELECTRIC_PLOT).data.scene
    const bench = AssetsManager.getGltf(GLTF_ASSET.SLOT_BENCH).data.scene
    const city = AssetsManager.getGltf(GLTF_ASSET.CITY).data.scene.clone()
    // const floorNM = AssetsManager.getTexture(TEXTURE_ASSET.CITY_FLOOR_NORMAL_MAP).data
    // const floorDM = AssetsManager.getTexture(TEXTURE_ASSET.CITY_FLOOR_DISPLACEMENT).data
    const building1 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_1).data.scene
    const building2 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_2).data.scene
    const building3 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_3).data.scene
    const building4 = AssetsManager.getGltf(GLTF_ASSET.SLOT_BUILDING_TYPE_4).data.scene
    const tower1 = AssetsManager.getGltf(GLTF_ASSET.SLOT_TOWER).data.scene
    const tower2 = AssetsManager.getGltf(GLTF_ASSET.SLOT_TOWER_LG).data.scene

    city.scale.set(0.04, 0.04, 0.04)
    console.log(city);
    this._scene.add(city);

    const treeSlots = city.getObjectByName('group_tree').children
    const plotSlots = city.getObjectByName('group_plot').children
    const buildingSlots = city.getObjectByName('group_building').children
    const busSlots = city.getObjectByName('group_bus').children
    const bushSlots = city.getObjectByName('group_bush').children
    const benchSlots = city.getObjectByName('group_bench').children
    const fenceSlots = city.getObjectByName('group_fence').children
    const electricPlotSlots = city.getObjectByName('group_electric_light').children
    const lightSlots = city.getObjectByName('group_public_light').children
    const tower1Slots = city.getObjectByName('slot_tower')
    const tower2Slots = city.getObjectByName('slot_tower_lg')
    this.ground = city.getObjectByName('CITY_a_baked1')

    SlotsLoader.populateSlots(treeSlots, tree, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_TREE_TEXTURE).data)
    
    SlotsLoader.populateSlots(plotSlots, plot, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_PLOT_TEXTURE).data)
    SlotsLoader.populateSlots(busSlots, bus, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUS_TEXTURE).data)
    SlotsLoader.populateSlots(bushSlots, bush, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BUSH_TEXTURE).data)
    SlotsLoader.populateSlots(benchSlots, bench, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_BENCH_TEXTURE).data)
    SlotsLoader.populateSlots(fenceSlots, fence, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_FENCE_TEXTURE).data)
    SlotsLoader.populateSlots(electricPlotSlots, electricPlot, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_ELECTRIC_PLOT_TEXTURE).data)
    SlotsLoader.populateSlots(lightSlots, light, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_PUBLIC_LIGHT_TEXTURE).data)
 
    SlotsLoader.generateBuilding(buildingSlots, [building1, building2, building3, building4], true)
    SlotsLoader.populateSingleSlots(tower1Slots, tower1, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_TOWER_TEXTURE).data)
    SlotsLoader.populateSingleSlots(tower2Slots, tower2, AssetsManager.getTexture(TEXTURE_ASSET.SLOT_TOWER_LG_TEXTURE).data)
    SlotsLoader.generateCollectible(this._collectibles.children)

    const plane = new PlaneGeometry(32, 18)
    const screen = new Mesh(plane)
    screen.position.set(-69, 20, -65)
    
    screen.rotateY(9 * Math.PI /16)
    console.log(screen);
    this._scene.add(screen);

    this._scene.traverse(object => {
      if (object.isMesh) {
        let oldTexture = object.material.map
        object.material = new MeshMatcapMaterial({ color: 0xffffff })
        object.material.map = oldTexture
      }
    })

    this.addScreen(screen)

    const npc_eric = new Npc(playerGltf, 'eric', 't-pose')
    npc_eric.model.scale.set(25, 25, 25)
    npc_eric.model.rotateY(-Math.PI / 2)
    this.npcArray.push(npc_eric)

    const npc_battle = new Npc(playerGltf, 'coach', 't-pose')
    npc_battle.model.scale.set(25, 25, 25)
    npc_battle.model.rotateY(-Math.PI / 2)
    this.npcArray.push(npc_battle)

    const npc_victor = new Npc(playerGltf, 'papy', 't-pose')
    npc_victor.model.scale.set(25, 25, 25)
    npc_victor.model.rotateY(Math.PI / 2)
    this.npcArray.push(npc_victor)

    const npc_opponent = new Npc(playerGltf, 'opponent', 't-pose')
    npc_opponent.model.scale.set(25, 25, 25)
    npc_opponent.model.rotateY(-Math.PI / 2)
    this.npcArray.push(npc_opponent)

    const npc_francois = new Npc(playerGltf, 'francois', 't-pose')
    npc_francois.model.scale.set(25, 25, 25)
    npc_francois.model.rotateY(Math.PI / 2)
    this.npcArray.push(npc_francois)

    // const npc_battle = new Npc(playerGltf, 'battle', 't-pose')
    // npc_battle.model.scale.set(25, 25, 25)

    // const npc_ticaret = new Npc(playerGltf, 'ticaret', 't-pose')
    // npc_ticaret.model.scale.set(25, 25, 25)

    // const npc_deenasty = new Npc(playerGltf, 'deenasty', 't-pose')
    // npc_deenasty.model.scale.set(25, 25, 25)

    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_eric_end"), npc_eric.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_victor_end"), npc_victor.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_coach_end"), npc_battle.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_opponent_end"), npc_opponent.model)
    SlotsLoader.populateSingleSlots(city.getObjectByName("npc_francois_end"), npc_francois.model)
 
    this.player = new Player(playerGltf, 'player', 't-pose', this._camera, this._controls)

    this._scene.add(this.player.model);
    this.player.changeOutfit('player')
    this.player.model.position.set(2, 0.75, 11)
    this.player.model.rotation.y -= 2 * Math.PI / 3

    this.addTexture(this.ground, AssetsManager.getTexture(TEXTURE_ASSET.CITY_TEXTURE_V1).data)

    this.bvhCollider(city)

    this._collectibles = city.getObjectByName('group_collectable')
    SlotsLoader.generateCollectible(this._collectibles.children)
    
    this.collectiblesCollider()

    // const directionalLight = new DirectionalLight( 0xffffff, 1 );
    // this._scene.add( directionalLight );
  }

  addTexture(mesh: Mesh, texture: any) {
      console.log(texture);
      
      texture.flipY = false
      mesh.material.map = texture
  }

  addScreen(screen) {
    const videoScreen = AssetsManager.getVideo(VIDEO_ASSET.HIP_HOP_360).data
    videoScreen.play()
    videoScreen.loop = true
    videoScreen.muted = true

    const videoTexture = new VideoTexture(videoScreen)
    
   
    videoTexture.needsUpdate = true;
    screen.material.map = videoTexture
    screen.rotateY(-Math.PI /2)
    
  }

  collectiblesCollider() {
    this._collectibles.children.forEach(object => {
      const colliderGeometry = Helpers.generateBoxCollider(object)
      const mat = new MeshBasicMaterial({color: 'red', wireframe: true, visible: false})
      const collider = new Mesh(colliderGeometry, mat)
      collider.name = object.name
      console.log(collider.name);
      
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

    this.collider = new Mesh(mergedGeometry);
    this.collider.material.visible = false
    // this.collider.material.wireframe = true;
    // this.collider.material.color.setHex(0x00ff00)
    // this.collider.material.opacity = 0.5;
    // this.collider.material.transparent = true;
    this._scene.add(this.collider);

    this._collectibleCollection = {
      env: [this.collider, this.ground],
      collectibles: this._collectibleColliders.children
    }
  }

  lootCollectible(collectible: string) {
    let obj = this._collectibles.getObjectByName(collectible)
    this._collectibles.remove(obj)
    let collider = this._collectibleColliders.getObjectByName(collectible)
    this._collectibleColliders.remove(collider)
    HoodScene.onToastNotify(collectible)
  }

  handleCollision() {
    if (this._collectibleCollection) {
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
        if (intersect[0].distance < 1) {
          this.lootCollectible(intersect[0].object.name)
          console.log(intersect[0].object.name);
          
        }
      }
    }
  }
}
