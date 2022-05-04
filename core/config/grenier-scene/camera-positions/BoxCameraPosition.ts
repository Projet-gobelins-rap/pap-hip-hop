import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";

const BoxCameraPosition: CameraPosition = {
  name: 'box',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("cube2")!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = 15
    cameraPos.y = 5
    cameraPos.z = 5

    return { cameraPos, lookAtPosition }
  }
}

export default BoxCameraPosition
