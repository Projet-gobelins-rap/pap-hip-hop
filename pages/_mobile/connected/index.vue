<template>
  <section class="mobileConnection">
    <CustomButton class="mobileConnection-button" @click.native="connect" :text="buttonText"/>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import $socket from "~/plugins/socket.io";
import CustomButton from "~/components/buttons/button.vue";
import permisions from "~/core/utils/Permisions";

@Component({
  components: {
    CustomButton,
  },
})
export default class mobileConnection extends Vue {
  public buttonText: string = "Commencer l\'aventure !"
  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    
  }

  connect() {
    permisions.requestOrientation();
    $socket.io.emit("goTo", "/grenier");
    this.$router.push("/_mobile/off");
  }
}
</script>
