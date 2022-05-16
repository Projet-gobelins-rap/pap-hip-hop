import {Module, Mutation, VuexModule} from "vuex-module-decorators";


@Module({
  name: "loaderStore",
  namespaced: true,
  stateFactory: true
})

export default class loaderStore extends VuexModule{

  private _isAlreadyloaded: boolean = false;

  @Mutation
  public setIsAlreadyLoaded(isLoaded: boolean) {
    this._isAlreadyloaded = isLoaded;
  }


  get isAlreadyLoaded() {
    return this._isAlreadyloaded;
  }

}
