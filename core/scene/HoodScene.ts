import {SceneManager} from "~/core/managers";

class HoodScene {
  private _context: SceneManager | null
  public onToastNotify: Function

  constructor() {
    this._context = null
  }

  public setSceneContext(sceneContext: SceneManager) {
    this._context = sceneContext
  }

  public initCallback(toastCallback) {
    this.onToastNotify = toastCallback || function () {
    }
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
