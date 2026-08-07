function LoadingSpinner({ label = 'Loading data' }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-8 text-sm text-slate-600 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-[0_20px_60px_rgba(2,6,23,0.24)]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500 dark:border-slate-600 dark:border-t-sky-300" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
