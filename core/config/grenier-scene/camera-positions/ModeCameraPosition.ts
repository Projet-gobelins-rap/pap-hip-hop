import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";


import $socket from "~/plugins/socket.io";
import grenierScene from "../../../scene/GrenierScene";

let ModeCameraPosition: CameraPosition = {
  name: 'Mode',

  coords: () => {
    const lookAtPosition = new Vector3()
    // GrenierScene.context.scene.getObjectByName("clothes_group")!.getWorldPosition(lookAtPosition)
    GrenierScene.context.scene.getObjectByName("clothes_group")!.getWorldPosition(lookAtPosition)

    // lookAtPosition.setFromMatrixPosition(GrenierScene.context.scene.getObjectByName("clothes_group").matrixWorld)

    // console.log(lookAtPosition,'lookAt')
    // global.
    lookAtPosition.x = lookAtPosition.x * (1.5)

    lookAtPosition.y = lookAtPosition.y * 1.25
    lookAtPosition.z = lookAtPosition.z * (-1.98)

    let cameraPos = lookAtPosition.clone()

    console.log(grenierScene.context.scene.getObjectByName("clothes_group")!.userData.camPosX,"ZZZ")
    // cameraPos.x = grenierScene.context.scene.getObjectByName("clothes_group")!.userData.camPosX
    // $socket.io.on('Mode::x',(value)=>{
    //   console.log('EKippppppppppp')
    //   cameraPos.x = value
    // })
     // console.log()

    console.log(cameraPos,'<--- Mode ::: Camera position')
    // cameraPos.x = -15
    // cameraPos.y = 13
    // cameraPos.x = lookAtPosition.x * -0.5
    // cameraPos.y = lookAtPosition.y * 1.5
    // cameraPos.z = -lookAtPosition.z * (-1.08)

    return { cameraPos, lookAtPosition }
  }
}

export default ModeCameraPosition
