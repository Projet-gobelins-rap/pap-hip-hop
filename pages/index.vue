<template>
  <section class="home">
    <nuxt-link class="home-link" to="/_mobile/phone">Mobile</nuxt-link>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import globalSceneStore from "~/store/globalSceneStore";
// import $socket from "~/plugins/socket.io";
import GlobalScene from "~/core/scene/GlobalScene";
import GlobalSceneInitializer from "~/core/utils/initializers/GlobalSceneInitializer";
//
@Component({
  components: {},
})
export default class Home extends Vue {
  public globalSceneStore = getModule(globalSceneStore, this.$store);

  mounted() {
    // Initialize Scene
    new GlobalSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      globalSceneStore: this.globalSceneStore,
    }).init();

    console.log(GlobalScene, "global scene");
  }

  stopSceneRender() {
    GlobalScene.context.pause();
  }
}
</script>
 
 <style lang="scss">
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &-link {
    z-index: 100;
    position: relative;
  }
}
</style>
 