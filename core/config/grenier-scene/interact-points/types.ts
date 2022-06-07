import { Vector3 } from "three";
import grenierSceneStore from "../../../../store/grenierSceneStore";

export type InteractionPoint = {
  name: string;
  type: string;
  isCompleted: (grenierStore: grenierSceneStore) => boolean;
  canvasCoords: () => Vector3;
  transformX: number;
  transformY: number;
  url: () => string|null;
};
