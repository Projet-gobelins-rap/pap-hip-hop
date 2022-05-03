/**
 * Type of asset
 */
export enum ASSET_TYPE {
  GLTF,
  IMAGE,
  VIDEO,
  FBX,
  AUDIO
}

/**
 * Name given to gltf asset in order to retrieve it through AssetManager
 */
export enum GLTF_ASSET {
  GLOBAL_SCENE= 'globalScene',
  CLOUD_LITTLE = 'cloudLittle',
  CLOUD_BIG = 'cloudBig',
  OUTSIDE = 'outside',
  PAPER = 'paper',
  SKATE_STICKER = 'skateSticker',
  NOTEBOOK = 'notebook',
  CAT = 'cat',
  PHONE = 'phone',
  CLOUDS = 'clouds',
  RECORD_PLAYER = 'recordPlayer',
  COMPUTER = 'computer',

  TOM = 'tom',
  TOM_MUSCLE = 'tomMuscle',
  TOM_DOWN = 'tomBadDown',
  TOM_HEAD = 'tomHead',
  TOM_PUNCH = 'tomPunch',
  TOM_HELLO= 'tomHello',
}

export enum VIDEO_ASSET {
  TV_SCREEN = 'tvScreen'
}

/**
 * Name given to image asset in order to retrieve it through AssetManager
 */
export enum IMAGE_ASSET {

}

/**
 * Name given to audio asset in order to retrieve it through AssetManager
 */
export enum AUDIO_ASSET {
  GLOBAL_AMBIANCE = 'globalAmbiance',
  MOUSE_HOVER = 'mouseHover',
  SKATE_STICKERS = 'skateSticker',
  OUTSIDE_AMBIANCE= 'outsideAmbiance',
  GOOD_ANSWER = 'goodAnswer',
  BAD_ANSWER = 'badAnswer',
  SWOOSH = 'swoosh',
}
