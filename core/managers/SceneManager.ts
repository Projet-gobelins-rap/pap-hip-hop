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
  WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {
  AnimationMixerElement,
  DefaultSceneManagerCallback,
  MouseMoveCanvasCallback,
  RayCasterIntersectCallBack, SceneManagerOptions,
  WindowResizeCallback
} from "~/core/types/scene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {gsap} from 'gsap'
export default class SceneManager{

  // - PROPERTIES
  private _canvas: HTMLCanvasElement
  private _camera: Camera
  private _controls: OrbitControls | null
  private _presetCameraPositions: Array<CameraPosition>
  private _renderer: WebGLRenderer
  private _composer: EffectComposer | null
  private _clock: Clock
  private _mousePositions: Vector2
  private _scene: Scene
  // private _gui: GUI
  private _rayCaster: Raycaster
  // private _stats: Stats | null
  private _defaultRatio: number
  private _currentIntersect: null

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
  private _isPlaying: boolean
  private _isRayCasting: boolean
  private _isStatsActive: boolean
  private _isParallaxActive: boolean

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
    this._controls = null
    this._deltaTime = 0
    this._previousTime = 0
    // this._gui = new GUI()
    // this._stats = null
    this._defaultRatio = options.defaultRation || 1
    this._currentIntersect = null
    this._animationMixers = []
    // this._globalSceneRotation = {x: 0, y: 0}

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
    const presetCameraPosition = this._presetCameraPositions.find(camPos => camPos.name === name)

    if (!presetCameraPosition) {
      errorCallBack(this)
      return
    }

    const { cameraPos: newCameraPosition, lookAtPosition } = presetCameraPosition.coords()

    const originPosition = new Vector3().copy(this._camera.position);
    const originRotation = new Euler().copy(this._camera.rotation);

    this._camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
    this._camera.lookAt(lookAtPosition);
    const destinationRotation = new Euler().copy(this._camera.rotation)

    this._camera.position.set(originPosition.x, originPosition.y, originPosition.z);
    this._camera.rotation.set(originRotation.x, originRotation.y, originRotation.z);

    gsap.to(this._camera.position, {
      duration,
      x: newCameraPosition.x,
      y: newCameraPosition.y,
      z: newCameraPosition.z,
      ease: "sine.inOut",
      onComplete: () => {
        // this.enableParallax()
        successCallBack(this)
      },
      onStart: () => {
        // SoundDesignManager.playSound(AUDIO_ASSET.SWOOSH);
        // this.disableParallax()
      }
    });
    gsap.to(this._camera.rotation, {
      duration,
      x: destinationRotation.x,
      y: destinationRotation.y,
      z: destinationRotation.z,
      ease: "sine.inOut",
    })
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
    this._scene.add(axesHelper)

    return this
  }

  /**
   * Init intern mandatory events
   */
  public _bindEvents() {
    this._bindExternEvents(this)

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

  // - PRIVATE
  /**
   * Init elements after property binding into constructor
   */
  private _init() {
    this._initRenderer()
    this._initControls()

    this._bindEvents()

    this._checkConfig()
  }

  /**
   * Init renderer
   */
  private _initRenderer() {
    this._renderer.setSize(this._canvas.width, this._canvas.height)
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, this._defaultRatio))
  }

  /**
   * Init controls for camera
   */
  private _initControls() {
    if (this._isOrbitControlActivated) {
      this._controls = new OrbitControls(this._camera, this._canvas)
      this._controls.enableDamping = true
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

  /**
   * Update loop of the scene
   */
  private _tick() {
    if (!this._isPlaying) return

    // if (this._isStatsActive && this._stats) this._stats.begin()
    this._render()
    // if (this._isStatsActive && this._stats) this._stats.end()

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

    this._animationMixers.forEach(mixer => {
      mixer.instance.update(this._deltaTime)
    })


    if (this._composer){
      this._composer.render(this._deltaTime)
    } else {
      this._renderer.render(this._scene, this._camera)
    }

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

  // get globalSceneRotation() {
  //   return this._globalSceneRotation
  // }

  // setters
  set currentIntersect(currentIntersect: any) {
    this._currentIntersect = currentIntersect
  }

}
