<template>
  <section class="battle">
    <h1>BATTLE DESKTOP</h1>
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
export default class battle extends Vue {
  public codeValue:number | null = null

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
    console.log('BATTLE')
  }

}
</script>

<style lang="sass" scoped>

</style>
