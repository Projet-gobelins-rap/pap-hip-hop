<template>
  <div :class="'point point-0 ' + data.type" :style="style()">
    <svg
      v-if="data.type == 'npc'"
      class="point-npc"
      width="49"
      height="54"
      viewBox="0 0 49 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.7593 23.2331C47.7593 31.6284 42.5091 38.8858 34.8895 42.3316C33.5226 42.9498 32.0796 43.4452 30.5769 43.8026C29.1696 45.7932 24.8796 52.4286 24.8796 52.4286C24.8796 52.4286 20.5897 45.7932 19.1824 43.8026C17.6797 43.4452 16.2366 42.9498 14.8698 42.3316C7.2502 38.8858 2 31.6284 2 23.2331C2 11.5064 12.2436 2 24.8796 2C37.5157 2 47.7593 11.5064 47.7593 23.2331Z"
        fill="#7C44ED"
        stroke="#FEFEFE"
        stroke-width="2.41821"
        stroke-linejoin="round"
      />
      <ellipse
        cx="15.0743"
        cy="23.2748"
        rx="3.26852"
        ry="3.15179"
        fill="#FEFEFE"
      />
      <ellipse
        cx="24.8795"
        cy="23.2748"
        rx="3.26852"
        ry="3.15179"
        fill="#FEFEFE"
      />
      <ellipse
        cx="34.6854"
        cy="23.2748"
        rx="3.26852"
        ry="3.15179"
        fill="#FEFEFE"
      />
    </svg>
    <svg
      v-else
      class="point-plus"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.6" cy="15.6" r="15.6" fill="#ED6787" />
      <path
        d="M15.6015 10.7241L15.6015 20.4741M20.4765 15.5991L10.7265 15.5991"
        stroke="#FEFEFE"
        stroke-width="2.62737"
        stroke-linecap="round"
      />
    </svg>
    <p class="point-text">{{ data.name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import { InteractionPoint as InteractionPointData } from "~/core/config/global-scene/interact-points/types";
import grenierSceneStore from "../store/grenierSceneStore";

@Component
export default class InteractionPoints extends Vue {
  @Prop({ type: Object, required: true })
  readonly data!: InteractionPointData;
  public grenierSceneStore: grenierSceneStore = getModule(
    grenierSceneStore,
    this.$store
  );

  mounted() {}

  style() {
    return `transform: translateX(${this.data.transformX}px) translateY(${this.data.transformY}px)`;
  }

  public isCompleted() {
    return this.data.isCompleted(this.grenierSceneStore);
  }
}
</script>
