import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {Vector3} from "three";

const PosterCameraPosition: CameraPosition = {
  name: 'poster',

  coords: () => {
    const lookAtPosition = new Vector3()
    console.log(lookAtPosition,'<--- lookat 1')
    GrenierScene.context.scene.getObjectByName("affiche")!.getWorldPosition(lookAtPosition)

    lookAtPosition.x = lookAtPosition.x * -2.95
    lookAtPosition.z = lookAtPosition.z * -1.1

    console.log(lookAtPosition,'<--- lookat 2')
    const cameraPos = lookAtPosition.clone()
    // cameraPos.x = cameraPos.x * 1.1
    // cameraPos.y = cameraPos.y * 1.2
    cameraPos.z = cameraPos.z * -1


    // camera.position.copy( mesh.position ).add( direction.multiplyScalar( 1 ) );
    // camera.lookAt( mesh.position );

    // cameraPos.add(lookAtPosition.multiplyScalar(0.2))

    // cameraPos.x = 0
    // cameraPos.y = 5
    // cameraPos.z = -5

    return { cameraPos, lookAtPosition }
  }
}

export default PosterCameraPosition
