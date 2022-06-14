<template>
  <section class="graffDraw">
    <span class="graffDraw-cursor"></span>
    <picture class="graffDraw-background">
      <img class="graffDraw-background--img" :src="wallTexture.src" alt="" />
    </picture>
    <div class="graffDraw-preview"></div>
    <div class="graffDraw-container">
      <p class="graffDraw-display display"></p>
      <img class="graffDraw-img" src="" alt="" />
      <img
        class="graffDraw-img--preview"
        v-if="!graffInstance"
        :src="activePreviewUrl"
        alt=""
      />
      <canvas class="graffDraw-canvas"></canvas>
    </div>
    <CustomButton
      class="graffDraw-button"
      v-if="activePreviewUrl && !graffInstance"
      @click.native="valideSelectedGraff"
      :text="'Choisir ce graff'"
    />
    <ChatComponent
      class="graffDraw-chat"
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
    this.chatStore.setChatDisplay(false);
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
    $socket.io.emit("goTo", { path: "/_mobile/graff/bomb", replace: true });

    this.graffInstance = new Graf(this.activePreview, (step: string) => {
      this.displayChat(step);
    });
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

  hideChat() {
    this.chatStore.setChatDisplay(false);
  }

  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      switch (val) {
        case "reading":
          break;
        case "startInteraction":
          this.hideChat();
          this.chatStore.setChatStep("reading");
          break;
        case "nextBomb":
          this.graffInstance?.nextLayer();
          this.hideChat();
          this.chatStore.setChatStep("reading");
          break;
        case "leaveInteraction":
          this.$router.push({ path: "/hood", replace: true });
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