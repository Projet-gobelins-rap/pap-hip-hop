<template>
  <section class="intro">
    <span>mobileConnection</span>
    <input v-model="codeValue" type="number">
    <button @click="Connect">Valider</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";
@Component({
  components: {
    CustomButton
  },
})
export default class mobileConnection extends Vue {
  public codeValue:number | null = null

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
    $socket.on("phone_connected", (user) => {
      alert("phone_connected");
      this.$router.push('/')
    });
  }

  Connect() {
    console.log("eee")
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

<style lang="sass" scoped>

</style>
