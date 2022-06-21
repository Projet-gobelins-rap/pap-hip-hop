<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
    <Toast
      @click.native="openCollectible"
      v-if="toastText"
      :type="toastType"
      :text="toastText"
    ></Toast>
    <InteractionPoints
      @click.native="goToInteractionPoint(point)"
      class="interactive-points"
      :data="point"
      v-for="(point, index) in hoodSceneStore.activeInteractionPoints"
      :key="index"
    />
    <ChatComponent
      class="grenier-chat"
      v-if="this.chatElementState && currentChat"
      :content="currentChat"
    />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer from "~/core/utils/initializers/HoodSceneInitializer";
import stepStore from "~/store/stepStore";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import Toast from "../../components/contentOverlays/toast";
import HoodScene from "~/core/scene/HoodScene";

import $socket from "~/plugins/socket.io";
import EricInteractPoint from "~/core/config/hood-scene/interact-points/EricInteractPoint";
import {gsap} from "gsap";

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
export default class HoodScenePage extends Vue {
  public hoodSceneStore = getModule(hoodSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public hoodInstance: HoodSceneInitializer;
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

  mounted() {
    this.displayOnboarding();
  }

  destroyed() {
    HoodScene.context.destroy()
  }


  startScene() {
    this.hoodInstance = new HoodSceneInitializer({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    });
    this.hoodInstance.init();
    this.hoodInstance.player.camera.position.set(-294, 15, -92)

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
    this.hoodSceneStore.addInteractivePoint(EricInteractPoint.name);
  }

  removeInteractionsPoints() {
    this.hoodSceneStore.removeInteractivePoint(EricInteractPoint.name);
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
    this.toastType = "collectible";
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
        console.log(el,'<--- voici el')
        console.log("transition enter ekip")

        // let videoIn = document.querySelector('.transition-overlayVideoIn') as HTMLMediaElement
        // let videoOut = document.querySelector('.transition-overlayVideoOut') as HTMLMediaElement
        let tl = gsap.timeline()
        tl.fromTo(
          ".transition-overlay",
          { display: "flex", yPercent: 0 },
          {
            display: "flex",
            duration: 1.5,
            yPercent: 100,
            ease: "expo.inOut",
            onComplete:()=>{
              gsap.set('.transition-overlay',{clearProps:"all"})
              gsap.set('.transition-stars',{clearProps:"all"})
              gsap.set('.transition-subtitle span',{clearProps:"all"})
              gsap.set('.transition-title span',{clearProps:"all"})
              gsap.set('.transitionInfo',{clearProps:"all"})
              done()
            }
          }
        );

      },
      leave(el: Element, done: Function) {
        console.log("transition leave ekip")
        // let videoIn = document.querySelector('.transition-overlayVideoIn') as HTMLMediaElement
        // let videoOut = document.querySelector('.transition-overlayVideoOut') as HTMLMediaElement

        let tl = gsap.timeline()
        tl.fromTo(
          ".transition-overlay",
          { display: "none", yPercent: 100 },
          {
            display: "flex",
            duration: 1.5,
            yPercent: 0,
            ease: "expo.inOut",
          }
        );
        tl.fromTo('.transition-stars',{opacity:0},{stagger:0.1,opacity:1,duration:0.5,ease: "expo.inOut"})
        tl.fromTo('.transition-subtitle span',{yPercent:100},{ease: "expo.out",duration:1,yPercent:0},'-=0.25')
        tl.fromTo('.transition-title span',{yPercent:100},{ease: "expo.out",duration:1,yPercent:0},'-=0.75')
        tl.fromTo('.transitionInfo',{opacity:0},{ease: "expo.out",duration:1,opacity:1},'-=0.5')
        tl.to('.transitionInfo',{duration:3,
          onComplete:()=>{
            done()
          }
        })

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
}
</script>
