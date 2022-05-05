<template>
  <section class="mobileScope">
    bomb
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";

 
@Component({
  components: {},
})
export default class MobileScope extends Vue {
  public stepStore = getModule(stepStore, this.$store);
 

  mounted() {
  
  }
}
</script>