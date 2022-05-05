
const {generateId} =  require('./generateId')

const handleSocket = (socket, io) => {
  let roomId = null
  socket.on('server:join', async (id) => {
    if (id === null || id === '') {
      id = await generateId()
    }
    console.log('id : ' + id);
    roomId = id 
    socket.join(id.toString())
    socket.emit('server:joined', id)
    socket.broadcast.to(id).emit('server:other-joined')
    const devicesInRoom = io.sockets.adapter.rooms.get(roomId)?.size

    
    if (devicesInRoom >= 2) {
      socket.broadcast.to(roomId).emit('server:paired')
      socket.emit('server:paired')
    }
  })

  socket.onAny((eventName, ...args) => {
    if (eventName.startsWith('server:')) return
    socket.broadcast.to(roomId).emit(eventName, ...args)
  })
}  


module.exports = {
  handleSocket
}