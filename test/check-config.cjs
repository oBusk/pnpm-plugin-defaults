const { execSync } = require('node:child_process')
const { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } = require(
  'node:fs',
)
const { tmpdir } = require('node:os')
const { join, resolve } = require('node:path')
const assert = require('node:assert/strict')

const root = resolve(__dirname, '..')
const plugin = join(root, 'src', 'pnpmfile.cjs')
const { devEngines } = require(join(root, 'package.json'))

// Keys pnpm leaves out of the config passed to updateConfig when unset. Every
// other key the plugin sets must already be present, which catches misspelled
// or removed settings that pnpm would silently ignore.
const ABSENT_WHEN_UNSET = [
  'minimumReleaseAge',
  'minimumReleaseAgeStrict',
  'lockfile',
  'update',
]

const EXPECTED = {
  ignoreWorkspaceRootCheck: true,
  minimumReleaseAge: 4320,
  minimumReleaseAgeStrict: true,
  minimumReleaseAgeIgnoreMissingTime: false,
  trustPolicy: 'no-downgrade',
  trustPolicyExcludePrune: true,
  catalogPrune: true,
  resolutionMode: 'lowest-direct',
  dedupePeers: true,
  addMissingPeerTypes: true,
  shellEmulator: true,
  autoDedupe: true,
  saveTypes: true,
  lockfile: { includeResolutionSettings: true },
  update: { githubActions: true },
  hoistPattern: [],
}

const fixture = mkdtempSync(join(tmpdir(), 'pnpm-plugin-defaults-'))
const probeOutput = join(fixture, 'probe.json')
const probe = join(fixture, 'probe.cjs')

function writeWorkspace(extra = '') {
  writeFileSync(
    join(fixture, 'pnpm-workspace.yaml'),
    `pnpmfile: ${JSON.stringify(probe)}\nminimumReleaseAge: 0\n${extra}`,
  )
}

function pnpm(args) {
  try {
    return execSync(`pnpm ${args}`, { cwd: fixture, encoding: 'utf8' })
  } catch (err) {
    // pnpm outdated exits non-zero when something is outdated
    if (err.stdout != null) return err.stdout
    throw err
  }
}

try {
  writeFileSync(
    probe,
    `const plugin = require(${JSON.stringify(plugin)})
const { writeFileSync } = require('node:fs')
const snapshot = (config) => JSON.parse(JSON.stringify(config))
module.exports = {
  hooks: {
    updateConfig(config) {
      const before = snapshot(config)
      const after = snapshot(plugin.hooks.updateConfig(config))
      writeFileSync(${JSON.stringify(probeOutput)}, JSON.stringify({ before, after }))
      return config
    },
  },
}
`,
  )
  writeFileSync(
    join(fixture, 'package.json'),
    JSON.stringify({ name: 'fixture', private: true, devEngines }),
  )

  writeWorkspace()
  pnpm('install')
  const { before, after } = JSON.parse(readFileSync(probeOutput, 'utf8'))

  const changed = Object.keys(after).filter(
    (key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]),
  )
  const unknown = changed.filter(
    (key) => !(key in before) && !ABSENT_WHEN_UNSET.includes(key),
  )
  assert.deepEqual(unknown, [], `pnpm doesn't know these settings: ${unknown}`)

  for (const [key, value] of Object.entries(EXPECTED)) {
    assert.deepEqual(after[key], value, `Unexpected value for ${key}`)
  }
  console.log('The plugin sets the expected, known settings')

  mkdirSync(join(fixture, '.github', 'workflows'), { recursive: true })
  writeFileSync(
    join(fixture, '.github', 'workflows', 'ci.yml'),
    'on: push\njobs:\n  a:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n',
  )
  assert.match(
    pnpm('outdated'),
    /actions\/checkout/,
    'Expected pnpm outdated to check GitHub Actions by default',
  )
  writeWorkspace('update:\n  githubActions: false\n')
  assert.doesNotMatch(
    pnpm('outdated'),
    /actions\/checkout/,
    'Expected update.githubActions: false to be respected',
  )
  console.log('update.githubActions defaults to true and respects false')
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
