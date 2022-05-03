<template>
  <section class="scope desktop">
    {{ this.graf }}
    <img class="scope-background" src="/images/graf/city-rooftop.png" alt="">
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class GraffActivity extends Vue {
  public graf: string = "Scope";
  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");

    console.log($socket,'socket from plugin')

  } 
}
</script>
