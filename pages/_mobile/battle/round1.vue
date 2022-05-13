<template>
  <section class="battle--mobile">
    <Choice v-if="displayChoice" :multiple-choice="true" :content="battlePunchline"></Choice>
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


      // const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[1];

      return {
        battlePunchRound1,
        battleOnboardingRound2,
        battleOnboardingRound2Action,
        currentOnboarding,
        battlePunchline,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class round1Mobile extends Vue {
  public codeValue:number | null = null
  public battleStore = getModule(battleStore,this.$store)
  public onboardingStore = getModule(onboardingStore, this.$store)
  public battlePunchRound1: object;
  public currentOnboarding: object
  public displayChoice:boolean = true
  public choiceStore = getModule(choiceStore,this.$store)
  public onboardingCounter:number = 1
  public battleOnboardingRound2:object
  // public battleOnboardingRound2Action:object
  public roundStep: number = 1
  public battlePunchline:object

  mounted() {
    console.log(this.currentOnboarding,'<--- current onboarrding mobile')
    this.updateChoiceState()
    this.initRound2()
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
      this.displayChoice = false
      this.$router.push('/_mobile/battle/round2')
      // this.displayOnboarding()

    })
  }

  initRound2(){
    $socket.io.on('battle::round2',()=>{
      this.displayRound2Onboarding()
      this.choiceStore.setMultipleChoice(false)
    })
  }

}
</script>

<style lang="sass" scoped>

</style>
