import { AuthForm } from '@/components/auth-form'
import { Brand } from '@/components/ui'

export default function LoginPage() {
  return <main className="auth-page"><section className="auth-aside"><Brand/><div><p className="eyebrow">SELAMAT DATANG KEMBALI</p><h1>Uangmu, ceritamu.<br/>Lanjutkan progresmu.</h1><p>Pantau setiap langkah kecil yang membawamu lebih dekat ke tujuan finansial.</p></div><blockquote>“Sejak pakai MoneyTrack, saya akhirnya tahu ke mana uang saya pergi setiap bulan.”<footer>Rani, pengguna MoneyTrack</footer></blockquote></section><section className="auth-card"><div><p className="eyebrow">MASUK</p><h2>Masuk ke MoneyTrack</h2><p>Gunakan akun yang sudah terdaftar.</p><AuthForm mode="login"/></div></section></main>
}
