import {Initializers} from "~/core/defs";
import {AssetsManager} from "~/core/managers";
import {AUDIO_ASSET, IMAGE_ASSET, GLTF_ASSET, VIDEO_ASSET} from "~/core/enums";

/**
 * @description
 * This initializer is responsible for initialize AssetManager
 */
export default class AssetManagerInitializer extends Initializers<null, void> {
  init(): void {
    AssetsManager
      // .enableLocalMode()

      // Images
      .registerImage(IMAGE_ASSET.STICKER,'https://images.prismic.io/pap-hip-hop/20000169-7e25-456c-ac2f-857c968751bd_stickers.png?auto=compress,format')
      .registerImage(IMAGE_ASSET.BOOMBOX,'https://images.prismic.io/pap-hip-hop/16da6b17-0244-4087-b984-d4328e79b747_stickers_boombox.png?auto=compress,format')
      // .registerImage()

      // Videos
      // .registerVideo(VIDEO_ASSET.TV_SCREEN, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/fortnite.mp4', 'fortnite.mp4')
      //
      // // Audio
      // .registerAudio(AUDIO_ASSET.GLOBAL_AMBIANCE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/athmos_song.mp3', 'athmos_song.mp3')
      // .registerAudio(AUDIO_ASSET.MOUSE_HOVER, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/mouse_hover_sound.mp3', 'mouse_hover_sound.mp3')
      // .registerAudio(AUDIO_ASSET.SKATE_STICKERS, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/sticker_skate_sound.mp3', 'sticker_skate_sound.mp3')
      // .registerAudio(AUDIO_ASSET.OUTSIDE_AMBIANCE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/outside_abiance_sound.mp3', 'outside_abiance_sound.mp3')
      // .registerAudio(AUDIO_ASSET.GOOD_ANSWER, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/good_answer_sound.mp3', 'good_answer_sound.mp3')
      // .registerAudio(AUDIO_ASSET.BAD_ANSWER, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/bad_answer_sound.mp3', 'bad_answer_sound.mp3')
      // .registerAudio(AUDIO_ASSET.SWOOSH, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/swoosh.mp3', 'swoosh.mp3')
      //
      // // Gltf
      // .registerGltf(GLTF_ASSET.GLOBAL_SCENE, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_globale_bake.gltf", "scene_globale_bake.gltf")
      // .registerGltf(GLTF_ASSET.PAPER, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/bedroom_paper.gltf", "bedroom_paper.gltf")
      // .registerGltf(GLTF_ASSET.SKATE_STICKER, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/sticker.gltf", "sticker.gltf")
      // .registerGltf(GLTF_ASSET.NOTEBOOK, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/carnet.gltf", "carnet.gltf")
      // .registerGltf(GLTF_ASSET.CAT, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/chat.gltf", "chat.gltf")
      // .registerGltf(GLTF_ASSET.PHONE, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/phone.gltf", "phone.gltf")
      // .registerGltf(GLTF_ASSET.CLOUDS, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/clouds.gltf", "clouds.gltf")
      // .registerGltf(GLTF_ASSET.RECORD_PLAYER, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/tourne_disque.gltf", "tourne_disque.gltf")
      // .registerGltf(GLTF_ASSET.COMPUTER, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/ordi.gltf", "ordi.gltf")
      //
      // // Fbx
      // .registerFbx(GLTF_ASSET.TOM, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_idle.fbx", "perso_idle.fbx")
      // .registerFbx(GLTF_ASSET.TOM_MUSCLE, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_good_muscle.fbx", "perso_good_muscle.fbx")
      // .registerFbx(GLTF_ASSET.TOM_DOWN, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_bad_down.fbx", "perso_bad_down.fbx")
      // .registerFbx(GLTF_ASSET.TOM_PUNCH, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_good_poing.fbx", "perso_good_poing.fbx")
      // .registerFbx(GLTF_ASSET.TOM_HEAD, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_bad_1.fbx", "perso_bad_1.fbx")
      // .registerFbx(GLTF_ASSET.TOM_HELLO, "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_salut.fbx", "perso_salut.fbx")
  }
}
