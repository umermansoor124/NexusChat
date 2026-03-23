import { useAuth } from './useAuth'
import ChannelList from './ChannelList'
import UserList from './UserList'
import Avatar from './Avatar'

const Sidebar = () => {
  const { user, handleLogout } = useAuth()

  return (
    <aside className="w-64 bg-[#0d0d0d] border-r border-white/10 flex flex-col shrink-0">
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="font-['Bebas_Neue'] text-2xl tracking-[0.3em] text-white">NEXUSCHAT</h1>
        <p className="font-mono text-xs text-white/20 mt-0.5 tracking-widest">REAL-TIME MESSENGER</p>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <ChannelList />
        <UserList />
      </div>
      <div className="border-t border-white/10 p-3 flex items-center gap-3">
        <Avatar username={user?.username} size="sm" isOnline />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-white truncate">{user?.username}</p>
          <p className="font-mono text-xs text-white/30">online</p>
        </div>
        <button onClick={handleLogout}
          className="font-mono text-xs text-white/20 hover:text-white transition-colors uppercase tracking-widest">
          Exit
        </button>
      </div>
    </aside>
  )
}
export default Sidebar