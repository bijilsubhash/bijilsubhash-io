import fs from 'node:fs'
import path from 'node:path'

/**
 * Reads intrinsic width/height for a local PNG or GIF in /public, so next/image
 * gets true dimensions and content images never distort. Falls back to 16:9.
 * (PNG and GIF are the only raster formats used in content.)
 */
export function getImageDimensions(src: string): { width: number; height: number } {
  const fallback = { width: 1280, height: 720 }
  if (!src.startsWith('/')) return fallback
  const file = path.join(process.cwd(), 'public', src.replace(/^\//, ''))
  try {
    const fd = fs.openSync(file, 'r')
    const buf = Buffer.alloc(32)
    fs.readSync(fd, buf, 0, 32, 0)
    fs.closeSync(fd)

    // PNG: signature 0x89 0x50 ... IHDR width@16, height@20 (big-endian)
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
    }
    // GIF: "GIF8" then width@6, height@8 (little-endian)
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) {
      return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }
    }
  } catch {
    /* fall through */
  }
  return fallback
}
