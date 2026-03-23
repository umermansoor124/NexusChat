import { useSelector, useDispatch } from 'react-redux'
import { logout } from './authSlice'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return { user, token, handleLogout, isAuthenticated: !!token }
}