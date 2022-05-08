<template>
  <section class="battle">
    <h1>BATTLE DESKTOP</h1>
    <ChatComponent v-if="this.chatElementState && currentChat" :content="currentChat" />
  </section>
</template>

<script lang="ts">
import {Vue, Component, getModule, Watch} from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import chatStore from "~/store/chatStore";
import battleStore from "../../store/battleStore";

@Component({
  components: {
    CustomButton,
    ChatComponent
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle"))
        .data;
      const battleChat = battleContent?.slices1;
      const battleOnboarding = battleContent?.slices2;

      const currentChat = battleChat[0];
      // const conversation = battleContent?.slices1;

      return {
        battleChat,
        battleOnboarding,
        currentChat
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class battle extends Vue {
  public codeValue:number | null = null

  public stepStore = getModule(stepStore,this.$store)
  public battleStore = getModule(battleStore,this.$store)
  public chatStore = getModule(chatStore, this.$store)
  public battleChat:any
  public battleOnboarding:any
  public currentChat: object;
  public chatCounter:number = 0
  mounted() {
    console.log('BATTLE')
    console.log(this.battleChat,'<--- dialog battle')
    console.log(this.battleOnboarding,'<--- onboarding battle')

    console.log(this.currentChat,':::: current chat')

  }

  setCurrentChat() {

  }

  setNextChat() {
    this.chatCounter++
    this.currentChat = this.battleChat[this.chatCounter]
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
          this.setNextChat();
          this.chatStore.setChatStep("reading");
          break;

        case "selectPunch":
          this.chatStore.setChatStep("reading");
          break
      }
    }
  }

  // get chatStep from store
  get chatStep() {
    return this.chatStore.chatStep;
  }

  get chatElementState() {
    return this.battleStore.isChatDisplay
  }

}
</script>

<style lang="sass" scoped>

</style>
