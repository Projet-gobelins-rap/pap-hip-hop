import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const TvCameraPosition: CameraPosition = {
  name: 'TV',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("tv")!.getWorldPosition(lookAtPosition);
    // lookAtPosition.z = lookAtPosition.z * 3.1;
    // lookAtPosition.z = lookAtPosition.x * 3.3;
    // lookAtPosition.y = lookAtPosition.y * 2.15;

    const cameraPos = lookAtPosition.clone()
    // cameraPos.x = cameraPos.x * 2.5
    // cameraPos.z = cameraPos.z * 1.2
    // cameraPos.x = -180
    // cameraPos.y = 35
    cameraPos.z = -30

    return { cameraPos, lookAtPosition }
  }
}

export default TvCameraPosition
