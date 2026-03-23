import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { addMessage, addOnlineUser, removeOnlineUser, addTypingUser, removeTypingUser, setOnlineUsers } from './chatSlice'

let socket = null

export const useSocket = (token) => {
  const dispatch = useDispatch()
  const socketRef = useRef(null)

  useEffect(() => {
    if (!token) return
    socket = io(import.meta.env.VITE_SOCKET_URL, { auth: { token } })
    socketRef.current = socket
    socket.on('newMessage', (message) => dispatch(addMessage(message)))
    socket.on('userOnline', (userId) => dispatch(addOnlineUser(userId)))
    socket.on('userOffline', (userId) => dispatch(removeOnlineUser(userId)))
    socket.on('onlineUsers', (users) => dispatch(setOnlineUsers(users)))
    socket.on('userTyping', (data) => dispatch(addTypingUser(data)))
    socket.on('userStopTyping', (data) => dispatch(removeTypingUser(data.userId)))
    return () => { socket.disconnect(); socket = null }
  }, [token])

  return socketRef.current
}

export const getSocket = () => socket