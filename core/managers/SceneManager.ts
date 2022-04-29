import {
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  Camera,
  Clock,
  Euler,
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

  _init() {

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

}
