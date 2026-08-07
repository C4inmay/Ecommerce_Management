import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_100px_rgba(2,6,23,0.34)] backdrop-blur-2xl sm:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          The route you opened does not exist in this frontend skeleton.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
            Back to home
          </Link>
          <Link to="/products" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Browse products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
