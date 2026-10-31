'use client'

import { useActionState, useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { ActionState } from '@/app/(frontend)/actions/finance'

export function ActionForm({ action, children, className = '', successText = 'Perubahan tersimpan.' }: {
  action: (state: ActionState, data: FormData) => Promise<ActionState>
  children: ReactNode
  className?: string
  successText?: string
}) {
  const [state, formAction, pending] = useActionState(action, {})
  const router = useRouter()

  useEffect(() => {
    if (state.ok) router.refresh()
  }, [state.ok, router])

  return <form action={formAction} className={className}>
    {children}
    {pending && <p className="form-message">Menyimpan…</p>}
    {state.error && <p className="form-message form-error">{state.error}</p>}
    {state.ok && <p className="form-message form-success">{successText}</p>}
  </form>
}
