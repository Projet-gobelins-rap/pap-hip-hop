import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {User} from "~/core/types";

@Module({
  name: "globalStore",
  namespaced: true,
  stateFactory: true
})
export default class globalStore extends VuexModule {
  private _user:User | null = null
  private _isAppInit: boolean = false;

  // Mutations
  @Mutation
  public setUserData(userData:User){
    console.log(userData,'on est dans le store')
    this._user = userData
  }

  @Mutation
  public setIsAppInit(isInit: boolean) {
    this._isAppInit = isInit;
  }

  // Getters
  get userData(){
    return this._user
  }

  get isAppInit() {
    return this._isAppInit;
  }
}
