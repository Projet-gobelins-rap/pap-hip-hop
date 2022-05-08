import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {InteractionPoint} from "../core/config/grenier-scene/interact-points/types";
import GrenierSceneHelper from "../core/config/grenier-scene/GrenierSceneHelper";

@Module({
  name: "battleStore",
  namespaced: true,
  stateFactory: true
})
export default class battleStore extends VuexModule {

  private _isChatDisplay: boolean = true


  @Mutation
  public setIsChatDisplay(isDisplay: boolean) {
    this._isChatDisplay = isDisplay

    return this
  }

  // Getters
  get isChatDisplay() {
    return this._isChatDisplay
  }

}
