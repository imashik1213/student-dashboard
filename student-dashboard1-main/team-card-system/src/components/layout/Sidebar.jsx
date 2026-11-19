import { LayoutDashboard, UserRound, CreditCard, CalendarCheck, GraduationCap, CalendarDays, Bell, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const items = [
  ['/','Dashboard',LayoutDashboard], ['/profile','My Profile',UserRound], ['/id-card','My ID Card',CreditCard],
  ['/attendance','Attendance',CalendarCheck], ['/results','Academic Results',GraduationCap], ['/timetable','Timetable',CalendarDays],
  ['/notifications','Notifications',Bell], ['/settings','Settings',Settings],
]

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { loggedInStudent, currentUser, logout }=useAuth()
  const displayName=loggedInStudent?.name||currentUser?.name||'Student'
  const content = (
    <>
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">MS</div>
          {!collapsed && <div><p className="font-bold text-slate-900">MSAJCEA</p><p className="text-xs text-slate-500">Student Portal</p></div>}
        </div>
        <button className="hidden rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:block" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
          {collapsed ? <PanelLeftOpen size={19}/> : <PanelLeftClose size={19}/>}
        </button>
      </div>
      {!collapsed && <div className="mx-3 mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="truncate text-sm font-semibold text-slate-900">{displayName}</p><p className="mt-0.5 text-xs font-medium capitalize text-blue-600">{currentUser?.role||'student'}</p></div>}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map(([to,label,Icon]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'} ${collapsed ? 'justify-center' : ''}`} title={collapsed ? label : undefined}>
            <Icon size={19} className="shrink-0"/>{!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-3">
        <button onClick={logout} className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-red-600 hover:bg-red-50 ${collapsed ? 'justify-center':''}`}>
          <LogOut size={19}/>{!collapsed && 'Logout'}
        </button>
      </div>
    </>
  )
  return (
    <>
      <aside className={`fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-slate-200 bg-white transition-all lg:flex ${collapsed ? 'w-20':'w-64'}`}>{content}</aside>
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-white shadow-xl transition-transform lg:hidden ${mobileOpen?'translate-x-0':'-translate-x-full'}`}>{content}</aside>
    </>
  )
}
