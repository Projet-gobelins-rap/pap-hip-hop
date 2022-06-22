import { Vector3 } from "three";
import hoodSceneStore from "~/store/hoodSceneStore";
import { InteractionPoint } from "./types";
import HoodScene from "../../../scene/HoodScene";

const PapyInteractPoint: InteractionPoint = {
  slug: "npc_victor_end",
  name: "Papy",
  type: "npc",

  canvasCoords: () => {
    const position = new Vector3();
    const target = HoodScene.context.scene.getObjectByName("npc_victor_end")!
    target.getWorldPosition(position);
    

    // position.y = 1 + position.y;
    // position.x = 1 + position.x;

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
