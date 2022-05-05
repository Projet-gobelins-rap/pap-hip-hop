<template>
  <section class="scope desktop">
    {{ this.graf }}
    <img class="scope-background" src="/images/graf/city-rooftop.png" alt="" />
    <ChatComponent v-if="currentChat" :content="currentChat" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import $socket from "~/plugins/socket.io";
import websocketManagerInstance from "~/core/managers/WebsocketManager";

@Component({
  components: {
    ChatComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const scopeContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;
      const conversation = scopeContent?.slices1;
      const focusPoints = scopeContent?.slices2;

      const currentChat = conversation[0];

      return {
        conversation,
        currentChat,
        focusPoints,
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
  public conversation: any;
  public chatDialogStep: string;
  public focusPoints: object;
  public currentChat: object;
  public currentChatNum: number = 0;
  public chatStore = getModule(chatStore, this.$store);

  mounted() {
    console.clear();
    console.log($socket);

    $socket.io.on("step", (data) => {
      let dataInfos = data.split(":");
      if (dataInfos[0] === "scope-focus") {
        this.displayFocusPointInfos(dataInfos[1]);
      }
    });
    console.log(this.focusPoints);
  }

  displayFocusPointInfos(data: string) {
    for (const key in this.focusPoints) {
      const element = this.focusPoints[key];
      if (element.primary.Identifiant === data) {
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

        case "custom2":
          console.log("custom 2");
          break;
        case "nextStep":
          this.$router.push("/graf/draw");
          this.chatStore.setChatStep("none");
          break;
        case "back":
          // TODO : back like in grenier scene
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
