import {InteractionPoint} from "~/core/config/grenier-scene/interact-points/types";
import grenierSceneConfig from "./grenier-scene.config";

class GrenierSceneHelper {

  // InteractionPoints
  getInteractionPoint(name: string): InteractionPoint {
    const interactPoint = grenierSceneConfig.interactPoints.find(interactPoint => interactPoint.name === name)
    if (!interactPoint) throw new Error(`Interaction point ${name} doesn't exist`)

    return interactPoint
  }

}

const instance = new GrenierSceneHelper()

export default instance
