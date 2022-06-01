<template>
  <section class="phoneHome">
    <span class="phoneHome-date">{{this.timestamp}}</span>
    <ul class="phoneHome-apps">
      <li class="phoneHome-app">
        <nuxt-link class="phoneHome-link" to="/_mobile/phone/archives">
          <svg
            class="phoneHome-icon"
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1.001"
              width="78"
              height="78"
              rx="7"
              fill="#22D175"
              stroke="#02BA59"
              stroke-width="2"
            />
            <path
              d="M59.44 37.437c-.146 8.822-8.662 16.169-19.341 16.099a22.442 22.442 0 0 1-3.1-.235 2.761 2.761 0 0 0-1.583.234l-7.953 3.769c-.48.227-1.144-.167-1.012-.884l.96-5.215a2.94 2.94 0 0 0-.934-2.709c-3.285-2.956-5.236-6.942-5.164-11.29.146-8.823 8.662-16.17 19.341-16.1 10.676.071 18.931 7.52 18.786 16.33Z"
              fill="#FEFEFE"
              stroke="#02BA59"
              stroke-width="2"
            />
          </svg>
          <span class="phoneHome-libelle">Messages</span>
        </nuxt-link>
      </li>
      <li class="phoneHome-app">
        <nuxt-link class="phoneHome-link" to="/_mobile/phone/archives">
          <svg
            class="phoneHome-icon"
            width="80"
            height="81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1.002"
              width="78"
              height="78"
              rx="7"
              fill="#EDCC50"
              stroke="#E7BC18"
              stroke-width="2"
            />
            <path
              d="M20.257 27.8v24.363a1.8 1.8 0 0 0 1.8 1.8h30.945a1.8 1.8 0 0 0 1.8-1.8V31.425a1.8 1.8 0 0 0-1.8-1.8H34.266a1.81 1.81 0 0 1-1.8-1.813 1.81 1.81 0 0 0-1.8-1.812h-8.608a1.8 1.8 0 0 0-1.8 1.8Z"
              fill="#FEFEFE"
            />
            <path
              d="M21.257 52.163V27.8h-2v24.363h2Zm.8-25.163h8.608v-2h-8.608v2Zm12.208 3.625h18.737v-2H34.266v2Zm19.538.8v4.932h2v-4.932h-2ZM22.057 54.963h30.945v-2H22.057v2Zm33.746-2.8V36.357h-2v15.806h2Zm-2.8 2.8a2.8 2.8 0 0 0 2.8-2.8h-2a.8.8 0 0 1-.8.8v2Zm0-24.338a.8.8 0 0 1 .8.8h2a2.8 2.8 0 0 0-2.8-2.8v2Zm-21.538-2.813c0 1.538 1.244 2.813 2.8 2.813v-2a.81.81 0 0 1-.8-.813h-2Zm-.8-.812c.433 0 .8.362.8.812h2c0-1.537-1.245-2.812-2.8-2.812v2Zm-9.408.8a.8.8 0 0 1 .8-.8v-2a2.8 2.8 0 0 0-2.8 2.8h2Zm-2 24.363a2.8 2.8 0 0 0 2.8 2.8v-2a.8.8 0 0 1-.8-.8h-2Z"
              fill="#E7BC18"
            />
            <path
              d="M54.641 55H22.246a1.8 1.8 0 0 1-1.757-2.192l3.353-15.042a1.8 1.8 0 0 1 1.757-1.408h32.186a1.8 1.8 0 0 1 1.762 2.168l-3.144 15.042A1.8 1.8 0 0 1 54.641 55Z"
              fill="#FEFEFE"
              stroke="#E7BC18"
              stroke-width="2"
            />
          </svg>
          <span class="phoneHome-libelle">Fichiers</span>
        </nuxt-link>
      </li>
      <li class="phoneHome-app">
        <nuxt-link class="phoneHome-link" to="/_mobile/phone/contacts">
          <svg
            class="phoneHome-icon"
            width="80"
            height="81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1.002"
              width="78"
              height="78"
              rx="7"
              fill="#7C44ED"
              stroke="#6330CA"
              stroke-width="2"
            />
            <path
              d="M60 60v-4.667c0-2.475-1.054-4.849-2.929-6.6C55.196 46.984 52.652 46 50 46H30c-2.652 0-5.196.983-7.071 2.734-1.875 1.75-2.929 4.124-2.929 6.6V60M40 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
              fill="#FEFEFE"
              stroke="#6330CA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="phoneHome-libelle">Contacts</span>
        </nuxt-link>
      </li>
      <li class="phoneHome-app">
        <nuxt-link class="phoneHome-link" to="/_mobile/phone/collectibles">
          <svg
            class="phoneHome-icon"
            width="80"
            height="81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1.004"
              width="78"
              height="78"
              rx="7"
              fill="#ED6787"
              stroke="#D84367"
              stroke-width="2"
            />
            <circle
              cx="46.667"
              cy="33.333"
              r="13.333"
              fill="#FEFEFE"
              stroke="#D84367"
              stroke-width="2"
            />
            <circle
              cx="42.222"
              cy="37.778"
              r="15.556"
              fill="#FEFEFE"
              stroke="#D84367"
              stroke-width="2"
            />
            <circle
              cx="37.778"
              cy="42.222"
              r="17.778"
              fill="#FEFEFE"
              stroke="#D84367"
              stroke-width="2"
            />
            <path
              d="M38.667 32.592A10.63 10.63 0 0 1 44 35.16M36.889 28.889c5.044 0 9.475 2.626 12 6.585M25.307 46.222a14.268 14.268 0 0 0 7.582 8.11"
              stroke="#D84367"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="37.778"
              cy="42.222"
              r="3.556"
              fill="#FEFEFE"
              stroke="#D84367"
              stroke-width="2"
            />
          </svg>
          <span class="phoneHome-libelle">Collectables</span>
        </nuxt-link>
      </li>
    </ul>
    <!-- <ul>
      <span class="phoneHome-link" @click="askPermisions">Permisions</span>
      <nuxt-link class="phoneHome-link" to="/_mobile/phone/archives">
        Archives
      </nuxt-link>
      <nuxt-link class="phoneHome-link" to="/_mobile/phone/collectibles">
        Collectables
      </nuxt-link>
      <nuxt-link class="phoneHome-link" to="/_mobile/connection">
        Connexion
      </nuxt-link>
      <nuxt-link class="phoneHome-link" to="/_mobile/graff/scope">
        Graff
      </nuxt-link>
      <nuxt-link class="phoneHome-link" to="/_mobile/battle"> RC </nuxt-link>
    </ul> -->
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
export default class phoneHome extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public timestamp: string = "";

  mounted() {
    this.getNow()
    setInterval(this.getNow, 60000)
  }

  askPermisions() {
    permisions.requestOrientation();
  }
  getNow() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = time;
    this.timestamp = dateTime;
  }
}
</script>
