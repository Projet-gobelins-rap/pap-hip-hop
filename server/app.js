const fs = require('fs');
const express = require('express')
const app = express()


const https = require('https')
const privateKey = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

express.json()
express.urlencoded({ extended: true })

const io = require('socket.io')(server)
const users = {}

io.on('connection', socket => {

  users[socket.id] = {
    phone: null,
    desktop: null,
    code: Math.floor(Math.random() * 2000)
  }

  socket.on('connect_code', code => {
    Object.keys(users).forEach(user => {
      if (code) {
        if (users[user].code == code) {
          users[user].phone = socket.id
          socket.broadcast.to(user).emit("phone_connected", users[user]);
          socket.emit("phone_connected");
          console.log(users[user], 'OOOOO')
        }
      }
    })

    Object.keys(users).forEach(user => {
      if (users[user].phone) {
        socket.emit("phone_connected", users[user]);
        const userScoketID = users[user].phone
        users[userScoketID].desktop = user
        users[userScoketID].code = users[user].code
      }
    })
    console.log(users);
  });


  socket.on('destroy', () => {
    console.log('destroyed')
  })

  // TODO : local storage losqu'on perd la co
  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete users[socket.id];
  });

  socket.on('step', data => {
    Object.keys(users).forEach(user => {
      if (users[user].desktop == socket.id) {
        socket.broadcast.to(user).emit("step", data);
      } else if (users[user].phone == socket.id) {
        socket.broadcast.to(user).emit("step", data);
      }
    })
  });

  socket.on('continuously-data', () => {

    // Not good
    Object.keys(users).forEach(user => {
      if (users[user].desktop == socket.id) {

      } else if (users[user].phone == socket.id) {

      }
    })
  });

  socket.on('desktop-connection', id => {
    console.log('desktop-connection');
    console.log(id);
    socket.emit('success-desktop', users[socket.id])
  })

  socket.on('test', () => {
    console.log('test');
  });

})

module.exports = {
  app, server
}
