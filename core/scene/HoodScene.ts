import {SceneManager} from "~/core/managers";
import {Npc} from "../models/npc";

class HoodScene {
  private _context: SceneManager | null
  public npcArray: Npc[];

  constructor() {
    this._context = null
  }

  public setSceneContext(sceneContext: SceneManager) {
    this._context = sceneContext
  }

  get context() {
    if (!this._context) {
      throw new Error(`You need to set a sceneContext for GlobalScene`)
    }
    return this._context
  }
}

const instance = new HoodScene()

export default instance
