<template>
  <section class="mobileScope">
    <div class="mobileScope-debug">
      <span class="mobileScope-debug--x"></span>
      <span class="mobileScope-debug--y"></span>
      <span class="mobileScope-progress">
        <span class="mobileScope-progress--bar"></span>
      </span>
    </div>
    <div class="mobileScope-sight">
      <svg  class="mobileScope-pointer" width="68" height="68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 47.546A31.878 31.878 0 0 1 2 34c0-4.842 1.075-9.432 3-13.546M47.546 63A31.879 31.879 0 0 1 34 66a31.88 31.88 0 0 1-13.546-3M63 20.454c1.925 4.114 3 8.704 3 13.546 0 4.842-1.075 9.432-3 13.546M20.454 5C24.568 3.075 29.158 2 34 2c4.842 0 9.432 1.075 13.546 3" stroke="#FEFEFE" stroke-width="3"/></svg>
    </div>

    <div class="mobileScope-border">
      <svg
        class="mobileScope-border--svg"
        width="375"
        height="756"
        viewBox="0 0 375 756"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 756L375 756L375 -1.83582e-05L0 -1.83582e-05L0 756ZM16 582.828C16 670.241 93.6116 741.103 187.5 741.103C281.388 741.103 359 670.241 359 582.828V460.922C359 447.478 355.092 434.284 347.69 422.741L328.793 393.272C322.761 383.865 322.761 372.135 328.793 362.728L347.69 333.259C355.092 321.716 359 308.522 359 295.078V173.172C359 85.759 281.388 14.8965 187.5 14.8965C93.6116 14.8965 16 85.759 16 173.172L16 295.078C16 308.522 19.9083 321.716 27.3103 333.259L46.2069 362.728C52.239 372.135 52.239 383.865 46.2069 393.272L27.3103 422.741C19.9083 434.284 16 447.478 16 460.922L16 582.828Z"
          fill="#161820"
        />
        <path
          d="M326.709 397.433L342.977 422.801C350.827 435.044 355 449.282 355 463.826V571.104C355 662.737 279.225 737.104 187.5 737.104C95.7749 737.104 20 662.737 20 571.104L20 463.826C20 449.282 24.1729 435.044 32.0234 422.801L48.2909 397.433C55.8846 385.59 55.8845 370.41 48.2908 358.568L32.0234 333.199C24.1729 320.956 20 306.718 20 292.174L20 184.897C20 93.2628 95.7749 18.8966 187.5 18.8966C279.225 18.8966 355 93.2629 355 184.897V292.174C355 306.718 350.827 320.956 342.977 333.199L326.709 358.568C319.115 370.41 319.115 385.59 326.709 397.433Z"
          stroke="#FEFEFE"
          stroke-width="8"
        />
      </svg>
      
    </div>

    <div class="mobileScope-landscape">
      <div class="mobileScope-wrapper">
        <img class="mobileScope-img" :src="cityImage.src" alt="" />
        
        <!-- <svg
          class="mobileScope-markers"
          width="2320"
          height="1294"
          viewBox="0 0 2320 1294"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g class="mobileScope-marker">
            <circle
              class="mobileScope-marker--bg"
              cx="1566"
              cy="862"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle cx="1566" cy="862.001" r="15.6" fill="#ED6787" />
            <circle
              class="mobileScope-marker--progress"
              cx="1566"
              cy="862"
              r="26.6863"
              stroke="#22D175"
              stroke-width="2.62737"
            />
            <path
              d="M1566 857.125L1566 866.875M1570.88 862L1561.13 862"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
          <g class="mobileScope-marker">
            <circle
              class="mobileScope-marker--bg"
              cx="1124"
              cy="657"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle cx="1124" cy="657.001" r="15.6" fill="#ED6787" />
            <circle
              class="mobileScope-marker--progress"
              cx="1124"
              cy="657"
              r="26.6863"
              stroke="#22D175"
              stroke-width="2.62737"
            />
            <path
              d="M1124 652.125L1124 661.875M1128.88 657L1119.13 657"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
          <g class="mobileScope-marker">
            <circle
              class="mobileScope-marker--bg"
              cx="162"
              cy="831"
              r="24.6863"
              fill="white"
              fill-opacity="0.5"
              stroke="#FEFEFE"
              stroke-width="2.62737"
            />
            <circle
              class="mobileScope-marker--progress"
              cx="162"
              cy="831"
              r="26.6863"
              stroke="#22D175"
              stroke-width="2.62737"
            />
            <circle cx="161.999" cy="831.001" r="15.6" fill="#ED6787" />
            <path
              d="M162.001 826.125L162.001 835.875M166.876 831L157.126 831"
              stroke="#FEFEFE"
              stroke-width="2.62737"
              stroke-linecap="round"
            />
          </g>
        </svg> -->
        <svg class="mobileScope-markers" width="2320" height="1305" viewBox="0 0 2320 1305" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g class="mobileScope-marker">
        <path class="mobileScope-marker--bg" d="M1977.71 700.471C1977.71 714.093 1966.77 725.112 1953.29 725.112C1939.82 725.112 1928.87 714.093 1928.87 700.471C1928.87 686.85 1939.82 675.83 1953.29 675.83C1966.77 675.83 1977.71 686.85 1977.71 700.471Z" fill="white" fill-opacity="0.5" stroke="#FEFEFE" stroke-width="3.16014"/>
        <ellipse cx="1953.29" cy="700.472" rx="15.6" ry="15.7326" fill="#ED6787"/>
        <path class="mobileScope-marker--progress" d="M1979.71 700.471C1979.71 715.206 1967.87 727.129 1953.29 727.129C1938.71 727.129 1926.87 715.206 1926.87 700.471C1926.87 685.736 1938.71 673.813 1953.29 673.813C1967.87 673.813 1979.71 685.736 1979.71 700.471Z" stroke="#22D175" stroke-width="3.16014"/>
        <path d="M1953.29 695.555L1953.29 705.387M1958.17 700.471L1948.42 700.471" stroke="#FEFEFE" stroke-width="3.16014" stroke-linecap="round"/>
    </g>
    <g class="mobileScope-marker">
        <path class="mobileScope-marker--bg" d="M1401.34 480.554C1401.34 494.176 1390.39 505.195 1376.92 505.195C1363.44 505.195 1352.5 494.176 1352.5 480.554C1352.5 466.933 1363.44 455.913 1376.92 455.913C1390.39 455.913 1401.34 466.933 1401.34 480.554Z" fill="white" fill-opacity="0.5" stroke="#FEFEFE" stroke-width="3.16014"/>
        <ellipse cx="1376.92" cy="480.555" rx="15.6" ry="15.7326" fill="#ED6787"/>
        <path class="mobileScope-marker--progress" d="M1403.34 480.554C1403.34 495.29 1391.49 507.212 1376.92 507.212C1362.34 507.212 1350.5 495.29 1350.5 480.554C1350.5 465.819 1362.34 453.896 1376.92 453.896C1391.49 453.896 1403.34 465.819 1403.34 480.554Z" stroke="#22D175" stroke-width="3.16014"/>
        <path d="M1376.92 475.638L1376.92 485.471M1381.79 480.554L1372.04 480.554" stroke="#FEFEFE" stroke-width="3.16014" stroke-linecap="round"/>
    </g>
    <g class="mobileScope-marker">
        <path class="mobileScope-marker--bg" d="M705.336 394.763C705.336 408.384 694.39 419.404 680.916 419.404C667.442 419.404 656.496 408.384 656.496 394.763C656.496 381.141 667.442 370.122 680.916 370.122C694.39 370.122 705.336 381.141 705.336 394.763Z" fill="white" fill-opacity="0.5" stroke="#FEFEFE" stroke-width="3.16014"/>
        <path class="mobileScope-marker--progress" d="M707.336 394.763C707.336 409.498 695.495 421.421 680.916 421.421C666.337 421.421 654.496 409.498 654.496 394.763C654.496 380.027 666.337 368.105 680.916 368.105C695.495 368.105 707.336 380.027 707.336 394.763Z" stroke="#22D175" stroke-width="3.16014"/>
        <ellipse cx="680.915" cy="394.764" rx="15.6" ry="15.7326" fill="#ED6787"/>
        <path d="M680.917 389.846L680.917 399.679M685.792 394.763L676.042 394.763" stroke="#FEFEFE" stroke-width="3.16014" stroke-linecap="round"/>
    </g>
</svg>

      </div>
    </div>
    <Onboarding v-if="onboardingState" :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import Scope from "~/core/interactions/Scope.ts";
import Onboarding from "~/components/contentOverlays/onboarding";
import onboardingStore from "~/store/onboardingStore";
import { IMAGE_ASSET } from "~/core/enums";
import permisions from "~/core/utils/Permisions";
import { AssetsManager } from "~/core/managers";
import $socket from "~/plugins/socket.io";

@Component({
  components: {
    Onboarding,
  },
  async asyncData({ $prismic, error }) {
    try {
      const graffContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;

      console.log(graffContent);

      const rotateOnboarding = graffContent?.slices5[0].items;
      const gameplayOnboarding = graffContent?.slices5[1].items;
      const lootAtOnboarding = graffContent?.slices5[2].items[0];

      const currentOnboarding = rotateOnboarding[0];

      return {
        gameplayOnboarding,
        currentOnboarding,
        lootAtOnboarding,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class MobileScope extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public currentOnboarding: object;
  public gameplayOnboarding: object;
  public lootAtOnboarding: object;
  public onboardingCounter: number = 1;
  public scopeInteraction: Scope;
  public cityImage: HTMLImageElement = new Image();

  mounted() {
    this.scopeInteraction = new Scope(() => {
      this.displayLookAtDesktopOverlay()
    });

    this.currentOnboarding = this.gameplayOnboarding;
    this.displayOnboarding();

    $socket.io.on("scope:chatClossed", (id) => {
      this.onboardingStore.setOnboardingStep("closePopup");
    });

    document.addEventListener(
      "click",
      (e) => {
        this.cityImage = AssetsManager.getImage(IMAGE_ASSET.CITY_ROOFTOP).data;
        this.askPermisions();
      },
      { once: true }
    );
  }

  displayLookAtDesktopOverlay() {
    this.currentOnboarding = this.lootAtOnboarding;
    this.displayOnboarding();
  }

  // GETTERS
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
  get onboardingState() {
    return this.onboardingStore.isOnboardingDisplay;
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  askPermisions() {
    permisions.requestOrientation();
  }

  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);
      switch (val) {
        case "reading":
          break;
        case "closePopup":
          this.hideOnboarding();
          this.onboardingStore.setOnboardingStep("reading");
          this.scopeInteraction.start();
          break;
      }
    }
  }
}
</script>

<style>
.mobileScope-debug span {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: red;
}
</style>