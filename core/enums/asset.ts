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
  VICTOR_HAIR = 'VICTOR_HAIR',
  NPC_COACH_HEAD= 'NPC_COACH_HEAD',
  NPC_PLAYER_HEAD = 'NPC_PLAYER_HEAD',
  NPC_MOUSSA_HEAD = 'NPC_MOUSSA_HEAD',
  NPC_DEENASTY_HEAD = 'NPC_DEENASTY_HEAD',
  HEAD_BREAKER_A = 'HEAD_BREAKER_A',
  HEAD_BREAKER_B = 'HEAD_BREAKER_B',
  HEAD_BREAKER_C = 'HEAD_BREAKER_C',
  OPPONENT_HEAD = 'OPPONENT_HEAD',
  PLAYER_TICARET_HEAD = 'PLAYER_TICARET_HEAD',
  TREE = 'TREE',
  BITE = 'BITE',
  SLOT_FENCE = 'SLOT_FENCE',
  SLOT_BUSH = 'SLOT_BUSH',
  SLOT_BENCH = 'SLOT_BENCH',
  SLOT_PUBLIC_LIGHT = 'SLOT_PUBLIC_LIGHT',
  SLOT_ELECTRIC_PLOT = 'SLOT_ELECTRIC_PLOT',
  SLOT_BUS = 'SLOT_BUS',
  CITY = 'CITY',

  SLOT_BUILDING_TYPE_1 = 'SLOT_BUILDING_TYPE_1',
  SLOT_BUILDING_TYPE_2 = 'SLOT_BUILDING_TYPE_2',
  SLOT_BUILDING_TYPE_3 = 'SLOT_BUILDING_TYPE_3',
  SLOT_BUILDING_TYPE_4 = 'SLOT_BUILDING_TYPE_4',
  SLOT_TOWER = 'SLOT_TOWER',
  SLOT_TOWER_LG = 'SLOT_TOWER_LG',
  COLLECTABLE_CAMCORDER = 'COLLECTABLE_CAMCORDER',
  COLLECTABLE_WALKMAN = 'COLLECTABLE_WALKMAN',
  COLLECTABLE_BOOMBOX = 'COLLECTABLE_BOOMBOX',
  COLLECTABLE_NOTE = 'COLLECTABLE_NOTE',
  COLLECTABLE_SPRAY = 'COLLECTABLE_SPRAY',
  COLLECTABLE_VINYLE = 'COLLECTABLE_VINYLE',
}

export enum VIDEO_ASSET {
  BATTLE_VIDEO_BACKGROUND = 'BATTLE_VIDEO_BACKGROUND',
  TRANSITION_ROUND_1 = 'TRANSITION_ROUND_1',
  TRANSITION_ROUND_2 = 'TRANSITION_ROUND_2',
  TRANSITION_PAPER_IN = 'TRANSITION_PAPER_IN',
  TRANSITION_PAPER_OUT = 'TRANSITION_PAPER_OUT',
  BATTLE_END_BG_VICTORY = 'BATTLE_END_BG_VICTORY',
  VIDEO_INTRO = 'VIDEO_INTRO',
  BATTLE_END_BG_DEFEAT = 'BATTLE_END_BG_DEFEAT',
  TV_VIDEO = 'TV_VIDEO'
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
  BATTLE_PP_PLAYER = 'BATTLE_PP_PLAYER',
  BATTLE_PP_OPP = 'BATTLE_PP_OPP',
  WALL_TEXTURE_GRAFF = 'WALL_TEXTURE_GRAFF',
  CITY_ROOFTOP = 'CITY_ROOFTOP',
  STICKER_LOCK_ROTATE = 'STICKER_LOCK_ROTATE',
  STICKER_TENUE_01 = 'STICKER_TENUE_01',
  STICKER_TENUE_02 = 'STICKER_TENUE_02',
  STICKER_TENUE_03 = 'STICKER_TENUE_03',
  STICKER_TENUE_04 = 'STICKER_TENUE_04',
}

/**
 * Name given to audio asset in order to retrieve it through AssetManager
 */
export enum AUDIO_ASSET {
  GLOBAL_AMBIANCE = 'globalAmbiance',
  CTA_CLIC = 'CTA_CLIC',
  CTA_HOVER = 'CTA_HOVER',
  CLOCHE_SOUND = 'CLOCHE_SOUND',
}
 
/**
 * Name given to texture assets in order to retrieve it through AssetManager
 */ 
export enum TEXTURE_ASSET {
  COLOR_TEXTURE = 'COLOR_TEXTURE',
  GRENIER_TEXTURE = 'GRENIER_TEXTURE',
  GRENIER_AMBIENT_OCCLUSION = 'GRENIER_AMBIENT_OCCLUSION',
  VICTOR_BODY_TEXTURE = 'VICTOR_BODY_TEXTURE',
  VICTOR_ARMS_TEXTURE = 'VICTOR_ARMS_TEXTURE',
  OPPONENT_BODY_TEXTURE = 'OPPONENT_BODY_TEXTURE',
  OPPONENT_ARMS_TEXTURE = 'OPPONENT_ARMS_TEXTURE',
  PLAYER_TICARET_BODY_TEXTURE = 'PLAYER_TICARET_BODY_TEXTURE',
  PLAYER_TICARET_ARMS_TEXTURE = 'PLAYER_TICARET_ARMS_TEXTURE',
  PLAYER_BODY_TEXTURE = 'PLAYER_BODY_TEXTURE',
  PLAYER_ARMS_TEXTURE = 'PLAYER_ARMS_TEXTURE',
  NPC_DEENASTY_BODY_TEXTURE = 'NPC_DEENASTY_BODY_TEXTURE',
  NPC_FRANCOIS_BODY_TEXTURE = 'NPC_FRANCOIS_BODY_TEXTURE',
  NPC_DAN_BODY_TEXTURE = 'NPC_DAN_BODY_TEXTURE',
  NPC_WUTANG_BODY_TEXTURE = 'NPC_WUTANG_BODY_TEXTURE',
  NPC_WUTANG_ARMS_TEXTURE = 'NPC_WUTANG_ARMS_TEXTURE',
  NPC_MOUSSA_BODY_TEXTURE = 'NPC_MOUSSA_BODY_TEXTURE',
  NPC_MOUSSA_ARMS_TEXTURE = 'NPC_MOUSSA_ARMS_TEXTURE',
  NPC_MOUSSA_LEGS_TEXTURE = 'NPC_MOUSSA_LEGS_TEXTURE',
  NPC_COACH_BODY_TEXTURE = 'NPC_COACH_BODY_TEXTURE',
  ARMS_BREAKER_A_TEXTURE = 'ARMS_BREAKER_A_TEXTURE',
  BODY_BREAKER_A_TEXTURE = 'BODY_BREAKER_A_TEXTURE',
  ARMS_BREAKER_B_TEXTURE = 'ARMS_BREAKER_B_TEXTURE',
  BODY_BREAKER_B_TEXTURE = 'BODY_BREAKER_B_TEXTURE',
  BODY_BREAKER_C_TEXTURE = 'BODY_BREAKER_C_TEXTURE',
  NPC_GENERIC_SHOE = 'NPC_GENERIC_SHOE',
  HAND_SKIN_COLOR = 'HAND_SKIN_COLOR',
  RED_TEXTURE = 'RED_TEXTURE',
  BLUE_JEAN_TEXTURE = 'BLUE_JEAN_TEXTURE',
  // CITY_FLOOR_NORMAL_MAP = 'CITY_FLOOR_NORMAL_MAP',
  // CITY_FLOOR_DISPLACEMENT = 'CITY_FLOOR_DISPLACEMENT',
  SLOT_BUILDING_TYPE_1_TEXTURE = 'SLOT_BUILDING_TYPE_1_TEXTURE',
  SLOT_BUILDING_TYPE_2_TEXTURE = 'SLOT_BUILDING_TYPE_2_TEXTURE',
  SLOT_BUILDING_TYPE_3_TEXTURE = 'SLOT_BUILDING_TYPE_3_TEXTURE',
  SLOT_BUILDING_TYPE_4_TEXTURE = 'SLOT_BUILDING_TYPE_4_TEXTURE',
  SLOT_BUILDING_TYPE_2_NEPAL = 'SLOT_BUILDING_TYPE_2_NEPAL',
  SLOT_TOWER_TEXTURE = 'SLOT_TOWER_TEXTURE',
  SLOT_TOWER_LG_TEXTURE = 'SLOT_TOWER_LG_TEXTURE',
  SLOT_PLOT_TEXTURE = 'SLOT_PLOT_TEXTURE',
  SLOT_BENCH_TEXTURE = 'SLOT_BENCH_TEXTURE',
  SLOT_PUBLIC_LIGHT_TEXTURE = 'SLOT_PUBLIC_LIGHT_TEXTURE',
  SLOT_ELECTRIC_PLOT_TEXTURE = 'SLOT_ELECTRIC_PLOT_TEXTURE',
  SLOT_BUSH_TEXTURE = 'SLOT_BUSH_TEXTURE',
  SLOT_FENCE_TEXTURE = 'SLOT_FENCE_TEXTURE',
  SLOT_TREE_TEXTURE = 'SLOT_TREE_TEXTURE',
  SLOT_BUS_TEXTURE = 'SLOT_BUS_TEXTURE',
  SLOT_PLOT_TEXTURE_V1 = 'SLOT_PLOT_TEXTURE_V1',

  CITY_TEXTURE = 'CITY_TEXTURE',
  CITY_TEXTURE_V1 = 'CITY_TEXTURE_V1',
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
