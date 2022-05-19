import io from 'socket.io-client'
import $storage from "@/core/utils/Storage";

class WebsocketManager {
  constructor() {
    this.io = io({
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      autoConnect: true,
    })
    this.state = this.io ? 'connected' : 'disconnected'
    this.room = ''
    console.log(this.state);

    // ON SET LA VALEUR ICI POUR LE DEV MODE --> TODO --> a remove quand on passera en production
    // $storage.setInLocalStorage('room',this.room)

    if ($storage.getInLocalStorage('room')) {
      this.room = $storage.getInLocalStorage('room')
      console.log('ON PASSE')
      // this.autoConnect()
    }
  }

  autoConnect() {
    this.io.emit("server:join", this.room);
    this.io.on("server:paired", (user) => {
      console.log('oui');
      // TODO : go to progression in local storage
    });
  }

  setRoom(roomId) {
    this.room = roomId
    $storage.setInLocalStorage('room', this.room)
  }
}

const $socket = new WebsocketManager()
export default $socket
