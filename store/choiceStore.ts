import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {InteractionPoint} from "../core/config/grenier-scene/interact-points/types";
import GrenierSceneHelper from "../core/config/grenier-scene/GrenierSceneHelper";

@Module({
  name: "choiceStore",
  namespaced: true,
  stateFactory: true
})
export default class choiceStore extends VuexModule {

  private _isMultipleChoice: boolean = true

  @Mutation
  public setMultipleChoice(multipleChoice: boolean) {
    this._isMultipleChoice = multipleChoice

    return this
  }

  // Getters
  get isMultipleChoice() {
    return this._isMultipleChoice
  }

}
