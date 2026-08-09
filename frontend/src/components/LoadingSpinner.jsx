function LoadingSpinner({ label = 'Loading data' }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
