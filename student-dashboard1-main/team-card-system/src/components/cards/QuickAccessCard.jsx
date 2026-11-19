import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function QuickAccessCard({ to, icon: Icon, title, subtitle }) {
  return (
    <Link to={to} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={21} />
        </div>
        <ArrowUpRight size={18} className="text-slate-300 transition group-hover:text-blue-600" />
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </Link>
  )
}
