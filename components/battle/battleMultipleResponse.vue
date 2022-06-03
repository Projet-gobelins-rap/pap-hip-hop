<template>
  <div class="responseContainer responseContainer--global" style="display: none;">
    <span class="battleResponse battleResponse--opponent">AAA</span>
    <span class="battleResponse battleResponse--player">BBB</span>
    <span class="battleResponse battleResponse--opponent">AAA</span>
    <span class="battleResponse battleResponse--player">BBB</span>
    <span class="battleResponse battleResponse--opponent">AAA</span>
    <span class="battleResponse battleResponse--player">BBB</span>
    <span class="battleResponse battleResponse--opponent">AAA</span>
    <span class="battleResponse battleResponse--player">BBB</span>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component({
})
export default class battleMultipleResponse extends Vue {

  mounted() {
  }
}
</script>
