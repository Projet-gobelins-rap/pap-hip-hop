<template>
  <section class="collectibleSingle">
      <h1>Collectable single</h1>
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
export default class collectibleSingle extends Vue {

  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    
  }
}
</script>
