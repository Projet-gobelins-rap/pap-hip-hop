import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { InteractionPoint } from "../core/config/hood-scene/interact-points/types";
import HoodSceneHelper from "../core/config/hood-scene/HoodSceneHelpers";

@Module({
  name: "hoodSceneStore",
  namespaced: true,
  stateFactory: true
})
export default class hoodSceneStore extends VuexModule {

  private _activeInteractionPoints: Array<InteractionPoint> = []
  private _isCameraMoving: boolean = false
  private _isChatDisplay: boolean = false

  @Mutation
  public addInteractivePoint(name: string) {
    const interactPoint = HoodSceneHelper.getInteractionPoint(name)
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

  @Mutation
  public setIsChatDisplay(isDisplay: boolean) {
    this._isChatDisplay = isDisplay

    return this
  }

  // Getters
  get activeInteractionPoints() {
    return this._activeInteractionPoints
  }

  get isCameraMoving() {
    return this._isCameraMoving
  }

  get isChatDisplay() {
    return this._isChatDisplay
  }
}
