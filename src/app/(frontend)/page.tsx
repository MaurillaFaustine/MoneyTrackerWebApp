import { Brand, Button, Icon } from '@/components/ui'

const features = [
  ['wallet', 'Transaksi rapi', 'Catat pemasukan dan pengeluaran dalam hitungan detik.'],
  ['target', 'Anggaran terarah', 'Tetapkan batas belanja dan pantau progres setiap saat.'],
  ['flag', 'Target tabungan', 'Ubah rencana besar menjadi target yang mudah dicapai.'],
  ['chart', 'Laporan bermakna', 'Pahami pola keuangan melalui insight yang jernih.'],
] as const

export default function LandingPage() {
  return <main className="landing">
    <header className="landing-nav">
      <Brand/>
      <nav aria-label="Navigasi utama"><a href="#fitur">Fitur</a><a href="#cara-kerja">Cara kerja</a></nav>
      <div><Button href="/login" variant="ghost">Masuk</Button><Button href="/register">Mulai gratis <Icon name="chevron" size={16}/></Button></div>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <span className="hero-badge"><i/> Keuangan lebih tenang, setiap hari</span>
        <h1>Kendalikan uangmu.<br/><em>Wujudkan tujuanmu.</em></h1>
        <p>MoneyTrack membantu kamu mencatat, merencanakan, dan memahami keuangan pribadi dalam satu ruang yang sederhana.</p>
        <div className="hero-actions"><Button href="/register">Buat akun gratis <Icon name="arrow-up" size={16}/></Button><Button href="#fitur" variant="secondary">Lihat cara kerja</Button></div>
        <div className="hero-proof"><span className="mini-avatars"><i>AN</i><i>RS</i><i>DK</i></span><span><b>2.000+</b> pengguna lebih paham uangnya</span></div>
      </div>
      <div className="hero-visual">
        <div className="preview-card preview-main">
          <div className="preview-top"><span>Saldo bulan ini</span><Icon name="dots"/></div>
          <strong>Rp12.480.000</strong>
          <span className="positive-label"><Icon name="arrow-up" size={13}/> 8,2% dari bulan lalu</span>
          <div className="preview-chart"><span/><span/><span/><span/><span/><span/><span/><span/></div>
          <div className="preview-axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span></div>
        </div>
        <div className="preview-card preview-float">
          <span>Target liburan</span><strong>72%</strong><progress max="100" value="72"/><small>Rp7,2 jt dari Rp10 jt</small>
        </div>
        <div className="preview-card preview-transaction"><span className="preview-icon"><Icon name="check"/></span><div><strong>Transaksi tercatat</strong><small>Kopi pagi · Rp28.000</small></div></div>
      </div>
    </section>

    <section id="fitur" className="feature-section">
      <div className="section-intro"><p className="eyebrow">SEMUA DALAM SATU TEMPAT</p><h2>Lebih dari sekadar catatan pengeluaran</h2><p>Alat yang kamu butuhkan untuk mengambil keputusan finansial dengan percaya diri.</p></div>
      <div className="feature-grid">{features.map(([icon, title, description]) => <article key={title}><span><Icon name={icon}/></span><h3>{title}</h3><p>{description}</p><a href="/register">Pelajari <Icon name="chevron" size={14}/></a></article>)}</div>
    </section>

    <section id="cara-kerja" className="steps-section">
      <div><p className="eyebrow">MULAI DALAM 3 LANGKAH</p><h2>Keuangan tertata tanpa terasa rumit.</h2></div>
      <div className="steps"><article><b>01</b><h3>Buat akunmu</h3><p>Daftar gratis dan atur preferensi mata uang.</p></article><article><b>02</b><h3>Catat aktivitas</h3><p>Masukkan transaksi dan buat batas anggaran.</p></article><article><b>03</b><h3>Lihat progres</h3><p>Dapatkan ringkasan dan laporan yang mudah dibaca.</p></article></div>
    </section>

    <section className="cta-section"><div><p className="eyebrow">MULAI HARI INI</p><h2>Masa depan finansialmu dimulai dari satu catatan kecil.</h2><Button href="/register" variant="secondary">Mulai MoneyTrack gratis <Icon name="chevron" size={16}/></Button></div></section>
    <footer><Brand/><p>Kelola uang dengan tenang.</p><span>© 2025 MoneyTrack</span></footer>
  </main>
}
