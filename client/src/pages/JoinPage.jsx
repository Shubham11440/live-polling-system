import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinPage = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleJoin = (e) => {
    e.preventDefault()
    if (name.trim()) {
      // Store the name in sessionStorage to keep it unique per tab
      sessionStorage.setItem('studentName', name.trim())
      navigate('/student')
    } else {
      alert('Please enter your name.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-2">Join Poll</h1>
        <p className="text-center text-gray-400 mb-8">
          Enter your name to continue.
        </p>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 mb-6 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  )
}

export default JoinPage
