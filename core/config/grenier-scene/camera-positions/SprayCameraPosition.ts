import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const SprayCameraPosition: CameraPosition = {
  name: 'spray',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("bombe-peinture-2")!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = 28
    cameraPos.y = 20
    cameraPos.z = -12

    return { cameraPos, lookAtPosition }
  }
}

export default SprayCameraPosition
