<template>
  <div v-if="!isLink">
    <button @click="playAudioOnClick" @mouseenter="playAudioOnHover" class="btn">
      <span class="btn-text">{{ text }}</span>
    </button>
  </div>
  <div v-else>
    <nuxt-link  @click="playAudioOnClick" @mouseenter="playAudioOnHover" class="btn" :to="linkUrl">
      <span class="btn-text">{{ text }}</span>
    </nuxt-link>
  </div>

</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import {AssetsManager} from "../../core/managers";
import {AUDIO_ASSET, VIDEO_ASSET} from "../../core/enums";


@Component({
  components: {},
})
export default class CustomButton extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string;
  @Prop({ type: Boolean, required: false }) readonly isLink!: boolean;
  @Prop({ type: String, required: false }) readonly linkUrl!: string;

  public audioClick:HTMLAudioElement
  public audioHover:HTMLAudioElement

  mounted() {
    this.audioClick = this.$refs.audioClick
    this.audioHover = this.$refs.audioHover
  }

  playAudioOnClick() {
    let audio = new Audio(this.ctaClick);
    audio.play();
  }

  playAudioOnHover() {
    let audio = new Audio(this.ctaHover);
    audio.play();
  }

  get ctaHover():string {
    return AssetsManager.getAudio(AUDIO_ASSET.CTA_HOVER).data.src
  }
  get ctaClick():string {
    return AssetsManager.getAudio(AUDIO_ASSET.CTA_CLIC).data.src
  }
}
</script>
