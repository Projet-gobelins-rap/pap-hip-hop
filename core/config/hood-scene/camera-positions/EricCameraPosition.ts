import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";

const EricCameraPosition: CameraPosition = {
  name: 'npc_eric',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_eric")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 4
    const newCameraPosition = new Vector3(
      lookAtPosition.x - 20,
      lookAtPosition.y ,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default EricCameraPosition
