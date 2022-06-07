import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";
// import GUI from 'lil-gui';

const BattleCameraPosition: CameraPosition = {
  name: 'npc_battle',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_battle")!.getWorldPosition(lookAtPosition)
    lookAtPosition.y += 8
    const newCameraPosition = new Vector3(
      lookAtPosition.x - 15,
      lookAtPosition.y ,
      lookAtPosition.z,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default BattleCameraPosition
