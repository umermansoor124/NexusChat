import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { loginUser } from './authService'
import Button from './Button'

const LoginForm = ({ onSwitch }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await loginUser(form)
      dispatch(setCredentials(data))
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 font-mono text-xs border border-red-400/30 p-3">{error}</p>}
      <div>
        <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className="w-full bg-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
          placeholder="••••••••"
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading} className="w-full justify-center">
        {loading ? 'Connecting...' : 'Enter NexusChat'}
      </Button>
      <p className="text-center font-mono text-xs text-white/30">
        No account?{' '}
        <button onClick={onSwitch} className="text-white/60 hover:text-white underline transition-colors">
          Register
        </button>
      </p>
    </div>
  )
}
export default LoginForm