<template>
  <section class="graffDraw">
    <span class="graffDraw-cursor"></span>
    <picture class="graffDraw-background">
      <img class="graffDraw-background--img" src="/images/wall-0.png" alt="" />
    </picture>
    <div class="graffDraw-preview"></div>
    <div class="graffDraw-container">
      <p class="graffDraw-display display"></p>
      <img class="graffDraw-img" src="" alt="" />
      <!-- <img class="graffDraw-img--preview" v-if="!graffInstance" :src="activePreviewUrl" alt="" /> -->
      <canvas class="graffDraw-canvas"></canvas>
      <button class="graffDraw-reset">Passer à l'etape 2</button>
    </div>
    <CustomButton
      class="graffDraw-preview--button"
      v-if="activePreviewUrl && !graffInstance"
      @click.native="valideSelectedGraff"
      :text="'choisir ce graff'"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
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
      const graffDialogues = prismicContent?.slices3;

      return {
        graffSketchsList,
        graffDialogues,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffActivity extends Vue {
  public graffSketchsList: any;
  public graffDialogues: object;
  public currentChat: object;
  public activePreview: any | null = null;
  public activePreviewUrl: string = "";
  public graffInstance: Graf | null = null;
  // public chatStore = getModule(chatStore, this.$store);

  // get chatStep from store
  // get chatStep() {
  //   return this.chatStore.chatStep;
  // }

  mounted() {
    console.clear();
    console.log("mounted hook on HOME page");
    console.log(this.graffSketchsList);

    this.handleMobileSelection();

    console.log($socket, "socket from plugin");
  }

  handleMobileSelection() {
    $socket.io.on("graffSelected", (idx) => {
      this.activePreview = this.graffSketchsList[idx];
      console.log(this.activePreview);
      this.activePreviewUrl = this.activePreview[
        this.activePreview.length - 1
      ].layer.url;
    });
  }

  valideSelectedGraff() {
    console.log(this.graffSketchsList);
    $socket.io.emit("goTo", { path: "/_mobile/graff/bomb", replace: true });
    new Graf(this.activePreview);
  }

  // displayChat(id: string) {
  //   for (const key in this.graffDialogues) {
  //     const element = this.graffDialogues[key];
  //     if (element.primary.Identifiant === id) {
  //       this.currentChat = element;
  //     }
  //   }
  // }

  // @Watch("chatStep", { immediate: true, deep: true })
  // setChatStep(val: string) {
  //   if (val) {
  //     switch (val) {
  //       case "reading":
  //         break;
  //       default:
  //         this.displayChat(val);
  //         this.chatStore.setChatStep("reading");
  //     }
  //   }
  // }
}
</script>