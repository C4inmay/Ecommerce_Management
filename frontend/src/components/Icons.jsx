const base = 'h-5 w-5 shrink-0'

function SvgIcon({ className = base, children, viewBox = '0 0 24 24' }) {
  return (
    <svg viewBox={viewBox} fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  )
}

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logoMark" x1="6" y1="4" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7dd3fc" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="14" fill="url(#logoMark)" fillOpacity="0.18" />
      <path
        d="M15 16.5h18.5c2.2 0 3.8 2.1 3.2 4.2l-3.2 11.5a4 4 0 0 1-3.8 2.8H18a4 4 0 0 1-3.7-2.5L11 14.5H8"
        stroke="url(#logoMark)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19.5" cy="36" r="2.5" fill="currentColor" className="text-sky-200" />
      <circle cx="31" cy="36" r="2.5" fill="currentColor" className="text-sky-200" />
    </svg>
  )
}

export const MenuIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </SvgIcon>
)

export const XIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </SvgIcon>
)

export const SearchIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="m20 20-4.5-4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const ChevronDownIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const ArrowRightIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const SparklesIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M11 3.5l1.4 4.1L16.5 9l-4.1 1.4L11 14.5 9.6 10.4 5.5 9l4.1-1.4L11 3.5Zm7 8 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const PackageIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const UsersIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M16.5 18.5a4.5 4.5 0 0 0-9 0M16.5 18.5h3.5M7.5 18.5H4m8-8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5 7.5a3.5 3.5 0 0 0-2.1-3.2M17 4.5a3.5 3.5 0 0 1 0 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const ShoppingBagIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M6 7h12l-1 13H7L6 7Zm3-2a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const TruckIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M3 7h11v10H3V7Zm11 3h3l4 4v3h-7v-7ZM7 17.5a1.5 1.5 0 1 0 0 .1Zm12 0a1.5 1.5 0 1 0 0 .1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const ShieldIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 3 5 6.5v5.1c0 4.4 2.8 8.4 7 9.9 4.2-1.5 7-5.5 7-9.9V6.5L12 3Zm-2 9 1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const FilterIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </SvgIcon>
)

export const ClockIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const EyeIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12Zm9.5 2.7a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const EditIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m4 16 9.5-9.5 4 4L8 20H4v-4Zm10.5-10.5 2-2 4 4-2 2-4-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const MoreIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 6.5v.01M12 12v.01M12 17.5v.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </SvgIcon>
)

export const PlusIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </SvgIcon>
)

export const MinusIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </SvgIcon>
)

export const StarIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m12 4 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.5 6.8 20l1-5.8-4.3-4.1 5.9-.9L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </SvgIcon>
)

export const PinIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 21s5-5 5-10a5 5 0 1 0-10 0c0 5 5 10 5 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </SvgIcon>
)

export const LinkIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M10 14a4 4 0 0 1 0-5.7l1.3-1.3a4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7L16 14M14 10a4 4 0 0 1 0 5.7l-1.3 1.3a4 4 0 0 1-5.7 0 4 4 0 0 1 0-5.7L8 10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const GlobeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5 0 4.5-4 4.5-9S14.5 3 12 3 7.5 7 7.5 12 9.5 21 12 21Zm-7.2-6h14.4M4.8 9h14.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const CheckIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const SunIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
  </SvgIcon>
)

export const MoonIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M18 14.2A7.5 7.5 0 1 1 9.8 6a5.5 5.5 0 0 0 8.2 8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </SvgIcon>
)

export const GithubIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M12 2.5A9.5 9.5 0 0 0 8.9 21c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.2-.9-1.2-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.5 2.1 1.1 2.6.9.1-.6.3-1 .6-1.3-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 .9-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7.9.8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.2 2.7-.9 2.7-.9.5 1.4.2 2.4.1 2.6.6.7.9 1.6.9 2.7 0 3.8-2.4 4.7-4.6 4.9.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"
      fill="currentColor"
    />
  </SvgIcon>
)
