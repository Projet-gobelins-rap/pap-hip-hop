<template>
  <button class="toast" ref="toast">
    <svg
      class="toast-icon"
      v-if="type == 'message'"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="toast-timer"
        cx="30"
        cy="30"
        r="28.6053"
        fill="#FEFEFE"
        stroke="#EDCC50"
        stroke-width="2"
      />
      <circle cx="29.9999" cy="30" r="23.6842" fill="#EDCC50" />
      <path
        d="M41.8422 27.8964C41.8422 32.3323 39.1248 36.1668 35.181 37.9875C34.4735 38.3141 33.7266 38.5759 32.9489 38.7647C32.2205 39.8165 30.0001 43.3224 30.0001 43.3224C30.0001 43.3224 27.7797 39.8165 27.0513 38.7647C26.2735 38.5759 25.5266 38.3141 24.8191 37.9875C20.8754 36.1668 18.158 32.3323 18.158 27.8964C18.158 21.7005 23.4598 16.6776 30.0001 16.6776C36.5403 16.6776 41.8422 21.7005 41.8422 27.8964Z"
        stroke="#FEFEFE"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <circle cx="25.5594" cy="27.7796" r="1.48026" fill="#FEFEFE" />
      <circle cx="30" cy="27.7796" r="1.48026" fill="#FEFEFE" />
      <circle cx="34.441" cy="27.7796" r="1.48026" fill="#FEFEFE" />
    </svg>

    <svg
      class="toast-icon"
      v-if="type == 'collectible'"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="toast-timer"
        cx="30"
        cy="30"
        r="28.3919"
        fill="#FEFEFE"
        stroke="#EDCC50"
        stroke-width="2"
      />
      <circle cx="30.0001" cy="30" r="23.5135" fill="#EDCC50" />
      <circle cx="31" cy="29" r="11" stroke="#FEFEFE" stroke-width="2" />
      <circle
        cx="28"
        cy="32"
        r="11"
        fill="#EDCC50"
        stroke="#FEFEFE"
        stroke-width="2"
      />
      <path
        d="M27.7955 27.7956V32.2044M27.7955 32.2044V36.6132M27.7955 32.2044H23.3867M27.7955 32.2044H32.2043"
        stroke="#FEFEFE"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
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
  @Prop({ type: String, required: true }) readonly type: string;

  mounted() {
    console.log(this.$refs);
    this.timerAnimation();
  }

  timerAnimation() {
    gsap.to(".toast-timer", {
      strokeDashoffset: 212,
      duration: 5,
      ease: "none",
    });
  }
}
</script>