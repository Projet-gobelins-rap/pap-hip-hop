<template>
  <div class="onboarding">
    <h1>Onboarding</h1>


    <swiper
      :slides-per-view="1"
      :loop="false"
      navigation
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="n in 5"
        :key="n"
        class="test"
        :class="{test_2: true}"
      >
        <div>{{ n }}</div>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

import { Navigation, Pagination } from 'swiper'

import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

// Import Swiper styles
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination])


@Component({
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class Onboarding extends Vue{

  mounted(){
    console.log('Onboarding component')

  }

  onSwiper (swiper) {
    console.log(swiper)
  }

  onSlideChange () {
    console.log('slide change')
  }


}
</script>
