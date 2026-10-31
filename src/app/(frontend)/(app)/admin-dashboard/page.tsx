import { redirect } from 'next/navigation'
import { Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { requireUser } from '@/lib/finance'
import { getPayloadClient } from '@/lib/payload'

export default async function AdminDashboardPage() {
  const user = await requireUser()
  if (user.role !== 'admin') redirect('/dashboard')
  const payload = await getPayloadClient()
  const [users, transactions, categories, budgets, goals] = await Promise.all([
    payload.count({ collection: 'users', user, overrideAccess: false }),
    payload.count({ collection: 'transactions', user, overrideAccess: false }),
    payload.count({ collection: 'categories', user, overrideAccess: false }),
    payload.count({ collection: 'budgets', user, overrideAccess: false }),
    payload.count({ collection: 'saving-goals', user, overrideAccess: false }),
  ])
  const stats = [
    ['user', 'Pengguna aplikasi', users.totalDocs],
    ['wallet', 'Total transaksi', transactions.totalDocs],
    ['category', 'Kategori dibuat', categories.totalDocs],
    ['target', 'Anggaran aktif', budgets.totalDocs],
    ['flag', 'Target tabungan', goals.totalDocs],
  ] as const
  return <>
    <PageTitle eyebrow="ADMIN SISTEM" title="Dashboard admin" description="Pantau penggunaan dan kesehatan sistem MoneyTrack."/>
    <section className="admin-stats">{stats.map(([icon, label, value]) => <Panel key={label}><span className="list-icon"><Icon name={icon}/></span><div><small>{label}</small><strong>{value}</strong></div></Panel>)}</section>
    <section className="dashboard-columns"><Panel><div className="panel-heading"><div><h2>Status sistem</h2><p>Layanan inti MoneyTrack</p></div><StatusPill tone="income">Operasional</StatusPill></div><div className="system-list"><div><span><i/>Database Payload</span><strong>Terhubung</strong></div><div><span><i/>Autentikasi aplikasi</span><strong>Aktif</strong></div><div><span><i/>Aturan kepemilikan data</span><strong>Terlindungi</strong></div></div></Panel><Panel><div className="panel-heading"><div><h2>Akses pengelolaan</h2><p>Kontrol terpisah untuk data CMS</p></div></div><div className="admin-notice"><Icon name="shield"/><div><strong>Payload Admin tetap terpisah</strong><p>Gunakan panel `/admin` untuk pekerjaan CMS. Pengguna MoneyTrack tidak mendapat akses ke panel tersebut.</p></div></div></Panel></section>
  </>
}
