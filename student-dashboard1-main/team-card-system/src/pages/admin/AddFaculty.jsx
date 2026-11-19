import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus } from 'lucide-react'
import Card from '../../components/ui/Card'
import { useAuth } from '../../context/AuthContext'

export default function AddFaculty() {
  const [form,setForm]=useState({name:'',employeeId:'',username:'',password:'',department:'Computer Science & Engineering',email:'',phone:'',designation:'Assistant Professor',isActive:true})
  const [error,setError]=useState('')
  const {addFaculty}=useAuth()
  const navigate=useNavigate()
  const update=(key,value)=>setForm((current)=>({...current,[key]:value}))
  const submit=(event)=>{
    event.preventDefault()
    if(form.password.length<4){setError('Password must contain at least 4 characters.');return}
    const member={...form,name:form.name.trim(),employeeId:form.employeeId.trim().toUpperCase(),username:form.username.trim().toLowerCase(),id:form.employeeId.trim().toUpperCase()}
    const result=addFaculty(member)
    if(!result.success){setError(result.message);return}
    navigate('/admin',{replace:true})
  }
  const field=(key,label,type='text')=>(
    <div><label className="text-xs font-semibold text-slate-600">{label}</label><input type={type} value={form[key]} onChange={(e)=>update(key,e.target.value)} required className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div>
  )
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={17}/>Back to Superadmin Panel</Link>
        <div className="mt-5"><h1 className="text-2xl font-bold text-slate-900">Add Faculty Member</h1><p className="mt-1 text-sm text-slate-500">Create a faculty portal account</p></div>
        <form onSubmit={submit} className="mt-6"><Card>
          {error&&<div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
          <div className="grid gap-5 md:grid-cols-2">
            {field('name','Full Name')}
            {field('employeeId','Employee ID')}
            {field('username','Login Username')}
            {field('password','Access Password','password')}
            <div><label className="text-xs font-semibold text-slate-600">Department</label><select value={form.department} onChange={(e)=>update('department',e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>Computer Science & Engineering</option><option>Information Technology</option><option>Electronics & Communication</option><option>Mechanical Engineering</option><option>Civil Engineering</option></select></div>
            {field('email','Institutional Email','email')}
            {field('phone','Phone Number','tel')}
            <div><label className="text-xs font-semibold text-slate-600">Designation</label><select value={form.designation} onChange={(e)=>update('designation',e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option><option>Head of Department</option><option>Lecturer</option></select></div>
          </div>
          <button className="mt-6 flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white"><UserPlus size={18}/>Create Faculty Account</button>
        </Card></form>
      </div>
    </div>
  )
}
