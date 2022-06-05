import {CameraPosition} from "~/core/config/hood-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/hood-scene/interact-points/types";

import DeenastyInteractPoint from "./interact-points/DeenastyInteractPoint";
import DeenastyCameraPosition from "./camera-positions/DeenastyCameraPosition";

const HoodSceneConfig = {
  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */
    DeenastyCameraPosition,
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    DeenastyInteractPoint,
  ] as Array<InteractionPoint>,
}

export default HoodSceneConfig
