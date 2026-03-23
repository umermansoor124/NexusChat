import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { useSocket } from './useSocket'

const ChatPage = () => {
  const token = useSelector(state => state.auth.token)
  useSocket(token)

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow />
      </main>
    </div>
  )
}
export default ChatPage