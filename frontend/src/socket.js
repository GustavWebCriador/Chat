import { io } from 'socket.io-client'

// Sem URL fixa: o Socket.io usará automaticamente o mesmo domínio do ngrok
const socket = io(
  
); 

export default socket
