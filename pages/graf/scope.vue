<template>
  <section class="scope desktop">
    {{ this.graf }}
    <img class="scope-background" src="/images/graf/city-rooftop.png" alt="" />
    <DialogComponent v-if="currentDialog" :content="currentDialog" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import dialogStore from "~/store/dialogStore";
import DialogComponent from "~/components/contentOverlays/dialog.vue";
import $socket from "~/plugins/socket.io";


@Component({
  components: {
    DialogComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const scopeContent = (await $prismic.api.getSingle("interaction-graff"))
        .data;
      const dialogs = scopeContent?.slices1;
      const currentDialog = dialogs[0];

      return {
        dialogs,
        currentDialog,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GraffActivity extends Vue {
  public graf: string = "Scope";
  public scopeContent: object;
  public dialogs: any;
  public graffDialogStep: string;
  public currentDialog: object;
  public currentDialogNum: number = 0;
  public dialogStore = getModule(dialogStore, this.$store);

  mounted() {
    console.clear();
  }

  // Set next linked dialog by using identifier in current dialog
  setDialogByID() {
    for (const key in this.dialogs) {
      const element = this.dialogs[key];
      
      if (element.primary.Identifiant === this.graffDialogStep) {
        this.currentDialog = element;
        this.currentDialogNum = parseInt(key)
      }
    }
  }

  // Set dialog on next one in dialogs list order
  setNextDialog() {
    this.currentDialogNum++;
    this.currentDialog = this.dialogs[this.currentDialogNum];
  }

  // get dialogStep from store
  get dialogStep() {
    return this.dialogStore.dialogStep;
  }

  // watch dialogStep change in store
  @Watch("dialogStep", { immediate: true, deep: true })
  setDiaglogStep(val: string) {

    if (val) {
      switch (val) {
        case "next":
          this.setNextDialog();
          break;

        case "custom":
          console.log("custom 1");
          break;

        case "custom2":
          console.log("custom 2");
          break;
        
        default:
          this.graffDialogStep = val;
          this.setDialogByID();
          break;
      }
    } 
  }
}
</script>
