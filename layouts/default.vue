<template>
  <div class="main">
    <navigation/>
    <h1>{{this.icon}}</h1>

    <div v-if="$device.isDesktop">{{this.desktopMediasURL}}</div>
    <div v-if="$device.isMobileOrTablet">{{this.mobileMediasURL}}</div>
    <nuxt />
  </div>
</template>

<script lang="ts">

import Navigation from '~/components/navigation/Navigation.vue'
import {Vue, Component, getModule, Watch} from "nuxt-property-decorator";
import {AssetsManager} from "../core/managers";
import globalStore from "../store/globalStore";
import {IMAGE_ASSET} from "../core/enums";

@Component({
  components: {
    Navigation,
  },

  async fetch() {
    if (this.$device.isMobileOrTablet){
      console.log('movile')
      const mobileMedias = (await this.$prismic.api.getSingle('mobileMedias')).data
      this.$nuxt.$emit("loadMobileMedia", {mobileMedias})
    } else {
      console.log('DESKTOP')
      const desktopMedias = (await this.$prismic.api.getSingle('desktopMedias')).data
      this.$nuxt.$emit("loadDesktopMedia", {desktopMedias})
    }

  },


})

export default class Default extends Vue {
  public icon: string = '🚧'
  public globalStore = getModule(globalStore, this.$store);
  public loadingProgressions: string = "0";
  public desktopMedias:any
  public desktopMediasURL:[{name:string,url:string,type:number}] = []

  public mobileMedias:any
  public mobileMediasURL:[{name:string,url:string,type:number}] = []
  mounted(){

    this.$nuxt.$on("loadDesktopMedia",(desktopMedia)=>{
      this.desktopMedias = desktopMedia.desktopMedias.slices[0].items
      this.desktopMedias.forEach((el)=>{
        let mediaType
        if (el.mediaType === 'GLTF'){
          mediaType = 0
        }else if (el.mediaType === 'IMAGE') {
          mediaType = 1
        }
        else if (el.mediaType === 'VIDEO') {
          mediaType = 2
        }
        else if (el.mediaType === 'AUDIO') {
          mediaType = 3
        }

        this.desktopMediasURL.push({
          name:el.mediaName[0].text,
          url:el.mediaElement.url,
          type:mediaType
        })
      })
      this.initApp()
    })

    this.$nuxt.$on("loadMobileMedia",(mobileMedia)=>{
      this.mobileMedias = mobileMedia.mobileMedias.slices[0].items
      this.mobileMedias.forEach((el)=>{
        let mediaType
        if (el.mediaType === 'GLTF'){
          mediaType = 0
        }else if (el.mediaType === 'IMAGE') {
          mediaType = 1
        }
        else if (el.mediaType === 'VIDEO') {
          mediaType = 2
        }
        else if (el.mediaType === 'AUDIO') {
          mediaType = 3
        }

        this.mobileMediasURL.push({
          name:el.mediaName[0].text,
          url:el.mediaElement.url,
          type:mediaType
        })
      })
      this.initApp()
    })

  }

  // TODO :: refacto pour eviter les bouts de code dupliqués
  public async initApp() {
    if (!this.globalStore.isAppInit) {
      // new AssetManagerInitializer(null).init();
      /* We need to download all asset before init app */
      if (this.$device.isMobileOrTablet){
        this.mobileMediasURL.forEach(el=>{
          AssetsManager._registerSource(el.name,el.type,el.url,null)
        })
      }else {
        this.desktopMediasURL.forEach(el=>{
          AssetsManager._registerSource(el.name,el.type,el.url,null)
        })
      }

      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor((done / total) * 100).toString();
        console.log(this.loadingProgressions,' <---- LOADING')
      }).load();

      this.globalStore.setIsAppInit(true);
    }
  }

  get appState() {
    return this.globalStore.isAppInit
  }

  @Watch('appState',{ immediate: true,deep:true })
  onMotionValueChanged(val:boolean) {
    if (val) {
      // INSTANCE img
      if (this.$device.isDesktop){
        console.log(AssetsManager.getImage(IMAGE_ASSET.STICKER))
      }
    }
  }

}

</script>
