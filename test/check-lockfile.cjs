const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const lockfile = readFileSync(join(__dirname, 'pnpm-lock.yaml'), 'utf8')
const settings = lockfile.match(/^settings:\n((?: {2}.+\n)+)/m)?.[1] ?? ''

if (!/^ {2}autoDedupe: true$/m.test(settings)) {
  console.error(
    'Expected the lockfile to record autoDedupe: true in its settings, got:\n' +
      settings,
  )
  process.exit(1)
}
console.log('The lockfile records the resolution settings')
