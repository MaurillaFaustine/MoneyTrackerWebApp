import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { AppNav } from '@/components/app-nav'
import { Brand, Button, Icon } from '@/components/ui'
import { logoutAction } from '@/app/(frontend)/actions/auth'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await appAuth.currentUser()
  if (!user) redirect('/login')
  const initials = user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return <div className="app-shell">
    <aside className="sidebar">
      <Brand href="/dashboard"/>
      <AppNav isAdmin={user.role === 'admin'}/>
      <div className="sidebar-spacer"/>
      <div className="sidebar-note"><span><Icon name="shield"/></span><strong>Data kamu terlindungi</strong><p>Hanya kamu yang dapat melihat catatan keuanganmu.</p></div>
      <div className="sidebar-profile"><span className="avatar">{initials}</span><div><strong>{user.name}</strong><small>{user.email}</small></div><form action={logoutAction}><Button type="submit" variant="ghost">Keluar</Button></form></div>
    </aside>
    <div className="app-main">
      <header className="app-header"><div className="mobile-logo"><Brand href="/dashboard"/></div><div className="app-search"><Icon name="search"/><span>Cari transaksi, kategori, atau laporan…</span></div><div className="header-profile"><span className="avatar">{initials}</span><span>{user.name}</span></div></header>
      <main className="app-content">{children}</main>
    </div>
    <div className="mobile-app-nav"><AppNav isAdmin={false}/></div>
  </div>
}
