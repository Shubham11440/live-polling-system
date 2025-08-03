import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000'
console.log('Attempting to connect to Socket.io server at:', URL)
export const socket = io(URL)
