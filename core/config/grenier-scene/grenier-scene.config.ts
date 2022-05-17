import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/grenier-scene/interact-points/types";

import PosterInteractPoint from "./interact-points/objects/PosterInteractPoint";
import PosterCameraPosition from "./camera-positions/PosterCameraPosition";
import SprayInteractPoint from "./interact-points/objects/SprayInteractPoint";
import BoxInteractPoint from "./interact-points/objects/BoxInteractPoint";
import SprayCameraPosition from "./camera-positions/SprayCameraPosition";
import BoxCameraPosition from "./camera-positions/BoxCameraPosition";
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
    BoxCameraPosition
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    PosterInteractPoint,
    SprayInteractPoint,
    BoxInteractPoint,
    TvInteractPoint,
  ] as Array<InteractionPoint>,
}

export default GrenierSceneConfig
