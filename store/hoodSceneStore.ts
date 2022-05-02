import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({
  name: "hoodSceneStore",
  namespaced: true,
  stateFactory: true 
})
export default class hoodSceneStore extends VuexModule {
  // private _user:User | null = null

  // Mutations
  // @Mutation
  // public setUserData(userData:User){
  //   console.log(userData,'on est dans le store')
  //   this._user = userData
  // }
  //
  //
  // // Getters
  // get userData(){
  //   return this._user
  // }
}
