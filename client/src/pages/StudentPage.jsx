import { useState, useEffect } from 'react'
import { socket } from '../socket'

const StudentPage = () => {
  const [studentName, setStudentName] = useState('')
  const [poll, setPoll] = useState(null)

  useEffect(() => {
    // Retrieve the student's name from sessionStorage
    const name = sessionStorage.getItem('studentName')
    if (name) {
      setStudentName(name)
    }

    // Listen for new polls from the server
    socket.on('new_poll', (newPoll) => {
      setPoll(newPoll)
    })

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off('new_poll')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {studentName || 'Student'}!
        </h1>

        {poll ? (
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-4xl font-extrabold mb-8">{poll.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-xl transition duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-400">
              Waiting for the teacher to start a poll...
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentPage
