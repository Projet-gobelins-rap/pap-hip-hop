<template>
  <section class="grenier">
    <IntroMotion></IntroMotion>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInstance from "~/core/scene/GrenierScene";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";
import IntroMotion from "~/components/medias/IntroMotion.vue";

@Component({
  components: {
    IntroMotion
  },
})

export default class GrenierScene extends Vue {
  public grenierSceneStore = getModule(grenierSceneStore,this.$store)

  mounted() {

    new GrenierSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      grenierSceneStore: this.grenierSceneStore
    }).init()

    // GrenierSceneInstance.context.

  }
}
</script>
