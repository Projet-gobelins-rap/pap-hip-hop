import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
    name: "chatStore",
    namespaced: true,
    stateFactory: true
})
export default class chatStore extends VuexModule {
    private _chatStep: string | null = ''
    private _isChatDisplay: boolean = false

    // Mutations
    @Mutation
    public setChatStep(chatStep: string): void {
        console.log(chatStep, 'on est dans le store')
        this._chatStep = chatStep
    }

    // Mutations
    @Mutation
    public setChatDisplay(chatDisplay: boolean): void {
        this._isChatDisplay = chatDisplay
    }

    // Getters
    get chatStep(): string {
        return this._chatStep
    }
    get isChatDisplay(): boolean {
        return this._isChatDisplay
    }
}
