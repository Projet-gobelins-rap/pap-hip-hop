import io from 'socket.io-client'

class WebsocketManager {
  constructor() {
    this.io = io({
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      autoConnect: true,
    })
    this.state = this.io ? 'connected' : 'disconnected'
    this.room = '667'
    console.log(this.state);

    // TODO : if local storage
    if (this.room) {
      this.autoConnect()
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

    // TODO : Push to local storage
  }
}

const $socket = new WebsocketManager()
export default $socket
