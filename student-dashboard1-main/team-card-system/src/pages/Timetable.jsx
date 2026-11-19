import { useState } from 'react'
import { Clock3, MapPin, UserRound } from 'lucide-react'
import Card from '../components/ui/Card'
import { timetable as seedTimetable } from '../data/studentData'
import { useAuth } from '../context/AuthContext'

export default function Timetable() {
  const { loggedInStudent }=useAuth()
  const timetable=loggedInStudent?.timetable||seedTimetable
  const days = Object.keys(timetable)
  const [day,setDay] = useState('Monday')
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Timetable</h1><p className="mt-1 text-sm text-slate-500">Your weekly class schedule</p></div>
      <div className="flex gap-2 overflow-x-auto pb-1">{days.map((item)=><button key={item} onClick={()=>setDay(item)} className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold ${day===item?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{item}</button>)}</div>
      <section className="grid gap-4 lg:grid-cols-2">
        {timetable[day].map((item,index)=><Card key={`${item.time}-${index}`}><div className="flex gap-4"><div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600"><span className="text-xs font-bold">{index+1}</span></div><div className="min-w-0"><h2 className="font-bold text-slate-900">{item.subject}</h2><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500"><span className="flex items-center gap-1"><Clock3 size={14}/>{item.time}</span><span className="flex items-center gap-1"><UserRound size={14}/>{item.faculty}</span><span className="flex items-center gap-1"><MapPin size={14}/>{item.room}</span></div></div></div></Card>)}
      </section>
    </div>
  )
}
