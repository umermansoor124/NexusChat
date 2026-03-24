import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import channelRoutes from './routes/channelRoutes.js'
import { initSocket } from './socket/socketHandler.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import fs from 'fs'

dotenv.config()

// Create uploads folder if not exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
})

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/channels', channelRoutes)
app.use(errorHandler)

initSocket(io)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')
    httpServer.listen(process.env.PORT, () =>
      console.log(`Server on port ${process.env.PORT}`)
    )
  })
  .catch(err => console.error('DB Error:', err))