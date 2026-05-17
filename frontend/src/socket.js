import { io } from 'socket.io-client'

const socket = io(
  'http://192.168.18.119:3001'
)

export default socket