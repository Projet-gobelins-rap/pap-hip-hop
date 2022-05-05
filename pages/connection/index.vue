<template>
  <section class="desktopConnection">
    <div>
      Connecte toi à l'expérience sur ton mobile et saisie le code suivant :
    </div>
    <span id="code">{{ this.code }}</span>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule } from "nuxt-property-decorator";
import globalStore from "~/store/globalStore";
import $socket from "~/plugins/socket.io";
// import websocketManagerInstance from "~/core/managers/WebsocketManager"

@Component({
  components: {},
})
export default class Connection extends Vue {
  public home: string = "Home 🚧";
  public code: number = 0;

  public globalStore = getModule(globalStore, this.$store);

  mounted() {
    console.log(this.globalStore, "global store");

    $socket.io.emit('server:join', '')
    $socket.io.on('server:joined', id => {
      console.log('joined : ' + id); 
    })
 
    // if (!$socket.code) {
    //   $socket.desktopConnection();

    //   $socket.io.on("success-desktop", user => {
    //     console.log("connected");
    //     console.log(user.code);
    //     console.log(user);
    //     this.code = user.code;
    //     $socket.code = user.code;
    //   });
    // } else {
    //   this.code = $socket.code;
    // }

    // $socket.io.on("phone_connected", (user) => {
    //   console.log("phone_connected on Desktop");
    //   console.log(user,"<--- user connected");
    //   console.log($socket,'<--- socket ')

    //   // this.$router.push('/grenier')
    //   this.$router.push("/graf/scope");

    // //   // TODO :: Stocker notre user dans le store
    // //   // this.globalStore.setUserData({phone:Object.keys(user)[0],desktop:Object.keys(user)[1]})
    // });
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
