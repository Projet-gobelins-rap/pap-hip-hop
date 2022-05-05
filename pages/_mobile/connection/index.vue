<template>
  <section class="mobileConnection">
    <input class="mobileConnection-input" v-model="codeValue" type="number" />
    <button class="mobileConnection-button" @click="Connect">Valider</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";
import permisions from "~/core/utils/Permisions";
@Component({
  components: {
    CustomButton,
  },
})
export default class mobileConnection extends Vue {
  public codeValue: number | null = null;

  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    $socket.on("phone_connected", (user) => {
      // this.$router.push("/_mobile/off");
      this.$router.push("/_mobile/graff/scope");
    });
  }

  Connect() {
    console.log("eee");
    permisions.requestOrientation();
    console.log(this.codeValue);
    $socket.emit("connect_code", this.codeValue);
  }

  // goToNextStep(){
  //
  //   this.stepStore.setIntroState(true)
  //   console.log(this.$nuxt)
  //   this.$router.push('/about')
  // }
}
</script>
