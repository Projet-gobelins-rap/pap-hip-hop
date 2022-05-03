<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-infos">
        <picture class="dialog-infos--pic">
          <PrismicImage
            class="dialog-infos--img"
            :field="content.primary.Photo"
          />
        </picture>
        <p class="dialog-infos--name">{{ content.primary.Nom }}</p>
      </div>
      <PrismicRichText class="dialog-text" :field="content.primary.Text" />
    </div>
    <div class="dialog-choices" v-if="content.items.length > 0">
      <div
        class="dialog-choice"
        v-for="(item, i) in content.items"
        :key="`slice-item-${i}`"
      >
        <CustomButton
          v-if="item.Choix"
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
import dialogStore from "~/store/dialogStore";

@Component({
  components: {
    CustomButton,
  },
})
export default class DialogComponent extends Vue {
  @Prop({ required: true }) readonly content!: any;
  public dialogStore = getModule(dialogStore, this.$store);

  mounted() {
    console.log(this.content);

    // TODO : check if empty
    // for (const item of this.content.items) {

    // }

    // TODO : handle click on text if no choices buttons
    document.querySelector(".dialog-text")?.addEventListener("click", (e) => {
      this.dialogStore.setDiaglogStep("next");
    });
  }

  // update dialogStep value in dialogStore
  nextStep(action: string) {
    this.dialogStore.setDiaglogStep(action);
  }
}
</script>