import { Vector3 } from "three";
import hoodSceneStore from "../../../../store/grenierSceneStore";

export type InteractionPoint = {
  name: string;
  type: string;
  isCompleted: (hoodSceneStore: hoodSceneStore) => boolean;
  canvasCoords: () => Vector3;
  transformX: number;
  transformY: number;
  url: () => string|null;
};
