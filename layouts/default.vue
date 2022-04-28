<template>
  <div class="main">
    <navigation/>
    <h1>{{this.icon}}</h1>
    <nuxt />
  </div>
</template>

<script lang="ts">

import Navigation from '~/components/navigation/Navigation.vue'
import {Vue, Component} from "nuxt-property-decorator";

@Component({
  components: {
    Navigation,
  },
})

export default class Default extends Vue {
  public icon: string = '🚧'
  // public socket:any

  head() {

  }

  mounted(){
  }

}

</script>
