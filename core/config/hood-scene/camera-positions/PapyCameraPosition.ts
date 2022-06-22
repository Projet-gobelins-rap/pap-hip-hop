import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const PapyCameraPosition: CameraPosition = {
  name: 'npc_eric_end',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_eric_end")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y -= 4
    const newCameraPosition = new Vector3(
      lookAtPosition.x - 50,
      lookAtPosition.y - 10,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default PapyCameraPosition
