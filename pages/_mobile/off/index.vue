<template>
  <section class="phoneHome">
    <span class="phoneHome-date">{{ this.timestamp }}</span>
    <span class="phoneHome-date">OFF</span>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import $socket from "~/plugins/socket.io";
@Component({
  components: {
    CustomButton,
  },
})
export default class mobileOff extends Vue {
  public codeValue: number | null = null;
  public timestamp: string = "";

  public stepStore = getModule(stepStore, this.$store);

  mounted() {
    this.getNow();
    setInterval(this.getNow, 60000);
  }

  getNow() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = time;
    this.timestamp = dateTime;
  }
}
</script>

<style lang="sass" scoped>
</style>
