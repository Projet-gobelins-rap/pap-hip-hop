import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";

const SprayCameraPosition: CameraPosition = {
  name: 'spray',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("cube1")!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = 0
    cameraPos.y = 35
    cameraPos.z = 5

    return { cameraPos, lookAtPosition }
  }
}

export default SprayCameraPosition
