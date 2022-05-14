<template>
  <section class="graffBomb">
    <div class="graffBomb-debug">
      <span class="graffBomb-debug--x">0</span>
      <span class="graffBomb-debug--y">0</span>
    </div>
    <CustomButton
      class="graffBomb-button"
      :text="'pssscht'"
    />
    <CustomButton
      class="graffBomb-button--calibrate"
      :text="'Calibrate'"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import GraffBomb from "~/core/interactions/GraffBomb.ts";
import CustomButton from "~/components/buttons/button.vue";

@Component({
  components: {
      CustomButton
  },
})
export default class Bomb extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public graffBombInstance: GraffBomb;

  mounted() {
    this.graffBombInstance = new GraffBomb();
  }

}
</script>