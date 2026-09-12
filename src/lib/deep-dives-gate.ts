/*
 * Deep Dives access gate (temporary, until the section has real content).
 *
 * Driven entirely by the DEEP_DIVES_PASSWORD env var:
 *   - set   -> /deep-dives is locked behind a password page (/unlock)
 *   - unset -> the section is fully public
 *
 * Going live later is just removing the env var in Vercel and redeploying; no
 * code change. Enforcement (middleware) reads the var at request time. The
 * nav link, home block, and sitemap read it at build time, so they flip on the
 * next deploy after the var changes.
 *
 * The access cookie stores a SHA-256 of the password (not the password itself),
 * so rotating the password invalidates old cookies. Hashing uses the Web Crypto
 * API, which is available in both the middleware runtime and the Node server
 * runtime, so one implementation works everywhere.
 */

export const GATE_COOKIE = 'dd_access'

const SALT = 'bijilsubhash.io/deep-dives'

/** The configured password, or undefined when the gate is off. */
export function gatePassword(): string | undefined {
  const value = process.env.DEEP_DIVES_PASSWORD
  return value && value.length > 0 ? value : undefined
}

/** True when the section should be locked. */
export function isGateEnabled(): boolean {
  return gatePassword() !== undefined
}

/** SHA-256 hex of the salted password: the value stored in the access cookie. */
export async function accessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${SALT}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

/** The cookie value a valid request must present, or null when the gate is off. */
export async function expectedToken(): Promise<string | null> {
  const password = gatePassword()
  return password ? accessToken(password) : null
}

/**
 * Clamp a post-unlock redirect target to the Deep Dives section so the gate
 * can never be used as an open redirect.
 */
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith('/deep-dives') ? next : '/deep-dives'
}
