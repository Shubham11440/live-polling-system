const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
})

let currentPoll = null
let pollHistory = []
let connectedStudents = {}

let pollTimer

io.on('connection', (socket) => {

  socket.on('student_join', (studentName) => {
    connectedStudents[socket.id] = studentName
    io.emit('student_list_update', Object.values(connectedStudents))
  })

  socket.on('remove_student', (studentNameToRemove) => {
    const socketIdToRemove = Object.keys(connectedStudents).find(
      (id) => connectedStudents[id] === studentNameToRemove
    )
    const socketToRemove = io.sockets.sockets.get(socketIdToRemove)
    if (socketToRemove) {
      socketToRemove.emit('removed', {
        message: 'You have been removed from the session by the teacher.',
      })
      setTimeout(() => {
        socketToRemove.disconnect()
      }, 500)
    }
  })

  socket.on('get_current_poll', () => {
    if (currentPoll) {
      socket.emit('new_poll', currentPoll)
    }
  })

  socket.on('get_poll_history', () => {
    socket.emit('poll_history', pollHistory)
  })

  socket.on('create_poll', (data) => {
    clearTimeout(pollTimer)
    currentPoll = {
      question: data.question,
      questionType: data.questionType,
      startTime: Date.now(),
      duration: data.duration * 1000,
      options: data.options,
      responses: {},
      writtenAnswers: [],
    }
    if (data.questionType === 'multiple_choice') {
      data.options.forEach((_, index) => {
        currentPoll.responses[index] = []
      })
    }
    const pollForStudents = { ...currentPoll, correctAnswerIndex: undefined }
    io.emit('new_poll', pollForStudents)
    pollTimer = setTimeout(() => {
      const finishedPoll = {
        ...currentPoll,
        correctAnswerIndex: data.correctAnswerIndex,
      }
      pollHistory.unshift(finishedPoll)
      io.emit('poll_ended', finishedPoll)
      currentPoll = null
    }, currentPoll.duration)
  })

  socket.on('submit_vote', ({ optionIndex, studentName }) => {
    if (
      currentPoll &&
      currentPoll.questionType === 'multiple_choice' &&
      Date.now() < currentPoll.startTime + currentPoll.duration
    ) {
      const hasVoted = Object.values(currentPoll.responses).some((nameArray) =>
        nameArray.includes(studentName)
      )
      if (!hasVoted) {
        currentPoll.responses[optionIndex].push(studentName)
        io.emit('poll_update', currentPoll)
      }
    }
  })

  socket.on('submit_written_answer', ({ answer, studentName }) => {
    if (
      currentPoll &&
      currentPoll.questionType === 'written' &&
      Date.now() < currentPoll.startTime + currentPoll.duration
    ) {
      const submission = { studentName, answer }
      currentPoll.writtenAnswers.push(submission)
      io.emit('new_written_answer', submission)
    }
  })

  socket.on('send_message', (data) => {
    io.emit('new_message', data)
  })

  socket.on('disconnect', () => {
    delete connectedStudents[socket.id]
    io.emit('student_list_update', Object.values(connectedStudents))
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))
