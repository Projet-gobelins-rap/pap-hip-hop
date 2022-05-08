import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {InteractionPoint} from "../core/config/grenier-scene/interact-points/types";
import GrenierSceneHelper from "../core/config/grenier-scene/GrenierSceneHelper";

@Module({
  name: "battleStore",
  namespaced: true,
  stateFactory: true
})
export default class battleStore extends VuexModule {

  // VALEUR SET A TRUE POUR LE DEV --> PAR LA SUITE ON DEVRA LA SET A FALSE
  private _isChatDisplay: boolean = true

  private _selectedPunchs:string[] = []

  @Mutation
  public setIsChatDisplay(isDisplay: boolean) {
    this._isChatDisplay = isDisplay

    return this
  }

  @Mutation
  public setSelectedPunchs(selectedPunch: string) {
    this._selectedPunchs.push(selectedPunch)

    return this
  }

  // Getters
  get isChatDisplay() {
    return this._isChatDisplay
  }

  get selectedPunchs(){

    return this._selectedPunchs
  }

}
