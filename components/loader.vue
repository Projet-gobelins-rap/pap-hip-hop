<template>
  <div class="loader">
    <h1>LOADER</h1>
    <h1>{{ loadProgression }}</h1>
  </div>
</template>

<script lang="ts">
import {Vue, Component, getModule, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class Loader extends Vue {
  @Prop({type: String, required: true}) readonly loadProgression!: string;
  mounted() {
    console.log('LOADERRRR ')
    console.log(this.loadProgression,':::: LOADERRRR ')
  }
}
</script>

