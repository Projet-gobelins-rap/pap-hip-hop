import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "onboardingStore",
  namespaced: true,
  stateFactory: true
})
export default class onboardingStore extends VuexModule {
  private _onboardingStep: string | null = ''
  // TODO :: penser a changer cette valeur en false quand on l'implementera
  private _isOnboardingDisplay: boolean = true


  // Mutations
  @Mutation
  public setOnboardingStep(onboardingStep: string) {
    console.log(onboardingStep, 'on est dans le store')
    this._onboardingStep = onboardingStep
  }

  // Mutations
  @Mutation
  public setOnboardingDisplay(onboardingDisplay: boolean) {
    this._isOnboardingDisplay = onboardingDisplay
  }

  // Getters
  get onboardingStep() {
    return this._onboardingStep
  }

  get isOnboardingDisplay() {
    return this._isOnboardingDisplay
  }
}
