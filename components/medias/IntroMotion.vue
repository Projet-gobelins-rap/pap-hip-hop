<template>
  <div class="videoWrapper">
    <Video @ended.native="skipMotion" source-link="https://cdn.videvo.net/videvo_files/video/free/2020-05/large_watermarked/3d_ocean_1590675653_preview.mp4">
    </Video>
    <button @click="skipMotion" class="btn">SKIP MOTION</button>
  </div>

</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import Video from "~/components/medias/Video.vue";
import stepStore from "~/store/stepStore";
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
}
</script>

<style lang="sass" scoped>

</style>
