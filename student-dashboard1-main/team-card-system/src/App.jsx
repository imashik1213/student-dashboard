import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import IDCardPage from './pages/IDCardPage'
import VerifyStudent from './pages/VerifyStudent'
import Attendance from './pages/Attendance'
import Results from './pages/Results'
import Timetable from './pages/Timetable'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddStudent from './pages/admin/AddStudent'
import ProtectedRoute from './components/auth/ProtectedRoute'
import FacultyPortal from './pages/FacultyPortal'
import AddFaculty from './pages/admin/AddFaculty'

export default function App() {
  return (
    <Routes>
      <Route path="/verify/:studentId" element={<VerifyStudent/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/faculty" element={<ProtectedRoute allowedRole="faculty"><FacultyPortal/></ProtectedRoute>}/>
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard/></ProtectedRoute>}/>
      <Route path="/admin/add-student" element={<ProtectedRoute allowedRole="admin"><AddStudent/></ProtectedRoute>}/>
      <Route path="/admin/add-faculty" element={<ProtectedRoute allowedRole="admin"><AddFaculty/></ProtectedRoute>}/>
      <Route element={<ProtectedRoute allowedRole="student"><DashboardLayout/></ProtectedRoute>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/id-card" element={<IDCardPage/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/timetable" element={<Timetable/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}
