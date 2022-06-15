import {
  AnimationClip,
  AnimationMixer, AnimationObjectGroup,
  AxesHelper,
  Camera,
  Clock,
  Euler, Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
  LinearToneMapping
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import {
  AnimationMixerElement,
  DefaultSceneManagerCallback,
  MouseMoveCanvasCallback,
  RayCasterIntersectCallBack, SceneManagerOptions,
  WindowResizeCallback
} from "~/core/types/scene";
// import { CameraPosition } from "~/core/config/global-scene/camera-positions/types";
import { gsap } from 'gsap'
import Helpers from "../utils/Helpers";
import { Stats } from 'stats.ts'
import { CameraPosition } from "../config/hood-scene/camera-positions/types";



export default class SceneManager {

  // - PROPERTIES
  private _canvas: HTMLCanvasElement
  private _camera: Camera
  private _controls: OrbitControls | null
  public _presetCameraPositions: Array<CameraPosition>
  private _renderer: WebGLRenderer
  private _composer: EffectComposer | null
  private _clock: Clock
  private _mousePositions: Vector2
  private _scene: Scene
  // private _gui: GUI
  private _rayCaster: Raycaster
  private _stats: Stats | null
  private _defaultRatio: number
  private _currentIntersect: null
  private _keysPressed: Object

  public _hoodTextureEvolution:number = 0

  // Parallax
  private _globalSceneRotation: { x: number, y: number }

  // Animations
  private _animationMixers: Array<AnimationMixerElement>

  // -- Events
  private _onStartCallback: DefaultSceneManagerCallback
  private _onResumeCallback: DefaultSceneManagerCallback
  private _onPauseCallback: DefaultSceneManagerCallback
  private _onDestroyCallback: DefaultSceneManagerCallback
  private _onRenderCallback: Array<DefaultSceneManagerCallback>
  private _onRayCasterIntersectCallback: RayCasterIntersectCallBack
  private _onMouseMoveCanvasCallback: MouseMoveCanvasCallback
  private _onWindowResizeCallback: WindowResizeCallback
  private _bindExternEvents: DefaultSceneManagerCallback

  // -- Clock infos
  private _requestId: undefined | number
  private _deltaTime: number
  private _previousTime: number

  // -- Configuration
  private _isOrbitControlActivated: boolean
  private _isKeyboardActivated: boolean
  private _isPlaying: boolean
  private _isRayCasting: boolean
  private _isStatsActive: boolean
  private _isParallaxActive: boolean
  public _isStarted: boolean | undefined
  private _cameraTimeline: gsap.core.Timeline;
  private _prevCameraPosition: { newCameraPosition: Vector3, lookAtPosition: Vector3 };

  constructor(options: SceneManagerOptions) {

    this._camera = options.camera
    this._presetCameraPositions = []
    this._canvas = options.canvas
    this._clock = options.clock || new Clock()
    this._mousePositions = new Vector2()
    this._renderer = options.renderer
    this._composer = null
    this._scene = options.scene
    this._rayCaster = new Raycaster()
    this._controls = options.controls
    this._keysPressed = options.controls
    this._isStarted = options.isStarted
    this._deltaTime = 0
    this._previousTime = 0


    // this._gui = new GUI()
    this._stats = null
    this._defaultRatio = options.defaultRation || 1
    this._currentIntersect = null
    this._animationMixers = []
    this._globalSceneRotation = { x: 0, y: 0 }

    this._isPlaying = false
    this._isRayCasting = false
    this._isStatsActive = false
    this._isParallaxActive = false

    this._onStartCallback = options.onStart || function () {
    }
    this._onResumeCallback = options.onResume || function () {
    }
    this._onPauseCallback = options.onPause || function () {
    }

    this._onDestroyCallback = options.onDestroy || function () {
    }
    this._onRenderCallback = []
    if (options.onRender) this._onRenderCallback.push(options.onRender)

    this._onRayCasterIntersectCallback = options.onRayCasterIntersect || function () {
    }
    this._bindExternEvents = options.bindEvents || function () {
    }
    this._onMouseMoveCanvasCallback = options.onMouseMoveCanvas || function () {
    }
    this._onWindowResizeCallback = options.onWindowResize || function () {
    }

    this._isOrbitControlActivated = options.activateOrbitControl
    this._isKeyboardActivated = options.activateKeyboard

    this._init()
  }

  // PUBLIC METHODS
  /**
   * Destroy the scene
   */
  public destroy() {
    this._onDestroyCallback(this)
    if (this._requestId) {
      cancelAnimationFrame(this._requestId)
    }
    this._renderer.dispose()
    // @ts-ignore
    this._scene = null
  }

  /**
   * Pause animations of the scene
   */
  public pause() {
    this._onPauseCallback(this)
    this._isPlaying = false
  }

  /**
   * Start animations of the scene
   */
  public start() {
    this._isPlaying = true
    console.log(this._controls);

    this._onStartCallback(this)
    this._tick()
  }

  /**
   * Start animations of the scene
   */
  public resume() {
    this._isPlaying = true
    this._onResumeCallback(this)
    this._tick()
  }

  /**
   * Add renderCallback
   */
  public onRender(renderCallback: DefaultSceneManagerCallback) {
    this._onRenderCallback.push(renderCallback)

    return this
  }

  /**
   * Register preset camera positions
   */
  public registerPresetCameraPositions(position: CameraPosition): SceneManager {
    this._presetCameraPositions.push(position)

    return this
  }

  /**
   * Move the camera to the preset position
   */
  public goToPresetPosition(
    name: string,
    duration: number,
    successCallBack: DefaultSceneManagerCallback = function () {
    },
    errorCallBack: DefaultSceneManagerCallback = function () {
    }
  ) {

    // find camera preset by name
    const presetCameraPosition = this._presetCameraPositions.find(camPos => camPos.name === name)

    // throw error if name not matching with preset or "reset"
    if (!presetCameraPosition && name !== "reset") {
      console.log('Camera preset position is not registered')
      errorCallBack(this)
      return
    }

    // get camera position and target position values
    // in case we going to interaction point, set new positions from preset values and set origin positions
    // if we leave interaction point with "reset" keyword, set new positions from origin positions
    let newCameraPosition, lookAtPosition
    if(presetCameraPosition) {
      newCameraPosition = presetCameraPosition.coords().newCameraPosition
      lookAtPosition = presetCameraPosition.coords().lookAtPosition
      this._prevCameraPosition = {
        newCameraPosition: new Vector3().copy(this._camera.position),
        lookAtPosition: new Vector3().copy(this._controls!.target)
      }
    } else {
      newCameraPosition = this._prevCameraPosition.newCameraPosition
      lookAtPosition = this._prevCameraPosition.lookAtPosition
    }

    // tween on target position
    gsap.to(this._controls!.target, {
      duration: duration,
      x: lookAtPosition.x,
      y: lookAtPosition.y,
      z: lookAtPosition.z,
      ease: "sine.inOut",
    })

    // tween on camera position
    gsap.to(this._camera.position, {
      duration: duration,
      x: newCameraPosition.x,
      y: newCameraPosition.y,
      z: newCameraPosition.z,
      ease: "sine.inOut",
      onComplete: () => {
        successCallBack(this)
      },
      onStart: () => {
        // SoundDesignManager.playSound(AUDIO_ASSET.SWOOSH);
        // this.disableParallax()
      }
    });
  }

  /**
   * Enable orbit control
   */
  public enableOrbitControl() {
    if (this._controls) {
      this._controls.enabled = true
    }

    return this
  }

  /**
   * Disable orbit control
   */
  public disableOrbitControl() {
    if (this._controls) {
      this._controls.enabled = false
    }

    return this
  }

  /**
   * Enable rayCasting detection
   */
  public enableRayCasting() {
    this._isRayCasting = true

    return this
  }

  /**
   * Disable RayCasting detection
   */
  public disableRayCasting() {
    this._isRayCasting = false

    return this
  }

  /**
   * Enable axes helper
   */
  public enableAxesHelpers(size: number = 10) {
    const axesHelper = new AxesHelper(size)
    // axesHelper.setColors(0xff0000,0x00ff00,0x0000ff)
    this._scene.add(axesHelper)

    return this
  }


  /**
   * Enable parallax camera on mouse move
   */
  public enableParallax() {
    this._isParallaxActive = true

    return this
  }

  /**
   * Disable parallax camera on mouse move
   */
  public disableParallax() {
    this._isParallaxActive = false

    return this
  }


  /**
   * Init intern mandatory events
   */
  public _bindEvents() {
    this._bindExternEvents(this)

    document.addEventListener('mousemove', event => {

      this._mousePositions.x = event.clientX / this._canvas.width / 2
      this._mousePositions.y = event.clientY / this._canvas.height / 2
      this._onMouseMoveCanvasCallback(this, event)

      if (this._isParallaxActive) {
        // TODO :: UPDATE LE PARALLAX AVEC GSAP POUR LE RENDRE PLUS SMOOTH
        this._globalSceneRotation.x = Helpers.lerp(this._globalSceneRotation.x, this._mousePositions.x, 0.3)
        this._globalSceneRotation.y = Helpers.lerp(this._globalSceneRotation.y, this._mousePositions.y, 0.3)

        this._scene.rotation.x = - this._globalSceneRotation.y * 0.15
        this._scene.rotation.y = - this._globalSceneRotation.x * 0.3

      }
    })

    window.addEventListener('resize', event => {
      this._onWindowResizeCallback(this, event)
    })
  }

  /**
   * Helper to toggle visible property of objects
   */
  public setObjectVisibility(objectList: Array<string>, visibleObject: string | null = null) {
    objectList.forEach(objectName => {
      this._scene.getObjectByName(objectName)!.visible = (visibleObject) ? objectName === visibleObject : true
    })
  }

  /**
   * Create animationMixer for 3D object
   */
  public createAnimationMixer(name: string, object: Object3D | AnimationObjectGroup) {
    const mixer = new AnimationMixer(object)
    this._animationMixers.push({ name, instance: mixer })
  }

  /**
   * Remove animationMixer for 3D object
   */
  public removeAnimationMixer(name: string) {
    this._animationMixers = this._animationMixers.filter(mixer => mixer.name === name)
  }

  public getAnimationMixer(name: string) {
    const mixer = this._animationMixers.find(mixer => mixer.name === name)
    if (!mixer) {
      throw new Error(`Mixer ${name} doesn't exist !`)
    }

    return mixer
  }

  /**
   * Play animation of specific object and animation mixer
   */
  public generateAnimationAction(animationClip: AnimationClip, mixerName: string, withLoop: boolean = true) {
    const mixer = this.getAnimationMixer(mixerName)
    return mixer.instance.clipAction(animationClip)
  }

   /**
   * Remove object from scene
   */
  public removeObject(name: string) {
    let obj = this._scene.getObjectByName(name)
    console.log(obj);
    this._scene.remove(obj)
    // obj.geometry.dispose();
    // obj.material.dispose();
   }


  // - PRIVATE
  /**
   * Init elements after property binding into constructor
   */
  private _init() {
    this._initRenderer()
    this._initControls()
    this._keyboardHandler()
    this._configStats()
    this._bindEvents()
    this._checkConfig()
  }

  /**
   * Init renderer
   */
  private _initRenderer() {
    this._renderer.setSize(this._canvas.width, this._canvas.height)
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, this._defaultRatio))
    // this._renderer.toneMapping = LinearToneMapping;
  }

  /**
   * Init controls for camera
   */
  private _initControls() {
    if (this._isOrbitControlActivated) {
      this._controls!.enableDamping = true
    }
  }

  private _keyboardHandler() {
    if (this._isKeyboardActivated) {
      this._keysPressed = {}

      document.addEventListener('keydown', (event) => {
        if (event.code == 'Space') {
          (this._keysPressed as any)[event.key.toLowerCase()] = true
        }
        if (event.shiftKey) {
          (this._keysPressed as any)[event.key.toLowerCase()] = true
        } else {
          (this._keysPressed as any)[event.key.toLowerCase()] = true
        }
      }, false);
      document.addEventListener('keyup', (event) => {
        (this._keysPressed as any)[event.key.toLowerCase()] = false
      }, false);
    }

  }

  /**
   * Check configuration and warn weird things
   */
  private _checkConfig() {
    if (!(this._camera instanceof PerspectiveCamera)) {
      console.warn('Your camera is not Perspective Camera')
    }
  }

  private _configStats() {
    this._stats = new Stats();
    this._isStatsActive = true
    this._stats.showPanel(0);
    document.body.appendChild(this._stats.dom);
  }


  /**
   * Update loop of the scene
   */
  private _tick() {
    if (!this._isPlaying) return

    if (this._isStatsActive && this._stats) this._stats.begin()
    this._render()
    if (this._isStatsActive && this._stats) this._stats.end()

    this._requestId = requestAnimationFrame(this._tick.bind(this))
  }

  /**
   * Logic to render the scene (for each frame)
   */
  private _render() {
    const elapsedTime = this._clock.getElapsedTime()
    this._deltaTime = elapsedTime - this._previousTime
    this._previousTime = elapsedTime

    this._onRenderCallback.forEach(renderCallback => {
      renderCallback(this)
    })

    if (this._controls) {
      this._controls.update()
    }

    if (this._isRayCasting) {
      this._rayCaster.setFromCamera(this._mousePositions, this._camera)
      const intersects = this._rayCaster.intersectObjects(this._scene.children, true)
      this._onRayCasterIntersectCallback(this, intersects)
    }

    if (this._camera instanceof PerspectiveCamera) {
      this._camera.updateProjectionMatrix()
    }


    // TODO : remove
    this._animationMixers.forEach(mixer => {
      mixer.instance.update(this._deltaTime)
    })

    if (this._composer) {
      this._composer.render(this._deltaTime)
    } else {
      this._renderer.render(this._scene, this._camera)
    }
    // END TODO : remove

  }

  // - GETTERS
  get camera(): Camera {
    return this._camera
  }

  get clock(): Clock {
    return this._clock
  }

  // get gui(): GUI {
  //   return this._gui
  // }

  get renderer(): WebGLRenderer {
    return this._renderer
  }

  get scene(): Scene {
    return this._scene
  }

  get controls(): any {
    return this._controls
  }

  get keysPressed(): any {
    return this._keysPressed
  }

  get currentIntersect(): any {
    return this._currentIntersect
  }

  get mousePositions(): Vector2 {
    return this._mousePositions
  }

  get deltaTime(): number {
    return this._deltaTime
  }

  get width(): number {
    return this._canvas.width
  }

  get height(): number {
    return this._canvas.height
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  get defaultRatio() {
    return this._defaultRatio
  }

  get globalSceneRotation() {
    return this._globalSceneRotation
  }

  // setters
  set currentIntersect(currentIntersect: any) {
    this._currentIntersect = currentIntersect
  }
}
