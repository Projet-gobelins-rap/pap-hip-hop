<template>
  <section class="graffListing">
    <h1>graff</h1>
    <ul class="graffListing-list">
        <li class="graffListing-listing" @click="select(i)" v-for="(graff, i) in this.graffsList" :key="`graff-${i}`">
            <PrismicImage class="graffListing-img" :field="graff.items[graff.items.length - 1].layer" />
            <PrismicRichText class="graffListing-name" :field="graff.primary.title" />
            <PrismicRichText class="graffListing-desc" :field="graff.primary.description" />
        </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import Scope from "~/core/interactions/Scope.ts";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
  async asyncData({ $prismic, error }) {
    try {
      const prismicContent = (await $prismic.api.getSingle("interaction-graff")).data;
      const graffsList = prismicContent.slices4

      return {
        graffsList,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffListing extends Vue {
  public graffsList: any;
  mounted() {
    console.log(this.graffsList);
  }

  select(idx: number) {
      $socket.io.emit('graffSelected', idx)
  }
}
</script>