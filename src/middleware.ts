import { NextResponse, type NextRequest } from 'next/server'
import { GATE_COOKIE, isGateEnabled, expectedToken } from '@/lib/deep-dives-gate'

/**
 * Locks /deep-dives behind the password page when DEEP_DIVES_PASSWORD is set.
 * When it is unset the section is public and this is a no-op. See
 * src/lib/deep-dives-gate.ts.
 */
export async function middleware(request: NextRequest) {
  if (!isGateEnabled()) return NextResponse.next()

  const token = request.cookies.get(GATE_COOKIE)?.value
  const expected = await expectedToken()
  if (token && expected && token === expected) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/unlock'
  url.search = ''
  url.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/deep-dives', '/deep-dives/:path*'],
}
