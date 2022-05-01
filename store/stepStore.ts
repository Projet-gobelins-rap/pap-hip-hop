import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {User} from "~/core/types";

@Module({
  name: "stepStore",
  namespaced: true,
  stateFactory: true
})
export default class stepStore extends VuexModule {
  private _intro:boolean = false
  private _introMotion:boolean = false

  // Mutations
  @Mutation
  public setIntroState(introState:boolean){
    console.log(introState,'on est dans le store')
    this._intro = introState
  }

  @Mutation
  public skipIntroMotionState(introMotionState:boolean){
    console.log(introMotionState,'on est dans le store')
    this._intro = introMotionState
  }

  // Getters
  get introState(){
    return this._intro
  }

  get introMotionState(){
    return this._introMotion
  }

}
