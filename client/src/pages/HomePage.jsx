import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-extrabold mb-4">Live Polling System</h1>
      <p className="text-lg text-gray-400 mb-12">
        Choose your role to get started.
      </p>
      <div className="flex space-x-8">
        <Link to="/teacher">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            I'm a Teacher
          </button>
        </Link>
        <Link to="/join">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            I'm a Student
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
