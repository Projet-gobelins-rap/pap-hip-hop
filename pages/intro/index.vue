<template>
  <section class="intro">
    <h1 class="intro-title">PAP'HIP HOP</h1>
    <h2 class="intro-subtitle">LE MOUVEMENT OUBLIÉ</h2>
    <img
      v-for="(sticker, idx) in stickerCollection"
      class="intro-sticker"
      :key="`sticker-${idx}`"
      :id="`${sticker.name}`"
      :src="sticker.src"
    />

    <CustomButton
      class="intro-button large"
      @click.native="goToNextStep"
      text="Commencer l'expérience"
    ></CustomButton>
  </section>
</template> 

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import { AssetsManager } from "../../core/managers";
import { IMAGE_ASSET } from "../../core/enums";
import $storage from "../../core/utils/Storage";

@Component({
  components: {
    CustomButton,
  },
})
export default class Intro extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public onboardingData: any;
  public stickers: IMAGE_ASSET[] = [
    IMAGE_ASSET.STICKER_RADIO,
    IMAGE_ASSET.STICKER_FACE,
    IMAGE_ASSET.STICKER_BOOM,
    IMAGE_ASSET.STICKER_VICTOR,
    IMAGE_ASSET.STICKER_ART,
    IMAGE_ASSET.STICKER,
    IMAGE_ASSET.BOOMBOX,
  ];
  public stickerCollection: Array<{ name: string; src: string }> = [];

  mounted() {
    this.getStickers();
  }

  goToNextStep() {
    this.stepStore.setIntroState(true);
    this.$router.push("/grenier");
  }

  getStickers() {
    this.stickers.forEach((sticker: IMAGE_ASSET) => {
      let stickerAsset = AssetsManager.getImage(sticker);
      this.stickerCollection.push({
        name: stickerAsset.source.name,
        src: stickerAsset.data.src,
      });
    });
  }
}
</script> 