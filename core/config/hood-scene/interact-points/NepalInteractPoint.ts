import { Vector3 } from "three";
import hoodSceneStore from "~/store/hoodSceneStore";
import { InteractionPoint } from "./types";
import HoodScene from "../../../scene/HoodScene";

const NepalInteractPoint: InteractionPoint = {
  slug: "interaction_nepal",
  name: "Hommage Népal",
  type: "plus",

  canvasCoords: () => {
    const position = new Vector3();
    const target = HoodScene.context.scene.getObjectByName("interaction_nepal")!
    target.getWorldPosition(position);
    target.children = []
    target.material.visible = false
    

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

export default NepalInteractPoint;