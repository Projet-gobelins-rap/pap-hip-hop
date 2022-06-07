import { Vector3 } from "three";
import grenierSceneStore from "~/store/grenierSceneStore";
import { InteractionPoint } from "~/core/config/grenier-scene/interact-points/types";
import GrenierScene from "../../../../scene/GrenierScene";

const PapyInteractPoint: InteractionPoint = {
  name: "Papy",
  type: "npc",

  canvasCoords: () => {
    const position = new Vector3();
    const target = GrenierScene.context.scene.getObjectByName("npc_victor")!
    target.getWorldPosition(position);

    position.y = 42 + position.y;
    position.x = 15 + position.x;

    return position;
  },
  // isVisible: true,
  isCompleted: () => {
    return false;
  },

  url: () => '/',

  transformX: 0,
  transformY: 0
};

export default PapyInteractPoint;
