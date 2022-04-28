import {Module, Mutation, VuexModule} from "vuex-module-decorators";


@Module({
  name: "loader",
  namespaced: true,
  stateFactory: true
})

export default class Loader extends VuexModule{

  private _isAlreadyloaded: boolean = false;
  private  _imgs:any=[]

  @Mutation
  public setIsAlreadyLoaded(isLoaded: boolean) {
    this._isAlreadyloaded = isLoaded;
  }

  @Mutation
  setImg(imgs:string) {
    this._imgs.push(imgs) ;
  }

  get isAlreadyLoaded() {
    return this._isAlreadyloaded;
  }

  get Imgs(){
    return this._imgs
  }

}
