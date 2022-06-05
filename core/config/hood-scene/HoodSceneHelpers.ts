import {InteractionPoint} from "./interact-points/types";
import hoodSceneConfig from "./hood-scene.config";

class HoodSceneHelper {

  // InteractionPoints
  getInteractionPoint(name: string): InteractionPoint {
    const interactPoint = hoodSceneConfig.interactPoints.find(interactPoint => interactPoint.name === name)
    if (!interactPoint) throw new Error(`Interaction point ${name} doesn't exist`)

    return interactPoint
  }

}

const instance = new HoodSceneHelper()

export default instance
