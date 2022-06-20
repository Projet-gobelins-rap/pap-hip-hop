<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
   <Toast
      @click.native="openCollectible"
      v-if="toastText"
      :type="toastType"
      :text="toastMessage"
    />
    <Toast
      :type="'message'"
      :text="'Explore la place'"
    />

    <InteractionPoints
      @click.native="goToInteractionPoint(point)"
      class="interactive-points"
      :data="point"
      v-for="(point, index) in hoodSceneStore.activeInteractionPoints"
      :key="index"
    />
    <ChatComponent
      class="hood-chat"
      v-if="this.chatElementState && currentChat"
      :content="currentChat"
    />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer2 from "~/core/utils/initializers/HoodSceneInitializer2";
import stepStore from "~/store/stepStore";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import Toast from "../../components/contentOverlays/toast";
import HoodScene from "~/core/scene/HoodScene";
import DeenastyInteractPoint from "~/core/config/hood-scene/interact-points/DeenastyInteractPoint";

import $socket from "~/plugins/socket.io";
import BattleInteractPoint from "~/core/config/hood-scene/interact-points/BattleInteractPoint";
import EricInteractPoint from "~/core/config/hood-scene/interact-points/EricInteractPoint";
import TicaretInteractPoint from "~/core/config/hood-scene/interact-points/TicaretInteractPoint";

@Component({
  components: {
    Onboarding,
    Toast,
    ChatComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const hoodContent = (await $prismic.api.getSingle("hood")).data;

      const hoodOnboarding = hoodContent?.slices1[0].items;
      const currentOnboarding = hoodOnboarding;
      const npcDialogues = [
        hoodContent?.slices2,
        hoodContent?.slices3,
        hoodContent?.slices4,
        hoodContent?.slices5,
      ];

      return {
        hoodOnboarding,
        currentOnboarding,
        npcDialogues,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class HoodScenePage2 extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public hoodInstance: HoodSceneInitializer2;
  public hoodOnboarding: object;
  public npcDialogues: object[];
  public currentOnboarding: object;
  public toastText: string | null = null;
  public toastMessage: string | null = null;
  public toastType: string | null = null;
  public toastUID: string = "";
  public chatDialogStep: string;
  public focusPoints: object;
  public currentChat: object;
  public currentChatNum: number = 0;

  mounted() {
    this.displayOnboarding();
  }

  destroyed() {
    HoodScene.context.destroy();
  }

  startScene() {
    this.hoodInstance = new HoodSceneInitializer2({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    });
    this.hoodInstance.init();
    this.hoodInstance.player.camera.position.set(-194, 15, -118);

    if (HoodScene.context._isStarted) {
      this.addInteractionPoints();

      HoodScene.initCallback((toastID: string) => {
        console.log(toastID);
        this.displayToast(toastID);
      });
    }
  }

  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      switch (val) {
        case "reading":
          break;
        case "hide":
          this.hideOnboarding();
          this.startScene();
          $socket.io.emit("goTo", {
            path: "/_mobile/phone",
            replace: true,
          });
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }

  addInteractionPoints() {
    this.hoodSceneStore.addInteractivePoint(DeenastyInteractPoint.name);
    this.hoodSceneStore.addInteractivePoint(BattleInteractPoint.name);
    this.hoodSceneStore.addInteractivePoint(EricInteractPoint.name);
    this.hoodSceneStore.addInteractivePoint(TicaretInteractPoint.name);
  }

  removeInteractionsPoints() {
    this.hoodSceneStore.removeInteractivePoint(DeenastyInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(BattleInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(EricInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(TicaretInteractPoint.name);
  }

  goToInteractionPoint(point) {
    console.log(this.npcDialogues);

    this.npcDialogues.forEach((element) => {
      if (element[0].primary.Identifiant === point.slug) {
        console.log(element[0]);

        this.currentChat = element[0];
        return this.currentChat;
      }
    });

    this.removeInteractionsPoints();
    this.hoodInstance.cameraFollow = false;
    HoodScene.context.goToPresetPosition(point.slug, 2, () => {
      this.hoodSceneStore.setIsCameraMoving(false);
      this.hoodSceneStore.setIsChatDisplay(true);
    });
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
    this.toastText = "consulter l'objet collecté !";
    this.toastType = "collec";
    this.toastUID = toastID;

    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  // Set next message in conversation order
  setNextDialog() {
    this.currentChatNum++;
    // this.currentChat = this.conversation[this.currentChatNum];
  }

  // watch dialogStep change in chatStore store
  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      console.log(val);

      switch (val) {
        case "reading":
          break;
        case "next":
          this.setNextDialog();
          this.chatStore.setChatStep("reading");
          break;
        case "goBack":
          this.goBack();
          this.chatStore.setChatStep("reading");
          break;
        case "goGraff":
          this.$router.push("/graf/scope");
          $socket.io.emit("goTo", {
            path: "/_mobile/off",
            replace: true,
          });
          this.chatStore.setChatStep("reading");
          break;
        case "goBattle":
          this.$router.push("/battle");
          $socket.io.emit("goTo", {
            path: "/_mobile/off",
            replace: true,
          });
          this.chatStore.setChatStep("reading");
          break;
      }
    }
  }

  goBack() {
    this.hoodSceneStore.setIsChatDisplay(false);
    // this.addInteractionPoints();

    HoodScene.context.goToPresetPosition("reset", 2, () => {
      this.addInteractionPoints();
      this.hoodInstance.cameraFollow = true;
    });
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }

  get chatStep() {
    return this.chatStore.chatStep;
  }

  get motion() {
    return this.stepStore.introMotionState;
  }

  get chatElementState() {
    return this.hoodSceneStore.isChatDisplay;
  }
}
</script>
