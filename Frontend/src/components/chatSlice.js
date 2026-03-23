import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    activeChannel: null,
    messages: [],
    onlineUsers: [],
    typingUsers: []
  },
  reducers: {
    setChannels: (state, action) => { state.channels = action.payload },
    setActiveChannel: (state, action) => { state.activeChannel = action.payload; state.messages = [] },
    setMessages: (state, action) => { state.messages = action.payload },
    addMessage: (state, action) => { state.messages.push(action.payload) },
    setOnlineUsers: (state, action) => { state.onlineUsers = action.payload },
    addOnlineUser: (state, action) => { if (!state.onlineUsers.includes(action.payload)) state.onlineUsers.push(action.payload) },
    removeOnlineUser: (state, action) => { state.onlineUsers = state.onlineUsers.filter(id => id !== action.payload) },
    addTypingUser: (state, action) => { if (!state.typingUsers.find(u => u.userId === action.payload.userId)) state.typingUsers.push(action.payload) },
    removeTypingUser: (state, action) => { state.typingUsers = state.typingUsers.filter(u => u.userId !== action.payload) }
  }
})

export const { setChannels, setActiveChannel, setMessages, addMessage, setOnlineUsers, addOnlineUser, removeOnlineUser, addTypingUser, removeTypingUser } = chatSlice.actions
export default chatSlice.reducer