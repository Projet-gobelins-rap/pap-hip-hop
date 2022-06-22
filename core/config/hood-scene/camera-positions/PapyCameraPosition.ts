import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const PapyCameraPosition: CameraPosition = {
  name: 'npc_victor_end',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_victor_end")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 8
    const newCameraPosition = new Vector3(
      lookAtPosition.x + 5,
      lookAtPosition.y ,
      lookAtPosition.z + 20,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default PapyCameraPosition
