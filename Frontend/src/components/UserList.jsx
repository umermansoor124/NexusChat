import { useSelector } from 'react-redux'

const UserList = () => {
  const onlineUsers = useSelector(state => state.chat.onlineUsers)

  return (
    <div className="border-t border-white/10 pt-4">
      <div className="px-3 py-2">
        <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
          Online — {onlineUsers.length}
        </span>
      </div>
      <div className="space-y-1">
        {onlineUsers.map(userId => (
          <div key={userId} className="flex items-center gap-3 px-3 py-2">
            <div className="w-2 h-2 bg-white rounded-full shrink-0" />
            <span className="font-mono text-xs text-white/50 truncate">{userId.slice(-6)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UserList