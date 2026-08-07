import { SparklesIcon } from './Icons.jsx'

function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/80 px-8 py-16 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(2,6,23,0.25)]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-200/80 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-300/20">
        <SparklesIcon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export default EmptyState
