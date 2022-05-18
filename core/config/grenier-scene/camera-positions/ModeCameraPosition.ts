import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const ModeCameraPosition: CameraPosition = {
  name: 'Mode',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("clothes_group")!.getWorldDirection(lookAtPosition)

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

export default ModeCameraPosition
