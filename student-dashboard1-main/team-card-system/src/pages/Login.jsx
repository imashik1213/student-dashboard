import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [identifier,setIdentifier]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const { role, login }=useAuth()
  const navigate=useNavigate()
  if (role==='admin') return <Navigate to="/admin" replace/>
  if (role==='faculty') return <Navigate to="/faculty" replace/>
  if (role==='student') return <Navigate to="/" replace/>

  const submit=(event)=>{
    event.preventDefault()
    setError('')
    const result=login(identifier,password)
    if (!result.success) {
      setError(result.message)
      return
    }
    if (result.user.role==='admin') navigate('/admin',{replace:true})
    else if (result.user.role==='faculty') navigate('/faculty',{replace:true})
    else navigate('/',{replace:true})
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-5 sm:p-7">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white"><GraduationCap size={24}/></div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">MSAJCEA Portal Login</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your account credentials</p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label className="text-xs font-semibold text-slate-600">Register Number or Username</label><input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} required autoComplete="username" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500" placeholder="Student ID, admin or faculty username"/></div>
          <div><label className="text-xs font-semibold text-slate-600">Password / PIN</label><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required autoComplete="current-password" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500" placeholder="Enter password"/></div>
          {error&&<div className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</div>}
          <button type="submit" className="h-11 w-full rounded-lg bg-blue-600 text-sm font-bold text-white hover:bg-blue-700">Sign in</button>
        </form>
        <div className="mt-5 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <p>Student: <strong className="text-slate-700">21CS1048 / student123</strong></p>
          <p>Faculty: <strong className="text-slate-700">faculty / faculty123</strong></p>
          <p>Superadmin: <strong className="text-slate-700">admin / admin123</strong></p>
        </div>
      </Card>
    </main>
  )
}
