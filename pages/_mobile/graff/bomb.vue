<template>
  <section class="graffBomb">
    <div class="graffBomb-debug">
      <span class="graffBomb-debug--x">0</span>
      <span class="graffBomb-debug--y">0</span>
    </div>
    <CustomButton class="graffBomb-button" :text="'pssscht'" />
    <CustomButton class="graffBomb-button--calibrate" :text="'Calibrate'" />
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import GraffBomb from "~/core/interactions/GraffBomb.ts";
import CustomButton from "~/components/buttons/button.vue";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";

@Component({
  components: {
    CustomButton,
    Onboarding
  },
  async asyncData({ $prismic, error }) {
    try {
      const graffContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;

      console.log(graffContent);

      const gameplayOnboarding = graffContent?.slices6[0].items;

      // const currentChat = battleChat[0];
      const currentOnboarding = gameplayOnboarding;

      return {
        currentOnboarding,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class Bomb extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public currentOnboarding: object;
  public graffBombInstance: GraffBomb;

  mounted() {
    this.graffBombInstance = new GraffBomb();
    this.displayOnboarding();
     console.log(this.currentOnboarding, "<--- current onboarrding mobile");
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }
  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);
      switch (val) {
        case "reading":
          break;
        case "closePopup":
          this.hideOnboarding();
          this.onboardingStore.setOnboardingStep("reading");
          this.graffBombInstance.startTicker()
          break;
      }
    }
  }
}
</script>