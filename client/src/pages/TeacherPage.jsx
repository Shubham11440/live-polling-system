import { useState } from 'react'
import { socket } from '../socket'

const TeacherPage = () => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleCreatePoll = (e) => {
    e.preventDefault()
    if (question.trim() && options.every((opt) => opt.trim())) {
      socket.emit('create_poll', { question, options })
      alert('Poll created and sent to students!')
    } else {
      alert('Please fill out the question and all four options.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create a New Poll
        </h1>
        <form onSubmit={handleCreatePoll}>
          <div className="mb-6">
            <label
              htmlFor="question"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Poll Question
            </label>
            <input
              id="question"
              type="text"
              placeholder="e.g., What is your favorite technology?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Options
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Ask Question & Start Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default TeacherPage
