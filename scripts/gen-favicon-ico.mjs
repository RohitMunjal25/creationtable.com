/**
 * Writes public/favicon.ico as a standard ICO containing one embedded PNG
 * (no extra dependencies). Browsers and Windows preview handle this format.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pngPath = join(root, 'public', 'favicon.png')
const icoPath = join(root, 'public', 'favicon.ico')

const png = readFileSync(pngPath)
const isPng = png.length >= 8 && png[0] === 0x89 && png[1] === 0x50 && png[2] === 0x4e && png[3] === 0x47
if (!isPng) {
  throw new Error(
    `Expected a real PNG at ${pngPath} (must start with 89 50 4E 47). If your file is JPEG/WebP, convert it to PNG first.`,
  )
}

const width = png.readUInt32BE(16)
const height = png.readUInt32BE(20)
const bWidth = width >= 256 ? 0 : width
const bHeight = height >= 256 ? 0 : height

const idCount = 1
const imageOffset = 6 + idCount * 16

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(idCount, 4)

const entry = Buffer.alloc(16)
entry.writeUInt8(bWidth, 0)
entry.writeUInt8(bHeight, 1)
entry.writeUInt8(0, 2)
entry.writeUInt8(0, 3)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(png.length, 8)
entry.writeUInt32LE(imageOffset, 12)

const out = Buffer.concat([header, entry, png])
writeFileSync(icoPath, out)
console.log('Wrote', icoPath, out.length, 'bytes (PNG', width, 'x', height, ')')
