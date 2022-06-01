import { Vector3 } from 'three';
import CameraConfigurator from '../../../defs/cameraConfigurator'
import GrenierScene from "../../../scene/GrenierScene";

const grenierCameras = {
    initial: new CameraConfigurator('initial', null , new Vector3(64, 20, -54)),
    supports: new CameraConfigurator('Supports d\'écoute', GrenierScene.context.scene.getObjectByName("interaction_support"), new Vector3(30, 0, 0)),
    graff: new CameraConfigurator('Graff', GrenierScene.context.scene.getObjectByName("interaction_graf"), new Vector3(30, 0, 0)),
    mode: new CameraConfigurator('Mode', GrenierScene.context.scene.getObjectByName("interaction_mode"), new Vector3(10, 0, -10)),
    audiovisuel: new CameraConfigurator('Audiovisuel', GrenierScene.context.scene.getObjectByName("interaction_cinema"), new Vector3(10, 0, -10)),
}

export default grenierCameras
