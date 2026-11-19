import { useState } from 'react'
import { CheckCheck, Bell } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { notifications as initialNotifications } from '../data/studentData'

export default function Notifications() {
  const [items,setItems] = useState(initialNotifications)
  const [filter,setFilter] = useState('All')
  const categories = ['All','Announcement','Exams','Attendance']
  const visible = filter==='All'?items:items.filter((item)=>item.category===filter)
  const markRead = (id) => setItems((current)=>current.map((item)=>item.id===id?{...item,read:true}:item))
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-900">Notifications</h1><p className="mt-1 text-sm text-slate-500">College announcements and academic updates</p></div><button onClick={()=>setItems((current)=>current.map((item)=>({...item,read:true})))} className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"><CheckCheck size={17}/> Mark all read</button></div>
      <div className="flex gap-2 overflow-x-auto">{categories.map((item)=><button key={item} onClick={()=>setFilter(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${filter===item?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{item}</button>)}</div>
      <Card className="divide-y divide-slate-100 p-0">
        {visible.map((item)=><article key={item.id} className={`flex gap-3 px-4 py-5 sm:px-6 ${!item.read?'bg-blue-50/40':''}`}><div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.type==='error'?'bg-red-50 text-red-600':item.type==='warning'?'bg-amber-50 text-amber-600':'bg-blue-50 text-blue-600'}`}><Bell size={17}/></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-slate-900">{item.title}</h2>{!item.read&&<Badge type="primary">New</Badge>}</div><p className="mt-1 text-sm leading-6 text-slate-500">{item.message}</p><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-400">{item.date}</span>{!item.read&&<button onClick={()=>markRead(item.id)} className="text-xs font-semibold text-blue-600">Mark as read</button>}</div></div></article>)}
      </Card>
    </div>
  )
}
