import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from './chatSlice'
import { fetchMessages } from './messageService'

export const useMessages = () => {
  const dispatch = useDispatch()
  const { activeChannel, messages } = useSelector(state => state.chat)

  useEffect(() => {
    if (!activeChannel) return
    fetchMessages(activeChannel._id)
      .then(res => dispatch(setMessages(res.data)))
      .catch(console.error)
  }, [activeChannel])

  return { messages }
}