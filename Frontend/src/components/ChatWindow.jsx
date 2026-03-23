import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useMessages } from './useMessages'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'

const ChatWindow = () => {
  const { messages } = useMessages()
  const { activeChannel } = useSelector(state => state.chat)
  const { user } = useSelector(state => state.auth)
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Bebas_Neue'] text-6xl text-white/10 tracking-widest">NEXUSCHAT</p>
          <p className="font-mono text-xs text-white/20 mt-2 uppercase tracking-widest">Select a channel to start</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="border-b border-white/10 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-white/30">#</span>
          <h2 className="font-['Bebas_Neue'] text-xl tracking-widest text-white">{activeChannel.name}</h2>
          {activeChannel.description && (
            <span className="font-mono text-xs text-white/30 border-l border-white/10 pl-3">{activeChannel.description}</span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {messages.map(msg => (
          <MessageBubble key={msg._id} message={msg} isOwn={msg.senderId?._id === user?.id || msg.senderId === user?.id} />
        ))}
        <TypingIndicator />
        <div ref={bottomRef} />
      </div>
      <MessageInput />
    </div>
  )
}
export default ChatWindow