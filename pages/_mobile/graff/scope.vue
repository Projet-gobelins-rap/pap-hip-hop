<template>
  <section class="mobileScope">
    <div class="mobileScope-debug">
      <span class="mobileScope-debug--x"></span>
      <span class="mobileScope-debug--y"></span>
      <span class="mobileScope-progress">
        <span class="mobileScope-progress--bar"></span>
      </span>
      <!-- <span class="mobileScope-debug--nx">{{ nomalizeTranslation.x.toFixed(2) }}</span>
      <span class="mobileScope-debug--ny">{{ nomalizeTranslation.y.toFixed(2) }}</span> -->
    </div>

    <div class="mobileScope-landscape">
        <div class="mobileScope-wrapper">
            <img class="mobileScope-img" src="/images/graf/city-rooftop.png" alt="">
            <svg class="mobileScope-markers" width="3076" height="1829" viewBox="0 0 3076 1829" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect class="mobileScope-marker" x="685" y="549" width="120" height="120" fill="#ED6FD9" />
                <rect class="mobileScope-marker" x="1538" y="794" width="120" height="120" fill="#ED6FD9" />
                <rect class="mobileScope-marker" x="2010" y="429" width="120" height="120" fill="#ED6FD9" />
            </svg>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import Scope from "~/core/interactions/Scope.ts"

 
@Component({
  components: {},
})
export default class MobileScope extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public gyroscope: any;
  public sensor: any;
  public rotation: any = {
    x: 0,
    y: 0,
  };
  public nomalizeTranslation: any = {
    x: 0,
    y: 0,
  };

  mounted() {
    
    console.clear();
    console.log("scope");
    const scopeInteraction = new Scope()

    this.rotation = {
        x: scopeInteraction.normalizePosition.x,
        y: scopeInteraction.normalizePosition.y,
    };

  }
}
</script>