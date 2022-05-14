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
import {gsap} from 'gsap'
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

      const round2Step1 = battleContent?.slices6[0].items;
      const round2Step2 = battleContent?.slices7[0].items;
      const round2Step3 = battleContent?.slices8[0].items;
      const round2Step4 = battleContent?.slices9[0].items;

      const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[0];
      const currentPunchline = battlePunchRound1



      return {
        battleChat,
        battleOnboarding,
        currentChat,
        currentOnboarding,
        currentPunchline,
        round2Step1,
        round2Step2,
        round2Step3,
        round2Step4
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
  public isRound2: boolean = false
  public round2Step1:object
  public round2Step2:object
  public round2Step3:object
  public round2Step4:object
  public round2StepCounter:number = -1

  mounted() {
    this.initRound2Datas()
    this.title = this.$refs.title as HTMLElement

    console.log('BATTLE')
    console.log(this.battleChat,'<--- dialog battle')
    console.log(this.currentOnboarding,'<--- onboarding battle')

    console.log(this.currentChat,':::: current chat')

    $socket.io.on('battle::response',(ids)=>{
      console.log(ids,'OUUUUUUUI')


      this.hideOnboarding()
      if (ids=== null){
        this.punchlineArray.push('....')
      } else {
        ids.forEach((id)=>{
          if (this.isRound2){
            console.log('💩💩💩💩💩')
            this.punchlineArray = []
            this.punchlineArray.push(this.battleStore.round2Datas[this.round2StepCounter][id].content[0].text)
            console.log(this.battleStore.round2Datas)
          } else {
            this.punchlineArray.push(this.currentPunchline[id].content[0].text)
          }
        })
      }


      this.displayUserPunchline()

      this.isRound2 = true
      if (this.isRound2){
        this.round2StepCounter++
      }
    })

  }

  // URGENT DE REFACTO TOUTE CETTE METHODE
  displayUserPunchline() {
    this.punchlineArray.forEach((punch,i)=>{
      setTimeout(()=>{
        this.title.innerText = punch

        // ON DETECT L'APPARITION DU DERNIER ELEM DANS LE FOREACH: DANS LE FUTUR ON BOUGE ça
        // ÇA SERA REMPLACER PAR UNE TWEEN AVEC UN ON COMPLETE
        if (Object.is(this.punchlineArray.length -1,i)){
          setTimeout(()=>{
            this.title.innerText = ''
            if (this.round2StepCounter <= 0){
              console.log('CA PAASSE ici zebi')
              console.log(this.round2StepCounter,'<--- round2 counter')
              this.setNextChat()
              this.displayChat()
            }else {
              console.log("AHHHHH")
              this.displayOnboarding()
              $socket.io.emit('battle::round2Sequence')
            }
            console.log("LAST CALLBACK")

            this.punchlineArray.shift()
          },2000)
        }
      },2000 * i)
    })
    // this.punchlineArray = []
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

  goToRound2(){
    $socket.io.emit('battle::round2')
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
        case "nextRound":
          this.closeChat()
          this.displayOnboarding()
          this.goToRound2()
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

    }
  }

  initRound2Datas() {
    this.battleStore.setRound2Datas([this.round2Step1,this.round2Step2,this.round2Step3,this.round2Step4])
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
