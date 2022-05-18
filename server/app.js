const fs = require('fs');
const express = require('express')
const app = express()

const https = require('https')
const http = require('http')
const privateKey = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// const server = https.createServer(credentials, app);
const server = http.createServer(app);

const {handleSocket} = require('./socketHandler')

express.json()
express.urlencoded({ extended: true })

const { Server } = require('socket.io')

const io = new Server(server, {
  serveClient: false,
  cors: {
    origin: "*",
    methods: ["GET"]
  }
});

const users = {}

io.on('connection', socket => {

  console.log(socket.id);
  handleSocket(socket, io)
})

module.exports = {
  app, server
}
