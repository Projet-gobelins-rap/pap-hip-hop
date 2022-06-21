import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const EricCameraPosition: CameraPosition = {
  name: 'npc_eric',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_eric")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 6
    const newCameraPosition = new Vector3(
      lookAtPosition.x - 20,
      lookAtPosition.y + 2,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default EricCameraPosition
