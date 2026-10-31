import { ActionForm } from '@/components/action-form'
import { Button, EmptyState, Field, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { deleteBudget, saveBudget } from '@/app/(frontend)/actions/finance'
import { formatMoney, getFinanceData } from '@/lib/finance'

export default async function BudgetsPage() {
  const { user, categories, budgets, transactions } = await getFinanceData()
  const expenseCategories = categories.filter((item) => item.type === 'expense')
  const spent = (categoryId: string) => transactions.filter((item) => item.type === 'expense' && String(typeof item.category === 'object' ? item.category.id : item.category) === categoryId).reduce((sum, item) => sum + item.amount, 0)
  return <>
    <PageTitle eyebrow="PERENCANAAN" title="Anggaran" description="Tetapkan batas agar setiap rupiah tetap sesuai rencana."/>
    <div className="crud-layout">
      <Panel className="form-panel"><div className="panel-heading"><div><h2>Anggaran baru</h2><p>Tentukan batas belanja per kategori.</p></div></div>
        {expenseCategories.length ? <ActionForm action={saveBudget} className="stack-form"><Field label="Nama anggaran"><input name="name" required maxLength={80} placeholder="Belanja bulanan"/></Field><Field label="Kategori"><select name="category">{expenseCategories.map((item) => <option key={String(item.id)} value={String(item.id)}>{item.name}</option>)}</select></Field><Field label="Batas anggaran"><input name="amount" type="number" min="1" required placeholder="0"/></Field><div className="field-row"><Field label="Periode"><select name="period" defaultValue="monthly"><option value="monthly">Bulanan</option><option value="yearly">Tahunan</option></select></Field><Field label="Mulai"><input name="startDate" type="date" required defaultValue={new Date().toISOString().slice(0,10)}/></Field></div><Button type="submit"><Icon name="plus" size={17}/> Buat anggaran</Button></ActionForm> : <div className="inline-notice">Buat kategori pengeluaran terlebih dahulu. <Button href="/categories" variant="ghost">Buat kategori</Button></div>}
      </Panel>
      <Panel className="list-panel"><div className="panel-heading"><div><h2>Anggaran berjalan</h2><p>{budgets.length} rencana aktif</p></div></div>
        {budgets.length ? <div className="budget-grid">{budgets.map((budget) => {
          const category = typeof budget.category === 'object' ? budget.category : null
          const used = category ? spent(String(category.id)) : 0
          const percentage = Math.min(100, (used / budget.amount) * 100)
          return <article key={String(budget.id)}><div className="budget-head"><span className="list-icon"><Icon name="target"/></span><div><strong>{budget.name}</strong><small>{category?.name || 'Kategori'} · {budget.period === 'monthly' ? 'Bulanan' : 'Tahunan'}</small></div><StatusPill tone={percentage > 85 ? 'warning' : 'neutral'}>{percentage.toFixed(0)}%</StatusPill></div><progress max="100" value={percentage}/><div className="budget-values"><span>{formatMoney(used, user.currency || 'IDR')} terpakai</span><strong>{formatMoney(budget.amount, user.currency || 'IDR')}</strong></div><details><summary>Kelola</summary><div className="inline-editor"><ActionForm action={saveBudget}><input type="hidden" name="id" value={String(budget.id)}/><Field label="Nama"><input name="name" defaultValue={budget.name}/></Field><div className="field-row"><Field label="Kategori"><select name="category" defaultValue={category ? String(category.id) : ''}>{expenseCategories.map((item) => <option key={String(item.id)} value={String(item.id)}>{item.name}</option>)}</select></Field><Field label="Jumlah"><input name="amount" type="number" defaultValue={budget.amount}/></Field></div><input type="hidden" name="period" value={budget.period}/><input type="hidden" name="startDate" value={budget.startDate.slice(0,10)}/><Button type="submit" variant="secondary">Perbarui</Button></ActionForm><ActionForm action={deleteBudget}><input type="hidden" name="id" value={String(budget.id)}/><Button type="submit" variant="danger">Hapus</Button></ActionForm></div></details></article>
        })}</div> : <EmptyState icon="target" title="Belum ada anggaran" description="Buat batas pertama agar pengeluaran lebih terkendali."/>}
      </Panel>
    </div>
  </>
}
