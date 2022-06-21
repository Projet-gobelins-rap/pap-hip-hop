import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const SprayCameraPosition: CameraPosition = {
  name: 'Graff',

  coords: () => {
    const lookAtPosition =  new Vector3()
    GrenierScene.context.scene.getObjectByName("interaction_graf")!.getWorldPosition(lookAtPosition)

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 40,
      lookAtPosition.y,
      lookAtPosition.z ,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default SprayCameraPosition
