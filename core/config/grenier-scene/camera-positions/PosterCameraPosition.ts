import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";

const PosterCameraPosition: CameraPosition = {
  name: 'poster',

  coords: () => {
    const lookAtPosition = new Vector3()
    GrenierScene.context.scene.getObjectByName("cube")!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = -500
    cameraPos.y = 200
    cameraPos.z = 360

    return { cameraPos, lookAtPosition }
  }
}

export default PosterCameraPosition
