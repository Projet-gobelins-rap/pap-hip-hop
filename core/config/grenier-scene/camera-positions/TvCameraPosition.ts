import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const TvCameraPosition: CameraPosition = {
  name: 'Audiovisuel',

  coords: () => {
    const lookAtPosition =  new Vector3()
    GrenierScene.context.scene.getObjectByName("interaction_cinema")!.getWorldPosition(lookAtPosition)

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 30,
      lookAtPosition.y,
      lookAtPosition.z - 30,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default TvCameraPosition
