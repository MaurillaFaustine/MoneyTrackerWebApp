import { ActionForm } from '@/components/action-form'
import { Button, EmptyState, Field, Icon, PageTitle, Panel, StatusPill } from '@/components/ui'
import { deleteGoal, saveGoal } from '@/app/(frontend)/actions/finance'
import { formatMoney, getFinanceData } from '@/lib/finance'

export default async function SavingGoalsPage() {
  const { user, goals } = await getFinanceData()
  const currency = user.currency || 'IDR'
  return <>
    <PageTitle eyebrow="TUJUAN" title="Target tabungan" description="Ubah mimpi besar menjadi progres yang terlihat."/>
    <div className="crud-layout">
      <Panel className="form-panel"><div className="panel-heading"><div><h2>Target baru</h2><p>Tentukan tujuan dan tenggat waktunya.</p></div></div><ActionForm action={saveGoal} className="stack-form"><Field label="Nama target"><input name="name" required maxLength={80} placeholder="Dana darurat"/></Field><Field label="Jumlah target"><input name="targetAmount" type="number" min="1" required placeholder="0"/></Field><Field label="Sudah terkumpul"><input name="currentAmount" type="number" min="0" required defaultValue="0"/></Field><Field label="Tanggal target"><input name="targetDate" type="date" required/></Field><input type="hidden" name="status" value="active"/><Button type="submit"><Icon name="plus" size={17}/> Buat target</Button></ActionForm></Panel>
      <Panel className="list-panel"><div className="panel-heading"><div><h2>Progres tabungan</h2><p>{goals.length} tujuan finansial</p></div></div>{goals.length ? <div className="goal-grid">{goals.map((goal) => {
        const percentage = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
        return <article key={String(goal.id)}><div className="goal-icon"><Icon name="flag"/></div><StatusPill tone={goal.status === 'completed' ? 'income' : goal.status === 'paused' ? 'warning' : 'neutral'}>{goal.status === 'completed' ? 'Selesai' : goal.status === 'paused' ? 'Dijeda' : 'Aktif'}</StatusPill><h3>{goal.name}</h3><strong>{formatMoney(goal.currentAmount, currency)} <small>dari {formatMoney(goal.targetAmount, currency)}</small></strong><progress max="100" value={percentage}/><div className="goal-meta"><span>{percentage.toFixed(0)}% tercapai</span><span>{new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' }).format(new Date(goal.targetDate))}</span></div><details><summary>Perbarui progres</summary><div className="inline-editor"><ActionForm action={saveGoal}><input type="hidden" name="id" value={String(goal.id)}/><input type="hidden" name="name" value={goal.name}/><input type="hidden" name="targetAmount" value={goal.targetAmount}/><input type="hidden" name="targetDate" value={goal.targetDate.slice(0,10)}/><div className="field-row"><Field label="Jumlah terkumpul"><input name="currentAmount" type="number" min="0" defaultValue={goal.currentAmount}/></Field><Field label="Status"><select name="status" defaultValue={goal.status}><option value="active">Aktif</option><option value="paused">Dijeda</option><option value="completed">Selesai</option></select></Field></div><Button type="submit" variant="secondary">Simpan progres</Button></ActionForm><ActionForm action={deleteGoal}><input type="hidden" name="id" value={String(goal.id)}/><Button type="submit" variant="danger">Hapus target</Button></ActionForm></div></details></article>
      })}</div> : <EmptyState icon="flag" title="Belum ada target" description="Mulai dari tujuan kecil dan lihat progresmu tumbuh."/>}</Panel>
    </div>
  </>
}
