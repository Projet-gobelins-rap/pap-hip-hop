<template>
  <div class="transition-overlay">
    <video
      v-if="globalStore.isAppInit"
      class="transition-overlayVideo transition-overlayVideoIn"
      ref="transitionInElement"
      :src="transitionIn"
    ></video>
    <video
      v-if="globalStore.isAppInit"
      class="battle-transitionVideo transition-overlayVideoOut"
      ref="transitionOutElement"
      :src="transitionOut"
    ></video>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import {AssetsManager} from "../../core/managers";
import {VIDEO_ASSET} from "../../core/enums";
import loaderStore from "../../store/loaderStore";
import globalStore from "../../store/globalStore";
@Component({
  components: {

  },
})
export default class TransitionOverlay extends Vue {
  public globalStore = getModule(globalStore, this.$store);
  public loaderStore = getModule(loaderStore, this.$store);
  public transitionInElement:HTMLMediaElement
  public transitionOutElement:HTMLMediaElement


  mounted() {
    if (this.globalStore.isAppInit){
      this.transitionInElement = this.$refs.transitionInElement
      this.transitionOutElement = this.$refs.transitionOutElement
    }
  }

  // // A getter function that returns the src of the video.
  get transitionIn(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.TRANSITION_PAPER_IN).data.src;
  }
  // // A getter function that returns the src of the video.
  get transitionOut(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.TRANSITION_PAPER_OUT).data.src;
  }

}
</script>
