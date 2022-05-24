import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const TvCameraPosition: CameraPosition = {
  name: 'TV',

  //--> look at initial
  //x: -32.056095123291016
  // y: 5.54551887512207
  // z: 51.87923812866211

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("interaction_cinema")!.getWorldDirection(lookAtPosition);
    // lookAtPosition.x = lookAtPosition.x * 3.1;
    // lookAtPosition.y = lookAtPosition.y * 2.15;

    // console.log(lookAtPosition,'ekippp')
    const cameraPos = lookAtPosition.clone()

    // cameraPos.x = 7.05
    // cameraPos.y = 0.099
    // cameraPos.z = -15.627
    return { cameraPos, lookAtPosition }
  }
}

export default TvCameraPosition
