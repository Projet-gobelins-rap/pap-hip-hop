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

    <div>
      <span class="battle-damage" ref="damage"></span>
    </div>

    <BattleResponse class="opponent responseContainer--opponent" ref="opponent"></BattleResponse>
    <BattleResponse class="player responseContainer--player" ref="player"></BattleResponse>

    <BattleMultipleResponse ref="globalResponse"></BattleMultipleResponse>


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
import BattleMultipleResponse from "~/components/battle/battleMultipleResponse.vue";
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
    BattleResponse,
    BattleMultipleResponse
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
  public globalResponse: HTMLElement;
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
  public damage:number
  public damageElement:HTMLElement

  mounted() {

    this.initRound2Datas();
    this.player = this.$refs.player as HTMLElement;
    this.opponent = this.$refs.opponent as HTMLElement;
    this.globalResponse = this.$refs.globalResponse as HTMLElement;
    this.damageElement = this.$refs.damage as HTMLElement;
    console.log(this.$refs.globalResponse,'TEST REF')
    console.log(this.globalResponse,"GLOB")



    // this.displayOpponentPunchline()
    console.log("BATTLE");

    // Listening for a battle response from the server.
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


  // show opponent punchlines
  displayOpponentPunchline() {
    // console.log('Migrate OPPONENT PUNCHLINE')
    console.log(this.opponent);
    // gsap.set(".opponent span", { display: "none", opacity: 0 });

    if (!this.isRound2) {
      this.animatePunchline(this.opponent.$el.children,true,this.opponentRound1,null,true)
    } else {
      this.animatePunchline(this.globalResponse.$el.children,false,this.opponentRound2,null,true,this.round2StepCounter)
    }
  }

  /**
   * Calculate Score
   * @param target
   * @param damageVal
   * @param isOpponent
   */
  calculateScore(target:number,damageVal:number,isOpponent:boolean){
    this.damage = damageVal
    target = target - damageVal
    if (isOpponent) {
      console.log(target,damageVal,'<-- score value')
      console.log(target)
      this.score.opponent = target

      gsap.to(this.$refs.opponentGauge,{width:`${target}px`,duration:1})
    }else {
      gsap.to(this.$refs.playerGauge,{width:`${target}px`,duration:1})
    }
    let tl = gsap.timeline()
    this.$refs.damage.innerHTML = -damageVal
    tl.to(this.$refs.damage,{display:'block',opacity:1,y:-5,ease: "expo.out"})
    tl.to(this.$refs.damage,{display:'none',opacity:0,y:0,ease: "expo.out"})
  }

  // A function that is called when a punchline is clicked. It checks if the punchline is a top punchline. If it is, it
  // increments the comboValue by 1. If it is not, it sets the comboValue to 0.
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

  // Show user punchline
  displayUserPunchline() {

    gsap.set(Array.from(this.player.$el.children),{display:'none',opacity:0})
    console.log(this.round2StepCounter, '<---est ceque leround 2')
    if (this.round2StepCounter == 0) {
      this.animatePunchline(this.player.$el.children,true,null,this.punchArray,false)
    }
    else {
      this.animatePunchline(this.globalResponse.$el.children,false,null,this.punchArray,false,this.round2StepCounter-1)
    }
  }

  /**
   *  Animate Punchline
   *
   * @param target
   * @param round1
   * @param opponentData
   * @param playerData
   * @param isOpponentTour
   * @param punchIndex
   */
  animatePunchline(target:NodeList|HTMLCollection,round1:boolean=true,opponentData?:object,playerData?:Array<Punchline>,isOpponentTour:boolean=true,punchIndex?:number) {

    /**
     * 🚨🚨🚨 ROUND 1 🚨🚨🚨
     */
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
                  gsap.to('.responseContainer--player span',{display:'none',opacity:0})
                  console.log("WESHHHHHHHHHHHH")
                }else {
                  this.displayOnboarding();
                  $socket.io.emit("battle::round2Sequence");
                }
              }
            }else {
              this.calculateScore(this.score.player,opponentData[index].score,false)
              if (index === 3) {
                this.displayUserPunchline();
                gsap.to('.responseContainer--opponent span',{display:'none',opacity:0})
              }
            }
          }
        })
      })
    } else {
      /**
       * 🚨🚨🚨 ROUND 2 🚨🚨🚨
       */

       const result = isOpponentTour ? [...target].filter(element => element.classList.contains('battleResponse--opponent')) : [...target].filter(element => element.classList.contains('battleResponse--player'))

      console.log(result,"✅✅✅✅✅");
      let currentElement = result[punchIndex] as HTMLElement
      currentElement.innerHTML = isOpponentTour ? opponentData[punchIndex].content[0].text : playerData[0].text
      gsap.to(currentElement, {
        display: 'block', duration: 1, opacity: 1, delay: 2, onComplete: () => {
          if (!isOpponentTour) {
            this.detectCombo(playerData[!isOpponentTour && !round1 ? 0 : punchIndex])
            this.calculateScore(this.score.opponent, playerData[!isOpponentTour && !round1 ? 0 : punchIndex].score, true)
            $socket.io.emit("battle::round2Sequence");
          } else {
            this.calculateScore(this.score.player,opponentData[punchIndex].score,false)
            this.displayUserPunchline();
          }
        }
      })
    }


  }

  // Setting the isChatDisplay property to true.
  displayChat() {
    this.battleStore.setIsChatDisplay(true);
  }

  // Setting the value of the isChatDisplay property to false.
  closeChat() {
    this.battleStore.setIsChatDisplay(false);
  }

  // Setting the next chat in the battleChat array to the currentChat variable.
  setNextChat() {
    this.chatCounter++;
    this.currentChat = this.battleChat[this.chatCounter];
  }

  // Setting the onboardingDisplay to false.
  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  // Setting the onboarding display to true.
  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  // Emitting a socket event to the server.
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

  // Setting the round2Datas array in the battleStore to the array of round2Steps.
  initRound2Datas() {
    this.battleStore.setRound2Datas([
      this.round2Step1,
      this.round2Step2,
      this.round2Step3,
      this.round2Step4,
    ]);
  }

  // A getter function that returns the chatStep property of the chatStore object.
  get chatStep() {
    return this.chatStore.chatStep;
  }

  // A getter function that returns the value of the isChatDisplay property of the battleStore object.
  get chatDisplay() {
    return this.battleStore.isChatDisplay;
  }

  // A getter function that returns the onboardingStep property of the onboardingStore object.
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
}
</script>

<style lang="sass" scoped>
</style>
