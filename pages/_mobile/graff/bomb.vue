<template>
  <section class="graffBomb">
    <!-- <img class="graffBomb-background" :src="wallTexture.src" alt="" /> -->

    <Onboarding
      class="graffBomb-onboarding"
      :content="currentOnboarding"
    ></Onboarding>
    <div :class="isStart ? 'graffBomb-container ' : 'graffBomb-container hide'">
      <span class="graffBomb-spray"></span>
      <CustomButton class="graffBomb-button white large" :text="'pp'" />
      <CustomButton
        class="graffBomb-button--calibrate medium"
        :text="'Calibrate'"
      />
      <svg
        class="graffBomb-svg"
        width="323"
        height="356"
        viewBox="0 0 323 356"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="graffBomb-cap"
          d="M205 6.18764V72H118V6.18863C118 3.90719 119.905 2.08782 122.184 2.19288L161.387 4L200.817 2.19183C203.095 2.08734 205 3.90657 205 6.18764Z"
          fill="#151515"
          stroke="#151515"
          stroke-width="4"
        />
        <path
          d="M2 180C2 177.791 3.79086 176 6 176H317C319.209 176 321 177.791 321 180V236C321 238.209 319.209 240 317 240H6.00001C3.79087 240 2 238.209 2 236L2 180Z"
          fill="#FEFEFE"
          stroke="#151515"
          stroke-width="4"
        />
        <path
          d="M18 240H305V360H18L18 240Z"
          fill="#FEFEFE"
          stroke="#151515"
          stroke-width="4"
        />
        <path
          d="M248 120C280 120 288 152 288 176H35C35 152 43 120 75 120H248Z"
          fill="#FA5353"
          stroke="#151515"
          stroke-width="4"
        />
        <path
          d="M253 76V120H70V76C70 73.7909 71.7909 72 74 72H249C251.209 72 253 73.7909 253 76Z"
          fill="#FEFEFE"
          stroke="#151515"
          stroke-width="4"
        />
        <path
          d="M305 274V359H18L18 274H305Z"
          fill="#FA5353"
          stroke="#151515"
          stroke-width="4"
        />
      </svg>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import GraffBomb from "~/core/interactions/GraffBomb.ts";
import CustomButton from "~/components/buttons/button.vue";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";
import { AssetsManager } from "~/core/managers";
import { IMAGE_ASSET } from "~/core/enums";

@Component({
  components: {
    CustomButton,
    Onboarding,
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
  public wallTexture: HTMLImageElement = new Image();
  public isStart: boolean = false;

  mounted() {
    
    this.displayOnboarding();
    // this.wallTexture = AssetsManager.getImage(
    //   IMAGE_ASSET.WALL_TEXTURE_GRAFF
    // ).data;
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

  startInteraction() {
    this.isStart = true;
    this.graffBombInstance = new GraffBomb();
    this.graffBombInstance.startTicker();
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
          this.startInteraction();

          this.onboardingStore.setOnboardingStep("reading");
         
          break;
      }
    }
  }
}
</script>