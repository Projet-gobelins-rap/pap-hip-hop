<template>
  <div class="navigation">
    <div class="navigation__logo">
      <nuxt-link to="/">Home</nuxt-link>
    </div>
    <div class="navigation__items">
      <nuxt-link to="/_mobile/connection">Mobile co</nuxt-link>
    </div>
    <div class="navigation__items">
      <nuxt-link to="/connection">Connect</nuxt-link>
    </div>
    <div class="navigation__items">
      <nuxt-link to="/graf">Graf</nuxt-link>
    </div>
    <div class="navigation__items">
      <nuxt-link to="/grenier">Grenier</nuxt-link>
    </div>
    <div class="navigation__items">
      <nuxt-link to="/hood">Hood</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import $socket from "~/plugins/socket.io";

@Component
export default class Navigation extends Vue {
  mounted() {
    console.log("Navigation log");

    $socket.io.on("goTo", (path) => {
      this.$router.push(path)
    });
  }
}
</script>
