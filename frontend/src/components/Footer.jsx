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
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-slate-900 uppercase dark:text-white">Ecom Control</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Operational tools for daily store management.</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            Clean, readable, and designed for teams that need to manage products, customers, and orders quickly.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-[0_4px_12px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)]">
              <PinIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              Remote-first commerce stack
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">Quick Links</h3>
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">Connect</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition duration-200 hover:scale-[1.02] hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_4px_12px_rgba(2,6,23,0.28)] dark:hover:border-slate-700 dark:hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:px-6 lg:px-8">
        © 2026 Ecom Control. Premium frontend skeleton only.
      </div>
    </footer>
  )
}

export default Footer
