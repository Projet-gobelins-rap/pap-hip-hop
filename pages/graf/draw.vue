<template>
  <section class="graffDraw">
    <span class="graffDraw-cursor"></span>
    <picture class="graffDraw-background">
      <img class="graffDraw-background--img" src="/images/wall-0.png" alt="" />
    </picture>
    <div class="graffDraw-preview" v-if="!graffInstance">
      <img class="graffDraw-preview--img" :src="activePreviewUrl" alt="" />
      <CustomButton
        class="graffDraw-preview--button"
        v-if="activePreviewUrl"
        @click.native="valideSelectedGraff"
        :text="'choisir ce graff'"
      />
    </div>
    <div class="graffDraw-container">
      <p class="graffDraw-display display"></p>
      <img class="graffDraw-img" src="/images/wall-1.png" alt="" />
      <canvas class="graffDraw-canvas"></canvas>
      <button class="graffDraw-reset">Passer à l'etape 2</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import Graf from "~/core/interactions/Graf";
import $socket from "~/plugins/socket.io";
import CustomButton from "~/components/buttons/button.vue";

@Component({
  components: {
    CustomButton,
  },
  async asyncData({ $prismic, error }) {
    try {
      const prismicContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;

      const graffSketchsList = prismicContent.slices4.map(
        (slice: any) => slice.items
      );

      return {
        graffSketchsList,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffActivity extends Vue {
  public graffSketchsList: any;
  public activePreview: any | null = null;
  public activePreviewUrl: string = "";
  public graffInstance: Graf | null = null;

  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");
    console.log(this.graffSketchsList);
    

    this.handleMobileSelection();
    console.log($socket, "socket from plugin");
  }

  handleMobileSelection() {
    $socket.io.on("graffSelected", (idx) => {
      console.log(idx);
      
      this.activePreview = this.graffSketchsList[idx];
      console.log(this.activePreview);
      this.activePreviewUrl = this.activePreview[0].layer.url;
    });
  }

  valideSelectedGraff() {
    console.log(this.graffSketchsList);
    $socket.io.emit("goTo", { path: "/_mobile/graff/bomb", replace: true });
    new Graf(this.activePreview);
  }
}
</script>