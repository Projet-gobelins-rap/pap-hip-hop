/**
 * Type of asset
 */
export enum ASSET_TYPE {
  GLTF,
  IMAGE, // 1
  VIDEO, // 2
  AUDIO, // 3
  FBX, // 4
  TEXTURE, // 5
}

/**
 * Name given to gltf asset in order to retrieve it through AssetManager
 */
export enum GLTF_ASSET {
  GLOBAL_SCENE = 'globalScene',
  GRENIER = 'GRENIER',
  HUMANOIDE = 'HUMANOIDE',
  BOB = 'BOB',
  AFRO = 'AFRO',
  SLOT_TEST = 'SLOT_TEST',
  TREE = 'TREE',
  BITE = 'BITE',
  CITY = 'CITY',
  VINYLE = 'VINYLE',
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
  STICKER_RADIO = 'STICKER_RADIO',
  STICKER_FACE = 'STICKER_FACE',
  STICKER_BOOM = 'STICKER_BOOM',
  STICKER_VICTOR = 'STICKER_VICTOR',
  STICKER_ART = 'STICKER_ART',
  PP = 'PP',
}

/**
 * Name given to audio asset in order to retrieve it through AssetManager
 */
export enum AUDIO_ASSET {
  GLOBAL_AMBIANCE = 'globalAmbiance',
}

/**
 * Name given to texture assets in order to retrieve it through AssetManager
 */
export enum TEXTURE_ASSET {
  COLOR_TEXTURE = 'COLOR_TEXTURE',
  GRENIER_TEXTURE = 'GRENIER_TEXTURE',
  GRENIER_NORMAL = 'GRENIER_NORMAL',
}


/**
 * Name given to sprite texture color
 */
export enum TEXTURE_COLOR {
  White = "white",
  Purple = "purple",
  Orange = "orange",
  Green = "green",
}
