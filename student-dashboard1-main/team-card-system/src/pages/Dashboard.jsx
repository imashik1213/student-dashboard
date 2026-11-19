import { CalendarCheck, BookOpen, Award, Bell, CreditCard, UserRound, ChartColumn, GraduationCap, CalendarDays } from 'lucide-react'
import Card from '../components/ui/Card'
import StatCard from '../components/cards/StatCard'
import QuickAccessCard from '../components/cards/QuickAccessCard'
import { student, notifications } from '../data/studentData'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { loggedInStudent }=useAuth()
  const student=loggedInStudent
  const date = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  const quick = [
    ['/id-card','My ID Card',CreditCard,'View and verify your card'],
    ['/profile','My Profile',UserRound,'Personal academic details'],
    ['/attendance','Attendance',ChartColumn,'Track subject attendance'],
    ['/results','Results',GraduationCap,'Grades and examination results'],
    ['/timetable','Timetable',CalendarDays,'View your class schedule'],
    ['/notifications','Notifications',Bell,'Latest college updates'],
  ]
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl bg-blue-600 p-5 text-white sm:p-7">
        <p className="text-sm text-blue-100">{date}</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Good morning, {student.firstName}!</h1>
        <p className="mt-2 text-sm text-blue-100">{student.department} · {student.year} · {student.semester}</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarCheck} title="Attendance" value={`${student.overallAttendance}%`} subtitle="Overall attendance" />
        <StatCard icon={BookOpen} title="Total Subjects" value={student.subjectsCount} subtitle="Current semester" iconClass="bg-violet-50 text-violet-600"/>
        <StatCard icon={Award} title="CGPA" value={student.cgpa} subtitle="Out of 10.0" iconClass="bg-emerald-50 text-emerald-600"/>
        <StatCard icon={Bell} title="Notifications" value={student.unreadNotifications} subtitle="Unread updates" iconClass="bg-amber-50 text-amber-600"/>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{quick.map(([to,title,Icon,subtitle])=><QuickAccessCard key={to} to={to} title={title} subtitle={subtitle} icon={Icon}/>)}</div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900">Recent Activity</h2>
        <Card className="divide-y divide-slate-100 p-0">
          {notifications.slice(0,4).map((item)=>(
            <div key={item.id} className="flex gap-3 px-4 py-4 sm:px-6">
              <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.type==='error'?'bg-red-500':item.type==='warning'?'bg-amber-500':'bg-blue-500'}`}/>
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900">{item.title}</p><p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.message}</p></div>
              <span className="hidden shrink-0 text-xs text-slate-400 sm:block">{item.date}</span>
            </div>
          ))}
        </Card>
      </section>
    </div>
  )
}
