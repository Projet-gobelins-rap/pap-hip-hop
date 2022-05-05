import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";

const BoxCameraPosition: CameraPosition = {
  name: 'box',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("shoeshelf")!.getWorldPosition(lookAtPosition)

    console.log(lookAtPosition,'lookAt')
    // global.
    // lookAtPosition.x = lookAtPosition.x * 0.95
    // lookAtPosition.z = lookAtPosition.z * 1.1

    const cameraPos = lookAtPosition.clone()

    // cameraPos.x = -15
    // cameraPos.y = 23
    // cameraPos.z = 13

    return { cameraPos, lookAtPosition }
  }
}

export default BoxCameraPosition
