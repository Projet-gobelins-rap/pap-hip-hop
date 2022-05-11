<template>
  <section class="battle">
    <h1 ref="title">BATTLE DESKTOP</h1>
    <ChatComponent v-if="this.chatDisplay && currentChat" :content="currentChat" />
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import {Vue, Component, getModule, Watch} from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import chatStore from "~/store/chatStore";
import battleStore from "../../store/battleStore";
import Onboarding from '../../components/contentOverlays/onboarding'
import onboardingStore from "../../store/onboardingStore";
import $socket from "~/plugins/socket.io";
@Component({
  components: {
    CustomButton,
    ChatComponent,
    Onboarding
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      const battleChat = battleContent?.slices1;
      const battleOnboarding = battleContent?.slices2[0].items;
      const battlePunchRound1 = battleContent?.slices3[0].items;

      const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[0];
      const currentPunchline = battlePunchRound1



      return {
        battleChat,
        battleOnboarding,
        currentChat,
        currentOnboarding,
        currentPunchline
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class battle extends Vue {
  public stepStore = getModule(stepStore,this.$store)
  public battleStore = getModule(battleStore,this.$store)
  public chatStore = getModule(chatStore, this.$store)
  public onboardingStore = getModule(onboardingStore, this.$store)
  public battleChat:any
  public battleOnboarding:any
  public currentChat: object;
  public currentOnboarding: object;
  public currentPunchline: object;
  public chatCounter:number = 0
  public punchlineArray: string[]= []
  public title:HTMLElement

  created() {

  }

  mounted() {
    this.title = this.$refs.title as HTMLElement

    console.log('BATTLE')
    console.log(this.battleChat,'<--- dialog battle')
    console.log(this.currentOnboarding,'<--- onboarding battle')

    console.log(this.currentChat,':::: current chat')

    $socket.io.on('battle::response',(ids)=>{
      this.hideOnboarding()
      ids.forEach((id)=>{
        this.punchlineArray.push(this.currentPunchline[id].content[0].text)
      })

      this.displayUserPunchline()

    })

  }

  displayUserPunchline() {
    this.punchlineArray.forEach((punch,i)=>{
      setTimeout(()=>{
        this.title.innerText = punch

        // ON DETECT L'APPARITION DU DERNIER ELEM DANS LE FOREACH: DANS LE FUTUR ON BOUGE ça
        // ÇA SERA REMPLACER PAR UNE TWEEN AVEC UN ON COMPLETE
        if (Object.is(this.punchlineArray.length -1,i)){
          setTimeout(()=>{
            this.title.innerText = ''
            console.log("LAST CALLBACK")
            this.setNextChat()
            this.displayChat()
          },2000)
        }

      },2000 * i)
    })
  }

  displayChat() {
    console.log('ZZZZ')
    this.battleStore.setIsChatDisplay(true)
  }
  closeChat() {
    this.battleStore.setIsChatDisplay(false)
  }

  setNextChat() {
    this.chatCounter++
    this.currentChat = this.battleChat[this.chatCounter]
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false)
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true)
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
          this.closeChat()
          this.displayOnboarding()
          this.chatStore.setChatStep("reading");
          break
      }
    }
  }

  // watch dialogStep change in chatStore store
  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);
      // switch (val) {
      //   case "reading":
      //     break;
      //   case "next":
      //     this.setNextChat();
      //     this.chatStore.setChatStep("reading");
      //     break;
      //
      //   case "selectPunch":
      //     this.closeChat()
      //     this.displayOnboarding()
      //     this.chatStore.setChatStep("reading");
      //     break
      // }
    }
  }

  // get chatStep from store
  get chatStep() {
    return this.chatStore.chatStep;
  }

  get chatDisplay() {
    return this.battleStore.isChatDisplay
  }

  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }

}
</script>

<style lang="sass" scoped>

</style>
