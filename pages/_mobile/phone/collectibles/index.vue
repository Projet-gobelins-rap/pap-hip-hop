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
        :class="
          isLocked(collectible.uid) +
          ' collectibles-listing ' +
          collectible.data.color
        "
        @click="$router.push(`/_mobile/phone/collectibles/${collectible.uid}`)"
      >
        <svg
          v-if="isLocked(collectible.uid) == 'locked'"
          width="96"
          height="97"
          viewBox="0 0 96 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="47.7818"
            cy="48.3262"
            r="40.2862"
            transform="rotate(-12 47.7818 48.3262)"
            fill="#FEFEFE"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37.2709 42.9137C36.027 37.0619 38.1515 31.6522 43.9745 30.4144C49.7976 29.1767 53.9387 33.2547 55.1826 39.1065L55.2148 39.2579L55.9452 39.1026C57.0257 38.8729 58.0877 39.5626 58.3173 40.6431L62.0544 58.2246C62.2841 59.305 61.5944 60.367 60.5139 60.5967L41.1413 64.7145C40.0608 64.9441 38.9988 64.2544 38.7691 63.174L35.0321 45.5925C34.8024 44.5121 35.4921 43.45 36.5726 43.2204L37.303 43.0651L37.2709 42.9137ZM51.6324 40.0193L51.6002 39.8679C50.7414 35.8274 48.7566 33.1422 44.736 33.9968C40.7153 34.8514 39.9944 38.1117 40.8532 42.1523L40.8854 42.3037L51.6324 40.0193ZM46.0107 51.0033C45.7523 49.7876 46.5452 48.5891 47.7818 48.3262C49.0183 48.0634 50.2302 48.8358 50.4886 50.0515C50.6618 50.8662 50.3627 51.6733 49.7744 52.1961L50.4242 55.253L48.1852 55.7289L47.5354 52.672C46.7853 52.4337 46.1838 51.818 46.0107 51.0033Z"
            fill="#ED6787"
          />
          <circle
            cx="47.7818"
            cy="48.3265"
            r="32.9614"
            transform="rotate(-12 47.7818 48.3265)"
            stroke="#ED6787"
            stroke-width="2"
          />
        </svg>

        <prismic-image v-else :field="collectible.data.image" height="100" />
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
import collectibleStore from "~/store/collectibleStore";
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
  public collectibleStore = getModule(collectibleStore, this.$store);
  public collectibles: any;

  mounted() {
    console.log(this.collectedItems);
  }

  goToPrev() {
    this.$router.push({ path: "/_mobile/phone/", replace: true });
  }

  isLocked(collectibleID: string) {
    return this.collectedItems.includes(collectibleID) ? "" : "locked";
  }

  get collectedItems() {
    console.log(this.collectibleStore.collected);

    return this.collectibleStore.collected;
  }
}
</script>
