import { Vector3 } from "three";
import grenierSceneStore from "~/store/grenierSceneStore";
import { InteractionPoint } from "~/core/config/grenier-scene/interact-points/types";
import GrenierScene from "../../../../scene/GrenierScene";

const BoxInteractPoint: InteractionPoint = {
  name: "box",

  canvasCoords: () => {
    const position = new Vector3();
    GrenierScene.context.scene.getObjectByName("cube2")!.getWorldPosition(position);

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

export default BoxInteractPoint;
