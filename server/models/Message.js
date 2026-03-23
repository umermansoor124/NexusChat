import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  reactions: [{ emoji: String, userId: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true })

export default mongoose.model('Message', messageSchema)