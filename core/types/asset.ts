import {ASSET_TYPE} from "~/core/enums";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {Group} from "three";

/**
 * Asset source
 */
export type AssetSource = {
  name: string
  url: string
  type: ASSET_TYPE
}

/**
 * Common asset element
 */
export interface AssetElement<DataType> {
  source: AssetSource
  data: DataType
}

/**
 * Image asset element
 */
export interface ImageAsset extends AssetElement<HTMLImageElement>{}

/**
 * Video asset element
 */
export interface VideoAsset extends AssetElement<HTMLVideoElement>{}

/**
 * Gltf asset element
 */
export interface GltfAsset extends AssetElement<GLTF>{}

/**
 * Fbx asset element
 */
export interface FbxAsset extends AssetElement<Group>{}

/**
 * Audio asset element
 */
export interface AudioAsset extends AssetElement<HTMLAudioElement>{}

/**
 * Progress Callback
 */
export type ProgressCallback = (done: number, total: number) => void
