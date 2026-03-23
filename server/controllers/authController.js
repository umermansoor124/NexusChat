import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields required' })

    const emailExists = await User.findOne({ email })
    if (emailExists) return res.status(400).json({ message: 'Email already in use' })

    const usernameExists = await User.findOne({ username })
    if (usernameExists) return res.status(400).json({ message: 'Username taken' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })

    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    await User.findByIdAndUpdate(user._id, { status: 'online' })

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}