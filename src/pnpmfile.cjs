module.exports = {
  hooks: {
    updateConfig(config) {
      Object.assign(config, {
        ignoreWorkspaceRootCheck: true,
        minimumReleaseAge: 4320,
        minimumReleaseAgeStrict: true,
        minimumReleaseAgeExcludePrune: true,
        trustPolicy: 'no-downgrade',
        resolutionMode: 'lowest-direct',
        dedupePeers: true,
        autoDedupe: true,
        saveTypes: true,
      })
      if (config.lockfile == null || config.lockfile === true) {
        config.lockfile = {}
      }
      if (
        typeof config.lockfile === 'object' &&
        config.lockfile.includeResolutionSettings !== false
      ) {
        config.lockfile.includeResolutionSettings = true
      }
      if (config.update?.githubActions !== false) {
        config.update = { ...config.update, githubActions: true }
      }
      if (config.hoistPattern?.length === 1 && config.hoistPattern[0] === '*') {
        config.hoistPattern = []
      }
      return config
    },
  },
}
