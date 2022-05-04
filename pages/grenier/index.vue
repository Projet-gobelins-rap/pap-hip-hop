<template>
  <section class="grenier">
    <IntroMotion v-if="!stepStore.introMotionState"></IntroMotion>
    <ChatComponent v-if="this.chatElementState" :content="currentChat" />
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
import ChatComponent from "~/components/contentOverlays/chat.vue";

@Component({
  components: {
    IntroMotion,
    ChatComponent
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
  public currentChat:any

  mounted() {
    console.log(this.conversation,'conversation')
    // GrenierSceneInstance.context.
  }

  addInteractionPoints() {
    this.grenierSceneStore.addInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(BoxInteractPoint.name);
  }

  goToInteractionPoint(point) {
    console.log('GO TO')
    console.log(point.name)

    this.conversation.forEach((element)=>{
      console.log(element,'<----')
      if (element.primary.Identifiant === point.name) {
        this.currentChat = element
        return this.currentChat
      }
    })

    grenierScene.context.goToPresetPosition(point.name, 2, () => {
      this.grenierSceneStore.setIsCameraMoving(false);
      this.grenierSceneStore.setIsChatDisplay(true)
      console.log('ekippppp')
      console.log(this.currentChat,'current elem')
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

      console.log(this.chatStore.chatStep,'<------ chat step')
    }
  }

  // @Watch('chatElementState',{ immediate: true,deep:true })
  // onChatDisplay(val:boolean) {
  //   console.log('val change')
  //   if (val) {
  //     console.log('chat is display')
  //   }
  // }

  goBack() {

    this.grenierSceneStore.setIsChatDisplay(false)
    console.log(this.grenierSceneStore.isChatDisplay)
  }

  goToCity() {
    console.log('GO TO CITY')
  }
  // watch dialogStep change in chatStore store
  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {

    if (val) {
      switch (val) {
        case "reading":
          break;
        case "back":
          this.goBack();
          this.chatStore.setChatStep("reading");
          break;
        case "goToCity":
          this.goToCity();
          break;
      }
    }
  }

  get chatStep() {
    return this.chatStore.chatStep;
  }

  get motion() {
    return this.stepStore.introMotionState
  }

  get chatElementState() {
    return this.grenierSceneStore.isChatDisplay
  }

}
</script>
