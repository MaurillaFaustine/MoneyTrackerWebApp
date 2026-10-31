import { EmptyState, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { formatMoney, getFinanceData, summarizeTransactions } from '@/lib/finance'

export default async function ReportsPage() {
  const { user, transactions, categories } = await getFinanceData()
  const summary = summarizeTransactions(transactions)
  const currency = user.currency || 'IDR'
  const categoryTotals = categories.map((category) => ({
    ...category,
    total: transactions.filter((item) => item.type === 'expense' && String(typeof item.category === 'object' ? item.category.id : item.category) === String(category.id)).reduce((sum, item) => sum + item.amount, 0),
  })).filter((item) => item.total > 0).sort((a, b) => b.total - a.total)

  return <>
    <PageTitle eyebrow="ANALISIS" title="Laporan keuangan" description="Temukan pola di balik pemasukan dan pengeluaranmu."/>
    <section className="report-summary"><Panel><span>Pemasukan</span><strong>{formatMoney(summary.income, currency)}</strong><StatusPill tone="income"><Icon name="arrow-up" size={13}/> Arus masuk</StatusPill></Panel><Panel><span>Pengeluaran</span><strong>{formatMoney(summary.expenses, currency)}</strong><StatusPill tone="expense"><Icon name="arrow-down" size={13}/> Arus keluar</StatusPill></Panel><Panel><span>Rasio tabungan</span><strong>{summary.savingsRate.toFixed(1)}%</strong><StatusPill tone={summary.savingsRate > 20 ? 'income' : 'warning'}>{summary.savingsRate > 20 ? 'Sehat' : 'Perlu perhatian'}</StatusPill></Panel></section>
    <section className="dashboard-columns"><Panel><div className="panel-heading"><div><h2>Pengeluaran per kategori</h2><p>Distribusi seluruh catatan pengeluaran</p></div></div>{categoryTotals.length ? <div className="report-bars">{categoryTotals.map((item) => <div key={String(item.id)}><div><span><i className={`category-dot ${item.color}`}/>{item.name}</span><strong>{formatMoney(item.total, currency)}</strong></div><progress max={summary.expenses || 1} value={item.total}/></div>)}</div> : <EmptyState icon="chart" title="Belum ada data laporan" description="Catat pengeluaran untuk melihat distribusi kategori."/>}</Panel><Panel><div className="panel-heading"><div><h2>Kesehatan arus kas</h2><p>Ringkasan sederhana kondisi saat ini</p></div></div><div className="health-score"><div><strong>{summary.income ? Math.max(0, Math.min(100, Math.round(summary.savingsRate + 60))) : 0}</strong><span>Skor</span></div><h3>{summary.balance >= 0 ? 'Arus kas positif' : 'Pengeluaran melebihi pemasukan'}</h3><p>{summary.balance >= 0 ? 'Pertahankan ritme dan alokasikan sisa dana ke target tabungan.' : 'Tinjau kategori terbesar dan sesuaikan anggaran bulan depan.'}</p></div></Panel></section>
  </>
}
