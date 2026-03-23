import api from './api'
export const fetchMessages = (channelId) => api.get(`/messages/${channelId}`)
export const sendMessage = (data) => api.post('/messages', data)
export const deleteMessage = (id) => api.delete(`/messages/${id}`)
export const addReaction = (id, emoji) => api.post(`/messages/${id}/reaction`, { emoji })