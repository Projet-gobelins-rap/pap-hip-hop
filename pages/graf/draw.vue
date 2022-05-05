<template>
  <section class="graffDraw">
    {{ this.graf }}
    <picture class="graffDraw-background">
      <img class="graffDraw-background--img" src="/images/wall-0.png" alt="" />
    </picture>
    <div class="graffDraw-preview">
      <img class="graffDraw-preview--img" src="" alt="" />
    </div>
    <p class="display"></p>
    <img class="grafImg" src="/images/wall-1.png" alt="" />
    <canvas class="canvas-graf"></canvas>
    <button class="canvas-reset">Passer à l'etape 2</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import Graf from "~/core/interactions/Graf";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class GraffActivity extends Vue {
  public graf: string = "Graf 🚧";
  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");

    // new Graf()

    console.log($socket, "socket from plugin");
  }
}
</script>

<style lang="sass" scoped>
.canvas-graf
  position: absolute
  left: 0
  top: 0
  background: url("/images/wall-1.png")
  background-size: cover
  background-repeat: no-repeat
  background-position: left top
  z-index: 10
.canvas-reset
  position: absolute
  left: 0
  top: 0
  z-index: 15
.display
  position: absolute
  left: 20px
  top: 30px
  z-index: 20
  font-size: 20px
  color: red
.grafImg
  position: absolute
  left: 0
  top: 0
  z-index: 12
  opacity: 0
  pointer-events: none
</style>
