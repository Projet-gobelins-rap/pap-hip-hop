<template>
  <div class="choices">

    <div v-for="(item, i) in content" @click="selectItem(i,item)"  class="choices__item">
      <span>{{item.content[0].text}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule, Prop } from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/button.vue";
import chatStore from "~/store/chatStore";

@Component({
  components: {
    CustomButton,
  },
})
export default class Choice extends Vue {
  @Prop({ required: true }) readonly content!: any;
  @Prop({ required: true }) readonly multipleChoice!: boolean = true;
  // public chatStore = getModule(chatStore, this.$store);
  public choiceArray: [{
    id:number
    scoreValue:number,
    text:string
  }] = []

  mounted() {
    console.log(this.content,'<-- content choice')
    this.content.forEach((element)=>{
      console.log(element,'chouces')
    })
  }

  selectItem(index:number,item:object) {
    console.log(index,'<-- selected index')
    console.log(item.content[0].text,'<-- selected item')


    // if (!this.choiceArray.includes(item.content[0].text)){

    this.choiceArray.push({
      id: index,
      scoreValue: item.score,
      text: item.content[0].text
    })


    // this.choiceArray.forEach((element)=>{
    //   let exists = Object.values(element).includes(index);
    //   if (exists){
    //     console.log(exists,'OKOKOKOKOK')
    //   }
    //
    // })

    // for (let key in this.choiceArray.) {
      //
      //   console.log(key,'keyyyyy')
      //   // if (this.choiceArray[key] == "SEARCH") {
      //   //   hasVal = true; break;
      //   // }
      // }



    // }




    console.log(this.choiceArray,':::  choice array')
  }

}
</script>
