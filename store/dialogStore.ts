import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
    name: "dialogStore",
    namespaced: true,
    stateFactory: true
})
export default class dialogStore extends VuexModule {
    private _dialogStep: string | null = ''


    // Mutations
    @Mutation
    public setDiaglogStep(dialogStep: string) {
        console.log(dialogStep, 'on est dans le store')
        this._dialogStep = dialogStep
    }

    // Getters
    get dialogStep() {
        return this._dialogStep
    }
}
