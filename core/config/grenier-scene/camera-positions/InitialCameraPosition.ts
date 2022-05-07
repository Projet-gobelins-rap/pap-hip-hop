import { CameraPosition } from "~/core/config/global-scene/camera-positions/types";
import { Vector3 } from "three";

const InitialCameraPosition: CameraPosition = {
  name: 'initial',

  coords: () => {
    const lookAtPosition = new Vector3(10, 30, -30)

    const cameraPos = lookAtPosition.clone()


    return { cameraPos, lookAtPosition }
  }
}

export default InitialCameraPosition
