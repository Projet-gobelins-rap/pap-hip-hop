import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";


import $socket from "~/plugins/socket.io";
import grenierScene from "../../../scene/GrenierScene";

let PapyCameraPosition: CameraPosition = {
  name: 'Papy',

  coords: () => {
    const lookAtPosition =  new Vector3()
    GrenierScene.context.scene.getObjectByName("npc_victor")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 35

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 40,
      lookAtPosition.y,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default PapyCameraPosition
