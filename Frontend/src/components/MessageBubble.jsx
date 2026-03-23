import Avatar from './Avatar'

const formatTime = (date) =>
  new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex gap-3 group px-4 py-2 hover:bg-white/[0.02] transition-colors ${isOwn ? 'flex-row-reverse' : ''}`}>
      <Avatar username={message.senderId?.username} size="sm" />
      <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-white/40">{message.senderId?.username}</span>
          <span className="font-mono text-xs text-white/20">{formatTime(message.createdAt)}</span>
        </div>
        {message.content && (
          <div className={`px-4 py-2.5 border font-['Space_Mono'] text-sm leading-relaxed
            ${isOwn ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20'}`}>
            {message.content}
          </div>
        )}
        {message.fileUrl && (
          <img src={`${import.meta.env.VITE_SOCKET_URL}${message.fileUrl}`}
            alt="file" className="max-w-xs border border-white/20 mt-1" />
        )}
      </div>
    </div>
  )
}
export default MessageBubble