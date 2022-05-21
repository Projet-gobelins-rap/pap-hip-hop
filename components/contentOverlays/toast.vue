<template>
  <button class="toast" ref="toast">
    <span class="toast-text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import gsap from "gsap";

@Component({
  components: {},
})
export default class Toast extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string;

  mounted() {
    console.log(this.$refs);
  }
}
</script>