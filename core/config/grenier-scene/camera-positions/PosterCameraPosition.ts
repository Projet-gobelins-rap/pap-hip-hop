import GrenierScene from "../../../scene/GrenierScene";
import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
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
const PosterCameraPosition: CameraPosition = {
  name: 'poster',

  coords: () => {
    const lookAtPosition = new Vector3()
    console.log(lookAtPosition,'<--- lookat 1')
    GrenierScene.context.scene.getObjectByName("interaction_support")!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.7;
    lookAtPosition.y = lookAtPosition.y * 0.95;

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = -180;
    // cameraPos.x = cameraPos.x * -13.6
    // cameraPos.y = cameraPos.y * 1.2
    // cameraPos.z = cameraPos.y * 10


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
