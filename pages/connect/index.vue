<template>
  <section class="connect">
    {{ this.connect }}

    <form>
      <input v-model="codeValue" type="text" />
    </form>
    <button @click="getInputVal">valider</button>

  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import $socket from "~/plugins/socket.io";

@Component({
  components: {},
})
export default class Connect extends Vue {
  public connect: string = "Connect page 🚧";
  public codeValue: any = "";

  mounted() {
    console.clear()
    console.log("mounted hook on Connect page");

    $socket.on("success_m", (user, users) => {
      console.log("connected");
    });

   $socket.on("phone_connected", (user) => {
      console.log("phone_connected");
    });
  }

  getInputVal() {
    console.log(this.codeValue);
    $socket.emit("connect_code", this.codeValue);
  }
}
</script>

<style lang="sass"></style>
