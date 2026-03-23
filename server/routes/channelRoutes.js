import express from 'express'
import { createChannel, getChannels, joinChannel, deleteChannel } from '../controllers/channelController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', protect, getChannels)
router.post('/', protect, createChannel)
router.put('/:id/join', protect, joinChannel)
router.delete('/:id', protect, deleteChannel)

export default router