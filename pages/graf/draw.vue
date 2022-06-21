<template>
  <section class="graffDraw">
    <span class="graffDraw-cursor"></span>
    <picture class="graffDraw-background">
      <img class="graffDraw-background--img" :src="wallTexture.src" alt="" />
    </picture>
    <div class="graffDraw-preview"></div>
    <div class="graffDraw-container" ref="container">
      <svg
        :class="graffInstance ? 'graffDraw-stroke' : 'graffDraw-stroke hidden'"
        width="1063"
        height="420"
        viewBox="0 0 1063 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M138.5 102.5L36.5 71V82.5L87.5 121.5L46.5 151L40 190L74.5 202.5L8.5 217.5L113.5 251.5L87.5 262L74.5 287.5L46.5 301.5L40 344L63.5 364.5V377L191.5 372L260.5 340V325.5L284.5 312H300L406 398.5H493L529.5 412.5L543.5 398.5L573.5 394.5L590.5 417.5L665.5 403.5L670 358H684.5L705 349L752.5 358H922.5L1028 340V328.5L926 312L915.5 289H837.5L945.5 254L1055.5 212L934.5 189.5L955 154L949 116.5L998 89V71.5L891.5 89V64L859 7.5L782 75.5L718 107.5H656.5L670 82.5L665.5 64L580.5 82.5L568 107.5L563 64H504.5L468.5 113L300 42L307 51.5L352.5 121.5H335.5L223 3.5L179.5 35V86.5L138.5 102.5Z"
          stroke="#ED6787"
          stroke-width="4"
          stroke-dasharray="21 21"
        />
      </svg>

      <p class="graffDraw-display display"></p>
      <img class="graffDraw-img" src="" alt="" />
      <img
        class="graffDraw-img--preview"
        v-if="!graffInstance && activePreviewUrl"
        :src="activePreviewUrl"
        alt=""
      />
      <canvas class="graffDraw-canvas"></canvas>
    </div>
    <CustomButton
      class="graffDraw-button medium"
      v-if="activePreviewUrl && !graffInstance"
      @click.native="valideSelectedGraff"
      :text="'Choisir ce graff'"
    />
    <ChatComponent
      class="graffDraw-chat "
      v-if="chatElementState"
      :content="currentChat"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import Graf from "~/core/interactions/Graf";
import $socket from "~/plugins/socket.io";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import CustomButton from "~/components/buttons/button.vue";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";

import { AssetsManager } from "~/core/managers";
import { IMAGE_ASSET } from "~/core/enums";
import {gsap} from "gsap";

@Component({
  components: {
    CustomButton,
    ChatComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const prismicContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;

      const graffSketchsList = prismicContent.slices4.map(
        (slice: any) => slice.items
      );
      const graffDialogues = prismicContent?.slices3;
      const currentChat = graffDialogues[0];

      return {
        graffSketchsList,
        graffDialogues,
        currentChat,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffActivity extends Vue {
  public graffSketchsList: any;
  public graffDialogues: any;
  public currentChat: object;
  public chatCounter: number = 0;
  public activePreview: any | null = null;
  public activePreviewUrl: string = "";
  public graffInstance: Graf | null = null;
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public wallTexture: HTMLImageElement = new Image();

  // get chatStep from store
  get chatStep() {
    return this.chatStore.chatStep;
  }
  get chatElementState() {
    return this.chatStore.isChatDisplay;
  }

  mounted() {
    this.handleMobileSelection();
    this.wallTexture = AssetsManager.getImage(
      IMAGE_ASSET.WALL_TEXTURE_GRAFF
    ).data;
    this.chatStore.setChatDisplay(true);
  }

  handleMobileSelection() {
    $socket.io.on("graffSelected", (idx) => {
      this.activePreview = this.graffSketchsList[idx];
      this.activePreviewUrl = this.activePreview[
        this.activePreview.length - 1
      ].layer.url;
    });
  }

  valideSelectedGraff() {
    $socket.io.emit("goTo", { path: "/_mobile/off", replace: true });
    this.$refs.container.style.zIndex = 4
    this.graffInstance = new Graf(this.activePreview, (step: string) => {
      this.displayChat(step);
    });
    console.log(this.graffInstance);
  }

  displayChat(step: string) {
    for (const key in this.graffDialogues) {
      const element = this.graffDialogues[key];
      if (element.primary.Identifiant === step) {
        this.currentChat = element;
        this.chatStore.setChatDisplay(true);
      }
    }
  }

  // Setting the next chat in the battleChat array to the currentChat variable.
  setNextChat() {
    this.chatCounter++;
    this.currentChat = this.graffDialogues[this.chatCounter];
  }

  hideChat() {
    this.chatStore.setChatDisplay(false);
  }

  transition() {

    return {
      leave(el: Element, done: Function) {
        console.log("transition leave ekip")

        let title = document.querySelector('.transition-title span') as HTMLElement
        title.innerHTML = `LE TIEKS`
        let infoContent = document.querySelector('.transitionInfo-content span') as HTMLElement
        infoContent.innerHTML = `Le quartier`

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

  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      switch (val) {
        case "reading":
          break;
        case "startSelection":
          this.hideChat();
          $socket.io.emit("goTo", { path: "/_mobile/graff/listing", replace: true });
          this.chatStore.setChatStep("reading");
          break;
        case "startInteraction":
          this.hideChat();
          $socket.io.emit("goTo", { path: "/_mobile/graff/bomb", replace: true });
          this.chatStore.setChatStep("reading");
          break;
        case "nextBomb":
          this.graffInstance?.nextLayer();
          this.hideChat();
          this.chatStore.setChatStep("reading");
          break;
        case "next":
          this.setNextChat();
          this.chatStore.setChatStep("reading");
          break;

        case "leaveInteraction":
          this.chatStore.setChatStep("reading");
          break;
        default:
          this.displayChat(val);
          this.chatStore.setChatStep("reading");
      }
    }
  }
}
</script>
