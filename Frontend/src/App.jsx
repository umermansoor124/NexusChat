import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthPage from './components/AuthPage'
import ChatPage from './components/ChatPage'
import NotFound from './components/NotFound'

const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state.auth.token)
  return token ? children : <Navigate to="/" replace />
}

const App = () => {
  const token = useSelector(state => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/chat" replace /> : <AuthPage />} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
