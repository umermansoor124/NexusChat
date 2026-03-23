import express from 'express'
import multer from 'multer'
import { getMessages, sendMessage, deleteMessage, addReaction } from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage })
const router = express.Router()

router.get('/:channelId', protect, getMessages)
router.post('/', protect, upload.single('file'), sendMessage)
router.delete('/:id', protect, deleteMessage)
router.post('/:id/reaction', protect, addReaction)

export default router