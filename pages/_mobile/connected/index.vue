<template>
  <section class="mobileConnection">
    <button class="mobileConnection-button" @click="connect">
      Commencer l'aventure !
    </button>
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
