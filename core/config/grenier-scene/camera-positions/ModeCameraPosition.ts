import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";


import $socket from "~/plugins/socket.io";
import grenierScene from "../../../scene/GrenierScene";

let ModeCameraPosition: CameraPosition = {
  name: 'Mode',

  coords: () => {
    const lookAtPosition =  new Vector3()
    GrenierScene.context.scene.getObjectByName("interaction_mode")!.getWorldPosition(lookAtPosition)

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 10,
      lookAtPosition.y,
      lookAtPosition.z -10,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default ModeCameraPosition
