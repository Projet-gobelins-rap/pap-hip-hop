import {SceneManager} from "~/core/managers";
import BattleSceneInitializer from "../utils/initializers/BattleSceneInitializer";

class BattleScene {
  private _context: SceneManager | null

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

const instance = new BattleScene()

export default instance
