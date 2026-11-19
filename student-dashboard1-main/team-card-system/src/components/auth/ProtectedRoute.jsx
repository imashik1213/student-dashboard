import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ allowedRole, children }) {
  const { role, loggedInStudent } = useAuth()
  const location = useLocation()
  if (!role) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (role !== allowedRole) {
    const destination = role === 'admin' ? '/admin' : role === 'faculty' ? '/faculty' : '/'
    return <Navigate to={destination} replace />
  }
  if (allowedRole === 'student' && !loggedInStudent) return <Navigate to="/login" replace />
  return children
}
