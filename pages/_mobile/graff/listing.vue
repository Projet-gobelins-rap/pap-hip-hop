<template>
  <section class="graffListing">
      <h1>graff</h1>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import Scope from "~/core/interactions/Scope.ts"

@Component({
  components: {},
})
export default class GraffListing extends Vue {

  mounted() {

  }
}
</script>