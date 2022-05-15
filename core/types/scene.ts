import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Clock,
  Intersection,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import SceneManager from "~/core/managers/SceneManager";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Option to create SceneManager
 */
export type SceneManagerOptions = {
  camera: PerspectiveCamera
  canvas: HTMLCanvasElement
  clock?: Clock
  renderer: WebGLRenderer
  scene: Scene
  bindEvents?: DefaultSceneManagerCallback
  defaultRation?: number
  controls:OrbitControls
  activateKeyboard:boolean
  isStarted?:boolean

  onStart?: DefaultSceneManagerCallback
  onResume?: DefaultSceneManagerCallback
  onPause?: DefaultSceneManagerCallback
  onDestroy?: DefaultSceneManagerCallback
  onMouseMoveCanvas?: MouseMoveCanvasCallback
  onWindowResize?: WindowResizeCallback
  onRender?: DefaultSceneManagerCallback
  onRayCasterIntersect?: RayCasterIntersectCallBack

  activateOrbitControl: boolean
}

/**
 * Default callback function for SceneManager
 */
export type DefaultSceneManagerCallback = (context: SceneManager) => void

/**
 * Callback for rayCaster intersection event
 */
export type RayCasterIntersectCallBack = (context: SceneManager, intersects: Array<Intersection>) => void

/**
 * Callback when mouse move on canvas
 */
export type MouseMoveCanvasCallback = (context: SceneManager, event: MouseEvent) => void

/**
 * Callback for SceneManager when windows is resized
 */
export type WindowResizeCallback = (context: SceneManager, event: UIEvent) => void

export type AnimationMixerElement = {
  name: string
  instance: AnimationMixer
}

export type ActiveAnimation = {
  mixerName: string
  animation: AnimationAction
}

export type LucAnimation = {
  idle: AnimationClip,
  muscle: AnimationClip,
  head: AnimationClip,
  down: AnimationClip,
  punch: AnimationClip,
  hello: AnimationClip,
}

export type LucAnimationName = 'idle'|'muscle'|'head'|'down'|'punch'|'hello'
