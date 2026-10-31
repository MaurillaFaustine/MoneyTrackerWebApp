import { ActionForm } from '@/components/action-form'
import { Button, EmptyState, Field, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { deleteTransaction, saveTransaction } from '@/app/(frontend)/actions/finance'
import { formatMoney, getFinanceData } from '@/lib/finance'

export default async function TransactionsPage() {
  const { user, categories, transactions } = await getFinanceData()
  const currency = user.currency || 'IDR'
  return <>
    <PageTitle eyebrow="AKTIVITAS" title="Transaksi" description="Catat dan kelola setiap arus uang dengan rapi."/>
    <Panel className="form-panel wide-form"><div className="panel-heading"><div><h2>Tambah transaksi</h2><p>Masukkan detail aktivitas keuangan terbaru.</p></div></div>
      {categories.length ? <ActionForm action={saveTransaction} className="transaction-form">
        <Field label="Deskripsi"><input name="description" required maxLength={120} placeholder="Contoh: Belanja mingguan"/></Field>
        <Field label="Jumlah"><input name="amount" type="number" min="1" required placeholder="0"/></Field>
        <Field label="Tipe"><select name="type" defaultValue="expense"><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></select></Field>
        <Field label="Kategori"><select name="category" required defaultValue=""><option value="" disabled>Pilih kategori</option>{categories.map((category) => <option key={String(category.id)} value={String(category.id)}>{category.name} · {category.type === 'income' ? 'Masuk' : 'Keluar'}</option>)}</select></Field>
        <Field label="Tanggal"><input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)}/></Field>
        <Button type="submit"><Icon name="plus" size={17}/> Tambahkan</Button>
      </ActionForm> : <div className="inline-notice">Buat minimal satu kategori sebelum menambahkan transaksi. <Button href="/categories" variant="ghost">Buat kategori</Button></div>}
    </Panel>
    <Panel className="list-panel"><div className="panel-heading"><div><h2>Semua transaksi</h2><p>{transactions.length} catatan keuangan</p></div></div>
      {transactions.length ? <div className="editable-list transactions-editable">{transactions.map((item) => {
        const category = typeof item.category === 'object' ? item.category : null
        return <details key={String(item.id)}><summary><span className={`transaction-symbol ${item.type}`}><Icon name={item.type === 'income' ? 'arrow-up' : 'arrow-down'}/></span><div><strong>{item.description}</strong><small>{category?.name || 'Kategori'} · {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(item.date))}</small></div><strong className={item.type}>{item.type === 'income' ? '+' : '−'}{formatMoney(item.amount, currency)}</strong><Icon name="chevron"/></summary><div className="inline-editor">
          <ActionForm action={saveTransaction}><input type="hidden" name="id" value={String(item.id)}/><div className="field-grid"><Field label="Deskripsi"><input name="description" defaultValue={item.description} required/></Field><Field label="Jumlah"><input name="amount" type="number" min="1" defaultValue={item.amount} required/></Field><Field label="Tipe"><select name="type" defaultValue={item.type}><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></select></Field><Field label="Kategori"><select name="category" defaultValue={category ? String(category.id) : ''}>{categories.map((cat) => <option key={String(cat.id)} value={String(cat.id)}>{cat.name}</option>)}</select></Field><Field label="Tanggal"><input name="date" type="date" defaultValue={item.date.slice(0,10)} required/></Field></div><Button type="submit" variant="secondary">Simpan perubahan</Button></ActionForm>
          <ActionForm action={deleteTransaction}><input type="hidden" name="id" value={String(item.id)}/><Button type="submit" variant="danger"><Icon name="trash" size={15}/> Hapus</Button></ActionForm>
        </div></details>
      })}</div> : <EmptyState icon="wallet" title="Belum ada transaksi" description="Tambahkan transaksi pertama melalui formulir di atas."/>}
    </Panel>
  </>
}
