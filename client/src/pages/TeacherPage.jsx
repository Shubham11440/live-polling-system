import { useState, useEffect } from 'react'
import { socket } from '../socket'
import PollResults from '../components/PollResults'
import Chat from '../components/Chat'

const TeacherPage = () => {
  const [questionType, setQuestionType] = useState('multiple_choice')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null)
  const [duration, setDuration] = useState(30)
  const [currentPoll, setCurrentPoll] = useState(null)
  const [writtenAnswers, setWrittenAnswers] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [history, setHistory] = useState([])
  const [students, setStudents] = useState([])

  // Combined useEffect for all socket listeners
  useEffect(() => {
    socket.emit('get_poll_history')
    const onNewPoll = (newPoll) => {
      setCurrentPoll(newPoll)
      setWrittenAnswers([])
    }
    const onPollUpdate = (updatedPoll) => {
      if (updatedPoll.questionType === 'multiple_choice')
        setCurrentPoll(updatedPoll)
    }
    const onNewWrittenAnswer = (newAnswer) =>
      setWrittenAnswers((prev) => [...prev, newAnswer])
    const onNewMessage = (newMessage) =>
      setChatMessages((prev) => [...prev, newMessage])
    const onPollHistory = (pollHistory) => setHistory(pollHistory)
    const onPollEnded = () => {
      socket.emit('get_poll_history')
    }
    const onStudentListUpdate = (studentList) => setStudents(studentList)

    socket.on('new_poll', onNewPoll)
    socket.on('poll_update', onPollUpdate)
    socket.on('new_written_answer', onNewWrittenAnswer)
    socket.on('new_message', onNewMessage)
    socket.on('poll_history', onPollHistory)
    socket.on('poll_ended', onPollEnded)
    socket.on('student_list_update', onStudentListUpdate)

    return () => {
      socket.off('new_poll', onNewPoll)
      socket.off('poll_update', onPollUpdate)
      socket.off('new_written_answer', onNewWrittenAnswer)
      socket.off('new_message', onNewMessage)
      socket.off('poll_history', onPollHistory)
      socket.off('poll_ended', onPollEnded)
      socket.off('student_list_update', onStudentListUpdate)
    }
  }, [])

  // useEffect to handle dynamic default timers
  useEffect(() => {
    if (questionType === 'written') {
      setDuration(60)
    } else {
      setDuration(30)
    }
  }, [questionType])

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleCreatePoll = (e) => {
    e.preventDefault()
    const pollData = { question, questionType, duration: Number(duration) }
    if (questionType === 'multiple_choice') {
      if (options.every((opt) => opt.trim()) && correctAnswerIndex !== null) {
        pollData.options = options
        pollData.correctAnswerIndex = correctAnswerIndex
      } else {
        return alert('Please fill out all fields for multiple choice.')
      }
    } else {
      if (!question.trim()) {
        return alert('Please enter a question.')
      }
    }
    socket.emit('create_poll', pollData)
    setQuestion('')
    setOptions(['', '', '', ''])
    setCorrectAnswerIndex(null)
  }

  const handleSendMessage = (text) =>
    socket.emit('send_message', { sender: 'Teacher', text })

  const handleRemoveStudent = (studentName) => {
    if (window.confirm(`Are you sure you want to remove ${studentName}?`)) {
      socket.emit('remove_student', studentName)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center text-white p-8">
      <div className="w-full max-w-2xl pb-24">
        <div className="p-8 bg-gray-800 rounded-xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Teacher Dashboard
          </h1>
          <div className="flex justify-center bg-gray-700 rounded-lg p-1 mb-6">
            <button
              onClick={() => setQuestionType('multiple_choice')}
              className={`w-1/2 py-2 rounded-md transition-colors ${
                questionType === 'multiple_choice'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-600'
              }`}
            >
              Multiple Choice
            </button>
            <button
              onClick={() => setQuestionType('written')}
              className={`w-1/2 py-2 rounded-md transition-colors ${
                questionType === 'written' ? 'bg-blue-600' : 'hover:bg-gray-600'
              }`}
            >
              Written Answer
            </button>
          </div>
          <form onSubmit={handleCreatePoll}>
            <div className="mb-6">
              <label
                htmlFor="question"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="duration"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Duration (seconds)
              </label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="5"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
              />
            </div>
            {questionType === 'multiple_choice' && (
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  Options & Correct Answer
                </label>
                <div className="space-y-4">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="correctAnswer"
                        id={`option-${index}`}
                        checked={correctAnswerIndex === index}
                        onChange={() => setCorrectAnswerIndex(index)}
                        className="form-radio h-5 w-5 text-green-500 bg-gray-700 border-gray-600"
                      />
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Ask Question
            </button>
          </form>
        </div>

        <div className="p-8 bg-gray-800 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Connected Students ({students.length})
          </h2>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {students.length > 0 ? (
              students.map((name, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                >
                  <span>{name}</span>
                  <button
                    onClick={() => handleRemoveStudent(name)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No students connected.
              </p>
            )}
          </div>
        </div>

        {currentPoll && (
          <div className="p-8 bg-gray-800 rounded-xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Live Submissions
            </h2>
            {currentPoll.questionType === 'multiple_choice' ? (
              <PollResults poll={currentPoll} />
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {writtenAnswers.map((ans, i) => (
                  <div key={i} className="bg-gray-700 p-3 rounded-lg text-left">
                    <p className="font-bold text-blue-300">
                      {ans.studentName}:
                    </p>
                    <p>{ans.answer}</p>
                  </div>
                ))}
                {writtenAnswers.length === 0 && (
                  <p className="text-gray-400 text-center">
                    Waiting for written answers...
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div className="p-8 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">
              Poll History
            </h2>
            <div className="space-y-6">
              {history.map((pastPoll, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  {pastPoll.questionType === 'multiple_choice' ? (
                    <PollResults poll={pastPoll} />
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {pastPoll.question}
                      </h3>
                      {/* FIX: Display the actual written answers from history */}
                      <div className="space-y-2 mt-4 border-t border-gray-600 pt-2">
                        {pastPoll.writtenAnswers.length > 0 ? (
                          pastPoll.writtenAnswers.map((ans, i) => (
                            <div
                              key={i}
                              className="bg-gray-800 p-2 rounded text-left"
                            >
                              <p className="font-semibold text-blue-300">
                                {ans.studentName}:
                              </p>
                              <p className="text-sm">{ans.answer}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No written answers were submitted.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Chat messages={chatMessages} onSendMessage={handleSendMessage} />
    </div>
  )
}

export default TeacherPage
