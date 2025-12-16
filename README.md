# @obusk/pnpm-plugin-defaults

[![NPM Version](https://img.shields.io/npm/v/%40obusk%2Fpnpm-plugin-defaults)](https://www.npmjs.com/package/@obusk/pnpm-plugin-defaults) [![Test](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/test.yml/badge.svg)](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/test.yml) [![Publish Package](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/publish.yml/badge.svg)](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/publish.yml)

> oBusk defaults for pnpm

## What it changes

- Sets ignoreWorkspaceRootCheck to `true`
- Sets [minimumReleaseAge](https://pnpm.io/settings#minimumreleaseage) to `4320` (72 hours)
- Sets [trustPolicy](https://pnpm.io/settings#trustpolicy) to `no-downgrade`
- Sets [hoistPattern](https://pnpm.io/settings#hoistpattern) to an empty array, disabling hoisting.
- Sets [ignorePatchFailures](https://pnpm.io/settings#ignorepatchfailures) to `false`.
- Sets [resolutionMode](https://pnpm.io/settings#resolutionmode) to `lowest-direct`.
- Sets [verifyDepsBeforeRun](https://pnpm.io/settings#verifydepsbeforerun) to `install`.
- Sets [blockExoticSubdeps](https://pnpm.io/settings#blockexoticsubdeps) to `true`.

You can extend or override these settings in your own `.pnpmfile.cjs`.

## Installation

```
pnpm add --config @obusk/pnpm-plugin-defaults
```

This will add `@obusk/pnpm-plugin-defaults` to the [configDependencies](https://pnpm.io/config-dependencies) field in your `pnpm-workspace.yaml`.

## License

MIT
