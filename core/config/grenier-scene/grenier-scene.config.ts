// import {CameraPosition} from "~/core/config/grenier-scene/camera-positions/types";
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

import { Vector3 } from 'three';
import CameraConfigurator from '../../defs/cameraConfigurator'
import GrenierScene from "../../scene/GrenierScene";

console.log(GrenierScene);

const GrenierSceneConfig = {
  // CAMERA POSITIONS
  grenierCameras: { 
    initial: new CameraConfigurator('initial', null , new Vector3(64, 20, -54)),
    supports: new CameraConfigurator('Supports d\'écoute', GrenierScene.context.scene.getObjectByName("interaction_support"), new Vector3(30, 0, 0)),
    graff: new CameraConfigurator('Graff', GrenierScene.context.scene.getObjectByName("interaction_graf"), new Vector3(30, 0, 0)),
    mode: new CameraConfigurator('Mode', GrenierScene.context.scene.getObjectByName("interaction_mode"), new Vector3(10, 0, -10)),
    audiovisuel: new CameraConfigurator('Audiovisuel', GrenierScene.context.scene.getObjectByName("interaction_cinema"), new Vector3(10, 0, -10)),
  },

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    PosterInteractPoint,
    SprayInteractPoint,
    ModeInteractPoint,
    TvInteractPoint,
  ] as Array<InteractionPoint>,
}
console.log(GrenierSceneConfig);

export default GrenierSceneConfig
