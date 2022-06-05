import HoodScene from "../../../scene/HoodScene";
import {CameraPosition} from "./types";
import {Vector3} from "three";
// import GUI from 'lil-gui';

// const gui = new GUI();
//
// const _params = {
//   lookAtPosX: 0,
//   lookAtPosY: 0,
//   lookAtPosZ: 0,
//   cameraPosX: 0,
//   cameraPosY: 0,
//   cameraPosZ: 0,
// }
const DeenastyCameraPosition: CameraPosition = {
  name: 'poster',
  coords: () => {
    const lookAtPosition =  new Vector3()
    HoodScene.context.scene.getObjectByName("Deenasty")!.getWorldPosition(lookAtPosition)

    const newCameraPosition = new Vector3(
      lookAtPosition.x + 10,
      lookAtPosition.y,
      lookAtPosition.z -10,
    )

    return { newCameraPosition, lookAtPosition }
  }
}

export default DeenastyCameraPosition
