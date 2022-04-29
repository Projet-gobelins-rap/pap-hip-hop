import {Vector3} from "three";

export type CameraPosition = {
  name: string
  coords: () => { cameraPos: Vector3, lookAtPosition: Vector3 }
}
