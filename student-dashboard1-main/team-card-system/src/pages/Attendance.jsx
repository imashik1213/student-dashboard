import { CalendarCheck, CheckCircle2, XCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import StatCard from '../components/cards/StatCard'
import { attendance as seedAttendance } from '../data/studentData'
import { useAuth } from '../context/AuthContext'

export default function Attendance() {
  const { loggedInStudent }=useAuth()
  const student=loggedInStudent
  const attendance=student.attendance||seedAttendance
  const working = attendance.reduce((sum,item)=>sum+item.working,0)
  const present = attendance.reduce((sum,item)=>sum+item.present,0)
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Attendance</h1><p className="mt-1 text-sm text-slate-500">Monitor your subject-wise attendance</p></div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} title="Overall Attendance" value={`${student.overallAttendance}%`} subtitle="Current semester"/>
        <StatCard icon={CheckCircle2} title="Working Days" value={working} subtitle="Across all subjects" iconClass="bg-violet-50 text-violet-600"/>
        <StatCard icon={CheckCircle2} title="Present" value={present} subtitle="Days attended" iconClass="bg-green-50 text-green-600"/>
        <StatCard icon={XCircle} title="Absent" value={working-present} subtitle="Days missed" iconClass="bg-red-50 text-red-600"/>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {attendance.map((item)=><Card key={item.code}><div className="flex justify-between gap-3"><div><p className="text-xs font-semibold text-blue-600">{item.code}</p><h2 className="mt-1 font-bold text-slate-900">{item.name}</h2></div><span className="text-xs text-slate-500">{item.present}/{item.working} days</span></div><div className="mt-5"><ProgressBar value={item.percentage}/></div></Card>)}
      </section>
    </div>
  )
}
