<template>
  <section class="mobileScope">
    <div class="mobileScope-debug">
      <span>{{ rotation.x.toFixed(2) }}</span>
      <span>{{ rotation.y.toFixed(2) }}</span>
      <span>{{ rotation.z.toFixed(2) }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import { Euler, Quaternion, Vector3 } from "three";
import stepStore from "~/store/stepStore";
import {
  Gyroscope,
  AbsoluteOrientationSensor,
  RelativeOrientationSensor,
} from "~/core/polyfill/motion-sensor.js";

@Component({
  components: {},
})
export default class MobileScope extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public gyroscope: any;
  public sensor: any;
  public rotation: object = {
    x: 0,
    y: 0,
    z: 0,
  };

  mounted() {
    console.clear();
    console.log("scope");
    // And they're ready for use!
    // this.gyroscope = new Gyroscope({ frequency: 15 });
    // console.log([this.gyroscope, this.orientation]);
    this.initSensor();
    // screen.orientation.lock("portrait")
  }

  initSensor() {
    // let gyroscope = new Gyroscope({ frequency: 60 });

    // gyroscope.addEventListener("reading", (e: any) => {
    //   //   console.log("Angular velocity along the X-axis " + gyroscope.x);
    //   //   console.log("Angular velocity along the Y-axis " + gyroscope.y);
    //   //   console.log("Angular velocity along the Z-axis " + gyroscope.z);
    //   // console.clear();
    // });
    // const b = new Vector3(0, 0, 0);
    // b.applyEuler(a);

    // gyroscope.start();
    this.sensor = new RelativeOrientationSensor({ referenceFrame: "screen" });

    this.sensor.onreading = () => {
      //   this.checkbound(this.sensor.x, this.sensor.y);
      // console.log(this.sensor.quaternion);
      let quarternion = new Quaternion(
        this.sensor.quaternion[0],
        this.sensor.quaternion[1],
        this.sensor.quaternion[2],
        this.sensor.quaternion[3]
      );
      this.rotation = new Euler().setFromQuaternion(quarternion);
    };
    this.sensor.onerror = (event: any) => {
      if (event.error.name == "NotReadableError") {
        console.log("Sensor is not available.");
      }
    };
    this.sensor.start();

    setTimeout(() => {
      this.sensor.stop();
    }, 100);
  }

  checkbound(x: any, y: any) {
    if (x > 5) {
      console.log("oui");
    }
  }
}
</script>