<template>
  <section class="grenier">
    <IntroMotion v-if="!stepStore.introMotionState"></IntroMotion>
    <InteractionPoints @click.native="goToInteractionPoint(point)"
      class="interactive-points"
      :data="point"
      v-for="(point, index) in grenierSceneStore.activeInteractionPoints"
      :key="index"
    />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInstance from "~/core/scene/GrenierScene";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";
import IntroMotion from "~/components/medias/IntroMotion.vue";
import stepStore from "~/store/stepStore";
import PosterInteractPoint from "../../core/config/grenier-scene/interact-points/objects/PosterInteractPoint";
import grenierScene from "~/core/scene/GrenierScene";
import SprayInteractPoint from "../../core/config/grenier-scene/interact-points/objects/SprayInteractPoint";
import BoxInteractPoint from "../../core/config/grenier-scene/interact-points/objects/BoxInteractPoint";
import chatStore from "~/store/chatStore";

@Component({
  components: {
    IntroMotion,
  },
  async asyncData({ $prismic, error }) {
    try {
      const dialogContent = (await $prismic.api.getSingle("grenier"))
        .data;
      const conversation = dialogContent?.slices1;

      return {
        conversation,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})

export default class GrenierScene extends Vue {
  public grenierSceneStore = getModule(grenierSceneStore,this.$store)
  public stepStore = getModule(stepStore,this.$store)
  public chatStore = getModule(chatStore, this.$store);
  public conversation: any;

  mounted() {
    console.log(this.conversation,'conversation')
    // GrenierSceneInstance.context.
  }

  addInteractionPoints() {
    this.grenierSceneStore.addInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(BoxInteractPoint.name);
  }

  get motion() {
    return this.stepStore.introMotionState
  }

  goToInteractionPoint(point) {
    console.log('GO TO')
    console.log(point.name)
    let currentElem
    this.conversation.forEach((element)=>{
      console.log(element,'<----')
      if (element.primary.Identifiant === point.name) {
        currentElem = element
        return currentElem
      }
    })

    grenierScene.context.goToPresetPosition(point.name, 2, () => {
      this.grenierSceneStore.setIsCameraMoving(false);
      console.log('ekippppp')
      console.log(currentElem,'current elem')
      // this.canDisplayScenarioCard = true;
    });

  }

  @Watch('motion',{ immediate: true,deep:true })
  onMotionValueChanged(val:boolean) {
    if (val) {
      new GrenierSceneInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        grenierSceneStore: this.grenierSceneStore
      }).init()

      this.addInteractionPoints()
    }
  }

}
</script>
