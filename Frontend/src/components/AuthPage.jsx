import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <h1 className="font-['Bebas_Neue'] text-7xl tracking-[0.2em] text-white">NEXUS</h1>
          <p className="font-mono text-xs text-white/30 uppercase tracking-[0.5em] mt-1">
            {isLogin ? 'Welcome back' : 'Create account'}
          </p>
        </div>

        <div className="border border-white/10 bg-[#0a0a0a] p-8">
          {isLogin
            ? <LoginForm onSwitch={() => setIsLogin(false)} />
            : <RegisterForm onSwitch={() => setIsLogin(true)} />
          }
        </div>

        <p className="text-center font-mono text-xs text-white/10 mt-6 uppercase tracking-widest">
          End-to-end encrypted
        </p>
      </div>
    </div>
  )
}
export default AuthPage