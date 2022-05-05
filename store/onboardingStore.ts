import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "onboardingStore",
  namespaced: true,
  stateFactory: true
})
export default class onboardingStore extends VuexModule {
  private _onboardingStep: string | null = ''


  // Mutations
  @Mutation
  public setOnboardingStep(onboardingStep: string) {
    console.log(onboardingStep, 'on est dans le store')
    this._onboardingStep = onboardingStep
  }

  // Getters
  get onboardingStep() {
    return this._onboardingStep
  }
}
