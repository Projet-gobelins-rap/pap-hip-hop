<template>
  <div class="chat">
    <div class="chat-content" v-bind:class="{noChoice: !content.items[0].Choix}" ref="chatContent" @click="goToNextStep">
      <div class="chat-infos">

          <PrismicImage
            class="chat-infos--img"
            :field="content.primary.Name"
          />

          <PrismicImage
            class="chat-infos--img"
            :field="content.primary.Role"
          />

      </div>
      <PrismicRichText class="chat-text" :field="content.primary.Text" />

      <svg class="chat-arrow" v-if="!content.items[0].Choix" xmlns="http://www.w3.org/2000/svg"  width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="6 9 12 15 18 9" />
      </svg>

      <div class="triangle"></div>

    </div>
    <div class="chat-choices" v-if="content.items[0].Choix">
      <div
        class="chat-choice"
        v-for="(item, i) in content.items"
        :key="`slice-item-${i}`"
      >
<!--        <div>-->
<!--          {{item.linkUrl[0]}}-->
<!--        </div>-->
<!--        <PrismicRichText :field="item.linkUrl" />-->
<!--        -->
<!--        -->

        <CustomButton
          v-if="item.Choix && item.linkUrl[0]"
          :is-link="item.isLink"
          :link-url="item.linkUrl[0].text"
          class="chat-button medium"
          @click.native="nextStep(item.Choix.split('_')[0])"
          :text="item.Choix.split('_')[1]"
        />
        <CustomButton
          v-else-if="item.Choix"
          :is-link="item.isLink"
          class="chat-button medium"
          @click.native="nextStep(item.Choix.split('_')[0])"
          :text="item.Choix.split('_')[1]"
        />
      </div>
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
export default class ChatComponent extends Vue {
  @Prop({ required: true }) readonly content!: any;
  public chatStore = getModule(chatStore, this.$store);
  public chatContent: HTMLElement;


  mounted() {
    console.log(this.content,'content!!!')
    this.chatContent = this.$refs.chatContent as HTMLElement;
  }

  goToNextStep(){
    if (this.chatContent.classList.contains('noChoice')) {
      this.chatStore.setChatStep("next");
    }
  }


  // update dialogStep value in chatStore
  nextStep(action: string) {
    this.chatStore.setChatStep(action);
  }
}
</script>
