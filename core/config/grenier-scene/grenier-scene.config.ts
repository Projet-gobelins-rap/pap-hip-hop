import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/grenier-scene/interact-points/types";

import PosterInteractPoint from "./interact-points/objects/PosterInteractPoint";
import PosterCameraPosition from "./camera-positions/PosterCameraPosition";
import SprayInteractPoint from "./interact-points/objects/SprayInteractPoint";
import ModeInteractPoint from "./interact-points/objects/ModeInteractPoint";
import SprayCameraPosition from "./camera-positions/SprayCameraPosition";
import ModeCameraPosition from "./camera-positions/ModeCameraPosition";
import {InitialCameraPosition} from "./camera-positions";
import TvInteractPoint from "./interact-points/objects/TvInteractPoint";
import TvCameraPosition from "./camera-positions/TvCameraPosition";
import PapyCameraPosition from "./camera-positions/PapyCameraPosition";
import PapyInteractPoint from "./interact-points/objects/PapyInteractPoint";

const GrenierSceneConfig = {

  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */
    InitialCameraPosition,
    PosterCameraPosition,
    SprayCameraPosition,
    TvCameraPosition,
    ModeCameraPosition,
    PapyCameraPosition,
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    PosterInteractPoint,
    SprayInteractPoint,
    ModeInteractPoint,
    TvInteractPoint,
    PapyInteractPoint,
  ] as Array<InteractionPoint>,
}

export default GrenierSceneConfig
