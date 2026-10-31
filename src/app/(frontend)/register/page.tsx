import { AuthForm } from '@/components/auth-form'
import { Brand } from '@/components/ui'

export default function RegisterPage() {
  return <main className="auth-page"><section className="auth-aside"><Brand/><div><p className="eyebrow">MULAI LEBIH TERARAH</p><h1>Satu tempat untuk<br/>semua tujuanmu.</h1><p>Bangun kebiasaan finansial yang sehat mulai dari hari ini.</p></div><div className="auth-benefits"><span>Tanpa biaya bulanan</span><span>Data keuangan privat</span><span>Siap digunakan dalam satu menit</span></div></section><section className="auth-card"><div><p className="eyebrow">DAFTAR</p><h2>Buat akun MoneyTrack</h2><p>Gratis selamanya untuk memulai.</p><AuthForm mode="register"/></div></section></main>
}
