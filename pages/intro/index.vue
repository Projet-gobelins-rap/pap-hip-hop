<template>
  <section class="intro">
    <div class="dialogWrapper">
<!--      <dialog >-->
<!--        <userCard></userCard>-->
<!--        <textCard></textCard>-->
        <CustomButton  @click.native="goToNextStep" text="Commencer"></CustomButton>
<!--      </dialog>-->
    </div>

  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import {AssetsManager} from "../../core/managers";
import {IMAGE_ASSET} from "../../core/enums";
@Component({
  components: {
    CustomButton
  },

  //
  // async asyncData({ $prismic, error }) {
  //
  //   try{
  //
  //     const desktopMedias = (await $prismic.api.getSingle('desktopMedias')).data
  //
  //     return {
  //       desktopMedias,
  //     }
  //   } catch (e) {
  //     // Returns error page
  //     error({ statusCode: 404, message: 'Page not found' })
  //   }
  // },

})
export default class Intro extends Vue {

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
    // console.log(AssetsManager.getImage(IMAGE_ASSET.BOOMBOX))
  }

  goToNextStep(){

    this.stepStore.setIntroState(true)
    this.$router.push('/connection')
  }

}
</script>

<style lang="sass" scoped>

</style>
