import io from 'socket.io-client'

//
const $socket = io({
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  autoConnect: true,
})

export default $socket
