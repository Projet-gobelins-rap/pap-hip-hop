<template>
  <section class="collectibles">
    <h1>Collectables</h1>


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
  async asyncData({ $prismic, error }) {
    const collectibles = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'collectable')
    )
    if (collectibles) {
      return { collectibles };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
})
export default class collectibles extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public collectibles: any;

  mounted() {
    console.log(this.collectibles); 
  }
}
</script>
