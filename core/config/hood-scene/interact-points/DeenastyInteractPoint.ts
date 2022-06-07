import { Vector3 } from "three";
import hoodSceneStore from "~/store/hoodSceneStore";
import { InteractionPoint } from "./types";
import HoodScene from "../../../scene/HoodScene";

const DeenastyInteractPoint: InteractionPoint = {
  slug: "npc_deenasty",
  name: "Deenasty",
  type: "npc",

  canvasCoords: () => {
    const position = new Vector3();
    const target = HoodScene.context.scene.getObjectByName("pnj_deenasty")!
    
    target.getWorldPosition(position);
    target.children = []

    position.y = 1 + position.y;
    position.x = 1 + position.x;

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

export default DeenastyInteractPoint;
