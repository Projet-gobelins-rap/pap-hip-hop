<template>
  <section class="intro">
    <CustomButton @click.native="goToNextStep" text="Commencer"></CustomButton>


<!--        <div v-for="(item, i) in this.desktopMedias.slices[0].items" :key="`slice-item-${i}`">-->
<!--          <PrismicLink :field="item.media">My Link</PrismicLink>-->
<!--        </div>-->

  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
@Component({
  components: {
    CustomButton
  },

  async asyncData({ $prismic, error }) {

    try{

      const desktopMedias = (await $prismic.api.getSingle('desktopMedias')).data

      return {
        desktopMedias,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

})
export default class Intro extends Vue {

  public stepStore = getModule(stepStore,this.$store)
  public desktopMedias:any

  mounted() {
    console.log(this.desktopMedias.slices[0],'desktopMedias')
  }

  goToNextStep(){

    this.stepStore.setIntroState(true)
    this.$router.push('/connection')
  }

}
</script>

<style lang="sass" scoped>

</style>
