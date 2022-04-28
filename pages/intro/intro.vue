<template>
  <section class="intro">

    <button>Commencer</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import { io } from "socket.io-client";
import globalStore from "~/store/globalStore";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class Intro extends Vue {
  public home: string = "Home 🚧";
  public code: number = 0

  public globalStore = getModule(globalStore,this.$store)

  mounted() {
    // console.log($socket,'socket from plugin')
    // console.log(this.globalStore,'global store')
    //
    // $socket.on("success_m", (user, users) => {
    //   console.log("connected");
    //   console.log(user.code);
    //   console.log(user);
    //   this.code = user.code;
    // });
    // $socket.on("phone_connected", (user) => {
    //   console.log("phone_connected on Desktop");
    //   console.log(user,"<--- user connected");
    //   console.log($socket,'<--- socket ')
    //   // this.globalStore.setUserData({phone:Object.keys(user)[0],desktop:Object.keys(user)[1]})
    // });
  }
}
</script>

<style lang="sass" scoped>

</style>
