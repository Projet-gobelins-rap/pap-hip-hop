<template>
  <video class="video" :src="sourceLink" autoplay muted>
  </video>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class Video extends Vue {

  @Prop({type: String, required: true}) readonly sourceLink!: string;

  mounted() {
  }
}
</script>

<style lang="sass" scoped>

</style>
