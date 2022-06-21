<template>
  <section class="collectible">
    <div class="collectible-top">
      <CustomButton
        class="collectibles-button small"
        @click.native="goToPrev"
        text="Retour"
      ></CustomButton>
      <h1 class="collectible-title">{{ archive.data.title }}</h1>
      <PrismicImage
        class="collectible-icon"
        :field="archive.data.image"
        width="200"
      />
      <PrismicRichText
        class="collectible-intro"
        :field="archive.data.description"
      />
    </div>
    <div class="collectible-content">
      <div class="collectible-slice" v-for="(slice, idx) in archive.data.slices" :key="'slice'+idx">
        <PrismicImage class="collectible-image" v-if="slice.slice_type == 'image'" :field="slice.primary.image" />
        <PrismicRichText class="collectible-text" v-if="slice.slice_type == 'text'"  :field="slice.primary.text" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import $socket from "~/plugins/socket.io";
import CustomButton from "~/components/buttons/button.vue";

import permisions from "~/core/utils/Permisions";
@Component({
  components: {
    CustomButton,
  },
  async asyncData({ $prismic, params, error }) {
    const archive = await $prismic.api.getByUID("archive", params.uid);
    if (archive) {
      return { archive };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
})
export default class archiveSingle extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public archive: any;

  mounted() {}
  goToPrev() {
    this.$router.push({ path: "/_mobile/phone/archives", replace: true });
  }
}
</script>
