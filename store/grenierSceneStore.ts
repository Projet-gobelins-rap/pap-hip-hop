import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {InteractionPoint} from "../core/config/grenier-scene/interact-points/types";
import GrenierSceneHelper from "../core/config/grenier-scene/GrenierSceneHelper";

@Module({
  name: "grenierSceneStore",
  namespaced: true,
  stateFactory: true
})
export default class grenierSceneStore extends VuexModule {
  // private _user:User | null = null
  private _activeInteractionPoints: Array<InteractionPoint> = []
  /**
   * When camera is moving, we set this property true
   */
  private _isCameraMoving: boolean = false
  // Mutations
  // @Mutation
  // public setUserData(userData:User){
  //   console.log(userData,'on est dans le store')
  //   this._user = userData
  // }
  //

  @Mutation
  public addInteractivePoint(name: string) {
    const interactPoint = GrenierSceneHelper.getInteractionPoint(name)
    this._activeInteractionPoints.push(interactPoint)

    return this
  }

  @Mutation
  public removeInteractivePoint(name: string) {
    this._activeInteractionPoints = this._activeInteractionPoints.filter(point => point.name !== name)

    return this
  }

  @Mutation
  public updatePositionsInteractivePoint(data: { name: string, transformX: number, transformY: number }) {
    const point = this._activeInteractionPoints.find(interactPoint => interactPoint.name === data.name)

    if (point) {
      point.transformX = data.transformX
      point.transformY = data.transformY
    }
  }

  @Mutation
  public setIsCameraMoving(isMoving: boolean) {
    this._isCameraMoving = isMoving

    return this
  }
   // Getters

  get activeInteractionPoints() {
    return this._activeInteractionPoints
  }

  get isCameraMoving() {
    return this._isCameraMoving
  }
  // get userData(){
  //   return this._user
  // }
}
