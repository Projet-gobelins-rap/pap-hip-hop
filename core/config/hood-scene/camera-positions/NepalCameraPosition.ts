import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const NepalCameraPosition: CameraPosition = {
  name: 'interaction_nepal',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("interaction_nepal")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y -= 4
    const newCameraPosition = new Vector3(
      lookAtPosition.x - 50,
      lookAtPosition.y - 10,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default NepalCameraPosition
