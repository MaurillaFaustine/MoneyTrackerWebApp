'use server'

import { getPayloadClient } from '@/lib/payload'
import { requireUser } from '@/lib/finance'

export type ActionState = { ok?: boolean; error?: string }
const colors = ['sage', 'violet', 'orange', 'blue', 'pink']
const types = ['income', 'expense']

const text = (data: FormData, key: string, max = 120) => {
  const value = String(data.get(key) || '').trim()
  return value && value.length <= max ? value : null
}
const amount = (data: FormData, key: string, allowZero = false) => {
  const value = Number(data.get(key))
  return Number.isFinite(value) && (allowZero ? value >= 0 : value > 0) ? value : null
}
const date = (data: FormData, key: string) => {
  const value = String(data.get(key) || '')
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00.000Z`).toISOString() : null
}
const id = (data: FormData) => text(data, 'id', 100)

export async function saveCategory(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const name = text(data, 'name', 60)
  const type = text(data, 'type', 20)
  const color = text(data, 'color', 20)
  if (!name || !type || !types.includes(type) || !color || !colors.includes(color)) return { error: 'Data kategori tidak valid.' }
  const payload = await getPayloadClient()
  const documentId = id(data)
  try {
    if (documentId) await payload.update({ collection: 'categories', id: documentId, data: { name, type: type as 'income' | 'expense', color: color as any }, user, overrideAccess: false })
    else await payload.create({ collection: 'categories', data: { name, type: type as 'income' | 'expense', color: color as any, owner: user.id }, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Kategori gagal disimpan. Periksa data lalu coba lagi.' } }
}

export async function deleteCategory(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const documentId = id(data)
  if (!documentId) return { error: 'Kategori tidak valid.' }
  try {
    await (await getPayloadClient()).delete({ collection: 'categories', id: documentId, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Kategori masih digunakan atau tidak dapat dihapus.' } }
}

export async function saveTransaction(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const description = text(data, 'description')
  const type = text(data, 'type', 20)
  const value = amount(data, 'amount')
  const transactionDate = date(data, 'date')
  const category = text(data, 'category', 100)
  const note = String(data.get('note') || '').trim().slice(0, 400)
  if (!description || !type || !types.includes(type) || !value || !transactionDate || !category) return { error: 'Lengkapi semua data transaksi.' }
  const payload = await getPayloadClient()
  const documentId = id(data)
  const fields = { description, type: type as 'income' | 'expense', amount: value, date: transactionDate, category, note }
  try {
    if (documentId) await payload.update({ collection: 'transactions', id: documentId, data: fields, user, overrideAccess: false })
    else await payload.create({ collection: 'transactions', data: { ...fields, owner: user.id }, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Transaksi gagal disimpan. Pastikan kategori sesuai tipe transaksi.' } }
}

export async function deleteTransaction(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const documentId = id(data)
  if (!documentId) return { error: 'Transaksi tidak valid.' }
  try {
    await (await getPayloadClient()).delete({ collection: 'transactions', id: documentId, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Transaksi gagal dihapus.' } }
}

export async function saveBudget(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const name = text(data, 'name', 80)
  const value = amount(data, 'amount')
  const period = text(data, 'period', 20)
  const startDate = date(data, 'startDate')
  const category = text(data, 'category', 100)
  if (!name || !value || !period || !['monthly', 'yearly'].includes(period) || !startDate || !category) return { error: 'Data anggaran belum lengkap.' }
  const payload = await getPayloadClient()
  const documentId = id(data)
  const fields = { name, amount: value, period: period as 'monthly' | 'yearly', startDate, category }
  try {
    if (documentId) await payload.update({ collection: 'budgets', id: documentId, data: fields, user, overrideAccess: false })
    else await payload.create({ collection: 'budgets', data: { ...fields, owner: user.id }, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Anggaran gagal disimpan. Gunakan kategori pengeluaran.' } }
}

export async function deleteBudget(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const documentId = id(data)
  if (!documentId) return { error: 'Anggaran tidak valid.' }
  try {
    await (await getPayloadClient()).delete({ collection: 'budgets', id: documentId, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Anggaran gagal dihapus.' } }
}

export async function saveGoal(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const name = text(data, 'name', 80)
  const targetAmount = amount(data, 'targetAmount')
  const currentAmount = amount(data, 'currentAmount', true)
  const targetDate = date(data, 'targetDate')
  const status = text(data, 'status', 20)
  if (!name || !targetAmount || currentAmount === null || !targetDate || !status || !['active', 'paused', 'completed'].includes(status)) return { error: 'Data target tabungan belum lengkap.' }
  const payload = await getPayloadClient()
  const documentId = id(data)
  const fields = { name, targetAmount, currentAmount, targetDate, status: status as any }
  try {
    if (documentId) await payload.update({ collection: 'saving-goals', id: documentId, data: fields, user, overrideAccess: false })
    else await payload.create({ collection: 'saving-goals', data: { ...fields, owner: user.id }, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Target tabungan gagal disimpan.' } }
}

export async function deleteGoal(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const documentId = id(data)
  if (!documentId) return { error: 'Target tabungan tidak valid.' }
  try {
    await (await getPayloadClient()).delete({ collection: 'saving-goals', id: documentId, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Target tabungan gagal dihapus.' } }
}

export async function updateProfile(_: ActionState, data: FormData): Promise<ActionState> {
  const user = await requireUser()
  const name = text(data, 'name', 80)
  const currency = text(data, 'currency', 4)
  if (!name || !currency || !['IDR', 'USD', 'SGD'].includes(currency)) return { error: 'Data profil tidak valid.' }
  try {
    await (await getPayloadClient()).update({ collection: 'users', id: user.id, data: { name, currency: currency as any }, user, overrideAccess: false })
    return { ok: true }
  } catch { return { error: 'Profil gagal diperbarui.' } }
}
