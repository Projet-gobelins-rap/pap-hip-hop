import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";


import $socket from "~/plugins/socket.io";
import grenierScene from "../../../scene/GrenierScene";

let ModeCameraPosition: CameraPosition = {
  name: 'Mode',

  coords: () => {
    const lookAtPosition =  new Vector3()
    GrenierScene.context.scene.getObjectByName("clothes_group")!.getWorldPosition(lookAtPosition)
    console.log(": ---->  ", lookAtPosition)

    const cameraPos = new Vector3(
      lookAtPosition.x,
      lookAtPosition.y,
      lookAtPosition.z  ,
    )

    console.log(cameraPos,'<--- Mode ::: Camera position')

    return { cameraPos, lookAtPosition }
  }
}

export default ModeCameraPosition
