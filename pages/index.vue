<template>
  <section class="home">
<!--    {{ this.home }}-->
<!--    <span id="code">{{this.code}}</span>-->

  <h1>home</h1>
  <CustomButton @click.native="goToNextStep" text="Commencer"></CustomButton>

  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";

@Component({
  components: {
    CustomButton
  }
})

export default class HomeMobile extends Vue {

  public stepStore = getModule(stepStore,this.$store)

  mounted() {
  }

  goToNextStep(){

    this.stepStore.setIntroState(true)
    this.$router.push('/_mobile/mobileConnection')
  }
 
}

</script>


 