import { CameraPosition } from "~/core/config/grenier-scene/camera-positions/types";
import { Vector3 } from "three";

const InitialCameraPosition: CameraPosition = {
  name: 'initial',

  coords: () => {
    const lookAtPosition = new Vector3(79.26325992635307, 30.00643564857594, -88.74045076066439)//new Vector3(-50, 20, 20)

    const cameraPos = new Vector3(79.26325992635307, 30.00643564857594, -88.74045076066439)

    return { cameraPos, lookAtPosition }
  }
}

export default InitialCameraPosition
