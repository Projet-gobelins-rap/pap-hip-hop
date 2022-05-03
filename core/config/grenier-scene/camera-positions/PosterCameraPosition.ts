import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const PosterCameraPosition: CameraPosition = {
  name: 'poster',

  coords: () => {
    const lookAtPosition = GlobalScene.context.scene.getObjectByName('chambre')!.position
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = 210
    cameraPos.y = 160
    cameraPos.z = 25

    return { cameraPos, lookAtPosition }
  }
}

export default PosterCameraPosition
