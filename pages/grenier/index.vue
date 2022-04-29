<template>
  <section class="grenier">
      <h1>{{title}}</h1>

      // TODO : Diaglog components
      // TODO : Three scene
  </section>
</template> 

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";

@Component({
  components: {},
})

export default class GrenierScene extends Vue {
  public title: string = "Grenier 🚧";

  mounted() {
  }
}
</script>