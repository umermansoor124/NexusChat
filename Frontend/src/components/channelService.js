import api from './api'
export const fetchChannels = () => api.get('/channels')
export const createChannel = (data) => api.post('/channels', data)
export const joinChannel = (id) => api.put(`/channels/${id}/join`)
export const deleteChannel = (id) => api.delete(`/channels/${id}`)