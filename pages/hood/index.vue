<template>
  <section class="hood">
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
@Component({
  components: {
  },
})

export default class GrenierScene extends Vue {
  public stepStore = getModule(stepStore,this.$store)

  mounted() {

    console.log('Boyz in da hood');
    
  }

}
</script>
