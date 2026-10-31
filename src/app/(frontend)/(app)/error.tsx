'use client'

import { useEffect } from 'react'
import { logoutAction } from '@/app/(frontend)/actions/auth'

export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <div className="route-error"><span>Terjadi kendala</span><h2>Data keuangan belum dapat dimuat.</h2><p>Coba muat ulang halaman. Jika sesi bermasalah, keluar lalu masuk kembali.</p><div><button type="button" className="button button-secondary" onClick={reset}>Coba lagi</button><form action={logoutAction}><button type="submit" className="button button-danger">Keluar dari akun</button></form></div></div>
}
