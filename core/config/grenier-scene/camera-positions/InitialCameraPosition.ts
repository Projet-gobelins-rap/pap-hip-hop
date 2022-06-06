import { CameraPosition } from "~/core/config/grenier-scene/camera-positions/types";
import { Vector3 } from "three";

const InitialCameraPosition: CameraPosition = {
  name: 'initial',

  coords: () => {

    const lookAtPosition = new Vector3(0, 0, 0)//new Vector3(-50, 20, 20)

    const newCameraPosition = new Vector3(64.26325992635307, 20, -54.74045076066439)

    return { newCameraPosition, lookAtPosition }
  }
}

export default InitialCameraPosition
