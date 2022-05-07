<template>
  <section class="mobileConnection">
    <input class="mobileConnection-input" v-model="codeValue" type="text" />
    <button class="mobileConnection-button" @click="connect">Valider</button>
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
  public codeValue: any | null = null;

  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    $socket.io.on("server:paired", (user) => {
      this.$router.push("/_mobile/battle");
    })
  }

  connect() {
    permisions.requestOrientation();
    $socket.io.emit("server:join", this.codeValue);
  }


  // goToNextStep(){
  //
  //   this.stepStore.setIntroState(true)
  //   console.log(this.$nuxt)
  //   this.$router.push('/about')
  // }
}
</script>
