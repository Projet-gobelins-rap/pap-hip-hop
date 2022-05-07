<template>
  <section class="battle--mobile">
    <h1>BATTLE MOBILE</h1>
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
export default class battleMobile extends Vue {
  public codeValue:number | null = null

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
    // $socket.on("phone_connected", (user) => {
    //   alert("phone_connected");
    //   this.$router.push('/')
    // });
  }

}
</script>

<style lang="sass" scoped>

</style>
