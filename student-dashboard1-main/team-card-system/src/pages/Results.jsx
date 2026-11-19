import { Award, TrendingUp, BookOpen } from 'lucide-react'
import Card from '../components/ui/Card'
import StatCard from '../components/cards/StatCard'
import Badge from '../components/ui/Badge'
import { results as seedResults } from '../data/studentData'
import { useAuth } from '../context/AuthContext'

export default function Results() {
  const { loggedInStudent }=useAuth()
  const student=loggedInStudent
  const results=student.results||seedResults
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Academic Results</h1><p className="mt-1 text-sm text-slate-500">Semester performance and grade summary</p></div>
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Award} title="CGPA" value={student.cgpa} subtitle="Cumulative · 10.0 scale"/>
        <StatCard icon={TrendingUp} title="Current SGPA" value={student.sgpa} subtitle="Semester VI" iconClass="bg-green-50 text-green-600"/>
        <StatCard icon={BookOpen} title="Subjects" value={results.length} subtitle="All cleared" iconClass="bg-violet-50 text-violet-600"/>
      </section>
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Code</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3 text-center">Internal</th><th className="px-5 py-3 text-center">Semester</th><th className="px-5 py-3 text-center">Total</th><th className="px-5 py-3 text-center">Grade</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{results.map((row)=><tr key={row.code} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-blue-600">{row.code}</td><td className="px-5 py-4 font-medium text-slate-900">{row.name}</td><td className="px-5 py-4 text-center text-slate-600">{row.internal}/50</td><td className="px-5 py-4 text-center text-slate-600">{row.semester}/100</td><td className="px-5 py-4 text-center font-bold text-slate-900">{row.total}</td><td className="px-5 py-4 text-center"><Badge type={row.grade==='O'||row.grade==='A+'?'success':'primary'}>{row.grade}</Badge></td></tr>)}</tbody>
        </table></div>
      </Card>
    </div>
  )
}
