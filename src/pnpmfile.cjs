module.exports = {
  hooks: {
    updateConfig(config) {
      Object.assign(config, {
        ignorePatchFailures: false,
        resolutionMode: 'lowest-direct',
        verifyDepsBeforeRun: 'install',
      })
      if (config.hoistPattern?.length === 1 && config.hoistPattern[0] === '*') {
        config.hoistPattern = []
      }
      return config
    },
  },
}
