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
    this.code = null
    console.log(this.state);
  }

  step(action) {
    this.io.emit('step', action)
  }
  test() {
    this.io.emit('test')
  }

  listenStep(action) {
    this.io.on('step', data => {
      return data
    })
  }

  desktopConnection() {
    this.io.emit('desktop-connection', this.io.id)

  }
}

const $socket = new WebsocketManager()
export default $socket
