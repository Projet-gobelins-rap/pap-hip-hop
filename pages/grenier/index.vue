<template>
<!--  <transition v-on:leave="leavePage" appear>è-->
  <section v-on:leave="leavePage" appear class="grenier">
    <IntroMotion v-if="!stepStore.introMotionState"></IntroMotion>
    <ChatComponent
      class="grenier-chat"
      v-if="this.chatElementState"
      :content="currentChat"
    />
    <InteractionPoints
      @click.native="goToInteractionPoint(point)"
      class="interactive-points"
      :data="point"
      v-for="(point, index) in grenierSceneStore.activeInteractionPoints"
      :key="index"
    />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
<!--  </transition>-->
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";
import IntroMotion from "~/components/medias/IntroMotion.vue";
import stepStore from "~/store/stepStore";
import PapyInteractPoint from "../../core/config/grenier-scene/interact-points/objects/PapyInteractPoint";
import PosterInteractPoint from "../../core/config/grenier-scene/interact-points/objects/PosterInteractPoint";
import grenierScene from "~/core/scene/GrenierScene";
import SprayInteractPoint from "../../core/config/grenier-scene/interact-points/objects/SprayInteractPoint";
import ModeInteractPoint from "../../core/config/grenier-scene/interact-points/objects/ModeInteractPoint";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import TvInteractPoint from "../../core/config/grenier-scene/interact-points/objects/TvInteractPoint";
import ModeCameraPosition from "../../core/config/grenier-scene/camera-positions/ModeCameraPosition";
import GUI from "lil-gui";

import $socket from "~/plugins/socket.io";
import emitter from 'tiny-emitter/instance'
@Component({
  components: {
    IntroMotion,
    ChatComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const dialogContent = (await $prismic.api.getSingle("grenier")).data;
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
  public grenierSceneStore = getModule(grenierSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public conversation: any;
  public currentChat: any;
  public gui = new GUI();
  public genierInstance: GrenierSceneInitializer;

  mounted() {
    console.log(this.conversation, "conversation");
  }

  addInteractionPoints() {
    this.grenierSceneStore.addInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(TvInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(ModeInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(PapyInteractPoint.name);
  }

  removeInteractionsPoints() {
    this.grenierSceneStore.removeInteractivePoint(TvInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(PapyInteractPoint.name);
  }

  goToInteractionPoint(point) {
    this.conversation.forEach((element) => {
      if (element.primary.Identifiant === point.name) {
        this.currentChat = element;
        return this.currentChat;
      }
      if (point.name == "TV") {
        this.genierInstance.videoTV.muted = false
      }
    });

    this.removeInteractionsPoints();
    grenierScene.context.goToPresetPosition(point.name, 2, () => {
      this.grenierSceneStore.setIsCameraMoving(false);
      this.grenierSceneStore.setIsChatDisplay(true);
    });
  }

  @Watch("motion", { immediate: true, deep: true })
  onMotionValueChanged(val: boolean) {
    if (val) {
      this.genierInstance = new GrenierSceneInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        grenierSceneStore: this.grenierSceneStore,
      });
      this.genierInstance.init();
      grenierScene.context.disableOrbitControl();

      this.addInteractionPoints();
    }
  }

  goBack() {
    this.grenierSceneStore.setIsChatDisplay(false);
    console.log(this.grenierSceneStore.isChatDisplay);
    grenierScene.context.goToPresetPosition("initial", 2, () => {
      this.addInteractionPoints();
    });
  }

  goToCity() {
    this.$router.push({ path: "/hood", replace: true });
    // grenierScene.context._hoodTextureEvolution = è
    // emitter.emit('hood::textureEvolution',1)
    this.stepStore.setTextureStep(1)
  }

  //
  leavePage(el,done) {

    console.log('JE QUITTE LA PAGE DU GRENIER',el)
    done()

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
          this.genierInstance.videoTV.muted = true
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
    return this.stepStore.introMotionState;
  }

  get chatElementState() {
    return this.grenierSceneStore.isChatDisplay;
  }
}
</script>
