import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({
  name: "collectibleStore",
  namespaced: true,
  stateFactory: true
})

export default class collectibleStore extends VuexModule {

  private _collected: string[] = []

  @Mutation
  public addCollected(collectible: string) {
    this._collected.push(collectible)

    return this
  }

  // Getters
  get collected() {
    return this._collected
  }

}
