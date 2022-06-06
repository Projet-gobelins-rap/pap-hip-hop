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

const GrenierSceneConfig = {
  // // ROOMS
  // rooms: [
  //   Bedroom,
  //   Lounge,
  //   Mezzanine
  // ] as Array<Room>,
  //
  // // ROOM OBJECTS
  // roomObjects: [
  //   /* Bedroom */
  //   SkateRoomObject,
  //   PaperRoomObject,
  //   /* Lounge */
  //   VinylRoomObject,
  //   NotebookRoomObject,
  //   /* Mezzanine */
  //   TelevisionRoomObject,
  //   PhoneRoomObject
  // ] as Array<RoomObject>,

  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */

    InitialCameraPosition,
    PosterCameraPosition,
    SprayCameraPosition,
    TvCameraPosition,
    ModeCameraPosition
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    PosterInteractPoint,
    SprayInteractPoint,
    ModeInteractPoint,
    TvInteractPoint,
  ] as Array<InteractionPoint>,
}

export default GrenierSceneConfig
