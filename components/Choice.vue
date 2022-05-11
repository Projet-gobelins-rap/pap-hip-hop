<template>
  <div class="choices">

    <div v-for="(item, i) in content" @click="selectItem(i,item,$event)"  class="choices__item">
      <span>{{item.content[0].text}}</span>
    </div>

    <button class="choices__validate" @click="validateSelection" :disabled="!isActive">VALIDER</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import chatStore from "~/store/chatStore";
import $socket from "~/plugins/socket.io";

@Component({
  components: {
    CustomButton,
  },
})
export default class Choice extends Vue {
  @Prop({ required: true }) readonly content!: any;
  @Prop({ required: true }) readonly multipleChoice!: boolean = true;

  public choiceArray: [{
    id:number
    scoreValue:number,
    text:string
  }] = []
  public isActive:boolean = false
  public savedIds: number[] = []

  mounted() {
    console.log(this.content,'<-- content choice')
  }

  // TODO :: REFACTO SUR CETTE METHODE
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
      this.savedIds.push(index)
      this.isActive = true
    }


    console.log(this.savedIds)
  }

  validateSelection() {
    console.log('VALIDE AVEC VALIDATION')

    console.log(this.$parent,'PARENT')

    this.$parent.$emit('choice::updateState')

    $socket.io.emit('battle::response',this.savedIds)


  }


}
</script>
