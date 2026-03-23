import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { registerUser } from './authService'
import Button from './Button'

const RegisterForm = ({ onSwitch }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await registerUser(form)
      dispatch(setCredentials(data))
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 font-mono text-xs border border-red-400/30 p-3">{error}</p>}
      {['username', 'email', 'password'].map(field => (
        <div key={field}>
          <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">{field}</label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            className="w-full bg-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors"
            placeholder={field === 'email' ? 'you@example.com' : field === 'password' ? '••••••••' : 'your_username'}
          />
        </div>
      ))}
      <Button onClick={handleSubmit} disabled={loading} className="w-full justify-center">
        {loading ? 'Creating...' : 'Create Account'}
      </Button>
      <p className="text-center font-mono text-xs text-white/30">
        Have account?{' '}
        <button onClick={onSwitch} className="text-white/60 hover:text-white underline transition-colors">
          Login
        </button>
      </p>
    </div>
  )
}
export default RegisterForm