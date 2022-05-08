<template>
  <div class="choices">

    <div v-for="(item, i) in content"  class="choices__item">
      <span>{{item.content[0].text}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import chatStore from "~/store/chatStore";

@Component({
  components: {
    CustomButton,
  },
})
export default class Choice extends Vue {
  @Prop({ required: true }) readonly content!: any;
  // public chatStore = getModule(chatStore, this.$store);

  mounted() {
    console.log(this.content,'<-- content choice')
    this.content.forEach((element)=>{
      console.log(element,'chouces')
    })
    // console.log(this.content,'<---');

    // // TODO : check if empty
    // // for (const item of this.content.items) {
    //
    // // }
    //
    // // TODO : handle click on text if no choices buttons
    // document.querySelector(".chat-text")?.addEventListener("click", (e) => {
    //   this.chatStore.setChatStep("next");
    // });
  }

}
</script>
