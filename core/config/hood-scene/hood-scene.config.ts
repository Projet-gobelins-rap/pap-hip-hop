import {CameraPosition} from "~/core/config/hood-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/hood-scene/interact-points/types";

import DeenastyInteractPoint from "./interact-points/DeenastyInteractPoint";
import BattleInteractPoint from "./interact-points/BattleInteractPoint";
import EricInteractPoint from "./interact-points/EricInteractPoint";
import TicaretInteractPoint from "./interact-points/TicaretInteractPoint";
import NepalInteractPoint from "./interact-points/NepalInteractPoint";

import DeenastyCameraPosition from "./camera-positions/DeenastyCameraPosition";
import BattleCameraPosition from "./camera-positions/BattleCameraPosition";
import EricCameraPosition from "./camera-positions/EricCameraPosition";
import TicaretCameraPosition from "./camera-positions/TicaretCameraPosition";
import InitialCameraPosition from "./camera-positions/InitialCameraPosition";
import NepalCameraPosition from "./camera-positions/NepalCameraPosition";

const HoodSceneConfig = {
  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */
    DeenastyCameraPosition,
    BattleCameraPosition,
    EricCameraPosition,
    TicaretCameraPosition,
    InitialCameraPosition,
    NepalCameraPosition,
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    DeenastyInteractPoint,
    BattleInteractPoint,
    EricInteractPoint,
    TicaretInteractPoint,
    NepalInteractPoint,
  ] as Array<InteractionPoint>,
}

export default HoodSceneConfig
