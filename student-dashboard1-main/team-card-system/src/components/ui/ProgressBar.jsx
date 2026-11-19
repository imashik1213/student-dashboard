export default function ProgressBar({ value, showValue = true, height = 'h-2.5' }) {
  const safeValue = Math.max(0, Math.min(100, value))
  const color = safeValue >= 75 ? 'bg-green-600' : safeValue >= 65 ? 'bg-amber-500' : 'bg-red-600'
  return (
    <div>
      {showValue && <div className="mb-1.5 flex justify-between text-xs"><span className="text-slate-500">Attendance</span><span className="font-semibold text-slate-900">{safeValue}%</span></div>}
      <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${height}`}><div className={`rounded-full ${height} ${color} transition-all`} style={{ width: `${safeValue}%` }}/></div>
    </div>
  )
}
