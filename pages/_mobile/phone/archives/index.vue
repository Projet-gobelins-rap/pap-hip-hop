<template>
  <section class="archives">
    <div class="container">
      <CustomButton
        class="collectibles-button small"
        @click.native="goToPrev"
        text="Retour"
      ></CustomButton>
      <h1 class="collectibles-title">Archives</h1>
      <p class="collectibles-text">
        Tu vas pouvoir retrouver ici l’ensemble des archives dont Papy t’as parlé dans le grenier. N’hésites pas à venir te documenter ici, tu devrais trouver plein d’anecdotes et d’infos sur le hip hop.
      </p>
    </div>
    <ul class="collectibles-list">
      <li
        v-for="archive in archives.results"
        :key="archive.id"
        :class=" ' collectibles-listing ' +archive.data.color "
        @click="$router.push(`/_mobile/phone/archives/${archive.uid}`)"
      >

        <prismic-image :field="archive.data.image" height="100" />
        <span class="collectibles-libelle">{{ archive.data.title }}</span>
      </li>
    </ul>
<!--      <h1>Archives</h1>-->
<!--      <ul>-->
<!--        <li v-for="archive in archives.results" :key="archive.id" @click="$router.push(`/_mobile/phone/archives/${archive.uid}`)">-->
<!--          {{archive.data.title}}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
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

  goToPrev() {
    this.$router.push({ path: "/_mobile/phone", replace: true });
  }
}
</script>
