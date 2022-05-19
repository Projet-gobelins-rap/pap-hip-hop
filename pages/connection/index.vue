<template>
  <section class="desktopConnection">
    <div>
      Connecte toi à l'expérience sur ton mobile et saisie le code suivant :
    </div>
    <div ref="qrcode"></div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import globalStore from "~/store/globalStore";
import $socket from "~/plugins/socket.io";
import QRCode from 'easyqrcodejs'   
// import websocketManagerInstance from "~/core/managers/WebsocketManager"

@Component({
  components: {},
})
export default class Connection extends Vue {
  public home: string = "Home 🚧";
  public room: string = "0";

  public globalStore = getModule(globalStore, this.$store);

  mounted() {
    console.log(this.globalStore, "global store");
    console.log($socket.room);

    $socket.io.emit("server:join", $socket.room);
    $socket.io.on("server:joined", (id) => {
      // console.log("joined : " + id);
      this.room = id;
      this.generateQR()
    });

    // $socket.io.on("server:paired", (user) => {
    //   this.$router.push("/grenier");
    // });
  }

  // With async/await
  generateQR() {
    var options = {
      text: "https://192.168.1.12:3001/_mobile/connection/?room="+this.room
    }
    
    // Create new QRCode Object
    new QRCode(this.$refs.qrcode, options);
  }
}
</script>

<style lang="sass" scoped>
.home
  max-width: 700px
  margin: auto
  text-align: center
  .blog-avatar
    height: 140px
    width: 140px
    border-radius: 50%
    background-position: center
    background-size: cover
    margin: 1em auto
  .blog-description
    font-size: 18px
    color: #9A9A9A
    line-height: 30px
    margin-bottom: 3rem
    padding-bottom: 3rem
    font-family: 'Lato', sans-serif
    border-bottom: 1px solid #DADADA

.blog-main
  max-width: 700px
  margin: auto
  text-align: left
  &.single img
    width: 100%
    height: auto
  &.single a
    text-decoration: none
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background-repeat: repeat-x
    background-size: 2px 2px
    background-position: 0 23px

.blog-post
  margin: 0
  margin-bottom: 3rem

@media (max-width: 767px)
  .home
    padding: 0 20px
  .blog-main
    padding: 0
    font-size: 18px
</style>
