import { ActionForm } from '@/components/action-form'
import { Button, EmptyState, Field, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { deleteCategory, saveCategory } from '@/app/(frontend)/actions/finance'
import { getFinanceData } from '@/lib/finance'

export default async function CategoriesPage() {
  const { categories } = await getFinanceData()
  return <>
    <PageTitle eyebrow="PENGATURAN" title="Kategori" description="Kelompokkan transaksi agar laporan lebih mudah dipahami."/>
    <div className="crud-layout">
      <Panel className="form-panel"><div className="panel-heading"><div><h2>Kategori baru</h2><p>Buat kelompok pemasukan atau pengeluaran.</p></div></div>
        <ActionForm action={saveCategory} className="stack-form">
          <Field label="Nama kategori"><input name="name" required maxLength={60} placeholder="Contoh: Makanan"/></Field>
          <div className="field-row"><Field label="Tipe"><select name="type" defaultValue="expense"><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></select></Field><Field label="Warna"><select name="color" defaultValue="sage"><option value="sage">Hijau sage</option><option value="violet">Ungu</option><option value="orange">Oranye</option><option value="blue">Biru</option><option value="pink">Merah muda</option></select></Field></div>
          <Button type="submit"><Icon name="plus" size={17}/> Simpan kategori</Button>
        </ActionForm>
      </Panel>
      <Panel className="list-panel"><div className="panel-heading"><div><h2>Daftar kategori</h2><p>{categories.length} kategori tersedia</p></div></div>
        {categories.length ? <div className="editable-list">{categories.map((category) => <details key={String(category.id)}><summary><span className={`category-dot ${category.color}`}/><div><strong>{category.name}</strong><small>{category.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</small></div><StatusPill tone={category.type === 'income' ? 'income' : 'expense'}>{category.type === 'income' ? 'Masuk' : 'Keluar'}</StatusPill><Icon name="chevron"/></summary><div className="inline-editor">
          <ActionForm action={saveCategory}><input type="hidden" name="id" value={String(category.id)}/><div className="field-row"><Field label="Nama"><input name="name" defaultValue={category.name} required/></Field><Field label="Tipe"><select name="type" defaultValue={category.type}><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></select></Field><Field label="Warna"><select name="color" defaultValue={category.color}><option value="sage">Hijau sage</option><option value="violet">Ungu</option><option value="orange">Oranye</option><option value="blue">Biru</option><option value="pink">Merah muda</option></select></Field></div><Button type="submit" variant="secondary"><Icon name="edit" size={15}/> Perbarui</Button></ActionForm>
          <ActionForm action={deleteCategory}><input type="hidden" name="id" value={String(category.id)}/><Button type="submit" variant="danger"><Icon name="trash" size={15}/> Hapus</Button></ActionForm>
        </div></details>)}</div> : <EmptyState icon="category" title="Belum ada kategori" description="Buat kategori pertama untuk mulai mencatat transaksi."/>}
      </Panel>
    </div>
  </>
}
