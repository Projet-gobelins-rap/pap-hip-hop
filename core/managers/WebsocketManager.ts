// import $socket from "../../plugins/socket.io"

// class WebsocketManager {
//     public io: any
//     public code: number
//     public state: string 

//     constructor() {
//         $socket.emit('test')
//         this.io = $socket
//         this.state = $socket.connected ? 'connected' : 'disconnected'
//         console.log($socket);
        
//     }

//     public step(action) {
//         this.io.emit('step', action)
//     }
//     public test() {
//         this.io.emit('test')
//     }

//     public listenStep(action) {
//         this.io.on('step', data => {
//             return data
//         })
//     }
//     public desktopConnection() {
//         this.io.emit('desktop-connection', $socket.id)
//     }

// }

// const instance = new WebsocketManager()

// export default instance