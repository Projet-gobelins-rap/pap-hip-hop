import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "onboardingStore",
  namespaced: true,
  stateFactory: true
})
export default class onboardingStore extends VuexModule {
  private _onboardingStep: string | null = ''
  private _isOnboardingDisplay: boolean = false

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
