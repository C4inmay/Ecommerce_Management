import { GithubIcon, GlobeIcon, LinkIcon, LogoMark, PinIcon } from './Icons.jsx'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'Customers', to: '/customers' },
  { label: 'Orders', to: '/orders' },
]

const socials = [
  { label: 'Website', icon: GlobeIcon, href: 'https://example.com' },
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com' },
  { label: 'Portfolio', icon: LinkIcon, href: 'https://www.linkedin.com' },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-slate-950 uppercase dark:text-white">Ecom Control</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">A premium operations surface for modern commerce teams.</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            Designed as a polished frontend skeleton for product merchandising, order oversight, and customer operations.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <PinIcon className="h-4 w-4 text-sky-600 dark:text-sky-300" />
              Remote-first commerce stack
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 dark:text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a className="transition hover:text-slate-950 dark:hover:text-white" href={link.to}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 dark:text-white">Connect</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-sky-400/30 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80 px-4 py-5 text-center text-sm text-slate-500 dark:border-white/10 sm:px-6 lg:px-8">
        © 2026 Ecom Control. Premium frontend skeleton only.
      </div>
    </footer>
  )
}

export default Footer
