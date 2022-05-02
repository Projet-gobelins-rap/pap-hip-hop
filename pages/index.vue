<template>
  <section class="home">

    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>

  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import globalSceneStore from "~/store/globalSceneStore";
import $socket from "~/plugins/socket.io";
import GlobalScene from "~/core/scene/GlobalScene";
import GlobalSceneInitializer from "~/core/utils/initializers/GlobalSceneInitializer";
//
@Component({
  components: {},
})
export default class Home extends Vue {

  public globalSceneStore = getModule(globalSceneStore,this.$store)

  mounted() {
    // Initialize Scene
    new GlobalSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      globalSceneStore: this.globalSceneStore
    }).init()

    console.log(GlobalScene,'global scene')

  }

  stopSceneRender() {
    GlobalScene.context.pause()
  }
}
</script>
 
 