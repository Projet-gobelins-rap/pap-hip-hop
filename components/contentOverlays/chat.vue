<template>
  <div class="chat">
    <div class="chat-content">
      <div class="chat-infos">
<!--        <picture class="chat-infos&#45;&#45;pic">-->
          <PrismicImage
            class="chat-infos--img"
            :field="content.primary.Name"
          />
<!--        </picture>-->

<!--        <picture class="chat-infos&#45;&#45;pic">-->
          <PrismicImage
            class="chat-infos--img"
            :field="content.primary.Role"
          />
<!--        </picture>-->

      </div>
      <PrismicRichText class="chat-text" :field="content.primary.Text" />
    </div>
    <div class="chat-choices" v-if="content.items.length > 0">
      <div
        class="chat-choice"
        v-for="(item, i) in content.items"
        :key="`slice-item-${i}`"
      >
        <CustomButton
          v-if="item.Choix"
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

  mounted() {
    console.log(this.content);

    // TODO : check if empty
    // for (const item of this.content.items) {

    // }

    // TODO : handle click on text if no choices buttons
    document.querySelector(".chat-text")?.addEventListener("click", (e) => {
      this.chatStore.setChatStep("next");
    });
  }

  // update dialogStep value in chatStore
  nextStep(action: string) {
    this.chatStore.setChatStep(action);
  }
}
</script>
