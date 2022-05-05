<template>
  <section class="graf">
    <nuxt-link to="/graf/scope">Scope</nuxt-link>
    <nuxt-link to="/graf/draw">Draw</nuxt-link>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class GraffActivity extends Vue {
  public graf: string = "Graf 🚧";
  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");

    console.log($socket, "socket from plugin");
  }
}
</script>

<style lang="sass" scoped>
.graf
  display: flex
  align-items: center
  justify-content: center
  position: relative
  height: 100%
</style>
