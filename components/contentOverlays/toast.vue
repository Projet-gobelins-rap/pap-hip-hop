<template>
  <button :class="'toast ' + type" ref="toast">
    <svg
      class="toast-icon"
      v-if="type == 'message'"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="28"
        cy="28"
        r="27"
        fill="#FEFEFE"
        stroke="#22D175"
        stroke-width="2"
      />
      <circle cx="28" cy="28" r="24" fill="#22D175" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37 19H22C21.4477 19 21 19.4477 21 20V31.5351C21.5883 31.1948 22.2714 31 23 31H37L34.3 27.4C33.2333 25.9778 33.2333 24.0222 34.3 22.6L37 19ZM21 35V40C21 40.5523 20.5523 41 20 41C19.4477 41 19 40.5523 19 40V19C19 17.8954 19.8954 17 21 17H37C38.6481 17 39.5889 18.8815 38.6 20.2L35.9 23.8C35.3667 24.5111 35.3667 25.4889 35.9 26.2L38.6 29.8C39.5889 31.1185 38.6481 33 37 33H23C21.8954 33 21 33.8954 21 35Z"
        fill="#FEFEFE"
      />
    </svg>

    <svg
      class="toast-icon"
      v-if="type == 'collec'"
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
    gsap.to(".collec .toast-timer", {
      strokeDashoffset: 212,
      duration: 5,
      ease: "none",
    });
  }
}
</script>