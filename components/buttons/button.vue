<template>
  <button class="btn">
    <span class="btn-text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class CustomButton extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string;

  mounted() {}
}
</script>