<template>
  <section class="collectibles">
    <div class="container">
      <CustomButton
        class="collectibles-button small"
        @click.native="goToPrev"
        text="Retour"
      ></CustomButton>
      <h1 class="collectibles-title">Collectables</h1>
      <p class="collectibles-text">
        C’est ici que tous les objets que tu trouves en ville sont rassemblés.
        Ils sont accessible n’importe quand et pourront peut-être t’être utile
        avec les personnes que tu rencontres !
      </p>
    </div>
    <ul class="collectibles-list">
      <li
        v-for="collectible in collectibles.results"
        :key="collectible.id"
        :class="'collectibles-listing ' + collectible.data.color"
        @click="$router.push(`/_mobile/phone/collectibles/${collectible.uid}`)"
      >
        <prismic-image :field="collectible.data.image" height="100" />
        <span class="collectibles-libelle">{{ collectible.data.title }}</span>
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
    const collectibles = await $prismic.api.query(
      $prismic.predicates.at("document.type", "collectable")
    );
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

  goToPrev() {
    this.$router.push({ path: "/_mobile/phone/", replace: true });
  }
}
</script>
