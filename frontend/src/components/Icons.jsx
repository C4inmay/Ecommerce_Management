import {
  ArrowRight,
  Bell,
  ChevronDown,
  Check,
  Clock3,
  Filter,
  Globe,
  Link2,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  Package,
  Pencil,
  Pin,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  SunMedium,
  Truck,
  Users,
  X,
  Eye,
} from 'lucide-react'

const base = 'h-5 w-5 shrink-0'

function mergeClassName(className) {
  return className ? `${base} ${className}` : base
}

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="5" width="38" height="38" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M14 17h20l-2.3 13.2a4 4 0 0 1-4 3.3H18.2a4 4 0 0 1-3.9-3.1L12 11h-3" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19.5" cy="35" r="2.2" fill="#2563EB" />
      <circle cx="29.5" cy="35" r="2.2" fill="#2563EB" />
    </svg>
  )
}

export const MenuIcon = (props) => (
  <Menu className={mergeClassName(props.className)} aria-hidden="true" />
)

export const XIcon = (props) => (
  <X className={mergeClassName(props.className)} aria-hidden="true" />
)

export const SearchIcon = (props) => (
  <Search className={mergeClassName(props.className)} aria-hidden="true" />
)

export const ChevronDownIcon = (props) => (
  <ChevronDown className={mergeClassName(props.className)} aria-hidden="true" />
)

export const ArrowRightIcon = (props) => (
  <ArrowRight className={mergeClassName(props.className)} aria-hidden="true" />
)

export const SparklesIcon = (props) => (
  <Sparkles className={mergeClassName(props.className)} aria-hidden="true" />
)

export const PackageIcon = (props) => (
  <Package className={mergeClassName(props.className)} aria-hidden="true" />
)

export const UsersIcon = (props) => (
  <Users className={mergeClassName(props.className)} aria-hidden="true" />
)

export const ShoppingBagIcon = (props) => (
  <ShoppingBag className={mergeClassName(props.className)} aria-hidden="true" />
)

export const TruckIcon = (props) => (
  <Truck className={mergeClassName(props.className)} aria-hidden="true" />
)

export const ShieldIcon = (props) => (
  <ShieldCheck className={mergeClassName(props.className)} aria-hidden="true" />
)

export const FilterIcon = (props) => (
  <Filter className={mergeClassName(props.className)} aria-hidden="true" />
)

export const ClockIcon = (props) => (
  <Clock3 className={mergeClassName(props.className)} aria-hidden="true" />
)

export const EyeIcon = (props) => (
  <Eye className={mergeClassName(props.className)} aria-hidden="true" />
)

export const EditIcon = (props) => (
  <Pencil className={mergeClassName(props.className)} aria-hidden="true" />
)

export const MoreIcon = (props) => (
  <MoreHorizontal className={mergeClassName(props.className)} aria-hidden="true" />
)

export const PlusIcon = (props) => (
  <Plus className={mergeClassName(props.className)} aria-hidden="true" />
)

export const MinusIcon = (props) => (
  <Minus className={mergeClassName(props.className)} aria-hidden="true" />
)

export const StarIcon = (props) => (
  <Star className={mergeClassName(props.className)} aria-hidden="true" />
)

export const PinIcon = (props) => (
  <Pin className={mergeClassName(props.className)} aria-hidden="true" />
)

export const LinkIcon = (props) => (
  <Link2 className={mergeClassName(props.className)} aria-hidden="true" />
)

export const GlobeIcon = (props) => (
  <Globe className={mergeClassName(props.className)} aria-hidden="true" />
)

export const CheckIcon = (props) => (
  <Check className={mergeClassName(props.className)} aria-hidden="true" />
)

export const BellIcon = (props) => (
  <Bell className={mergeClassName(props.className)} aria-hidden="true" />
)

export const SunIcon = (props) => (
  <SunMedium className={mergeClassName(props.className)} aria-hidden="true" />
)

export const MoonIcon = (props) => (
  <Moon className={mergeClassName(props.className)} aria-hidden="true" />
)

export const GithubIcon = (props) => (
  <Globe className={mergeClassName(props.className)} aria-hidden="true" />
)
