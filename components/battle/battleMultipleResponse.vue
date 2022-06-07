<template>
  <div class="responseContainer responseContainer--global">
    <span class="battleResponse battleResponse--group battleResponse--opponent"></span>
    <span class="battleResponse battleResponse--group battleResponse--player"></span>
    <span class="battleResponse battleResponse--group battleResponse--opponent"></span>
    <span class="battleResponse battleResponse--group battleResponse--player"></span>
    <span class="battleResponse battleResponse--opponent"></span>
    <span class="battleResponse battleResponse--player"></span>
    <span class="battleResponse battleResponse--opponent"></span>
    <span class="battleResponse battleResponse--player"></span>
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
