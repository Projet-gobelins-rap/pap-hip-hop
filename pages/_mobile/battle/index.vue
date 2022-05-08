<template>
  <section class="battle--mobile">
    <Choice :content="battlePunchRound1"></Choice>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";
import battleStore from "../../../store/battleStore";
import Choice from '~/components/Choice'
@Component({
  components: {
    CustomButton,
    Choice
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      const battlePunchRound1 = battleContent?.slices3[0].items;

      // const currentChat = battleChat[0];
      // const currentOnboarding = battleOnboarding[0];


      return {
        battlePunchRound1,
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
  public battlePunchRound1: object;
  mounted() {

    console.log(this.battlePunchRound1,'<-- punch round 1')
    // $socket.on("phone_connected", (user) => {
    //   alert("phone_connected");
    //   this.$router.push('/')
    // });
  }

}
</script>

<style lang="sass" scoped>

</style>
