<template>
  <div class="loader">
    <h1>LOADER</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class Loader extends Vue {

  mounted() {
    console.log('LOADERRRR ')
  }
}
</script>

