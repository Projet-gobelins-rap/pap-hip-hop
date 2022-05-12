<template>
  <section class="archives">
    <h1>Archives</h1>
    <ul>
      <li v-for="archive in archives.results" :key="archive.id" @click="$router.push(`/_mobile/phone/archives/${archive.uid}`)">
        {{archive.data.title}}
      </li>
    </ul>
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
    const archives = await $prismic.api.query(
      $prismic.predicates.at("document.type", "archive")
    );
    if (archives) {
      return { archives };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
})
export default class archives extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public archives: any;

  mounted() {
    console.log(this.archives);
  }
}
</script>
