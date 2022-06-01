<template>
  <section class="archive">
     <div class="archive-top">
      <CustomButton
        class="archive-button small"
        @click.native="goToPrev"
        text="Retour"
      ></CustomButton>
      <h1 class="archive-title">{{ archive.data.title }}</h1>
      
      <PrismicRichText
        class="archive-intro"
        :field="archive.data.text"
      />
    </div>
    <div class="archive-content">
      <div class="archive-slice" v-for="(slice, idx) in archive.data.slices" :key="'slice'+idx">
        <PrismicImage class="archive-image" v-if="slice.slice_type == 'image'" :field="slice.primary.image" />
        <PrismicRichText class="archive-text" v-if="slice.slice_type == 'text'"  :field="slice.primary.text" />
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
}
</script>
