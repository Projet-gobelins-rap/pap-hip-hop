<template>
  <section class="battle--mobile">
    <h1 ref="timer"></h1>
    <Choice v-if="displayChoice" :multiple-choice="false" :content="battlePunchline"></Choice>
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import {Vue, Component, getModule, Watch} from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";
import battleStore from "../../../store/battleStore";
import Choice from '~/components/Choice'
import Onboarding from '../../../components/contentOverlays/onboarding'
import onboardingStore from "../../../store/onboardingStore";
import choiceStore from "~/store/choiceStore";
import {gsap} from 'gsap'

@Component({
  components: {
    CustomButton,
    Choice,
    Onboarding
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      console.log(battleContent,'content du bbattlle (mobile)')
      const battleOnboarding = battleContent?.slices2[0].items;
      const battlePunchRound1 = battleContent?.slices3[0].items;
      const battleOnboardingRound2 = battleContent?.slices5[0].items;
      const battleOnboardingRound2Action = battleContent?.slices5[0];
      const battlePunchline = battlePunchRound1

      const round2Step1 = battleContent?.slices6[0].items;
      const round2Step2 = battleContent?.slices7[0].items;
      const round2Step3 = battleContent?.slices8[0].items;
      const round2Step4 = battleContent?.slices9[0].items;

      const currentOnboarding = battleOnboarding[1];

      return {
        battlePunchRound1,
        battleOnboardingRound2,
        battleOnboardingRound2Action,
        currentOnboarding,
        battlePunchline,
        battleOnboarding,
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
export default class round2Mobile extends Vue {
  public codeValue:number | null = null
  public battleStore = getModule(battleStore,this.$store)
  public onboardingStore = getModule(onboardingStore, this.$store)
  public battlePunchRound1: object;
  public currentOnboarding: object
  public displayChoice:boolean = false
  public choiceStore = getModule(choiceStore,this.$store)
  public onboardingCounter:number = 1
  public battleOnboardingRound2:object
  public roundStep: number = 0
  public battleOnboarding:object
  public battlePunchline:object
  public round2Step1:object
  public round2Step2:object
  public round2Step3:object
  public round2Step4:object
  public timer:HTMLElement

  mounted() {
    this.timer = this.$refs.timer as HTMLElement
    this.displayOnboarding()

    this.initRound2Datas()
    this.updateChoiceState()
    this.initRound2()
    this.round2Sequence()
  }

  initRound2(){
    $socket.io.on('battle::round2',()=>{
      this.displayRound2Onboarding()
      this.choiceStore.setMultipleChoice(false)
    })
  }


  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true)
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false)
  }

  displayRound2Onboarding() {
    this.currentOnboarding = this.battleOnboardingRound2
    console.log(this.currentOnboarding,'<--- OBR2')
    this.displayOnboarding()
  }

  updateChoiceState() {

    this.$on('choice::updateState',()=>{
      this.currentOnboarding = this.battleOnboarding[1]
      this.displayChoice = false
      this.displayOnboarding()

    })
  }

  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {

      switch (val) {
        case "reading":
          break;
        case "startRound2":
          this.hideOnboarding()
          this.displayRound2Punch();
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }


  round2Sequence(){
    $socket.io.on('battle::round2Sequence',()=>{
      this.displayRound2Punch()
    })


  }

  initRound2Datas() {
    this.battleStore.setRound2Datas([this.round2Step1,this.round2Step2,this.round2Step3,this.round2Step4])
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }

  // TODO :: AJOUTER LE TIMER
  displayRound2Punch(){
    console.log("R2 PUNCH")
    let timeleft = 10
    this.battlePunchline = this.battleStore.round2Datas[this.roundStep]
    this.hideOnboarding()
    this.displayChoice = true

    let timerInterval = setInterval(()=>{
      if (timeleft<=0){
        clearInterval(timerInterval)
        this.currentOnboarding = this.battleOnboarding[1]
        this.displayOnboarding()
        this.displayChoice = false
        $socket.io.emit('battle::response',null)
      }
      let currentTimerValue = 10 - timeleft
      this.timer.innerText = currentTimerValue.toString();

      timeleft -= 1;
    },1000)

    // on clear le timer si on a cliquer sur un bouton
    this.$on('choice::updateState',()=>{
      clearInterval(timerInterval)
      return
    })

    console.log(this.roundStep,'STEP de chaque round')
    if (this.roundStep >3){
      console.log('FIN DE LINTERACTION')
      clearInterval(timerInterval)
      return
    }

    this.roundStep++

  }

}
</script>

<style lang="sass" scoped>

</style>
