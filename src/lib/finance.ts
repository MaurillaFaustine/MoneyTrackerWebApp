import 'server-only'

import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'
import { redirect } from 'next/navigation'

export async function requireUser() {
  const user = await appAuth.currentUser()
  if (!user) redirect('/login')
  return user
}

export async function getFinanceData() {
  const user = await requireUser()
  const payload = await getPayloadClient()
  const [categories, transactions, budgets, goals] = await Promise.all([
    payload.find({ collection: 'categories', user, overrideAccess: false, limit: 100, sort: 'name' }),
    payload.find({ collection: 'transactions', user, overrideAccess: false, limit: 100, sort: '-date', depth: 1 }),
    payload.find({ collection: 'budgets', user, overrideAccess: false, limit: 100, sort: '-startDate', depth: 1 }),
    payload.find({ collection: 'saving-goals', user, overrideAccess: false, limit: 100, sort: 'targetDate' }),
  ])

  return {
    user,
    categories: categories.docs,
    transactions: transactions.docs,
    budgets: budgets.docs,
    goals: goals.docs,
  }
}

export function summarizeTransactions(transactions: Array<{ type: string; amount: number }>) {
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expenses = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  return { income, expenses, balance: income - expenses, savingsRate: income ? Math.max(0, ((income - expenses) / income) * 100) : 0 }
}

export function formatMoney(value: number, currency = 'IDR') {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
