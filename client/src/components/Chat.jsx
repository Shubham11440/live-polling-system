import { useState, useEffect, useRef } from 'react'

const Chat = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-gray-800 rounded-lg shadow-xl flex flex-col">
          <div className="p-3 bg-gray-700 rounded-t-lg">
            <h3 className="font-bold text-white text-center">Live Chat</h3>
          </div>
          <div className="flex-grow p-3 space-y-2 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-gray-600 p-2 rounded-lg text-white"
              >
                <span className="font-bold text-blue-300">{msg.sender}: </span>
                <span>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-3 border-t border-gray-700">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-gray-600 rounded-lg text-white"
            />
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
      >
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
    </div>
  )
}

export default Chat
