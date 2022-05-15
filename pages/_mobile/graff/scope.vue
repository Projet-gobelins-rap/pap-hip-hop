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

    <div class="mobileScope-landscape">
      <div class="mobileScope-wrapper">
        <img
          class="mobileScope-img"
          src="/images/graf/city-rooftop.png"
          alt=""
        />
        <svg
          class="mobileScope-markers"
          width="3076"
          height="1829"
          viewBox="0 0 3076 1829"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            class="mobileScope-marker"
            x="685"
            y="549"
            width="120"
            height="120"
            fill="#ED6FD9"
          />
          <rect
            class="mobileScope-marker"
            x="1538"
            y="794"
            width="120"
            height="120"
            fill="#ED6FD9"
          />
          <rect
            class="mobileScope-marker"
            x="2010"
            y="429"
            width="120"
            height="120"
            fill="#ED6FD9"
          />
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

  mounted() {
    console.clear();
    console.log(this.currentOnboarding, "<--- current onboarrding mobile");
    console.log("scope");
    const scopeInteraction = new Scope();
    this.displayOnboarding();
    setTimeout(() => {
      this.currentOnboarding = this.gameplayOnboarding
      console.log(this.gameplayOnboarding);
      
    }, 1000)
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
          this.hideOnboarding()
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }
}
</script>