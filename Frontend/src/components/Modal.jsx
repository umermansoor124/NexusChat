import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white font-mono text-xl transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
export default Modal