<template>
  <div class="dialog">
    oui
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
      <PrismicRichText :field="content.primary.Text" />
    </div>
    <div
      class="dialog-choices"
      v-for="(item, i) in content.items"
      :key="`slice-item-${i}`"
    >
      {{ item.Choix }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class DialogComponent extends Vue {
  @Prop({ required: true }) readonly content!: any;

  mounted() {
    console.log(this.content);
  }
}
</script>