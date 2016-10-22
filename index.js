const {createServer} = require('http')
const express = require('express')
const socketIO = require('socket.io')

const server = createServer()

const app = express(server)
const io = socketIO.listen(app.listen(9000, '0.0.0.0'))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))
app.use(function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

const history = {}

// function setImmediate(fn) {
//   setTimeout(fn, 0)
// }

io.on('connection', function (socket) {
  socket.on('room', function ({room, id, n = 0}) {
    socket.join(room)
    if (history[room] instanceof Array) {
      io
        .to(room)
        .emit('message', history[room].filter(m => m.n >= n))
    }
    else {
      history[room] = []
    }
    socket.userId = id
  })

  socket.on('message', function ({room, text}) {
    const roomMessages = history[room]
    const message = {
      n: roomMessages.length,
      from: socket.userId,
      text
    }
    roomMessages.push(message)
    io
      .to(room)
      .emit('message', message)
  })
})
