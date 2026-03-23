import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Message from '../models/Message.js'

const onlineUsers = new Map()

export const initSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) return next(new Error('No token'))
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', async (socket) => {
    const userId = socket.user.id
    onlineUsers.set(userId, socket.id)
    await User.findByIdAndUpdate(userId, { status: 'online' })
    io.emit('userOnline', userId)

    // Send current online users list to newly connected user
    socket.emit('onlineUsers', Array.from(onlineUsers.keys()))

    socket.on('joinChannel', (channelId) => {
      socket.join(channelId)
      console.log(`User ${userId} joined channel ${channelId}`)
    })

    socket.on('leaveChannel', (channelId) => {
      socket.leave(channelId)
    })

    socket.on('sendMessage', async (data) => {
      try {
        const message = await Message.create({
          channelId: data.channelId,
          senderId: userId,
          content: data.content,
          fileUrl: data.fileUrl || ''
        })
        const populated = await message.populate('senderId', 'username avatar')
        io.to(data.channelId).emit('newMessage', populated)
      } catch (err) {
        socket.emit('error', err.message)
      }
    })

    socket.on('typing', (data) => {
      socket.to(data.channelId).emit('userTyping', {
        userId,
        username: data.username
      })
    })

    socket.on('stopTyping', (data) => {
      socket.to(data.channelId).emit('userStopTyping', { userId })
    })

    socket.on('disconnect', async () => {
      onlineUsers.delete(userId)
      await User.findByIdAndUpdate(userId, {
        status: 'offline',
        lastSeen: Date.now()
      })
      io.emit('userOffline', userId)
    })
  })
}