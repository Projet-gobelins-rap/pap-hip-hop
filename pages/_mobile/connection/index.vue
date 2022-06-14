<template>
  <section class="mobileConnection">
    <div>ok</div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import $socket from "~/plugins/socket.io";
import CustomButton from "~/components/buttons/button.vue";
import permisions from "~/core/utils/Permisions";

@Component({
  components: {
    CustomButton,
  },
})
export default class mobileConnection extends Vue {
  public roomID: string | null = null;

  public stepStore = getModule(stepStore, this.$store);
  

  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.roomID = urlParams.get('room')
    this.connect()

    $socket.io.on("server:paired", (user) => {
      this.$router.push("/_mobile/connected");
    })
  }

  connect() {
    $socket.io.emit("server:join", this.roomID);
  }
}
</script>
