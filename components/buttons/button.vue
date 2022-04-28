<template>
  <button class="btn">{{ text }}</button>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class CustomButton extends Vue {

  @Prop({type: String, required: true}) readonly text!: string;

  mounted() {
  }
}
</script>

<style lang="sass" scoped>

</style>
