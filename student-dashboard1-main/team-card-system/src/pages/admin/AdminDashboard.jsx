import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Users, UserCheck, UserX, ChartNoAxesCombined, Plus, Search, Eye, Trash2, LogOut, GraduationCap, ShieldCheck, Pencil, X } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import StatCard from '../../components/cards/StatCard'
import StudentIDCard from '../../components/cards/StudentIDCard'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { students,faculties,toggleStudentAccess,toggleFacultyAccess,deleteStudent,deleteFaculty,updateStudent,updateFaculty,logout }=useAuth()
  const [tab,setTab]=useState('students')
  const [search,setSearch]=useState('')
  const [filter,setFilter]=useState('All')
  const [preview,setPreview]=useState(null)
  const [editStudent,setEditStudent]=useState(null)
  const [editFaculty,setEditFaculty]=useState(null)
  const navigate=useNavigate()
  const studentVisible=students.filter((item)=>{
    const matches=filter==='All'||(filter==='Active'?item.isActive:!item.isActive)
    return matches&&`${item.name} ${item.registerNumber} ${item.department}`.toLowerCase().includes(search.toLowerCase())
  })
  const facultyVisible=faculties.filter((item)=>{
    const matches=filter==='All'||(filter==='Active'?item.isActive:!item.isActive)
    return matches&&`${item.name} ${item.employeeId} ${item.department} ${item.username}`.toLowerCase().includes(search.toLowerCase())
  })
  const activeStudents=students.filter((item)=>item.isActive).length
  const activeFaculties=faculties.filter((item)=>item.isActive).length
  const avg=students.length?Math.round(students.reduce((sum,item)=>sum+(Number(item.overallAttendance)||0),0)/students.length):0
  const removeStudent=(item)=>{if(window.confirm(`Remove ${item.name} from the student database?`))deleteStudent(item.registerNumber)}
  const removeFaculty=(item)=>{if(window.confirm(`Remove ${item.name} from the faculty database?`))deleteFaculty(item.employeeId)}
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div><p className="flex items-center gap-2 text-sm font-bold text-slate-900"><ShieldCheck size={17} className="text-blue-600"/>MSAJCEA Superadmin Panel</p><p className="text-xs text-slate-500">Complete institution operations</p></div>
        <button onClick={()=>{logout();navigate('/login',{replace:true})}} className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600"><LogOut size={16}/><span className="hidden sm:inline">Logout</span></button>
      </header>
      <div className="mx-auto max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-900">Superadmin Dashboard</h1><p className="mt-1 text-sm text-slate-500">Manage students, faculty and portal access</p></div><div className="flex gap-2"><Link to="/admin/add-student" className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white"><Plus size={17}/>Add Student</Link><Link to="/admin/add-faculty" className="flex h-10 items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-sm font-bold text-blue-600"><Plus size={17}/>Add Faculty</Link></div></div>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Users} title="Total Students" value={students.length} subtitle="Provisioned accounts"/>
          <StatCard icon={UserCheck} title="Active Student Access" value={activeStudents} subtitle="Can sign in" iconClass="bg-green-50 text-green-600"/>
          <StatCard icon={GraduationCap} title="Faculty Members" value={faculties.length} subtitle={`${activeFaculties} active accounts`} iconClass="bg-violet-50 text-violet-600"/>
          <StatCard icon={ChartNoAxesCombined} title="Avg Attendance" value={`${avg}%`} subtitle="Across students" iconClass="bg-amber-50 text-amber-600"/>
        </section>
        <div className="flex gap-2">{['students','faculty'].map((item)=><button key={item} onClick={()=>{setTab(item);setFilter('All');setSearch('')}} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab===item?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{item==='students'?'Student Management':'Faculty Management'}</button>)}</div>
        <Card className="p-0 overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${tab==='students'?'students':'faculty'}`} className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-500"/></div><div className="flex gap-2">{['All','Active','Revoked'].map((item)=><button key={item} onClick={()=>setFilter(item)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${filter===item?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{item}</button>)}</div></div>
          {tab==='students'?(
            <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Department</th><th className="px-5 py-3">Year</th><th className="px-5 py-3">Attendance</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{studentVisible.map((item)=><tr key={item.registerNumber} className="hover:bg-slate-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><img src={item.photo} alt="" className="h-9 w-9 rounded-full object-cover"/><div><p className="font-semibold text-slate-900">{item.name}</p><p className="text-xs text-slate-500">{item.registerNumber}</p></div></div></td><td className="px-5 py-4 text-slate-600">{item.shortDepartment||item.department}</td><td className="px-5 py-4 text-slate-600">{item.year}</td><td className="px-5 py-4 font-semibold text-slate-900">{item.overallAttendance}%</td><td className="px-5 py-4"><Badge type={item.isActive?'success':'error'}>{item.isActive?'Active':'Revoked'}</Badge></td><td className="px-5 py-4"><div className="flex justify-end gap-1"><button onClick={()=>setPreview(item)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" aria-label="Preview ID card"><Eye size={17}/></button>            <button onClick={()=>setEditStudent({...item,_originalRegister:item.registerNumber})} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Edit student"><Pencil size={17}/></button><button onClick={()=>toggleStudentAccess(item.registerNumber)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${item.isActive?'text-amber-700 hover:bg-amber-50':'text-green-700 hover:bg-green-50'}`}>{item.isActive?'Revoke':'Activate'}</button><button onClick={()=>removeStudent(item)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete student"><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div>
          ):(
            <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Faculty</th><th className="px-5 py-3">Employee ID</th><th className="px-5 py-3">Department</th><th className="px-5 py-3">Username</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{facultyVisible.map((item)=><tr key={item.employeeId} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-slate-900">{item.name}</p><p className="text-xs text-slate-500">{item.designation}</p></td><td className="px-5 py-4 text-slate-600">{item.employeeId}</td><td className="px-5 py-4 text-slate-600">{item.department}</td><td className="px-5 py-4 font-medium text-slate-700">{item.username}</td><td className="px-5 py-4"><Badge type={item.isActive?'success':'error'}>{item.isActive?'Active':'Revoked'}</Badge></td><td className="px-5 py-4"><div className="flex justify-end gap-1">            <button onClick={()=>setEditFaculty({...item,_originalEmployee:item.employeeId})} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Edit faculty"><Pencil size={17}/></button><button onClick={()=>toggleFacultyAccess(item.employeeId)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${item.isActive?'text-amber-700 hover:bg-amber-50':'text-green-700 hover:bg-green-50'}`}>{item.isActive?'Revoke':'Activate'}</button><button onClick={()=>removeFaculty(item)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete faculty"><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div>
          )}
        </Card>
      </div>
      {editStudent&&<div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" onClick={()=>setEditStudent(null)}>
        <Card className="my-4 w-full max-w-3xl" onClick={(event)=>event.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><h2 className="font-bold text-slate-900">Edit Student</h2><p className="mt-1 text-xs text-slate-500">Update account and academic details</p></div><button onClick={()=>setEditStudent(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={18}/></button></div>
          <form onSubmit={(event)=>{event.preventDefault();const {_originalRegister,...updates}=editStudent;updateStudent(_originalRegister,{...updates,name:updates.name.trim(),registerNumber:updates.registerNumber.trim().toUpperCase(),password:updates.password||'',overallAttendance:Number(updates.overallAttendance),cgpa:Number(updates.cgpa),sgpa:Number(updates.cgpa)});setEditStudent(null)}} className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[['name','Full Name','text'],['registerNumber','Register Number','text'],['password','Password / PIN','text'],['email','Email','email'],['phone','Phone','tel'],['department','Department','text'],['shortDepartment','Department Code','text'],['year','Year','text'],['semester','Semester','text'],['overallAttendance','Attendance %','number'],['cgpa','CGPA','number'],['validity','Card Validity','text']].map(([key,label,type])=><div key={key}><label className="text-xs font-semibold text-slate-600">{label}</label><input type={type} value={editStudent[key]||''} onChange={(event)=>setEditStudent((current)=>({...current,[key]:event.target.value}))} required={key==='name'||key==='registerNumber'||key==='password'} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div>)}
              <div className="sm:col-span-2 lg:col-span-3"><label className="text-xs font-semibold text-slate-600">Address</label><input value={editStudent.address||''} onChange={(event)=>setEditStudent((current)=>({...current,address:event.target.value}))} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className="text-xs font-semibold text-slate-600">Photo URL</label><input value={editStudent.photo||''} onChange={(event)=>setEditStudent((current)=>({...current,photo:event.target.value}))} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div>
            </div>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={()=>setEditStudent(null)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white">Save Changes</button></div>
          </form>
        </Card>
      </div>}
      {editFaculty&&<div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" onClick={()=>setEditFaculty(null)}>
        <Card className="my-4 w-full max-w-2xl" onClick={(event)=>event.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><h2 className="font-bold text-slate-900">Edit Faculty</h2><p className="mt-1 text-xs text-slate-500">Update faculty account details</p></div><button onClick={()=>setEditFaculty(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={18}/></button></div>
          <form onSubmit={(event)=>{event.preventDefault();const {_originalEmployee,...updates}=editFaculty;updateFaculty(_originalEmployee,{...updates,name:updates.name.trim(),employeeId:updates.employeeId.trim().toUpperCase(),username:updates.username.trim().toLowerCase(),password:updates.password||''});setEditFaculty(null)}} className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {[['name','Full Name','text'],['employeeId','Employee ID','text'],['username','Login Username','text'],['password','Password','text'],['department','Department','text'],['email','Email','email'],['phone','Phone','tel'],['designation','Designation','text']].map(([key,label,type])=><div key={key}><label className="text-xs font-semibold text-slate-600">{label}</label><input type={type} value={editFaculty[key]||''} onChange={(event)=>setEditFaculty((current)=>({...current,[key]:event.target.value}))} required={key==='name'||key==='employeeId'||key==='username'||key==='password'} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div>)}
            </div>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={()=>setEditFaculty(null)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white">Save Changes</button></div>
          </form>
        </Card>
      </div>}
      {preview&&<div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" onClick={()=>setPreview(null)}><div onClick={(event)=>event.stopPropagation()}><StudentIDCard student={preview}/><button onClick={()=>setPreview(null)} className="mt-4 h-10 w-full rounded-lg bg-white text-sm font-bold text-slate-900">Close Preview</button></div></div>}
    </main>
  )
}
