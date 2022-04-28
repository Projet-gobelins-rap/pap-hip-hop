<template>
  <section class="home">
    {{ this.graf }}
    <p class="display"></p>
    <img class="grafImg" src="images/sky.jpeg" alt="">
    <canvas class="canvas-graf"></canvas>
    <button class="canvas-reset">Passer à l'etape 2</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import Graf from "~/core/scripts/Graf";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class GraffActivity extends Vue {
  public graf: string = "Graf 🚧";
  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");

    new Graf()

    console.log($socket,'socket from plugin')

  }
}
</script>

<style lang="sass" scoped>
.canvas-graf
  position: absolute
  left: 0
  top: 0
  background: url("/images/sky.jpeg")
  background-size: cover
  background-repeat: no-repeat
  background-position: left top
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
