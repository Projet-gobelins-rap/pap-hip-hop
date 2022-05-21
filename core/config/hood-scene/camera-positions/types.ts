//TODO : move globals types

import {Vector3} from "three";

export type CameraPosition = {
  name: string
  coords: () => { newCameraPosition: Vector3, lookAtPosition: Vector3 }
}
