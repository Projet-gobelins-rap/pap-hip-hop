<template>
  <section class="hood">
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInstance from "~/core/scene/HoodScene";
import HoodSceneInitializer from "~/core/utils/initializers/HoodSceneInitializer";

import stepStore from "~/store/stepStore";
import HoodScene from "~/core/scene/HoodScene";
@Component({
  components: {},
})
export default class HoodScenePage extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore,this.$store)
  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    new HoodSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    }).init();

    // HoodScene.context.
    console.log("Boyz in da hood");
  }
}
</script>
