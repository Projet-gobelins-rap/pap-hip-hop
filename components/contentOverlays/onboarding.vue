<template>
  <div v-if="this.onboardingDisplay" class="onboarding">
    <div class="onboarding-container"  v-if="!content.isFullscreen">
       <img
          class="onboarding-sticker"
          src="/images/sticker-commande.png"
          alt=""
        />
      <swiper
        :slides-per-view="1"
        :loop="false"
        navigation
        this.displayNavigation
        :pagination="{ clickable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >

        <swiper-slide
          v-for="(item, i) in content"
          :key="`slice-item-${i}`"
          class="swiper__itemWrapper"
          :class="{ test_2: true }"
        >
          <div class="swiper__item">
            <img class="onboarding-icon" :src="item.icon.url" alt="" />
            <span class="onboarding-text">{{ item.description[0].text }}</span>
          </div>
          <div
            v-if="item.icon2.url && item.description2[0].text"
            class="swiper__item"
          >
            <img class="onboarding-icon" :src="item.icon2.url" alt="" />
            <span class="onboarding-text">{{ item.description2[0].text }}</span>
          </div>
        </swiper-slide>
      </swiper>
       <CustomButton
          @click.native="nextStep(content[0].action[0].text)"
          class="onboarding-button small"
          :text="'J\'ai capté !'"
        >
        </CustomButton>
    </div>

    <div class="onboarding-full" v-else>
      <div class="onboarding-container">
        <img class="onboarding-full--sticker" :src="content.sticker.url" alt="" />
        <img v-if="content.icon" class="onboarding-full--icon" :src="content.icon.url" alt="" />
        <PrismicRichText class="onboarding-full--text" :field="content.description" />

<!--        <CustomButton-->
<!--          v-if="content.isClickable"-->
<!--          @click.native="nextStep(content.action[0].text)"-->
<!--          class="onboarding-button small"-->
<!--          :text="'J\'ai capté !'"-->
<!--        >-->
<!--        </CustomButton>-->


        <CustomButton
          v-if="content.isClickable && content.linkUrl[0]"
          :is-link="content.isLink"
          :link-url="content.linkUrl[0].text"
          class="onboarding-button small"
          @click.native="nextStep(content.action[0].text)"
          :text="'J\'ai capté !'"
        />
        <CustomButton
          v-else-if="content.isClickable"
          :is-link="content.isLink"
          class="onboarding-button small"
          @click.native="nextStep(content.action[0].text)"
          :text="'J\'ai capté !'"
        />

      </div>
      <div class="onboarding-fullOverlay"></div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import { Navigation, Pagination } from "swiper";
import CustomButton from "~/components/buttons/button.vue";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import onboardingStore from "../../store/onboardingStore";
SwiperCore.use([Navigation, Pagination]);

@Component({
  components: {
    Swiper,
    SwiperSlide,
    CustomButton
  },
})
export default class Onboarding extends Vue {
  @Prop({ required: true }) readonly content!: any;
  public isFullscreen: boolean = false;
  public onboardingStore = getModule(onboardingStore, this.$store);
  mounted() {
    console.log("Onboarding component");
    console.log(this.content[0], "::: ppp");
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
    console.log("hide");
  }

  onSwiper(swiper) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log("slide change");
  }

  nextStep(action: string = "close") {
    this.onboardingStore.setOnboardingStep(action);
  }

  get onboardingDisplay() {
    return this.onboardingStore.isOnboardingDisplay;
  }
}
</script>
