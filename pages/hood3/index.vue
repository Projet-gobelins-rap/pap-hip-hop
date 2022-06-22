<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
    <Toast
      @click.native="openCollectible"
      v-if="toastText"
      :type="toastType"
      :text="toastText"
    />
    <Toast :type="'message'" :text="'Explore la place'" />
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
    <div :class="`hood-popup ${popupOpen}`">
      <svg
        @click="closePopup"
        class="hood-store--close"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#151515" />
        <circle cx="20.3448" cy="19.6553" r="18.2759" fill="#FEFEFE" />
        <path
          d="M15.1732 14.4829L25.518 24.8277"
          stroke="#151515"
          stroke-width="1.37931"
        />
        <path
          d="M25.5172 14.4829L15.1724 24.8277"
          stroke="#151515"
          stroke-width="1.37931"
        />
      </svg>
      <img class="hood-html" src="images/hp360.png" alt="" />
    </div>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer3 from "~/core/utils/initializers/HoodSceneInitializer3";
import stepStore from "~/store/stepStore";
import chatStore from "~/store/chatStore";
import collectibleStore from "~/store/collectibleStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import Toast from "../../components/contentOverlays/toast";
import HoodScene from "~/core/scene/HoodScene";
import gsap from "gsap";
import $socket from "~/plugins/socket.io";
import PapyInteractPoint from "~/core/config/hood-scene/interact-points/PapyInteractPoint";

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
        hoodContent?.slices6,
        hoodContent?.slices7,
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
export default class HoodScenePage3 extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public collectibleStore = getModule(collectibleStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public hoodInstance: HoodSceneInitializer3;
  public hoodOnboarding: object;
  public npcDialogues: object[];
  public currentOnboarding: object;
  public toastText: string | null = null;
  public toastType: string | null = null;
  public toastUID: string = "";
  public chatDialogStep: string;
  public focusPoints: object;
  public currentChat: object;
  public currentChatNum: number = 0;
  public popupOpen: boolean = false;

  mounted() {
    // this.displayOnboarding();

    this.startScene();
  }

  destroyed() {
    HoodScene.context.destroy();
  }

  startScene() {
    this.hoodInstance = new HoodSceneInitializer3({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    });
    this.hoodInstance.init();
    this.hoodInstance.player.camera.position.set(29, 11, 24);

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
          // this.hideOnboarding();
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
    this.hoodSceneStore.addInteractivePoint(PapyInteractPoint.name);
    // this.hoodSceneStore.addInteractivePoint(BattleInteractPoint.name);
    // this.hoodSceneStore.addInteractivePoint(EricInteractPoint.name);
    // this.hoodSceneStore.addInteractivePoint(TicaretInteractPoint.name);
  }

  removeInteractionsPoints() {
    this.hoodSceneStore.removeInteractivePoint(PapyInteractPoint.name);
    // this.hoodSceneStore.removeInteractivePoint(BattleInteractPoint.name);
    // this.hoodSceneStore.removeInteractivePoint(EricInteractPoint.name);
    // this.hoodSceneStore.removeInteractivePoint(TicaretInteractPoint.name);
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

  closePopup() {
    this.popupOpen = false;
    this.goBack();
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
    gsap.to(".toast.message", {
      y: 0,
      opacity: 1,
    });
  }

  displayToast(toastID: string) {
    // this.onboardingStore.setOnboardingDisplay(true);
    this.toastText = "consulter l'objet collecté !";
    this.toastType = "collec";
    this.toastUID = toastID;
    this.collectibleStore.addCollected(toastID);
    $socket.io.emit("collectible::looted", this.toastUID.toLowerCase());

    gsap.to(".toast.message", {
      y: -30,
      opacity: 0.5,
    });

    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  toastEnter() {
    gsap.from(".toast.collec", {
      y: 30,
      opacity: 0,
    });
  }
  toastLeave() {
    gsap.to(".toast.collec", {
      y: 30,
      opacity: 0,
    });
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
        case "showTickets":
          this.popupOpen = true;
          this.hoodSceneStore.setIsChatDisplay(false);
          this.chatStore.setChatStep("reading");
          break;
        case "goGraff":
          $socket.io.emit("goTo", {
            path: "/_mobile/off",
            replace: true,
          });
          this.chatStore.setChatStep("reading");
          break;
        case "goBattle":
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

  transition() {
    return {
      enter(el: Element, done: Function) {
        console.log(el, "<--- voici el");
        console.log("transition enter ekip");

        let videoIn = document.querySelector(
          ".transition-overlayVideoIn"
        ) as HTMLMediaElement;
        let videoOut = document.querySelector(
          ".transition-overlayVideoOut"
        ) as HTMLMediaElement;
        videoOut.play();
        videoOut.onended = () => {
          gsap.to(".transition-overlay", {
            display: "none",
            duration: 1.5,
            yPercent: 100,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(".transition-overlay", {
                display: "none",
                yPercent: 100,
              });
              gsap.set(videoOut, { display: "none", opacity: 0 });
              done();
            },
          });
        };
      },
      leave(el: Element, done: Function) {
        console.log(el, "<--- voici el");
        console.log("transition leave ekip");

        let videoIn = document.querySelector(
          ".transition-overlayVideoIn"
        ) as HTMLMediaElement;
        gsap.set(videoIn, { display: "block", opacity: 1 });

        let videoOut = document.querySelector(
          ".transition-overlayVideoOut"
        ) as HTMLMediaElement;

        gsap.fromTo(
          ".transition-overlay",
          { display: "none", yPercent: 100 },
          {
            display: "block",
            duration: 1.5,
            yPercent: 0,
            ease: "expo.inOut",
            onComplete: () => {
              videoIn.play();
            },
          }
        );

        videoIn.onended = () => {
          gsap.set(videoIn, { display: "none", opacity: 0 });
          gsap.set(videoOut, { display: "block", opacity: 1 });
          done();
        };
      },
    };
  }

  transition() {
    return {
      enter(el: Element, done: Function) {
        console.log(el, "<--- voici el");
        console.log("transition enter ekip");

        // let videoIn = document.querySelector('.transition-overlayVideoIn') as HTMLMediaElement
        // let videoOut = document.querySelector('.transition-overlayVideoOut') as HTMLMediaElement
        let tl = gsap.timeline();
        tl.fromTo(
          ".transition-overlay",
          { display: "flex", yPercent: 0 },
          {
            display: "flex",
            duration: 1.5,
            yPercent: 100,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(".transition-overlay", { clearProps: "all" });
              gsap.set(".transition-stars", { clearProps: "all" });
              gsap.set(".transition-subtitle span", { clearProps: "all" });
              gsap.set(".transition-title span", { clearProps: "all" });
              gsap.set(".transitionInfo", { clearProps: "all" });
              done();
            },
          }
        );
      }

    };
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
  get collectedItems() {
    return this.collectibleStore.collected;
  }
}
</script>
