/**
 * Type of asset
 */
export enum ASSET_TYPE {
  GLTF,
  IMAGE,
  VIDEO,
  AUDIO,
  FBX
}

/**
 * Name given to gltf asset in order to retrieve it through AssetManager
 */
export enum GLTF_ASSET {
  GLOBAL_SCENE= 'globalScene',
  GRENIER= 'GRENIER',

}

export enum VIDEO_ASSET {
  // TV_SCREEN = 'tvScreen'
}

/**
 * Name given to image asset in order to retrieve it through AssetManager
 */
export enum IMAGE_ASSET {
  STICKER = 'STICKER',
  BOOMBOX = 'BOOMBOX',
}

/**
 * Name given to audio asset in order to retrieve it through AssetManager
 */
export enum AUDIO_ASSET {
  GLOBAL_AMBIANCE = 'globalAmbiance',
}
