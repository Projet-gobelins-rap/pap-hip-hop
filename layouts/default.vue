<template>
  <div class="main">
    <navigation/>
    <h1>{{this.icon}}</h1>
    <nuxt />
  </div>
</template>

<script lang="ts">

import Navigation from '~/components/navigation/Navigation.vue'
import {Vue, Component, getModule} from "nuxt-property-decorator";
import {AssetsManager} from "../core/managers";
import AssetManagerInitializer from "../core/utils/initializers/AssetManagerInitializer";
import globalStore from "../store/globalStore";
import {IMAGE_ASSET} from "../core/enums";

@Component({
  components: {
    Navigation,
  },

  async fetch() {
    const desktopMedias = (await this.$prismic.api.getSingle('desktopMedias')).data
    this.$nuxt.$emit("loadDesktopMedia", {desktopMedias})
  },


})

export default class Default extends Vue {
  public icon: string = '🚧'
  public globalStore = getModule(globalStore, this.$store);
  public loadingProgressions: string = "0";
  public desktopMedias:any
  public desktopMediasURL:[{name:string,url:string,type:number}] = []

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
      console.log(this.desktopMediasURL)
      console.log('gooo')
      this.initApp()
    })

  }

  public async initApp() {
    if (!this.globalStore.isAppInit) {

      // new AssetManagerInitializer(null).init();
      /* We need to download all asset before init app */
      this.desktopMediasURL.forEach(el=>{
        AssetsManager._registerSource(el.name,el.type,el.url,null)
      })
      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor((done / total) * 100).toString();
        console.log(this.loadingProgressions,' <---- LOADING')
      }).load();


      this.globalStore.setIsAppInit(true);
    }
  }
}

</script>
