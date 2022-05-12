<template>
  <section class="collectibleSingle">
    <h1>{{ collectible.data.title }}</h1>
    <PrismicImage :field="collectible.data.image" />
    <PrismicRichText :field="collectible.data.description" />
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
    const collectible = await $prismic.api.getByUID("collectable", params.uid);
    if (collectible) {
      return { collectible };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
})
export default class collectibleSingle extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public collectible: any;
  mounted() {
    console.log(this.collectible);
  }
}
</script>
