
const {generateId} =  require('./generateId')

const handleSocket = (socket, io) => {
  let roomId = null
  socket.on('server:join', async (id) => {
    console.log(id);
    if (id === null || id === '') {
      id = await generateId()
    }
    roomId = id 
    socket.join(id.toString())
    socket.emit('server:joined', id)
    socket.broadcast.to(id).emit('server:other-joined')
    const devicesInRoom = io.sockets.adapter.rooms.get(roomId)?.size

    if (devicesInRoom >= 2) {
      console.log('paired');
      socket.broadcast.to(roomId).emit('server:paired', roomId)
      socket.emit('server:paired', roomId)
    }
  })

  socket.onAny((eventName, ...args) => {
    console.log(eventName);
    if (eventName.startsWith('server:')) return
    socket.broadcast.to(roomId).emit(eventName, ...args)
  })

}  

module.exports = {
  handleSocket
}