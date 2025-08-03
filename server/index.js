const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})
