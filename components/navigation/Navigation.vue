<template>
 <div class="navigation">
   <div class="navigation__logo">
    <nuxt-link to="/">Home</nuxt-link>
   </div>
   <div class="navigation__items">
     <nuxt-link to="/about">About</nuxt-link>
   </div>
   <div class="navigation__items">
     <nuxt-link to="/connect">Connect</nuxt-link>
   </div>
   <div class="navigation__items">
     <nuxt-link to="/graf">Graf</nuxt-link>
   </div>

 </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class Navigation extends Vue{

  mounted(){
    console.log('Navigation log')
  }
}

</script>
