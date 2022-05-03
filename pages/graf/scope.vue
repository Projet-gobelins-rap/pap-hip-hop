<template>
  <section class="scope desktop">
    {{ this.graf }}
    <img class="scope-background" src="/images/graf/city-rooftop.png" alt="">
    <DialogComponent :content="dialogs[dialogStep]"/>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";

import DialogComponent from "~/components/contentOverlays/dialog.vue";
import $socket from "~/plugins/socket.io";

@Component({
  components: {
      DialogComponent
  },
  async asyncData({ $prismic, error }) {
    try{
      const scopeContent = (await $prismic.api.getSingle('interaction-graff')).data
      const dialogs = scopeContent?.slices1
      return {
        dialogs,
        scopeContent
      }
    } catch (e) {
      // Returns error page
    //   error({ statusCode: 404, message: 'Content not found' })
    }
  }
})

  
export default class GraffActivity extends Vue {
  public graf: string = "Scope";
  public scopeContent:any
  public dialogs:any
  public dialogStep: number = 0
  
  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");

    // console.log(this.dialogs); 
     
    console.log($socket,'socket from plugin')
  } 
}
</script>
