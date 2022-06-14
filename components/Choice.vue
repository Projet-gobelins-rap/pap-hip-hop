<template>
  <div class="choices">

    <div v-for="(item, i) in content" @click="selectItem(i,item,$event)"  class="choices__item">
      <span>
        {{item.content[0].text}}
      </span>
      <div class="choices__itemBadge">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
          <g>
            <g id="check">
              <g>
                <polygon style="fill:white;" points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818 			"/>
              </g>
            </g>
          </g>
        </svg>

      </div>
    </div>

    <CustomButton
      v-if="this.multipleChoice"
      class="btn choices__validate medium"
      @click.native="validateSelection"
      :disabled="!isActive"
      text="GO GO GO"
    ></CustomButton>
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
    let badge:HTMLElement = elem.querySelector('.choices__itemBadge')

    if (this.multipleChoice) {
      if(this.savedIds.length == 0){
        this.savedIds.push(index)

        elem.classList.toggle('choices__item--selected')
        this.isActive = false

      }
      else {
        if (this.savedIds.includes(index)){
          let indexPosition = this.savedIds.indexOf(index)
          this.savedIds.splice(indexPosition,1)
          elem.classList.toggle('choices__item--selected')
          this.isActive = false
        }else {
          if (this.savedIds.length <=3){
            this.savedIds.push(index)
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

  updateIndexSelection(){
    let badge = document.querySelectorAll('.choices__item--selected .choices__itemBadge')
    let initialValue = 1
    let currentOrder = []
    this.savedIds.forEach((elemValue:number,index:number)=>{
      let elem:HTMLElement =  badge[this.savedIds.indexOf(elemValue)] as HTMLElement
      // if (this.savedIds.indexOf(elemValue)+1 === 0){
      //   element.innerHTML = `${initialValue}`
      // }else {
      //   element.innerHTML = `${this.savedIds.indexOf(elemValue)}`
      // }


      let val = index+1
      elem.innerHTML = `${val}`//val+1.toString()
      console.log(badge[this.savedIds.indexOf(elemValue)],this.savedIds.indexOf(elemValue)+1,elemValue,index+1)

    })

    // let lowestToHighest = this.savedIds.sort((a, b) => a - b);
    // console.log(lowestToHighest,'lowest to highest')
  }

  validateSelection() {
    this.$parent.$emit('choice::updateState')
    $socket.io.emit('battle::response',this.savedIds)
    this.savedIds = []
  }

}
</script>
