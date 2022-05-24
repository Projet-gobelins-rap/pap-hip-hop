<template>
<!--   @click="ResponseTween"-->
  <section class="battle" >
    <h1 ref="title">BATTLE DESKTOP</h1>
<!--    <div class="battle-hud">-->
<!--      <div class="battle-top">-->
<!--        <div v-if="pp" class="healthbar  player">-->
<!--          <div class="healthbar-container">-->
<!--            <span class="healthbar-gauge" ref="playerGauge"></span>-->
<!--          </div>-->
<!--          <img  class="healthbar-img" :src="pp.src" alt="" />-->
<!--        </div>-->
<!--        <div v-if="pp" class="healthbar opponent">-->
<!--          <img class="healthbar-img" :src="pp.src" alt="" />-->
<!--          <div class="healthbar-container">-->
<!--            <span class="healthbar-gauge" ref="opponentGauge"></span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="battle-center"></div>-->
<!--    </div>-->
    <div class="opponent responseContainer responseContainer--opponent" ref="opponent">
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
    </div>

    <div class="player responseContainer responseContainer--player" ref="player">
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
      <span class="battleResponse"></span>
    </div>

    <ChatComponent
      v-if="this.chatDisplay && currentChat"
      :content="currentChat"
    />
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import chatStore from "~/store/chatStore";
import battleStore from "../../store/battleStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import onboardingStore from "../../store/onboardingStore";
import $socket from "~/plugins/socket.io";

import { AssetsManager } from "~/core/managers";
import { gsap } from "gsap";
import {Punchline} from "../../core/types/punchline";
@Component({
  components: {
    CustomButton,
    ChatComponent,
    Onboarding,
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      const battleChat = battleContent?.slices1;
      const battleOnboarding = battleContent?.slices2[0].items;
      const battlePunchRound1 = battleContent?.slices3[0].items;

      const round2Step1 = battleContent?.slices6[0].items;
      const round2Step2 = battleContent?.slices7[0].items;
      const round2Step3 = battleContent?.slices8[0].items;
      const round2Step4 = battleContent?.slices9[0].items;

      const opponentRound1 = battleContent?.slices10[0].items;
      const opponentRound2 = battleContent?.slices11[0].items;

      const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[0];
      const currentPunchline = battlePunchRound1;

      return {
        battleChat,
        battleOnboarding,
        currentChat,
        currentOnboarding,
        currentPunchline,
        round2Step1,
        round2Step2,
        round2Step3,
        round2Step4,
        opponentRound1,
        opponentRound2,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class battle extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public battleStore = getModule(battleStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public battleChat: any;
  public battleOnboarding: any;
  public currentChat: object;
  public currentOnboarding: object;
  public currentPunchline: object;
  public chatCounter: number = 0;
  public punchlineArray: string[] = [];
  public punchArray: Array<Punchline> = []
  public title: HTMLElement;
  public opponent: HTMLElement;
  public player: HTMLElement;
  public isRound2: boolean = false;
  public round2Step1: object;
  public round2Step2: object;
  public round2Step3: object;
  public round2Step4: object;
  public round2StepCounter: number = -1;
  public opponentRound1: object;
  public opponentRound2: object;
  public pp: HTMLImageElement | null = null;
  public score: {player: number, opponent: number} = {player: 200, opponent:200}

  mounted() {

    this.initRound2Datas();
    this.title = this.$refs.title as HTMLElement;
    this.player = this.$refs.player as HTMLElement;
    this.opponent = this.$refs.opponent as HTMLElement;

    console.log(this.opponentRound1, "<--- OPPONENT ROUND 1 PUNCHHH");

    // this.displayOpponentPunchline()
    console.log("BATTLE");
    console.log(this.battleChat, "<--- dialog battle");
    console.log(this.currentOnboarding, "<--- onboarding battle");

    console.log(this.currentChat, ":::: current chat");

    $socket.io.on("battle::response", (ids) => {
      console.log(ids, "OUUUUUUUI");
      this.pp = AssetsManager.getImage("PP").data;
      console.log(this.pp);

      this.hideOnboarding();
      if (ids === null) {
        this.punchlineArray.push("....");
      } else {
        ids.forEach((id) => {
          if (this.isRound2) {
            console.log("💩💩💩💩💩");
            this.punchlineArray = [];
            this.punchlineArray.push(
              this.battleStore.round2Datas[this.round2StepCounter][id]
                .content[0].text
            );
            console.log(this.battleStore.round2Datas);
          } else {
            this.punchlineArray.push(this.currentPunchline[id].content[0].text);

            this.punchArray.push({
             id: id,
             text: this.currentPunchline[id].content[0].text,
             score:  this.currentPunchline[id].score,
             status:  this.currentPunchline[id].status,
            });

            console.log(this.punchArray,'🚨🚨🚨🚨🚨🚨')
          }
        });
      }

      this.displayOpponentPunchline();

      this.isRound2 = true;
      if (this.isRound2) {
        this.round2StepCounter++;
      }
    });
  }


  ResponseTween() {
    console.log("🚑️🚑️🚑️RESPONSE tween🚑️🚑️🚑️🚑️")
    gsap.set(".opponent span", { display: "none", opacity: 0 });
    gsap.to(".opponent span", {
      display: "block",
      delay:2,
      opacity: 1,
      duration: 2,
      stagger: 2,
      ease:"elastic.out(1, 0.3)",
      onComplete: () => {
        gsap.set(".opponent span", { display: "none", opacity: 0 });
        // this.displayUserPunchline();
      },
    });
  }



  displayOpponentPunchline() {
    console.log(this.opponent);
    gsap.set(".opponent span", { display: "none", opacity: 0 });

    if (!this.isRound2) {
      this.opponentRound1.forEach((punch, index) => {
        console.log(punch);
        this.opponent.children[index].innerText = punch.content[0].text;
      });

      gsap.to(".opponent span", {
        display: "block",
        opacity: 1,
        duration: 2,
        stagger: 2,
        ease:"elastic.out(1, 0.3)",
        onComplete: () => {
          gsap.set(".opponent span", { display: "none", opacity: 0 });
          this.displayUserPunchline();
        },
      });
    } else {
      this.opponent.children[
        this.round2StepCounter
      ].innerText = this.opponentRound2[this.round2StepCounter].content[0].text;
      gsap.to(this.opponent.children[this.round2StepCounter], {
        display: "block",
        opacity: 1,
        duration: 2,
        onComplete: () => {
          gsap.set(this.opponent.children[this.round2StepCounter], {
            display: "none",
            opacity: 0,
          });
          console.log("EKIP OPONENT ZEBI");
          this.displayUserPunchline();
        },
      });
    }
  }

  // TODO :: URGENT DE REFACTO TOUTE CETTE METHODE
  displayUserPunchline() {

    console.log(this.punchlineArray,'punch array')


    //TODO on doit calculer le score
    // TODO on doit stocker les différents status de punchline
    gsap.set(Array.from(this.player.children),{display:'none',opacity:0})
    Array.from(this.player.children).forEach((el:HTMLElement,index:number)=>{
      console.log(el,'ZEBIIIIIi')
      el.innerText = this.punchArray[index].text
      gsap.to(el,{display:'block',opacity:1,delay:index*2})
    })
    // this.punchArray.forEach((punch)=>{
    //   console.log(punch.score)
    // })



    // this.punchlineArray.forEach((punch, i) => {
    //   setTimeout(() => {
    //     this.title.innerText = punch;
    //
    //     // ON DETECT L'APPARITION DU DERNIER ELEM DANS LE FOREACH: DANS LE FUTUR ON BOUGE ça
    //     // ÇA SERA REMPLACER PAR UNE TWEEN AVEC UN ON COMPLETE
    //     if (Object.is(this.punchlineArray.length - 1, i)) {
    //       setTimeout(() => {
    //         this.title.innerText = "";
    //         if (this.round2StepCounter <= 0) {
    //           console.log("CA PAASSE ici zebi");
    //           console.log(this.round2StepCounter, "<--- round2 counter");
    //           this.setNextChat();
    //           this.displayChat();
    //         } else {
    //           console.log("AHHHHH");
    //           this.displayOnboarding();
    //           $socket.io.emit("battle::round2Sequence");
    //         }
    //         console.log("LAST CALLBACK");
    //
    //         this.punchlineArray.shift();
    //       }, 2000);
    //     }
    //   }, 2000 * i);
    // });

  }

  displayChat() {
    this.battleStore.setIsChatDisplay(true);
  }
  closeChat() {
    this.battleStore.setIsChatDisplay(false);
  }

  setNextChat() {
    this.chatCounter++;
    this.currentChat = this.battleChat[this.chatCounter];
  }

  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  goToRound2() {
    $socket.io.emit("battle::round2");
  }

  updateHealthGauges() {
    this.score = {
      player: 30,
      opponent: 80
    }
    gsap.to( this.$refs.opponentGauge!, {
      width: this.score.opponent / 200 * 100 + "%"
    })
    gsap.to( this.$refs.playerGauge!, {
      width: this.score.opponent / 200 * 100 + "%"
    })
  }

  // watch dialogStep change in chatStore store
  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      console.log(val);

      switch (val) {
        case "reading":
          break;
        case "next":
          this.setNextChat();
          this.chatStore.setChatStep("reading");
          break;

        case "selectPunch":
          this.closeChat();
          this.displayOnboarding();
          this.chatStore.setChatStep("reading");
          break;
        case "nextRound":
          this.closeChat();
          this.displayOnboarding();
          this.goToRound2();
          this.chatStore.setChatStep("reading");
          break;
      }
    }
  }

  // watch dialogStep change in chatStore store
  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);
    }
  }

  initRound2Datas() {
    this.battleStore.setRound2Datas([
      this.round2Step1,
      this.round2Step2,
      this.round2Step3,
      this.round2Step4,
    ]);
  }
  // get chatStep from store
  get chatStep() {
    return this.chatStore.chatStep;
  }

  get chatDisplay() {
    return this.battleStore.isChatDisplay;
  }

  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
}
</script>

<style lang="sass" scoped>
</style>
