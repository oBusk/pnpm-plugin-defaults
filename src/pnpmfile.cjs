module.exports = {
  hooks: {
    updateConfig(config) {
      Object.assign(config, {
        ignoreWorkspaceRootCheck: true,
        minimumReleaseAge: 4320,
        trustPolicy: 'no-downgrade',
        ignorePatchFailures: false,
        resolutionMode: 'lowest-direct',
        verifyDepsBeforeRun: 'install',
        blockExoticSubdeps: true,
      })
      if (config.hoistPattern?.length === 1 && config.hoistPattern[0] === '*') {
        config.hoistPattern = []
      }
      return config
    },
  },
}
