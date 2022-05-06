<template>
  <section class="phoneHome">
      <h1 >Home</h1>
      <ul class="phoneHome-apps">
          <li class="phoneHome-app">
              <nuxt-link class="phoneHome-link" to="/_mobile/phone/archives">Archives</nuxt-link>
          </li>
          <li class="phoneHome-app">
              <nuxt-link class="phoneHome-link" to="/_mobile/phone/collectibles">Collectables</nuxt-link>
          </li>
          <li class="phoneHome-app">
              <nuxt-link class="phoneHome-link" to="/_mobile/connection">Connexion</nuxt-link>
          </li>
           <li class="phoneHome-app">
              <nuxt-link class="phoneHome-link" to="/_mobile/graff/scope">Interaction 1</nuxt-link>
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
})
export default class phoneHome extends Vue {

  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    
  }
}
</script>
