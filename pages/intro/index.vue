<template>
  <section class="intro">
    <h1 class="intro-title">PAP'HIP HOP</h1>
    <h2 class="intro-subtitle">LE MOUVEMENT OUBLIÉ</h2>
    <CustomButton
      class="intro-button"
      @click.native="goToNextStep"
      text="Commencer l'expérience"
    ></CustomButton>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import { AssetsManager } from "../../core/managers";
import { IMAGE_ASSET } from "../../core/enums";
import $storage from "../../core/utils/Storage";
@Component({
  components: {
    CustomButton,
  },
})
export default class Intro extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public onboardingData: any;

  mounted() {
    console.log(this.onboardingData, "<- onboarding");
  }

  goToNextStep() {
    this.stepStore.setIntroState(true);
    this.$router.push("/connection");
  }
}
</script>

<style lang="sass" scoped>
</style>
