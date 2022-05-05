<template>
  <div class="onboarding">
    <h1>Onboarding</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class Onboarding extends Vue{

  mounted(){
    console.log('Onboarding component')
  }
}
</script>
