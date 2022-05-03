import { Vector3 } from "three";
import grenierSceneStore from "~/store/grenierSceneStore";
import { InteractionPoint } from "~/core/config/grenier-scene/interact-points/types";
import GrenierScene from "../../../../scene/GrenierScene";

const PosterInteractPoint: InteractionPoint = {
  name: "poster",

  canvasCoords: () => {
    const position = new Vector3();
    GrenierScene.context.scene
      .getObjectByName("chambre")!
      .getWorldPosition(position);

    position.y = 1 + position.y + 80;
    position.x = 1 + position.x - 50;

    return position;
  },

  isCompleted: () => {
    return false;
  },


  url: () => null,

  transformX: 0,

  transformY: 0
};

export default PosterInteractPoint;
