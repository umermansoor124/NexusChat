import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChannels } from './chatSlice'
import { fetchChannels, createChannel } from './channelService'
import ChannelItem from './ChannelItem'
import Modal from './Modal'
import Button from './Button'

const ChannelList = () => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.chat.channels)
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    fetchChannels().then(res => dispatch(setChannels(res.data))).catch(console.error)
  }, [])

  const handleCreate = async () => {
    if (!name.trim()) return
    try {
      const { data } = await createChannel({ name: name.trim(), description: desc.trim() })
      dispatch(setChannels([...channels, data]))
      setModal(false)
      setName('')
      setDesc('')
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-3">
        <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Channels</span>
        <button onClick={() => setModal(true)}
          className="text-white/30 hover:text-white font-mono text-lg leading-none transition-colors">+</button>
      </div>
      <div className="space-y-0.5">
        {channels.map(ch => <ChannelItem key={ch._id} channel={ch} />)}
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="New Channel">
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Channel Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
              placeholder="general" />
          </div>
          <div>
            <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)}
              className="w-full bg-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
              placeholder="Optional" />
          </div>
          <Button onClick={handleCreate} className="w-full justify-center">Create Channel</Button>
        </div>
      </Modal>
    </div>
  )
}
export default ChannelList