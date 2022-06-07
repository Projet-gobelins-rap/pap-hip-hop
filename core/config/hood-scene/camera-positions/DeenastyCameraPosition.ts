import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";
// import GUI from 'lil-gui';

const DeenastyCameraPosition: CameraPosition = {
  name: 'npc_deenasty',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("npc_deenasty")!.getWorldPosition(lookAtPosition)

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 10,
      lookAtPosition.y,
      lookAtPosition.z - 10,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default DeenastyCameraPosition
