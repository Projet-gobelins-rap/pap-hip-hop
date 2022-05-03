import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/grenier-scene/interact-points/types";

import PosterInteractPoint from "./interact-points/objects/posterInteractPoint";
import PosterCameraPosition from "./camera-positions/PosterCameraPosition";

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
    PosterCameraPosition,
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    PosterInteractPoint,
  ] as Array<InteractionPoint>,
}

export default GrenierSceneConfig
