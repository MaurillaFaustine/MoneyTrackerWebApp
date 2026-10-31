import { Button, EmptyState, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { formatMoney, getFinanceData, summarizeTransactions } from '@/lib/finance'

export default async function DashboardPage() {
  const { user, transactions, budgets, goals } = await getFinanceData()
  const summary = summarizeTransactions(transactions)
  const currency = user.currency || 'IDR'
  const recent = transactions.slice(0, 5)
  const goalTotal = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)

  return <>
    <PageTitle eyebrow="RINGKASAN" title={`Halo, ${user.name.split(' ')[0]}`} description="Berikut kondisi keuanganmu berdasarkan data terbaru." action={<Button href="/transactions"><Icon name="plus" size={17}/> Tambah transaksi</Button>}/>
    <section className="metric-grid">
      <article className="metric-card featured"><div><span>Saldo bersih</span><Icon name="wallet"/></div><strong>{formatMoney(summary.balance, currency)}</strong><small>Pemasukan dikurangi pengeluaran</small></article>
      <article className="metric-card"><div><span>Total pemasukan</span><span className="metric-icon income"><Icon name="arrow-up"/></span></div><strong>{formatMoney(summary.income, currency)}</strong><small>Dari {transactions.filter((item) => item.type === 'income').length} transaksi</small></article>
      <article className="metric-card"><div><span>Total pengeluaran</span><span className="metric-icon expense"><Icon name="arrow-down"/></span></div><strong>{formatMoney(summary.expenses, currency)}</strong><small>Dari {transactions.filter((item) => item.type === 'expense').length} transaksi</small></article>
      <article className="metric-card"><div><span>Terkumpul di target</span><span className="metric-icon saving"><Icon name="flag"/></span></div><strong>{formatMoney(goalTotal, currency)}</strong><small>{goals.length} target tabungan aktif</small></article>
    </section>

    <section className="dashboard-columns">
      <Panel className="chart-panel">
        <div className="panel-heading"><div><h2>Arus kas</h2><p>Perbandingan pemasukan dan pengeluaran</p></div><StatusPill tone={summary.balance >= 0 ? 'income' : 'expense'}>{summary.savingsRate.toFixed(0)}% tersimpan</StatusPill></div>
        {transactions.length ? <div className="bar-summary"><div><span>Pemasukan</span><progress className="income-progress" max={Math.max(summary.income, summary.expenses, 1)} value={summary.income}/><strong>{formatMoney(summary.income, currency)}</strong></div><div><span>Pengeluaran</span><progress className="expense-progress" max={Math.max(summary.income, summary.expenses, 1)} value={summary.expenses}/><strong>{formatMoney(summary.expenses, currency)}</strong></div></div> : <EmptyState icon="chart" title="Belum ada arus kas" description="Tambahkan transaksi pertama untuk melihat perbandingan keuangan." action={<Button href="/transactions" variant="secondary">Tambah transaksi</Button>}/>}
      </Panel>
      <Panel>
        <div className="panel-heading"><div><h2>Anggaran aktif</h2><p>Batas belanja yang sedang berjalan</p></div><Button href="/budgets" variant="ghost">Lihat semua</Button></div>
        {budgets.length ? <div className="mini-list">{budgets.slice(0, 4).map((budget) => <div key={String(budget.id)}><span className="list-icon"><Icon name="target"/></span><div><strong>{budget.name}</strong><small>{budget.period === 'monthly' ? 'Bulanan' : 'Tahunan'}</small></div><b>{formatMoney(budget.amount, currency)}</b></div>)}</div> : <EmptyState icon="target" title="Belum ada anggaran" description="Buat batas untuk menjaga pengeluaran tetap terarah." action={<Button href="/budgets" variant="secondary">Buat anggaran</Button>}/>}
      </Panel>
    </section>

    <Panel className="table-panel">
      <div className="panel-heading"><div><h2>Transaksi terbaru</h2><p>Aktivitas keuangan terakhir kamu</p></div><Button href="/transactions" variant="ghost">Lihat semua <Icon name="chevron" size={14}/></Button></div>
      {recent.length ? <div className="transaction-list">{recent.map((item) => {
        const category = typeof item.category === 'object' ? item.category.name : 'Kategori'
        return <div key={String(item.id)}><span className={`transaction-symbol ${item.type}`}><Icon name={item.type === 'income' ? 'arrow-up' : 'arrow-down'}/></span><div><strong>{item.description}</strong><small>{category} · {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(new Date(item.date))}</small></div><strong className={item.type}>{item.type === 'income' ? '+' : '−'}{formatMoney(item.amount, currency)}</strong></div>
      })}</div> : <EmptyState icon="wallet" title="Belum ada transaksi" description="Catatan transaksi kamu akan muncul di sini."/>}
    </Panel>
  </>
}
