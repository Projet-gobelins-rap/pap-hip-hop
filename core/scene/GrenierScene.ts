import {SceneManager} from "~/core/managers";

class GrenierScene {
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

const instance = new GrenierScene()

export default instance
