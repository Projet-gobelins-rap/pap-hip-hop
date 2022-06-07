import { Vector3 } from "three";
import hoodSceneStore from "~/store/hoodSceneStore";
import { InteractionPoint } from "./types";
import HoodScene from "../../../scene/HoodScene";

const BattleInteractPoint: InteractionPoint = {
  slug: "npc_battle",
  name: "Coach",
  type: "npc",

  canvasCoords: () => {
    const position = new Vector3();
    const target = HoodScene.context.scene.getObjectByName("npc_battle")!
    
    target.getWorldPosition(position);

    position.y = 12 + position.y;

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

export default BattleInteractPoint;
