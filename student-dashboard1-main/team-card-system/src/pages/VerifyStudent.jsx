import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, ArrowLeft, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function VerifyStudent() {
  const { studentId } = useParams()
  const { students }=useAuth()
  const student=students.find((item)=>(item.registerNumber===studentId||item.id===studentId)&&item.isActive)
  const valid=Boolean(student)
  if (!valid) return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600"><XCircle size={34}/></div>
        <div className="mt-5 rounded-lg bg-red-600 py-3 text-sm font-bold text-white">Invalid / Record Not Found</div>
        <p className="mt-5 text-sm text-slate-500">No active student record was found for ID <strong className="text-slate-900">{studentId}</strong>.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16}/> Return to portal</Link>
      </div>
    </main>
  )
  return (
    <main className="min-h-screen bg-slate-50 p-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-4 text-white"><CheckCircle2 size={22}/><h1 className="font-bold">Verified Active Student</h1></div>
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col items-center text-center">
            <img src={student.photo} alt={student.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-green-100"/>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{student.name}</h2><p className="mt-1 text-sm font-semibold text-blue-600">{student.registerNumber}</p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
            {[['Department',student.department],['Year / Semester',`${student.year} · ${student.semester}`],['Blood Group',student.bloodGroup],['Card Validity',student.validity]].map(([label,value])=><div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd></div>)}
          </dl>
          <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
            <div className="flex justify-between text-sm"><span className="text-slate-500">Current Attendance</span><strong className="text-green-700">{student.overallAttendance}%</strong></div>
            <div className="flex items-center justify-between gap-3 text-sm"><span className="text-slate-500">Institutional Email</span><a className="flex items-center gap-1 truncate font-semibold text-slate-900" href={`mailto:${student.email}`}><Mail size={14}/>{student.email}</a></div>
          </div>
        </section>
      </div>
    </main>
  )
}
