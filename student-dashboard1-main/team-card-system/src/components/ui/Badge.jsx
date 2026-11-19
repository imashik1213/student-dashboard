export default function Badge({ type = 'primary', children, className = '' }) {
  const styles = {
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-700',
    primary: 'bg-blue-50 text-blue-700',
  }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[type] || styles.primary} ${className}`}>{children}</span>
}
