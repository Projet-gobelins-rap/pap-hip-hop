<template>
  <section class="scope desktop">
    {{ this.graf }}
    <img class="scope-background" :src="cityImage.src" alt="" />
    <ChatComponent v-if="chatElementState" :content="currentChat" />
    <Onboarding :content="lookAtOnboarding"></Onboarding>
  </section>
</template>
 
<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";
import $socket from "~/plugins/socket.io";
import { AssetsManager } from "~/core/managers";
import { IMAGE_ASSET } from "~/core/enums";

@Component({
  components: {
    ChatComponent,
    Onboarding,
  },
  async asyncData({ $prismic, error }) {
    try {
      const scopeContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;
      const conversation = scopeContent?.slices1;
      const focusPoints = scopeContent?.slices2;
      const lookAtOnboarding = scopeContent?.slices5[3].items;

      const currentChat = conversation[0];

      return {
        conversation,
        currentChat,
        focusPoints,
        lookAtOnboarding,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffActivity extends Vue {
  public graf: string = "Scope";
  public scopeContent: object;
  public conversation: object;
  public chatDialogStep: string;
  public focusPoints: object;
  public currentChat: object;
  public currentChatNum: number = 0;
  public lookAtOnboarding: object;
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public cityImage: HTMLImageElement = new Image();

  mounted() {
    this.cityImage = AssetsManager.getImage(IMAGE_ASSET.CITY_ROOFTOP).data;
    this.displayChat();
    $socket.io.on("scope:focus", (id) => {
      this.hideOnboarding();
      this.displayFocusPointInfos(id);
      this.displayChat();
    });
  }

  displayFocusPointInfos(id: string) {
    for (const key in this.focusPoints) {
      const element = this.focusPoints[key];
      if (element.primary.Identifiant === id) {
        this.currentChat = element;
      }
    }
  }

  // Set next linked chat by using identifier in current chat
  setDialogByID() {
    for (const key in this.conversation) {
      const element = this.conversation[key];

      if (element.primary.Identifiant === this.chatDialogStep) {
        this.currentChat = element;
        this.currentChatNum = parseInt(key);
      }
    }
  }

  // Set next message in conversation order
  setNextDialog() {
    this.currentChatNum++;
    this.currentChat = this.conversation[this.currentChatNum];
  }

  // get chatStep from store
  get chatStep() {
    return this.chatStore.chatStep;
  }
  get chatElementState() {
    return this.chatStore.isChatDisplay;
  }

  displayChat() {
    this.chatStore.setChatDisplay(true);
  }

  hideChat() {
    this.chatStore.setChatDisplay(false);
  }
  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
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

        case "custom":
          console.log("custom 1");
          break;
        case "startInteraction":
          $socket.io.emit("goTo", {
            path: "/_mobile/graff/scope",
            replace: true,
          });
          this.hideChat();
          this.displayOnboarding();
          break;
        case "nextStep":
          this.$router.push("/graf/draw");
          this.chatStore.setChatStep("none");
          $socket.io.emit("goTo", {
            path: "/_mobile/graff/listing",
            replace: true,
          });
          break;
        case "back":
          $socket.io.emit("scope:chatClossed");
          this.hideChat();
          break;

        default:
          this.chatDialogStep = val;
          this.setDialogByID();
          break;
      }
    }
  }
}
</script>
