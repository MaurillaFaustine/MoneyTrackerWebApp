import 'server-only'

import config from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload, JWTAuthentication } from 'payload'
import type { User } from '@/payload-types'

const SESSION_COOKIE = 'app-session'

async function payloadClient() {
  return getPayload({ config: await config })
}

export function createAppAuth(collection: 'users') {
  return {
    async currentUser(): Promise<(User & { collection: 'users' }) | null> {
      const token = (await cookies()).get(SESSION_COOKIE)?.value
      if (!token) return null

      const payload = await payloadClient()
      const authHeaders = new Headers({ Authorization: `JWT ${token}` })
      // Invoke Payload's local JWT verifier directly so Figma Admin strategies
      // cannot consume the isolated app token first.
      const { user } = await JWTAuthentication({
        headers: authHeaders,
        payload,
        strategyName: 'moneytrack-app-jwt',
      })
      if (!user || user.collection !== collection) return null
      return user as User & { collection: 'users' }
    },

    async login(email: string, password: string) {
      const payload = await payloadClient()
      const result = await payload.login({
        collection,
        data: { email, password },
        overrideAccess: false,
      })
      if (!result.token || !result.user) throw new Error('Email atau kata sandi tidak valid.')
      await this.setSession(result.token, result.exp)
      return result.user
    },

    async register(name: string, email: string, password: string) {
      const payload = await payloadClient()
      await payload.create({
        collection,
        data: { name, email, password, role: 'user', currency: 'IDR' },
        draft: false,
        overrideAccess: false,
      })
      return this.login(email, password)
    },

    async setSession(token: string, exp?: number) {
      const store = await cookies()
      store.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: exp ? new Date(exp * 1000) : undefined,
      })
    },

    async logout() {
      const store = await cookies()
      store.delete(SESSION_COOKIE)
    },
  }
}

export const appAuth = createAppAuth('users')
