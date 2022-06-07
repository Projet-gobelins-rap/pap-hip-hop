import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const TicaretCameraPosition: CameraPosition = {
  name: 'npc_ticaret',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_ticaret")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 8
    const newCameraPosition = new Vector3(
      lookAtPosition.x,
      lookAtPosition.y,
      lookAtPosition.z - 20,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default TicaretCameraPosition
