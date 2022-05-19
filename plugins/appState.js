class AppState {

  constructor() {
    this.isMobile = false
  }

  setAppState(state) {
    this.isMobile = state
  }

  getAppState(){
    console.log(this.isMobile,'<-- appState')
    return this.isMobile
  }

}

const $appState= new AppState()

export default $appState
