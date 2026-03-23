import Message from '../models/Message.js'

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ channelId: req.params.channelId })
      .populate('senderId', 'username avatar')
      .sort({ createdAt: 1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { content, channelId } = req.body
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : ''

    if (!content && !fileUrl)
      return res.status(400).json({ message: 'Message cannot be empty' })

    const message = await Message.create({
      channelId,
      senderId: req.user.id,
      content,
      fileUrl
    })

    const populated = await message.populate('senderId', 'username avatar')
    res.status(201).json(populated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
    if (!message) return res.status(404).json({ message: 'Message not found' })
    if (message.senderId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })
    await message.deleteOne()
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addReaction = async (req, res) => {
  try {
    const { emoji } = req.body
    const message = await Message.findById(req.params.id)
    if (!message) return res.status(404).json({ message: 'Not found' })
    message.reactions.push({ emoji, userId: req.user.id })
    await message.save()
    res.json(message)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}