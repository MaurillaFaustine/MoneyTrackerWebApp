'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction, registerAction, type AuthState } from '@/app/(frontend)/actions/auth'
import { Button, Field } from '@/components/ui'

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const action = mode === 'login' ? loginAction : registerAction
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {})

  return <form action={formAction} className="auth-form">
    {mode === 'register' && <Field label="Nama lengkap"><input name="name" required minLength={2} maxLength={80} placeholder="Nama Anda"/></Field>}
    <Field label="Alamat email"><input name="email" type="email" autoComplete="email" required placeholder="nama@email.com"/></Field>
    <Field label="Kata sandi"><input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={8} placeholder="Minimal 8 karakter"/></Field>
    {state.error && <p className="form-message form-error">{state.error}</p>}
    <Button type="submit" className="full-button">{pending ? 'Memproses…' : mode === 'login' ? 'Masuk ke akun' : 'Buat akun gratis'}</Button>
    <p className="auth-switch">{mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'} <Link href={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Daftar sekarang' : 'Masuk'}</Link></p>
  </form>
}
