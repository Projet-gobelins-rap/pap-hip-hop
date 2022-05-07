<template>
  <section class="battle">
    <h1>BATTLE DESKTOP</h1>
    <ChatComponent v-if="this.chatElementState" :content="currentChat" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
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
      const battleDialog = battleContent?.slices1;
      const battleOnboarding = battleContent?.slices2;
      // const conversation = battleContent?.slices1;

      return {
        battleDialog,
        battleOnboarding,
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
  public battleDialog:any
  public battleOnboarding:any
  public currentChat:any

  mounted() {
    console.log('BATTLE')
    console.log(this.battleDialog,'<--- dialog battle')
    console.log(this.battleOnboarding,'<--- onboarding battle')
  }

  get chatElementState() {
    return this.battleStore.isChatDisplay
  }

}
</script>

<style lang="sass" scoped>

</style>
