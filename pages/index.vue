<template>
  <section class="home">
    <nuxt-link class="home-link" to="/_mobile/phone">Mobile</nuxt-link>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import globalSceneStore from "~/store/globalSceneStore";
@Component({
  components: {},
})
export default class Home extends Vue {
  
  mounted() {
  }
}
</script>

 <style lang="scss">
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &-link {
    z-index: 100;
    position: relative;
  }
}
</style>
