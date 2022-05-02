<template>
  <section class="intro">
    <CustomButton @click.native="goToNextStep" text="Commencer"></CustomButton>


<!--    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">-->
<!--      <PrismicLink :field="item.media">My Link</PrismicLink>-->
<!--    </div>-->
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

      // const posts = (await $prismic.api.getSingle('post')).data
      const desktopMedias = (await $prismic.api.getSingle('desktopMedias')).data

      // const posts = await $prismic.api.query(
      //     $prismic.predicates.at("document.type", "post"),
      //     { orderings : '[document.first_publication_date]' }
      // )

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
    console.log(this.desktopMedias,'desktopMedias')
  }

  goToNextStep(){

    this.stepStore.setIntroState(true)
    this.$router.push('/connection')
  }

}
</script>

<style lang="sass" scoped>

</style>
