<template>
  <div v-if="this.onboardingDisplay" class="onboardingWrapper">

    <swiper
      v-if="!content.items[0].isFullscreen"
      :slides-per-view="1"
      :loop="false"
      navigation
      this.displayNavigation
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <button @click="hideOnboarding" class="swiper__close">CLOSE</button>

      <swiper-slide
        v-for="(item, i) in content.items"
        :key="`slice-item-${i}`"
        class="swiper__itemWrapper"
        :class="{test_2: true}"
      >
        <div class="swiper__item">
          <img :src="item.icon.url" alt="">
          <PrismicRichText :field="item.description" />
        </div>
        <div v-if="item.icon2.url && item.description2" class="swiper__item">
          <img :src="item.icon2.url" alt="">
          <PrismicRichText :field="item.description2" />
        </div>
      </swiper-slide>
    </swiper>

    <div class="onboarding" v-else>
      <img :src="content.items[0].icon.url" alt="">
      <PrismicRichText :field="content.items[0].description" />
    </div>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from "nuxt-property-decorator";

import { Navigation, Pagination } from 'swiper'

import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

// Import Swiper styles
import 'swiper/swiper-bundle.css'
import onboardingStore from "../../store/onboardingStore";
SwiperCore.use([Navigation, Pagination])


@Component({
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class Onboarding extends Vue{
  @Prop({ required: true }) readonly content!: any;
  public isFullscreen:boolean = false
  public displayNavigation:string = this.content.items.length <= 1 ? '' : 'navigation'
  public onboardingStore = getModule(onboardingStore,this.$store)
  mounted(){
    console.log('Onboarding component')

  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false)
    console.log('hide')
  }

  onSwiper (swiper) {
    console.log(swiper)
  }

  onSlideChange () {
    console.log('slide change')
  }

  get onboardingDisplay() {
    return this.onboardingStore.isOnboardingDisplay;
  }


}
</script>
