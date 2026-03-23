import Channel from '../models/Channel.js'

export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body
    const exists = await Channel.findOne({ name })
    if (exists) return res.status(400).json({ message: 'Channel already exists' })

    const channel = await Channel.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    })
    res.status(201).json(channel)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('createdBy', 'username')
    res.json(channels)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const joinChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
    if (!channel) return res.status(404).json({ message: 'Channel not found' })

    if (!channel.members.includes(req.user.id)) {
      channel.members.push(req.user.id)
      await channel.save()
    }
    res.json(channel)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
    if (!channel) return res.status(404).json({ message: 'Channel not found' })
    if (channel.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })
    await channel.deleteOne()
    res.json({ message: 'Channel deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}