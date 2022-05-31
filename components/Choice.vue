<template>
  <div class="choices">

    <div v-for="(item, i) in content" @click="selectItem(i,item,$event)"  class="choices__item">
      <span>{{item.content[0].text}}</span>
    </div>

    <button v-if="this.multipleChoice"  class="choices__validate" @click="validateSelection" :disabled="!isActive">VALIDER !</button>
  </div>
</template>

<script lang="ts">
import {Vue, Component, getModule, Prop, Watch} from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import choiceStore from "~/store/choiceStore";
import $socket from "~/plugins/socket.io";
import {Punchline} from "../core/types/punchline";

@Component({
  components: {
    CustomButton,
  },
})
export default class Choice extends Vue {
  @Prop({ required: true }) readonly content!: any;
  @Prop({ required: true }) readonly multipleChoice!: boolean;

  public isActive:boolean = false
  public savedIds: number[] = []
  public choiceStore = getModule(choiceStore,this.$store)

  public punchlines: Array<Punchline> = []

  mounted() {
    console.log(this.content,'<-- content choice')
  }

  selectItem(index:number,item:object,event:PointerEvent) {
    let elem:HTMLElement = event.target as HTMLElement

    if (this.multipleChoice) {
      if(this.savedIds.length == 0){
        this.savedIds.push(index)

        elem.classList.toggle('choices__item--selected')
        this.isActive = false

      }
      else {
        if (this.savedIds.includes(index)){
          console.log('OUI ça trouve')

          let indexPosition = this.savedIds.indexOf(index) //this.punchlines.findIndex(el => el.id === index)//this.savedIds.indexOf(index)
          console.log(indexPosition,'zzzz')
          this.savedIds.splice(indexPosition,1)
          elem.classList.toggle('choices__item--selected')
          this.isActive = false

        }else {
          if (this.savedIds.length <=3){
            this.savedIds.push(index)

            console.log(this.punchlines,'<--- punchhh')

            elem.classList.toggle('choices__item--selected')
            this.isActive = false
          }

          if (this.savedIds.length == 4){
            this.isActive = true
          }
        }
      }
    } else {
      elem.classList.add('choices__item--selected')
      console.log('SINGLE CHOICE')
      this.savedIds.push(index)
      this.isActive = true
      this.validateSelection()
    }


    console.log(this.savedIds)
  }

  validateSelection() {
    console.log(this.$parent,'PARENT')
    this.$parent.$emit('choice::updateState')
    $socket.io.emit('battle::response',this.savedIds)
    this.savedIds = []
  }

}
</script>
