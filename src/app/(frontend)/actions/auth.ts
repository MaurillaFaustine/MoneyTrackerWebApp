'use server'

import { appAuth } from '@/lib/app-auth'
import { redirect } from 'next/navigation'

export type AuthState = { error?: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  if (!emailPattern.test(email) || password.length < 8) {
    return { error: 'Masukkan email yang valid dan kata sandi minimal 8 karakter.' }
  }
  try {
    await appAuth.login(email, password)
  } catch {
    return { error: 'Email atau kata sandi tidak sesuai.' }
  }
  redirect('/dashboard')
}

export async function registerAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  if (name.length < 2 || name.length > 80) return { error: 'Nama harus terdiri dari 2–80 karakter.' }
  if (!emailPattern.test(email)) return { error: 'Masukkan alamat email yang valid.' }
  if (password.length < 8) return { error: 'Kata sandi minimal 8 karakter.' }
  try {
    await appAuth.register(name, email, password)
  } catch {
    return { error: 'Akun tidak dapat dibuat. Email mungkin sudah terdaftar.' }
  }
  redirect('/dashboard')
}

export async function logoutAction() {
  await appAuth.logout()
  redirect('/')
}
