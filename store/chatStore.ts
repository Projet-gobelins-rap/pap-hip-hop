import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
    name: "chatStore",
    namespaced: true,
    stateFactory: true
})
export default class chatStore extends VuexModule {
    private _chatStep: string | null = ''


    // Mutations
    @Mutation
    public setChatStep(chatStep: string) {
        console.log(chatStep, 'on est dans le store')
        this._chatStep = chatStep
    }

    // Getters
    get chatStep() {
        return this._chatStep
    }
}
