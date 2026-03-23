import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getSocket } from './useSocket'
import { sendMessage } from './messageService'

const MessageInput = () => {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [typing, setTyping] = useState(false)
  const fileRef = useRef()
  const typingTimer = useRef()
  const { activeChannel } = useSelector(state => state.chat)
  const { user } = useSelector(state => state.auth)

  const handleTyping = (e) => {
    setText(e.target.value)
    const socket = getSocket()
    if (!socket || !activeChannel) return
    if (!typing) {
      setTyping(true)
      socket.emit('typing', { channelId: activeChannel._id, username: user.username })
    }
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      setTyping(false)
      socket.emit('stopTyping', { channelId: activeChannel._id })
    }, 1500)
  }

  const handleSend = async () => {
    if (!text.trim() && !file) return
    const socket = getSocket()
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('channelId', activeChannel._id)
      if (text.trim()) formData.append('content', text.trim())
      await sendMessage(formData)
    } else {
      socket?.emit('sendMessage', { channelId: activeChannel._id, content: text.trim() })
    }
    setText('')
    setFile(null)
    socket?.emit('stopTyping', { channelId: activeChannel._id })
  }

  return (
    <div className="border-t border-white/10 p-4">
      {file && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-white/5 border border-white/10">
          <span className="font-mono text-xs text-white/60 flex-1 truncate">{file.name}</span>
          <button onClick={() => setFile(null)} className="text-white/40 hover:text-white font-mono text-xs">✕</button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button onClick={() => fileRef.current?.click()}
          className="text-white/30 hover:text-white transition-colors font-mono text-lg shrink-0">+</button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => setFile(e.target.files[0])} />
        <input
          type="text"
          value={text}
          onChange={handleTyping}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={activeChannel ? `Message #${activeChannel.name}` : 'Select a channel...'}
          disabled={!activeChannel}
          className="flex-1 bg-transparent border-b border-white/20 text-white font-['Space_Mono'] text-sm py-2 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 disabled:opacity-30"
        />
        <button onClick={handleSend} disabled={!activeChannel || (!text.trim() && !file)}
          className="text-white/30 hover:text-white disabled:opacity-20 transition-colors font-mono text-sm uppercase tracking-widest shrink-0">
          Send
        </button>
      </div>
    </div>
  )
}
export default MessageInput