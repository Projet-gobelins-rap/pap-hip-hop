<template>
  <section class="mobileScope">
    <div class="mobileScope-debug">
      <span class="mobileScope-debug--x"></span>
      <span class="mobileScope-debug--y"></span>
      <span class="mobileScope-progress">
        <span class="mobileScope-progress--bar"></span>
      </span>
      <!-- <span class="mobileScope-debug--nx">{{ nomalizeTranslation.x.toFixed(2) }}</span>
      <span class="mobileScope-debug--ny">{{ nomalizeTranslation.y.toFixed(2) }}</span> -->
    </div>
    <div class="mobileScope-sight">
      <svg
        class="mobileScope-pointer"
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.3"
          y1="22.7"
          x2="10.7"
          y2="22.7"
          stroke="white"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="35.3"
          y1="22.7"
          x2="44.7"
          y2="22.7"
          stroke="white"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="23.3"
          y1="1.3"
          x2="23.3"
          y2="10.7"
          stroke="white"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="23.3"
          y1="35.3"
          x2="23.3"
          y2="44.7"
          stroke="white"
          stroke-width="2.6"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <div class="mobileScope-landscape">
      <div class="mobileScope-wrapper">
        <img
          class="mobileScope-img"
          src="/images/graf/city-rooftop.png"
          alt=""
        />
        <svg
          class="mobileScope-markers"
          width="2320"
          height="1294"
          viewBox="0 0 2320 1294"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              class="mobileScope-marker"
              cx="1566"
              cy="862"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle cx="1566" cy="862.001" r="15.6" fill="#ED6787" />
            <path
              d="M1566 857.125L1566 866.875M1570.88 862L1561.13 862"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
          <g>
            <circle
              class="mobileScope-marker"
              cx="1124"
              cy="657"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle cx="1124" cy="657.001" r="15.6" fill="#ED6787" />
            <path
              d="M1124 652.125L1124 661.875M1128.88 657L1119.13 657"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
          <g>
            <circle
              class="mobileScope-marker"
              cx="162"
              cy="831"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle cx="161.999" cy="831.001" r="15.6" fill="#ED6787" />
            <path
              d="M162.001 826.125L162.001 835.875M166.876 831L157.126 831"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import Scope from "~/core/interactions/Scope.ts";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";

import permisions from "~/core/utils/Permisions";

@Component({
  components: {
    Onboarding,
  },
  async asyncData({ $prismic, error }) {
    try {
      const graffContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;

      console.log(graffContent);

      const rotateOnboarding = graffContent?.slices5[0].items;
      const gameplayOnboarding = graffContent?.slices5[1].items;

      // const currentChat = battleChat[0];
      const currentOnboarding = rotateOnboarding[0];

      return {
        gameplayOnboarding,
        currentOnboarding,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class MobileScope extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public currentOnboarding: object;
  public gameplayOnboarding: object;
  public onboardingCounter: number = 1;
  public scopeInteraction: Scope

  mounted() {
    console.clear();
    console.log(this.currentOnboarding, "<--- current onboarrding mobile");
    console.log("scope");
    this.scopeInteraction = new Scope();
    this.displayOnboarding();
    setTimeout(() => {
      this.currentOnboarding = this.gameplayOnboarding;
      console.log(this.gameplayOnboarding);
    }, 1000);

    document.addEventListener(
      "click",
      (e) => {
        this.askPermisions();
      },
      { once: true }
    );
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

  askPermisions() {
    permisions.requestOrientation();
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
          this.scopeInteraction.start()
          break;
      }
    }
  }
}
</script>