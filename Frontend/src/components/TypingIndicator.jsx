import { useSelector } from 'react-redux'

const TypingIndicator = () => {
  const typingUsers = useSelector(state => state.chat.typingUsers)
  if (!typingUsers.length) return null

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <span className="font-mono text-xs text-white/30">
        {typingUsers.map(u => u.username).join(', ')} typing...
      </span>
    </div>
  )
}
export default TypingIndicator