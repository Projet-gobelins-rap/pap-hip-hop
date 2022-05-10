<template>
  <section class="battle--mobile">
    <Choice v-if="this.displayChoice" :multiple-choice="true"  :content="battlePunchRound1"></Choice>
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
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

      const battleOnboarding = battleContent?.slices2[0].items;
      const battlePunchRound1 = battleContent?.slices3[0].items;

      // const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[1];

      return {
        battlePunchRound1,
        currentOnboarding
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
  mounted() {

    console.log(this.currentOnboarding,'<--- current onboarrding mobile')

    console.log(this.battlePunchRound1,'<-- punch round 1')
    // $socket.on("phone_connected", (user) => {
    //   alert("phone_connected");
    //   this.$router.push('/')
    // });
    this.ekipzebi()

  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true)
  }

  ekipzebi() {

    this.$on('choice::updateState',()=>{
      this.displayChoice = false
      this.displayOnboarding()
    })
  }

  // v-on="ekipzebi"

}
</script>

<style lang="sass" scoped>

</style>
