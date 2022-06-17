<template>
  <div class="videoWrapper">
    <Video @ended.native="skipMotion" :source-link="videoIntro">
    </Video>
    <button @click="skipMotion" class="btn">SKIP MOTION</button>
  </div>

</template>

<script lang="ts">
import {Vue, Component, getModule, Prop, Watch} from "nuxt-property-decorator";
import Video from "~/components/medias/Video.vue";
import stepStore from "~/store/stepStore";
import {AssetsManager} from "../../core/managers";
import {VIDEO_ASSET} from "../../core/enums";
@Component({
  components: {
    Video
  },
})
export default class IntroMotion extends Vue {
  public stepStore = getModule(stepStore,this.$store)
  mounted() {
  }

  skipMotion() {
    console.log('skip motion')
    this.stepStore.skipIntroMotionState(true)
  }

  // A getter function that returns the src of the video.
  get videoIntro():string {
    return AssetsManager.getVideo(VIDEO_ASSET.VIDEO_INTRO).data.src
  }
}
</script>

<style lang="sass" scoped>

</style>
