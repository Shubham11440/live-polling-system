import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import Chat from '../components/Chat'

const Timer = ({ poll }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!poll || !poll.startTime) return
      const endTime = poll.startTime + poll.duration
      const newTimeLeft = Math.round((endTime - Date.now()) / 1000)
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0)
    }
    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [poll])
  return (
    <div className="font-mono text-xl font-bold text-yellow-400">
      Time Left: {timeLeft}s
    </div>
  )
}

const StudentPage = () => {
  const navigate = useNavigate()
  const [poll, setPoll] = useState(null)
  const [selection, setSelection] = useState(null)
  const [writtenAnswer, setWrittenAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPollEnded, setIsPollEnded] = useState(false)
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    socket.emit('get_current_poll')
    const onNewPoll = (newPoll) => {
      setPoll(newPoll)
      setSelection(null)
      setWrittenAnswer('')
      setIsSubmitted(false)
      setIsPollEnded(false)
    }
    const onPollEnded = (endedPoll) => {
      setPoll(endedPoll)
      setIsPollEnded(true)
    }
    const onRemoved = (data) => {
      alert(data.message)
      navigate('/')
    }
    socket.on('new_poll', onNewPoll)
    socket.on('poll_ended', onPollEnded)
    socket.on('removed', onRemoved)
    return () => {
      socket.off('new_poll', onNewPoll)
      socket.off('poll_ended', onPollEnded)
      socket.off('removed', onRemoved)
    }
  }, [navigate])

  useEffect(() => {
    const onNewMessage = (newMessage) => {
      setChatMessages((prev) => [...prev, newMessage])
    }
    socket.on('new_message', onNewMessage)
    return () => {
      socket.off('new_message', onNewMessage)
    }
  }, [])

  useEffect(() => {
    const studentName = sessionStorage.getItem('studentName')
    if (studentName) {
      socket.emit('student_join', studentName)
    }
  }, [])

  const handleVote = (index) => {
    if (!isPollEnded && !isSubmitted) {
      setSelection(index)
      setIsSubmitted(true)
      const studentName = sessionStorage.getItem('studentName') || 'Anonymous'
      socket.emit('submit_vote', { optionIndex: index, studentName })
    }
  }

  const handleWrittenSubmit = (e) => {
    e.preventDefault()
    if (!isPollEnded && !isSubmitted && writtenAnswer.trim()) {
      setIsSubmitted(true)
      const studentName = sessionStorage.getItem('studentName') || 'Anonymous'
      socket.emit('submit_written_answer', {
        answer: writtenAnswer,
        studentName,
      })
    }
  }

  const handleSendMessage = (text) => {
    const sender = sessionStorage.getItem('studentName') || 'Anonymous'
    socket.emit('send_message', { sender, text })
  }

  const getButtonClass = (index) => {
    if (!isPollEnded) {
      return selection === index
        ? 'bg-yellow-500'
        : 'bg-blue-600 hover:bg-blue-700'
    }
    const isCorrect = index === poll.correctAnswerIndex
    const isSelected = index === selection
    if (isSelected && isCorrect) return 'bg-green-600'
    if (isSelected && !isCorrect) return 'bg-red-600'
    if (isCorrect) return 'bg-green-600 opacity-60'
    return 'bg-gray-600 opacity-50'
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {sessionStorage.getItem('studentName') || 'Student'}!
        </h1>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          {!poll ? (
            <h2 className="text-2xl text-gray-400">
              Waiting for a question...
            </h2>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg">Question:</span>
                {!isPollEnded && <Timer poll={poll} />}
              </div>
              <h2 className="text-4xl font-extrabold my-8">{poll.question}</h2>
              {poll.questionType === 'multiple_choice' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {poll.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleVote(index)}
                      disabled={isPollEnded || isSubmitted}
                      className={`font-semibold py-4 px-6 rounded-lg text-xl transition-all duration-300 disabled:cursor-not-allowed ${getButtonClass(
                        index
                      )}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleWrittenSubmit}>
                  <textarea
                    value={writtenAnswer}
                    onChange={(e) => setWrittenAnswer(e.target.value)}
                    disabled={isSubmitted || isPollEnded}
                    className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg disabled:opacity-50"
                    placeholder="Type your answer here..."
                  />
                  <button
                    type="submit"
                    disabled={isSubmitted || isPollEnded}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg disabled:bg-gray-600"
                  >
                    Submit Answer
                  </button>
                </form>
              )}
              {isSubmitted && !isPollEnded && (
                <p className="mt-6 text-green-400 font-bold">
                  Your answer has been submitted!
                </p>
              )}
              {isPollEnded && (
                <p className="mt-8 text-2xl font-bold text-yellow-400">
                  Time's up!
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <Chat messages={chatMessages} onSendMessage={handleSendMessage} />
    </div>
  )
}

export default StudentPage
