'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, type IconName } from '@/components/ui'

const items: Array<{ href: string; label: string; icon: IconName }> = [
  { href: '/dashboard', label: 'Ringkasan', icon: 'grid' },
  { href: '/transactions', label: 'Transaksi', icon: 'wallet' },
  { href: '/categories', label: 'Kategori', icon: 'category' },
  { href: '/budgets', label: 'Anggaran', icon: 'target' },
  { href: '/saving-goals', label: 'Target tabungan', icon: 'flag' },
  { href: '/reports', label: 'Laporan', icon: 'chart' },
  { href: '/profile', label: 'Profil', icon: 'user' },
]

export function AppNav({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const links = isAdmin ? [...items, { href: '/admin-dashboard', label: 'Admin sistem', icon: 'shield' as IconName }] : items
  return <nav className="app-nav" aria-label="Navigasi aplikasi">
    {links.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}><Icon name={item.icon}/><span>{item.label}</span></Link>)}
  </nav>
}
