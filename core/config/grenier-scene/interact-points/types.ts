import { Vector3 } from "three";
import grenierSceneStore from "../../../../store/grenierSceneStore";

export type InteractionPoint = {
  name: string;
  // nameForHuman: string;
  isCompleted: (grenierStore: grenierSceneStore) => boolean;
  // isVisible: (grenierStore: grenierSceneStore) => boolean;
  canvasCoords: () => Vector3;
  transformX: number;
  transformY: number;
  url: () => string|null;
};
