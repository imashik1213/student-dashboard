import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CalendarCheck, GraduationCap, LogOut, Megaphone, ClipboardCheck, Search } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import StatCard from '../components/cards/StatCard'
import { useAuth } from '../context/AuthContext'

export default function FacultyPortal() {
  const { students,updateStudent,logout,currentUser }=useAuth()
  const navigate=useNavigate()
  const [tab,setTab]=useState('overview')
  const [search,setSearch]=useState('')
  const [selected,setSelected]=useState('')
  const [attendance,setAttendance]=useState(85)
  const [cgpa,setCgpa]=useState(8.5)
  const [announcement,setAnnouncement]=useState('')
  const [announcements,setAnnouncements]=useState(()=>{
    try{return JSON.parse(localStorage.getItem('faculty_announcements'))||[]}catch{return []}
  })
  const active=students.filter((item)=>item.isActive).length
  const visible=students.filter((item)=>`${item.name} ${item.registerNumber} ${item.department}`.toLowerCase().includes(search.toLowerCase()))
  const selectStudent=(item)=>{setSelected(item.registerNumber);setAttendance(Number(item.overallAttendance)||85);setCgpa(Number(item.cgpa)||8.5)}
  const saveAcademic=()=>{
    if(!selected)return
    updateStudent(selected,{overallAttendance:Number(attendance),cgpa:Number(cgpa),sgpa:Number(cgpa)})
  }
  const publish=()=>{
    if(!announcement.trim())return
    const next=[{id:Date.now(),title:announcement.trim(),date:new Date().toLocaleDateString('en-IN'),faculty:currentUser.name},...announcements]
    setAnnouncements(next)
    localStorage.setItem('faculty_announcements',JSON.stringify(next))
    setAnnouncement('')
  }
  const removeAnnouncement=(id)=>{
    const next=announcements.filter((item)=>item.id!==id)
    setAnnouncements(next)
    localStorage.setItem('faculty_announcements',JSON.stringify(next))
  }
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div><p className="text-sm font-bold text-slate-900">MSAJCEA Faculty Portal</p><p className="text-xs text-slate-500">{currentUser?.employeeId||'Faculty'}</p></div>
        <button onClick={()=>{logout();navigate('/login',{replace:true})}} className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600"><LogOut size={16}/>Logout</button>
      </header>
      <div className="mx-auto max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Welcome, {currentUser?.name}</h1><p className="mt-1 text-sm text-slate-500">Student academic management</p></div>
        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={Users} title="Students" value={students.length} subtitle="Registered students"/>
          <StatCard icon={CalendarCheck} title="Active Students" value={active} subtitle="Portal access enabled" iconClass="bg-green-50 text-green-600"/>
          <StatCard icon={GraduationCap} title="Departments" value={new Set(students.map((item)=>item.department)).size} subtitle="Represented departments" iconClass="bg-violet-50 text-violet-600"/>
        </section>
        <div className="flex gap-2 overflow-x-auto">
          {[['overview','Overview',Users],['attendance','Attendance & Results',ClipboardCheck],['announcements','Announcements',Megaphone]].map(([key,label,Icon])=><button key={key} onClick={()=>setTab(key)} className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab===key?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}><Icon size={16}/>{label}</button>)}
        </div>
        {tab==='overview'&&<Card className="p-0 overflow-hidden"><div className="border-b border-slate-100 p-4"><div className="relative max-w-sm"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search student directory" className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-500"/></div></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Register Number</th><th className="px-5 py-3">Department</th><th className="px-5 py-3">Attendance</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{visible.map((item)=><tr key={item.registerNumber} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-900">{item.name}</td><td className="px-5 py-4 text-slate-600">{item.registerNumber}</td><td className="px-5 py-4 text-slate-600">{item.shortDepartment||item.department}</td><td className="px-5 py-4 font-semibold">{item.overallAttendance}%</td><td className="px-5 py-4"><Badge type={item.isActive?'success':'error'}>{item.isActive?'Active':'Revoked'}</Badge></td></tr>)}</tbody></table></div></Card>}
        {tab==='attendance'&&<Card><h2 className="font-bold text-slate-900">Update Student Academic Record</h2><div className="mt-5 grid gap-5 md:grid-cols-3"><div><label className="text-xs font-semibold text-slate-600">Student</label><select value={selected} onChange={(e)=>{const item=students.find((student)=>student.registerNumber===e.target.value);if(item)selectStudent(item)}} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option value="">Select student</option>{students.map((item)=><option key={item.registerNumber} value={item.registerNumber}>{item.name} - {item.registerNumber}</option>)}</select></div><div><label className="text-xs font-semibold text-slate-600">Overall Attendance %</label><input type="number" min="0" max="100" value={attendance} onChange={(e)=>setAttendance(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none"/></div><div><label className="text-xs font-semibold text-slate-600">CGPA</label><input type="number" min="0" max="10" step="0.01" value={cgpa} onChange={(e)=>setCgpa(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none"/></div></div><button disabled={!selected} onClick={saveAcademic} className="mt-5 h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Save Academic Updates</button></Card>}
        {tab==='announcements'&&<div className="grid gap-6 lg:grid-cols-2"><Card><h2 className="font-bold text-slate-900">Publish Announcement</h2><textarea value={announcement} onChange={(e)=>setAnnouncement(e.target.value)} rows="5" placeholder="Write an announcement for students" className="mt-4 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"/><button onClick={publish} className="mt-4 h-10 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white">Publish</button></Card><Card><h2 className="font-bold text-slate-900">Published Notices</h2><div className="mt-4 space-y-3">{announcements.length===0&&<p className="text-sm text-slate-500">No announcements published.</p>} {announcements.map((item)=><div key={item.id} className="rounded-lg border border-slate-200 p-3"><p className="text-sm font-semibold text-slate-900">{item.title}</p><div className="mt-2 flex justify-between text-xs text-slate-500"><span>{item.faculty} · {item.date}</span><button onClick={()=>removeAnnouncement(item.id)} className="font-semibold text-red-600">Remove</button></div></div>)}</div></Card></div>}
      </div>
    </main>
  )
}
