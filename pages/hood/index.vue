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
import {Npc} from "../../core/models/npc";
import AssetsManager from "../../core/managers/AssetsManager";
import loaderStore from "../../store/loaderStore";
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
  public loaderStore = getModule(loaderStore, this.$store);
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

  filterNpc():void {
    console.log(HoodScene.context.NPCS,'<--- get all NPCS')
    HoodScene.npcArray.forEach((npc:Npc)=>{
      if (npc.outfitParams.clickable){
        this.createNpcInteractPoint(npc)
      }
    })
  }

  createNpcInteractPoint(npc:Npc):void {
    console.log(npc.camera.position,'<--- NPC Camera pos')
    // Model pos

  }

  // TODO : click
  // moveCameraToTarget()

  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {

      switch (val) {
        case "reading":
          break;
        case "hide":
          this.hideOnboarding()
          this.onboardingStore.setOnboardingStep("reading");
          this.filterNpc()
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
