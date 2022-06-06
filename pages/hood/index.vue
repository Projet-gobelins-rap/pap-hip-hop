<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
    <Toast
      @click.native="openCollectible"
      v-if="toastText"
      :text="toastText"
    ></Toast>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer from "~/core/utils/initializers/HoodSceneInitializer";
import stepStore from "~/store/stepStore";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import Toast from "../../components/contentOverlays/toast";
import HoodScene from "~/core/scene/HoodScene";
import $socket from "~/plugins/socket.io";

@Component({
  components: {
    Onboarding,
    Toast,
  },
  async asyncData({ $prismic, error }) {
    try {
      const hoodContent = (await $prismic.api.getSingle("hood")).data;

      const hoodOnboarding = hoodContent?.slices1[0].items;
      const currentOnboarding = hoodOnboarding;

      return {
        hoodOnboarding,
        currentOnboarding,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class HoodScenePage extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public hoodOnboarding: object;
  public currentOnboarding: object;
  public toastText: string | null = null;
  public toastUID: string = "";

  mounted() {
    new HoodSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    }).init();

    if (HoodScene.context._isStarted) {
      this.displayOnboarding();
      HoodScene.initCallback((toastID: string) => {
        console.log(toastID);
        this.displayToast(toastID);
      });
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
          this.hideOnboarding();
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  openCollectible() {
    $socket.io.emit("goTo", {
      path: "/_mobile/phone/collectibles/" + this.toastUID.toLowerCase(),
      replace: true,
    });
    this.hideToast();
  }

  hideToast() {
    this.toastText = null;
    this.toastUID = "";
  }

  displayToast(toastID: string) {
    // this.onboardingStore.setOnboardingDisplay(true);
    this.toastText = "consulter l'objet collecter !";
    this.toastUID = toastID;

    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
}
</script>
