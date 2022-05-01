<template>
  <section class="intro">
    <span>mobileConnection</span>
    <input id="code_input"/>
    <CustomButton @click.native="connect" text="Connexion"></CustomButton>
  </section>
</template> 

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import globalStore from "~/store/globalStore";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";

@Component({
  components: {
    CustomButton, 
  },
})
export default class mobileConnection extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public globalStore = getModule(globalStore,this.$store)

  public code: any;
 
  data() {
    return {
    }
  }

  mounted() { 
    console.log($socket,'socket from plugin')
    console.log(this.globalStore,'global store')
    
  }

  connect() {
    let code: any = document.getElementById('code_input')
  
    if (code) 
      $socket.emit("connect_code", code?.value);
  }
}
</script>