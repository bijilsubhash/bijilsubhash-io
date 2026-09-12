'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { GATE_COOKIE, gatePassword, accessToken, safeNext } from '@/lib/deep-dives-gate'

export async function unlock(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const next = safeNext(String(formData.get('next') ?? ''))
  const expected = gatePassword()

  // Gate turned off between render and submit: nothing to unlock.
  if (!expected) redirect(next)

  if (password === expected) {
    const cookieStore = await cookies()
    cookieStore.set(GATE_COOKIE, await accessToken(password), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    redirect(next)
  }

  redirect(`/unlock?next=${encodeURIComponent(next)}&error=1`)
}
