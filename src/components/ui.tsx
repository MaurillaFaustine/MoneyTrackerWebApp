import Link from 'next/link'
import type { ReactNode } from 'react'

export type IconName =
  | 'grid' | 'wallet' | 'chart' | 'target' | 'settings' | 'search' | 'bell'
  | 'plus' | 'arrow-up' | 'arrow-down' | 'chevron' | 'dots' | 'calendar'
  | 'card' | 'home' | 'food' | 'car' | 'bag' | 'category' | 'flag' | 'user'
  | 'shield' | 'check' | 'trash' | 'edit' | 'menu'

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  wallet: <><path d="M4 7.5V6a2 2 0 0 1 2-2h12"/><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z"/></>,
  chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5L9 6a8 8 0 0 0-1.7 1L5 6.1l-2 3.4L5 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.4 3h5l.4-3a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5a7 7 0 0 0 .1-1Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  'arrow-up': <path d="m18 15-6-6-6 6"/>,
  'arrow-down': <path d="m6 9 6 6 6-6"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  dots: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18"/></>,
  home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></>,
  food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3v18M17 3c-3 2-3 8 0 10"/></>,
  car: <><path d="m5 17-1 2M19 17l1 2M5 8l2-4h10l2 4"/><rect x="3" y="8" width="18" height="9" rx="3"/></>,
  bag: <><path d="M6 8h12l1 13H5L6 8ZM9 8V6a3 3 0 0 1 6 0v2"/></>,
  category: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></>,
  flag: <><path d="M5 21V4m0 1h11l-2 4 2 4H5"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  shield: <><path d="M12 3 4 6v5c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
  edit: <><path d="m4 20 4-1 11-11-3-3L5 16l-1 4ZM14 7l3 3"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
}

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export function Brand({ href = '/' }: { href?: string }) {
  return <Link href={href} className="brand"><span className="brand-mark"><i/><i/><i/></span><span>MoneyTrack</span></Link>
}

export function Button({ children, href, variant = 'primary', type = 'button', name, value, className = '' }: {
  children: ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; type?: 'button' | 'submit'; name?: string; value?: string; className?: string
}) {
  const classes = `button button-${variant} ${className}`
  if (href) return <Link href={href} className={classes}>{children}</Link>
  return <button type={type} name={name} value={value} className={classes}>{children}</button>
}

export function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-title"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{action}</div>
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>
}

export function EmptyState({ icon, title, description, action }: { icon: IconName; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span><Icon name={icon}/></span><h3>{title}</h3><p>{description}</p>{action}</div>
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'income' | 'expense' | 'warning' }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>
}
