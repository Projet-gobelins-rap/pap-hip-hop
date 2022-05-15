<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer from "~/core/utils/initializers/HoodSceneInitializer";
import stepStore from "~/store/stepStore";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from '../../components/contentOverlays/onboarding'
import HoodScene from "~/core/scene/HoodScene";
@Component({
  components: {
    Onboarding
  },
  async asyncData({ $prismic, error }) {
    try {
      const hoodContent = (await $prismic.api.getSingle("hood")).data;

      const hoodOnboarding = hoodContent?.slices1[0].items;
      const currentOnboarding = hoodOnboarding;

      return {
        hoodOnboarding,
        currentOnboarding
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class HoodScenePage extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore,this.$store)
  public stepStore = getModule(stepStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store)
  public hoodOnboarding:object
  public currentOnboarding:object
  mounted() {
    
    new HoodSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    }).init();

    if (HoodScene.context._isStarted){
      this.displayOnboarding()
    }
    // HoodScene.context.
    console.log("Boyz in da hood");
  }


  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {

      switch (val) {
        case "reading":
          break;
        case "hide":
          this.hideOnboarding()
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false)
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true)
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
}
</script>
