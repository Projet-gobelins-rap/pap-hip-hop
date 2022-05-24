<template>
  <div class="loader">
    <div class="loader-sticker">
      <svg class="loader-progress" width="238" height="238" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="119" cy="118.923" transform="rotate(43.682 119 118.923)" stroke="#6330CA" stroke-width="4" r="84"/><path d="M119 34.924c46.392 0 84 37.608 84 84 0 12.52-2.739 24.401-7.652 35.076" stroke="#FEFEFE" stroke-width="4" stroke-linecap="round"/></svg>
      <span class="loader-counter">{{ loadProgression }}%</span>
    </div>
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

