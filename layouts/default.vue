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
// import { io } from "socket.io-client";

@Component({
  components: {
    Navigation,
  },
})

export default class Default extends Vue {
  public icon: string = '🚧'
  // public socket:any

  head() {
    return {
      script: [
        {
          src: "/socket.io/socket.io.js",
        },
      ],
    }
  }

  mounted(){
    // Vue.prototype.$socket = io();
  }

}

</script>
