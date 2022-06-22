<template>
  <section class="hood">
    <Onboarding :content="currentOnboarding"></Onboarding>
    <Toast
      @click.native="openCollectible"
      v-if="toastText"
      :type="toastType"
      :text="toastText"
    />
    <Toast :type="'message'" :text="toastMessage" />

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

    <div class="hood-store" ref="store" v-if="storeOpen">
      <svg
        @click="closeStore"
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

      <div class="hood-outfits">
        <div
          class="hood-outfit"
          v-for="(item, i) in storeOutfits"
          :key="'previewOutfit' + i"
        >
          <img class="hood-outfit--img" :src="item.img.src" alt="" />
          <CustomButton
            :class="'hood-outfit--button small white ' + item.worn"
            @click.native="changeOutfit(item.name)"
            v-if="i < 2 && outfitWorn != item.name"
            :text="'J\'prends direct !'"
          />
        </div>
      </div>
    </div>

    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import hoodSceneStore from "~/store/hoodSceneStore";
import HoodSceneInitializer2 from "~/core/utils/initializers/HoodSceneInitializer2";
import stepStore from "~/store/stepStore";
import chatStore from "~/store/chatStore";
import collectibleStore from "~/store/collectibleStore";
import CustomButton from "~/components/buttons/button.vue";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import onboardingStore from "../../store/onboardingStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import Toast from "../../components/contentOverlays/toast";
import HoodScene from "~/core/scene/HoodScene";
import DeenastyInteractPoint from "~/core/config/hood-scene/interact-points/DeenastyInteractPoint";
import gsap from "gsap";
import $socket from "~/plugins/socket.io";
import BattleInteractPoint from "~/core/config/hood-scene/interact-points/BattleInteractPoint";
import EricInteractPoint from "~/core/config/hood-scene/interact-points/EricInteractPoint";
import NepalInteractPoint from "~/core/config/hood-scene/interact-points/NepalInteractPoint";
import TicaretInteractPoint from "~/core/config/hood-scene/interact-points/TicaretInteractPoint";
import { AssetsManager } from "~/core/managers";
import { IMAGE_ASSET } from "~/core/enums";


@Component({
  components: {
    Onboarding,
    Toast,
    ChatComponent,
    CustomButton,
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
  public collectibleStore = getModule(collectibleStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public hoodInstance: HoodSceneInitializer2;
  public hoodOnboarding: object;
  public npcDialogues: object[];
  public currentOnboarding: object;
  public toastText: string | null = null;
  public toastMessage: string | null = "Va à la boutique Ticaret";
  public toastType: string | null = null;
  public toastUID: string = "";
  public chatDialogStep: string;
  public focusPoints: object;
  public currentChat: object;
  public currentChatNum: number = 0;
  public storeOpen: boolean = false;
  public storeOutfits: object[] = [];
  public outfitWorn: string = "player0";
  public talkingNpc: string = null

  mounted() {
    this.displayOnboarding();
  }

  // destroyed() {
  //   HoodScene.context.destroy();
  // }

  startScene() {
    this.hoodInstance = new HoodSceneInitializer2({
      canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
      hoodSceneStore: this.hoodSceneStore,
    });
    this.hoodInstance.init();
    this.hoodInstance.player.camera.position.set(-194, 15, -118);

    this.storeOutfits = [
      {
        img: AssetsManager.getImage(IMAGE_ASSET.STICKER_TENUE_01).data,
        name: "player0",
      },
      {
        img: AssetsManager.getImage(IMAGE_ASSET.STICKER_TENUE_02).data,
        name: "player",
      },
      {
        img: AssetsManager.getImage(IMAGE_ASSET.STICKER_TENUE_03).data,
        name: "none",
      },
      {
        img: AssetsManager.getImage(IMAGE_ASSET.STICKER_TENUE_04).data,
        name: "none",
      },
    ];

    if (HoodScene.context._isStarted) {
      this.addInteractionPoints();

      HoodScene.initCallback((toastID: string) => {
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
    this.hoodSceneStore.addInteractivePoint(NepalInteractPoint.name);
  }

  removeInteractionsPoints() {
    this.hoodSceneStore.removeInteractivePoint(DeenastyInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(BattleInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(EricInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(TicaretInteractPoint.name);
    this.hoodSceneStore.removeInteractivePoint(NepalInteractPoint.name);
  }

  goToInteractionPoint(point) {
    console.log(this.npcDialogues);
    console.log(point);

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
      const name = point.slug.split('_')
      
      this.talkToNpc(name[1])
    });
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  showStore() {
    this.storeOpen = true;
    // gsap.to(this.$refs.store, {
    //   y: 0,
    //   opacity: 1,
    // });
  }

  closeStore() {
    this.storeOpen = false;
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

  changeOutfit(name: string) {
    if (name !== "none") {
      this.outfitWorn = name;
      this.hoodInstance.player.changeOutfit(name);
    }
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

  talkToNpc(name: string[]) {
    this.talkingNpc = name
    this.findNpc(name).animationPlayed = 'talk'
    console.log(this.talkingNpc);
  }

  findNpc(name: string) {
    return this.hoodInstance.npcArray.find(element => element.name = name)
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

          // Demo mode : trigger when leave dialogue (Dan)
          this.toastMessage = "Trouve le coach";
          this.chatStore.setChatStep("reading");
          break;
        case "showStore":
          this.showStore();
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
          HoodScene.context.destroy();
          this.chatStore.setChatStep("reading");
          break;
      }
    }
  }

  goBack() {
    this.hoodSceneStore.setIsChatDisplay(false);
    // this.addInteractionPoints();
    // this.talkingNpc.animationPlayed = 'idle'
    // this.talkingNpc = null
    this.findNpc(this.talkingNpc).animationPlayed = 'idle'
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

        let title = document.querySelector('.transition-title span') as HTMLElement
        title.innerHTML = `LE TRABENDO`
        let infoContent = document.querySelector('.transitionInfo-content span') as HTMLElement
        infoContent.innerHTML = `Une des salles mythiques des battles Rap Contenders`

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
  get collectedItems() {
    return this.collectibleStore.collected;
  }
}
</script>
