import { useState } from 'react'
import Card from '../components/ui/Card'
import { student } from '../data/studentData'

function Toggle({ label, description, initial=false }) {
  const [on,setOn]=useState(initial)
  return <div className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-semibold text-slate-900">{label}</p><p className="mt-1 text-xs text-slate-500">{description}</p></div><button role="switch" aria-checked={on} onClick={()=>setOn(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${on?'bg-blue-600':'bg-slate-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${on?'left-6':'left-1'}`}/></button></div>
}

export default function Settings() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Settings</h1><p className="mt-1 text-sm text-slate-500">Manage account and privacy preferences</p></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><h2 className="border-b border-slate-100 pb-4 font-bold text-slate-900">Account Preferences</h2><div className="divide-y divide-slate-100"><div className="py-4"><label className="text-xs font-medium text-slate-500">Display name</label><input defaultValue={student.name} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div><div className="py-4"><label className="text-xs font-medium text-slate-500">Email address</label><input defaultValue={student.email} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"/></div></div></Card>
        <Card><h2 className="border-b border-slate-100 pb-4 font-bold text-slate-900">Notifications</h2><div className="divide-y divide-slate-100"><Toggle label="Academic announcements" description="Receive college and department notices" initial/><Toggle label="Attendance alerts" description="Notify when attendance falls below limits" initial/><Toggle label="Exam reminders" description="Receive schedules and deadline reminders"/></div></Card>
        <Card className="lg:col-span-2"><h2 className="border-b border-slate-100 pb-4 font-bold text-slate-900">Digital ID Privacy</h2><div className="divide-y divide-slate-100"><Toggle label="Allow public card verification" description="Permit scanned QR codes to view active student details" initial/><Toggle label="Show institutional email" description="Include email in public verification record"/><Toggle label="Show attendance snapshot" description="Include current attendance in verification record" initial/></div></Card>
      </div>
    </div>
  )
}
