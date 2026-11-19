export default function Card({ children, className = '', ...props }) {
  return <div {...props} className={`rounded-xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 ${className}`}>{children}</div>
}
