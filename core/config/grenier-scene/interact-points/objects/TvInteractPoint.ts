import { Vector3 } from "three";
import grenierSceneStore from "~/store/grenierSceneStore";
import { InteractionPoint } from "~/core/config/grenier-scene/interact-points/types";
import GrenierScene from "../../../../scene/GrenierScene";

const TvInteractPoint: InteractionPoint = {
  name: "TV",
  type: "plus",

  canvasCoords: () => {
    const position = new Vector3();
    const target = GrenierScene.context.scene.getObjectByName("interaction_cinema")!
    target.getWorldPosition(position);

    target.children = []
    position.y = 1 + position.y;
    position.x = 1 + position.x;

    return position;
  },
  
  isCompleted: () => {
    return false;
  },

  url: () => '/',

  transformX: 0,
  transformY: 0
};

export default TvInteractPoint;
