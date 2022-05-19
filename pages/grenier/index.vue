<template>
  <section class="grenier">
    <IntroMotion v-if="!stepStore.introMotionState"></IntroMotion>
    <ChatComponent v-if="this.chatElementState" :content="currentChat" />
    <InteractionPoints
      @click.native="goToInteractionPoint(point)"
      class="interactive-points"
      :data="point"
      v-for="(point, index) in grenierSceneStore.activeInteractionPoints"
      :key="index"
    />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import grenierSceneStore from "~/store/grenierSceneStore";
import GrenierSceneInstance from "~/core/scene/GrenierScene";
import GrenierSceneInitializer from "~/core/utils/initializers/GrenierSceneInitializer";
import IntroMotion from "~/components/medias/IntroMotion.vue";
import stepStore from "~/store/stepStore";
import PosterInteractPoint from "../../core/config/grenier-scene/interact-points/objects/PosterInteractPoint";
import grenierScene from "~/core/scene/GrenierScene";
import SprayInteractPoint from "../../core/config/grenier-scene/interact-points/objects/SprayInteractPoint";
import ModeInteractPoint from "../../core/config/grenier-scene/interact-points/objects/ModeInteractPoint";
import chatStore from "~/store/chatStore";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import TvInteractPoint from "../../core/config/grenier-scene/interact-points/objects/TvInteractPoint";
import ModeCameraPosition from "../../core/config/grenier-scene/camera-positions/ModeCameraPosition";
import GUI from 'lil-gui';

import $socket from "~/plugins/socket.io";
@Component({
  components: {
    IntroMotion,
    ChatComponent,
  },
  async asyncData({ $prismic, error }) {
    try {
      const dialogContent = (await $prismic.api.getSingle("grenier")).data;
      const conversation = dialogContent?.slices1;

      return {
        conversation,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class GrenierScene extends Vue {
  public grenierSceneStore = getModule(grenierSceneStore, this.$store);
  public stepStore = getModule(stepStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public conversation: any;
  public currentChat: any;
  public gui = new GUI();



  mounted() {
    console.log(this.conversation, "conversation");


  }

  addGUI(){
    let params= {
      camPosX :ModeCameraPosition.coords().cameraPos.x,
      camPosY :ModeCameraPosition.coords().cameraPos.y,
      camPosZ :ModeCameraPosition.coords().cameraPos.z,
      lookAtPosX :ModeCameraPosition.coords().lookAtPosition.x,
      lookAtPosY :ModeCameraPosition.coords().lookAtPosition.y,
      lookAtPosZ :ModeCameraPosition.coords().lookAtPosition.z,
    }

    const modeFolder = this.gui.addFolder('Mode');
    modeFolder.add(params,'camPosX',-1000,1000,0.1).onChange((value:number)=>{
      // ModeCameraPosition.coords().cameraPos.x = value
      grenierScene.context.scene.getObjectByName("clothes_group")!.userData.camPosX = value
      console.log(grenierScene.context.scene.getObjectByName("clothes_group")!)
      $socket.io.emit('Mode::x',value)
    })
    modeFolder.add(params,'camPosY',-1000,1000,0.1).onChange((value:number)=>{
      ModeCameraPosition.coords().cameraPos.y = value

    })
    modeFolder.add(params,'camPosZ',-1000,1000,0.1).onChange((value:number)=>{
      ModeCameraPosition.coords().cameraPos.z = value

    })



  }

  addInteractionPoints() {
    this.grenierSceneStore.addInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(TvInteractPoint.name);
    // this.grenierSceneStore.addInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.addInteractivePoint(ModeInteractPoint.name);
    // console.log(ModeCameraPosition.coords().,'---< coord mode')
  }

  removeInteractionsPoints() {
    this.grenierSceneStore.removeInteractivePoint(TvInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(PosterInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(SprayInteractPoint.name);
    this.grenierSceneStore.removeInteractivePoint(ModeInteractPoint.name);
  }

  goToInteractionPoint(point) {
    this.conversation.forEach((element) => {
      if (element.primary.Identifiant === point.name) {
        this.currentChat = element;
        return this.currentChat;
      }
    });

    this.removeInteractionsPoints();
    grenierScene.context.goToPresetPosition(point.name, 2, () => {
      this.grenierSceneStore.setIsCameraMoving(false);
      this.grenierSceneStore.setIsChatDisplay(true);
    });
  }

  @Watch("motion", { immediate: true, deep: true })
  onMotionValueChanged(val: boolean) {
    if (val) {
      new GrenierSceneInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        grenierSceneStore: this.grenierSceneStore,
      }).init();
      grenierScene.context.disableOrbitControl();
      this.addGUI()
      this.addInteractionPoints();
    }
  }

  // @Watch('chatElementState',{ immediate: true,deep:true })
  // onChatDisplay(val:boolean) {
  //   console.log('val change')
  //   if (val) {
  //     console.log('chat is display')
  //   }
  // }

  goBack() {
    this.grenierSceneStore.setIsChatDisplay(false);
    console.log(this.grenierSceneStore.isChatDisplay);
    grenierScene.context.goToPresetPosition("initial", 2, () => {
      console.log("INITIAL POSITION");
      this.addInteractionPoints();
    });
  }

  goToCity() {
    console.log("GO TO CITY");
    this.$router.push({ path: "/hood", replace: true });
  }
  // watch dialogStep change in chatStore store
  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      switch (val) {
        case "reading":
          break;
        case "back":
          this.goBack();
          this.chatStore.setChatStep("reading");
          break;
        case "goToCity":
          this.goToCity();
          break;
      }
    }
  }

  get chatStep() {
    return this.chatStore.chatStep;
  }

  get motion() {
    return this.stepStore.introMotionState;
  }

  get chatElementState() {
    return this.grenierSceneStore.isChatDisplay;
  }
}
</script>
