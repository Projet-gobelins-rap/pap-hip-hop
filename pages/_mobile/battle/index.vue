<template>
  <section class="battle--mobile">
    <Choice v-if="displayChoice" :multiple-choice="multipleChoiceState"  :content="battlePunchline"></Choice>
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
@Component({
  components: {
    CustomButton,
    Choice,
    Onboarding
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      console.log(battleContent,'content du bbattlle')
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
        battlePunchline
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class battleMobile extends Vue {
  public codeValue:number | null = null
  public battleStore = getModule(battleStore,this.$store)
  public onboardingStore = getModule(onboardingStore, this.$store)
  public battlePunchRound1: object;
  public currentOnboarding: object
  public displayChoice:boolean = true
  public multipleChoice:boolean = true
  public onboardingCounter:number = 1
  public battleOnboardingRound2:object
  // public battleOnboardingRound2Action:object
  public battlePunchline:object
  mounted() {
    // this.battlePunchline = this.battlePunchRound1
    //
    console.log(this.currentOnboarding,'<--- current onboarrding mobile')

    console.log(this.battlePunchRound1,'<-- punch round 1')

    // console.log(this.battleOnboardingRound2Action,'R222')
    // $socket.on("phone_connected", (user) => {
    //   alert("phone_connected");
    //   this.$router.push('/')
    // });
    this.ekipzebi()
    this.round2()

  }


  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true)
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false)
  }

  displayRound2Onboarding() {
    this.currentOnboarding = this.battleOnboardingRound2
    console.log(this.currentOnboarding,'<--- =:=:=: RV')
    this.displayOnboarding()
  }

  // TODO :: rename nom de la methode
  ekipzebi() {

    this.$on('choice::updateState',()=>{
      this.displayChoice = false
      // this.onboardingStore.setOnboardingDisplay(true)
      this.displayOnboarding()

    })
  }

  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);

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

  displayRound2Punch(){
    console.log("R2 PUNCH")
    this.displayChoice = true
  }
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
  round2(){
    $socket.io.on('battle::round2',()=>{
      this.displayRound2Onboarding()
      this.multipleChoice = false
      console.log("ROUND 2222")
    })
  }

  get multipleChoiceState() {
    return this.multipleChoice
  }

}
</script>

<style lang="sass" scoped>

</style>
