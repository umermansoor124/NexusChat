import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannel } from './chatSlice'
import { getSocket } from './useSocket'

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(state => state.chat.activeChannel)
  const isActive = activeChannel?._id === channel._id

  const handleClick = () => {
    const socket = getSocket()
    if (activeChannel) socket?.emit('leaveChannel', activeChannel._id)
    dispatch(setActiveChannel(channel))
    socket?.emit('joinChannel', channel._id)
  }

  return (
    <button onClick={handleClick}
      className={`w-full flex items-center gap-2 px-3 py-2 transition-all duration-150 text-left group
        ${isActive ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      <span className={`font-mono text-sm ${isActive ? 'text-black' : 'text-white/20 group-hover:text-white/40'}`}>#</span>
      <span className="font-mono text-sm tracking-wide truncate">{channel.name}</span>
    </button>
  )
}
export default ChannelItem