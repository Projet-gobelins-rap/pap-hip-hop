<template>
  <div class="main">
    <!-- NAVIGATION   -->
    <navigation />

    <transition-overlay  v-if="this.globalStore.isAppInit"></transition-overlay>
    <!-- LOADER   -->
    <transition v-on:leave="leaveLoader" appear>
      <Loader
        :load-progression="this.loadingProgressions"
        v-if="!loaderStore.isAlreadyLoaded"
      >
      </Loader>
    </transition>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Navigation from "~/components/navigation/Navigation.vue";
import Loader from "~/components/loader.vue";
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import { AssetsManager } from "../core/managers";
import globalStore from "../store/globalStore";
import { IMAGE_ASSET, VIDEO_ASSET, GLTF_ASSET } from "../core/enums";
import loaderStore from "../store/loaderStore";
import { gsap } from "gsap";
import $appState from "~/plugins/appState";
import TransitionOverlay from "../components/contentOverlays/transitionOverlay.vue";

@Component({
  components: {
    TransitionOverlay,
    Navigation,
    Loader,
  },

  async fetch() {
    if (this.$device.isMobileOrTablet) {
      console.log("movile");
      const mobileMedias = (await this.$prismic.api.getSingle("mobileMedias"))
        .data;
      this.$nuxt.$emit("loadMobileMedia", { mobileMedias });
    } else {
      console.log("DESKTOP");
      const desktopMedias = (await this.$prismic.api.getSingle("desktopMedias"))
        .data;
      this.$nuxt.$emit("loadDesktopMedia", { desktopMedias });
    }
  },
})
export default class Default extends Vue {
  public globalStore = getModule(globalStore, this.$store);
  public loaderStore = getModule(loaderStore, this.$store);
  public loadingProgressions: string = "0";
  public desktopMedias: any;
  public desktopMediasURL: [{ name: string; url: string; type: number }] = [];

  public mobileMedias: any;
  public mobileMediasURL: [{ name: string; url: string; type: number }] = [];

  /** HOOKS **/

  created() {
    $appState.setAppState(this.$device.isMobileOrTablet);
    $appState.getAppState();
  }

  mounted() {
    console.log(process.env.isMobile, "ismobile");
    if(this.$device.isDesktop){
      let main = document.querySelector('.main')
      main.classList.add('desktop')
    }
    this.$nuxt.$on("loadDesktopMedia", (desktopMedia) => {
      this.desktopMedias = desktopMedia.desktopMedias.slices[0].items;
      console.log(this.desktopMedias);

      this.desktopMedias.forEach((el) => {
        let mediaType;
        if (el.mediaType === "GLTF") {
          mediaType = 0;
        } else if (el.mediaType === "IMAGE") {
          mediaType = 1;
        } else if (el.mediaType === "VIDEO") {
          mediaType = 2;
          console.log("1 ------- "+el.mediaType);
        } else if (el.mediaType === "AUDIO") {
          mediaType = 3;
        } else if (el.mediaType === "FBX") {
          mediaType = 4;
        } else if (el.mediaType === "TEXTURE") {
          mediaType = 5;
        }

        this.desktopMediasURL.push({
          name: el.mediaName[0].text,
          url: el.mediaElement.url,
          type: mediaType,
        });
      });
      this.initApp();
    });

    this.$nuxt.$on("loadMobileMedia", (mobileMedia) => {
      this.mobileMedias = mobileMedia.mobileMedias.slices[0].items;
      this.mobileMedias.forEach((el) => {
        let mediaType;
        if (el.mediaType === "GLTF") {
          mediaType = 0;
        } else if (el.mediaType === "IMAGE") {
          mediaType = 1;
        } else if (el.mediaType === "VIDEO") {
          mediaType = 2;
        } else if (el.mediaType === "AUDIO") {
          mediaType = 3;
        } else if (el.mediaType === "TEXTURE") {
          mediaType = 4;
        }

        this.mobileMediasURL.push({
          name: el.mediaName[0].text,
          url: el.mediaElement.url,
          type: mediaType,
        });
      });
      this.initApp();
    });
  }

  /** METHODS **/

  // TODO :: refacto pour eviter les bouts de code dupliqués
  public async initApp() {
    if (!this.globalStore.isAppInit) {
      /* We need to download all asset before init app */
      if (this.$device.isMobileOrTablet) {
        this.mobileMediasURL.forEach((el) => {
          AssetsManager._registerSource(el.name, el.type, el.url, null);
        });
      } else {
        console.log(this.desktopMediasURL);

        this.desktopMediasURL.forEach((el) => {
          AssetsManager._registerSource(el.name, el.type, el.url, null);
        });
      }

      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor((done / total) * 100).toString();
        console.log(this.loadingProgressions, " <---- LOADING");
      }).load();

      this.loaderStore.setIsAlreadyLoaded(true);
      this.globalStore.setIsAppInit(true);
    }
  }

  enterLoader(el: HTMLElement, done: Function) {
    console.log("ENTEEEEEER");
    gsap.fromTo(
      el,
      {
        opacity: 0,
        display: "none",
      },
      {
        opacity: 1,
        display: "flex",
        duration: 1.5,
        onComplete: () => {
          console.log("complete enter loader !!!!");
          done();
        },
      }
    );
  }

  leaveLoader(el: HTMLElement, done: Function) {
    let tl = gsap.timeline();
    tl.to(".loader-sticker", {
      scale: 0,
      duration: 0.6,
      ease: "elastic.in(1, 0.6)",
      onStart: () => {
        // TODO : Move to AssetManager successCallback
        this.$router.push({ path: "/intro", replace: true });
      },
    });

    tl.to(el, {
      opacity: 0,
      display: "none",
      duration: 1,
      onComplete: () => {
        console.log("complete loader !!!!");
        done();
      },
    });
  }

  /** WATCHERS **/
  @Watch("appState", { immediate: true, deep: true })
  onMotionValueChanged(val: boolean) {
    if (val) {
      // INSTANCE img
      if (this.$device.isDesktop) {
        console.log(AssetsManager.getImage(IMAGE_ASSET.STICKER));
      }
    }
  }

  /** GETTERS **/
  get appState() {
    return this.globalStore.isAppInit;
  }
}
</script>
