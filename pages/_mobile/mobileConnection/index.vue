<template>
  <section class="intro">
    <span>mobileConnection</span>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
@Component({
  components: {
    CustomButton
  },
})
export default class mobileConnection extends Vue {

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
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
