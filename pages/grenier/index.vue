<template>
  <section class="grenier">
    <IntroMotion v-if="!stepStore.introMotionState"></IntroMotion>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInstance from "~/core/scene/GrenierScene";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";
import IntroMotion from "~/components/medias/IntroMotion.vue";
import stepStore from "~/store/stepStore";
@Component({
  components: {
    IntroMotion
  },
})

export default class GrenierScene extends Vue {
  public grenierSceneStore = getModule(grenierSceneStore,this.$store)
  public stepStore = getModule(stepStore,this.$store)
  public introMotion:boolean = this.stepStore.introMotionState

  mounted() {

    // TODO :: instancier notre scene quand la video est skip
    new GrenierSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      grenierSceneStore: this.grenierSceneStore
    }).init()

    // GrenierSceneInstance.context.
  }

}
</script>
