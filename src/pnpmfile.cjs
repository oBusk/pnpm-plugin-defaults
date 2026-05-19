module.exports = {
  hooks: {
    updateConfig(config) {
      Object.assign(config, {
        ignoreWorkspaceRootCheck: true,
        minimumReleaseAge: 4320,
        minimumReleaseAgeStrict: true,
        trustPolicy: 'no-downgrade',
        ignorePatchFailures: false,
        optimisticRepeatInstall: true,
        resolutionMode: 'lowest-direct',
        verifyDepsBeforeRun: 'install',
        blockExoticSubdeps: true,
        strictDepBuilds: true,
        dedupePeers: true,
      })
      if (config.hoistPattern?.length === 1 && config.hoistPattern[0] === '*') {
        config.hoistPattern = []
      }
      return config
    },
  },
}
