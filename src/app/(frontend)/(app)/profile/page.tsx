import { ActionForm } from '@/components/action-form'
import { updateProfile } from '@/app/(frontend)/actions/finance'
import { Button, Field, Icon, PageTitle, Panel } from '@/components/ui'
import { requireUser } from '@/lib/finance'
import { logoutAction } from '@/app/(frontend)/actions/auth'

export default async function ProfilePage() {
  const user = await requireUser()
  return <>
    <PageTitle eyebrow="AKUN" title="Profil & pengaturan" description="Kelola identitas dan preferensi MoneyTrack."/>
    <div className="profile-layout"><Panel className="profile-summary"><div className="profile-big-avatar">{user.name.split(/\s+/).map((part) => part[0]).join('').slice(0,2).toUpperCase()}</div><h2>{user.name}</h2><p>{user.email}</p><span className="member-badge"><Icon name="check" size={14}/> Akun aktif</span></Panel><Panel className="form-panel"><div className="panel-heading"><div><h2>Informasi pribadi</h2><p>Perbarui nama dan mata uang utama.</p></div></div><ActionForm action={updateProfile} className="stack-form"><Field label="Nama lengkap"><input name="name" defaultValue={user.name} required maxLength={80}/></Field><Field label="Email"><input value={user.email} disabled/></Field><Field label="Mata uang"><select name="currency" defaultValue={user.currency || 'IDR'}><option value="IDR">IDR — Rupiah Indonesia</option><option value="USD">USD — Dolar AS</option><option value="SGD">SGD — Dolar Singapura</option></select></Field><Button type="submit">Simpan perubahan</Button></ActionForm><div className="profile-logout"><div><strong>Keluar dari akun</strong><p>Sesi MoneyTrack di perangkat ini akan diakhiri.</p></div><form action={logoutAction}><Button type="submit" variant="danger">Keluar</Button></form></div></Panel></div>
  </>
}
