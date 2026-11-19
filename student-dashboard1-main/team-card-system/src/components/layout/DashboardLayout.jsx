import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children }) {
  const [collapsed,setCollapsed] = useState(false)
  const [mobileOpen,setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <div className={`transition-all ${collapsed?'lg:pl-20':'lg:pl-64'}`}><Header setMobileOpen={setMobileOpen}/><main className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">{children||<Outlet/>}</main></div>
    </div>
  )
}
