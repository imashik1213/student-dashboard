import { useState } from 'react'
import { Bell, Search, Menu, ChevronDown, LogOut, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { student } from '../../data/studentData'
import { useAuth } from '../../context/AuthContext'

export default function Header({ setMobileOpen }) {
  const [open,setOpen] = useState(false)
  const { loggedInStudent, logout }=useAuth()
  const studentInfo=loggedInStudent||student
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={()=>setMobileOpen(true)} aria-label="Open navigation"><Menu size={21}/></button><div className="hidden sm:block"><p className="text-sm font-bold text-slate-900">Mohamed Sathak AJ College</p><p className="text-xs text-slate-500">Engineering & Architecture</p></div></div>
      <div className="relative mx-4 hidden max-w-md flex-1 md:block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input aria-label="Search" className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white" placeholder="Search dashboard"/></div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/notifications" aria-label="Notifications" className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Bell size={20}/><span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white">4</span></Link>
        <div className="relative"><button onClick={()=>setOpen(!open)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50"><img src={studentInfo.photo} alt="" className="h-8 w-8 rounded-full object-cover"/><span className="hidden text-sm font-semibold text-slate-800 sm:block">{studentInfo.name}</span><ChevronDown size={14} className="text-slate-400"/></button>
        {open&&<div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><Link onClick={()=>setOpen(false)} to="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><UserRound size={16}/> My Profile</Link><button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={16}/> Logout</button></div>}</div>
      </div>
    </header>
  )
}
