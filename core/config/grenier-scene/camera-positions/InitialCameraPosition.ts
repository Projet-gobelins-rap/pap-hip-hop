import { CameraPosition } from "~/core/config/global-scene/camera-positions/types";
import { Vector3 } from "three";

const InitialCameraPosition: CameraPosition = {
  name: 'initial',

  coords: () => {
    const lookAtPosition = new Vector3(-50, 20, 20)

    const cameraPos = new Vector3(30, 20, -30)


    return { cameraPos, lookAtPosition }
  }
}

export default InitialCameraPosition
