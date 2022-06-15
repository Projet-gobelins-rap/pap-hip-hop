<template>
  <div class="navigation">
    <div class="navigation-icon" @click="toggleMenu" ref="burger">MENU</div>
    <div class="navigation-panel" v-if="menuOpen">
      <div class="navigation__items">
        <nuxt-link to="/intro" @click.native="toggleMenu">Home</nuxt-link>
      </div>
       <div class="navigation__items">
        <nuxt-link to="/connection" @click.native="toggleMenu">Connect</nuxt-link>
      </div>
       <div class="navigation__items">
        <nuxt-link to="/grenier" @click.native="toggleMenu">Grenier</nuxt-link>
      </div>
      <div class="navigation__items">
        <nuxt-link to="/hood" @click.native="toggleMenu">Hood</nuxt-link>
      </div>
      <div class="navigation__items">
        <nuxt-link to="/graf" @click.native="toggleMenu">Graf</nuxt-link>
      </div>
      <div class="navigation__items">
        <nuxt-link to="/battle" @click.native="toggleMenu">Battle</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import $socket from "~/plugins/socket.io";

@Component
export default class Navigation extends Vue {
  public menuOpen: boolean = false;
  
  mounted() {
    $socket.io.on("goTo", (path) => {
      this.$router.push(path);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
</script>

