import Avatar from './Avatar'

const UserItem = ({ user, isOnline }) => (
  <div className="flex items-center gap-3 px-3 py-2">
    <Avatar username={user.username} size="sm" isOnline={isOnline} />
    <span className={`font-mono text-sm truncate ${isOnline ? 'text-white/70' : 'text-white/25'}`}>
      {user.username}
    </span>
  </div>
)
export default UserItem