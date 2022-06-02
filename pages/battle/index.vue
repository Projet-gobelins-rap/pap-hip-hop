<template>
  <section class="battle" >
    <div class="battle-hud">
      <div class="battle-top">
        <div v-if="pp" class="healthbar  player">
          <div class="healthbar-container">
            <span class="healthbar-gauge" ref="playerGauge"></span>
          </div>
          <img  class="healthbar-img" :src="pp.src" alt="" />
        </div>
        <div v-if="pp" class="healthbar opponent">
          <img class="healthbar-img" :src="pp.src" alt="" />
          <div class="healthbar-container">
            <span class="healthbar-gauge" ref="opponentGauge"></span>
          </div>
        </div>
      </div>
      <div class="battle-center"></div>
    </div>
    <BattleResponse class="opponent responseContainer--opponent" ref="opponent"></BattleResponse>
    <BattleResponse class="player responseContainer--player" ref="player"></BattleResponse>

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
import BattleResponse from "~/components/battle/battleResponse.vue";
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
    BattleResponse
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
  public comboValue:number = 0

  mounted() {

    this.initRound2Datas();
    this.player = this.$refs.player as HTMLElement;
    this.opponent = this.$refs.opponent as HTMLElement;

    // this.displayOpponentPunchline()
    console.log("BATTLE");

    // GESTION DES DATAS DE REPONSE
    $socket.io.on("battle::response", (ids) => {
      this.pp = AssetsManager.getImage("PP").data;
      console.log(this.pp);

      this.hideOnboarding();
      if (ids === null) {
        this.punchArray.push({
          id: -1,
          text: "...",
          score: 0,
          status:  "nul",
        });

      } else {
        ids.forEach((id) => {
          if (this.isRound2) {
            console.log("ROUND 2💩💩");
            this.punchArray = [];

            this.punchArray.push({
              id: id,
              text: this.battleStore.round2Datas[this.round2StepCounter][id].content[0].text,
              score: parseInt(this.battleStore.round2Datas[this.round2StepCounter][id].score),
              status:  this.battleStore.round2Datas[this.round2StepCounter][id].status,
            });


            console.log(this.punchArray,"<------- PUNCH R2")
            console.log(this.battleStore.round2Datas);
          } else {

            this.punchArray.push({
             id: id,
             text: this.currentPunchline[id].content[0].text,
             score: parseInt(this.currentPunchline[id].score),
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


  displayOpponentPunchline() {
    // console.log('Migrate OPPONENT PUNCHLINE')
    console.log(this.opponent);
    gsap.set(".opponent span", { display: "none", opacity: 0 });

    if (!this.isRound2) {

      this.animatePunchline(this.opponent.$el.children,true,this.opponentRound1,null,true)

      // this.opponentRound1.forEach((punch, index) => {
      //   console.log(punch);
      //   this.opponent.$el.children[index].innerText = punch.content[0].text;
      // });
      //
      // gsap.to(".opponent span", {
      //   display: "block",
      //   opacity: 1,
      //   duration: 2,
      //   stagger: 2,
      //   ease:"elastic.out(1, 0.3)",
      //   onComplete: () => {
      //     gsap.set(".opponent span", { display: "none", opacity: 0 });
      //     this.displayUserPunchline();
      //   },
      // });





    } else {
      this.opponent.$el.children[this.round2StepCounter].innerText = this.opponentRound2[this.round2StepCounter].content[0].text;
      gsap.to(this.opponent.$el.children[this.round2StepCounter], {
        display: "block",
        opacity: 1,
        duration: 2,
        onComplete: () => {
          gsap.set(this.opponent.$el.children[this.round2StepCounter], {
            display: "none",
            opacity: 0,
          });
          console.log("EKIP OPONENT");
          this.displayUserPunchline();
        },
      });

      // this.animatePunchline(this.opponent.$el.children,false,this.opponentRound2,null,true)

    }
  }

  // On calcul le score avec cette methode
  calculateScore(target:number,scoreVal:number,isOpponent:boolean){
    if (isOpponent) {
      console.log(target,scoreVal,'<-- score value')
      target = target - scoreVal
      console.log(target)
      this.score.opponent = target

      gsap.to(this.$refs.opponentGauge,{width:`${target}px`,duration:1})
    }
  }

  public detectCombo(punchline:Punchline) {
    if (punchline.status === "top") {
      console.log("🚑️🚑️🚑️top🚑️🚑️🚑️")
      this.comboValue++
      console.log(this.comboValue,'<----- COMBOO')
    }else {
      console.log("💩💩💩 NON 💩💩💩")
      this.comboValue = 0
    }
  }

  displayUserPunchline() {

    gsap.set(Array.from(this.player.$el.children),{display:'none',opacity:0})
    console.log(this.round2StepCounter, '<---est ceque leround 2')
    if (this.round2StepCounter == 0) {
      this.animatePunchline(this.player.$el.children,true,null,this.punchArray,false)
      // Array.from(this.player.$el.children).forEach((el:HTMLElement,index:number)=>{
      //
      //   el.innerHTML = this.punchArray[index].text
      //
      //   gsap.to(el,{display:'block',duration:1,opacity:1,delay:index*2,onComplete:()=>{
      //       console.log(this.punchArray[index],"INDEX DU PUNCH ARRAY")
      //       this.detectCombo(this.punchArray[index])
      //       this.calculateScore(this.score.opponent,this.punchArray[index].score,true)
      //       if (index === 3) {
      //         if (this.round2StepCounter <= 0) {
      //           this.setNextChat();
      //           this.displayChat();
      //         }else {
      //           this.displayOnboarding();
      //           $socket.io.emit("battle::round2Sequence");
      //         }
      //       }
      //       console.log(this.punchArray,'<--- punch array')
      //     }})
      // })

    }
    else {


      console.log(this.punchArray,'----------')
      this.animatePunchline(this.player.$el.children,false,null,this.punchArray,false,this.round2StepCounter-1)
      // this.player.$el.children[this.round2StepCounter-1].innerText = this.punchArray[0].text;
      // gsap.to(this.player.$el.children[this.round2StepCounter-1], {
      //   display: "block",
      //   opacity: 1,
      //   duration: 2,
      //   onComplete: () => {
      //     this.detectCombo(this.punchArray[0])
      //     this.calculateScore(this.score.opponent,this.punchArray[0].score,true)
      //     gsap.set(this.player.$el.children[this.round2StepCounter-1], {
      //       display: "none",
      //       opacity: 0,
      //     });
      //     $socket.io.emit("battle::round2Sequence");
      //   },
      // });
    }
  }

  animatePunchline(target:NodeList,round1:boolean=true,opponentData?:object,playerData?:Array<Punchline>,isOpponentTour:boolean=true,punchIndex?:number) {



    if(round1){
      Array.from(target).forEach((el:HTMLElement,index:number)=>{

        el.innerHTML = isOpponentTour ? opponentData[index].content[0].text : playerData[!isOpponentTour&&!round1 ? punchIndex: index].text

        gsap.to(el,{display:'block',duration:1,opacity:1,delay:index*2,onComplete:()=>{
            console.log(this.punchArray[index],"INDEX DU PUNCH ARRAY")
            if (!isOpponentTour){
              this.detectCombo(playerData[!isOpponentTour&&!round1 ? 0: index])
              this.calculateScore(this.score.opponent,playerData[!isOpponentTour&&!round1 ? 0: index].score,true)

              if (index === 3) {
                if (this.round2StepCounter <= 0) {
                  this.setNextChat();
                  this.displayChat();
                }else {
                  this.displayOnboarding();
                  $socket.io.emit("battle::round2Sequence");
                }
              }
            }else {
              if (index === 3) {
                this.displayUserPunchline();
              }
            }
          }
        })
      })
    } else {
      /**
       * 🚨🚨🚨 ROUND 2 🚨🚨🚨
       */

      console.log("AAAAAAAAAAAAAAAAA")
      let currentElement = target[this.round2StepCounter-1] as HTMLElement
      currentElement.innerHTML = isOpponentTour ? opponentData[punchIndex].content[0].text : playerData[0].text
      console.log(currentElement.innerHTML,'<---- ELEMENT INNER HTML')
      // el.innerHTML = isOpponentTour ? opponentData[index].content[0].text : playerData[!isOpponentTour&&!round1 ? punchIndex: index].text
      //
      gsap.to(currentElement, {
        display: 'block', duration: 1, opacity: 1, delay: 2, onComplete: () => {
          // console.log(this.punchArray[index], "INDEX DU PUNCH ARRAY")
          if (!isOpponentTour) {
            this.detectCombo(playerData[!isOpponentTour && !round1 ? 0 : punchIndex])
            this.calculateScore(this.score.opponent, playerData[!isOpponentTour && !round1 ? 0 : punchIndex].score, true)

          } else {
            if (punchIndex === 3) {
              this.displayUserPunchline();
            }
          }
          $socket.io.emit("battle::round2Sequence");
        }
      })
    }


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
