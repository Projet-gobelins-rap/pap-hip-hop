<template>
  <section class="grenier">
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import GlobalSceneInitializer from "~/core/utils/initializers/GlobalSceneInitializer";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInstance from "~/core/scene/GrenierScene";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";

@Component({
  components: {},
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
