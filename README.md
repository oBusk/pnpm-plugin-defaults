# @obusk/pnpm-plugin-defaults

[![NPM Version](https://img.shields.io/npm/v/%40obusk%2Fpnpm-plugin-defaults)](https://www.npmjs.com/package/@obusk/pnpm-plugin-defaults) [![Test](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/test.yml/badge.svg)](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/test.yml) [![Publish Package](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/publish.yml/badge.svg)](https://github.com/oBusk/pnpm-plugin-defaults/actions/workflows/publish.yml)

> oBusk defaults for pnpm

## What it changes

- Sets [ignoreWorkspaceRootCheck](https://pnpm.io/settings/cli#ignoreworkspacerootcheck) to `true`
- Sets [minimumReleaseAge](https://pnpm.io/settings/dependency-resolution#minimumreleaseage) to `4320` (72 hours)
- Sets [minimumReleaseAgeStrict](https://pnpm.io/settings/dependency-resolution#minimumreleaseagestrict) to `true`.
- Sets [minimumReleaseAgeExcludePrune](https://pnpm.io/settings/dependency-resolution#minimumreleaseageexcludeprune) to `true`.
- Sets [minimumReleaseAgeIgnoreMissingTime](https://pnpm.io/settings/dependency-resolution#minimumreleaseageignoremissingtime) to `false`.
- Sets [trustPolicy](https://pnpm.io/settings/dependency-resolution#trustpolicy) to `no-downgrade`
- Sets [trustPolicyExcludePrune](https://pnpm.io/settings/dependency-resolution#trustpolicyexcludeprune) to `true`.
- Sets [catalogPrune](https://pnpm.io/settings/other#catalogprune) to `true`.
- Sets [hoistPattern](https://pnpm.io/settings/node-modules#hoistpattern) to an empty array, disabling hoisting.
- Sets [resolutionMode](https://pnpm.io/settings/other#resolutionmode) to `lowest-direct`.
- Sets [addMissingPeerTypes](https://pnpm.io/settings/peer-dependencies#addmissingpeertypes) to `true`.
- Sets [shellEmulator](https://pnpm.io/settings/other#shellemulator) to `true`.
- Sets [dedupePeers](https://pnpm.io/settings/peer-dependencies#dedupepeers) to `true`.
- Sets [autoDedupe](https://pnpm.io/settings/dependency-resolution#autodedupe) to `true`.
- Sets [saveTypes](https://pnpm.io/settings/other#savetypes) to `true`.
- Sets [lockfile.includeResolutionSettings](https://pnpm.io/settings/store#lockfileincluderesolutionsettings) to `true`.
- Sets [update.githubActions](https://pnpm.io/settings/dependency-resolution#updategithubactions) to `true`.

You can extend or override these settings in your own `.pnpmfile.cjs`.

## Installation

```
pnpm add --config @obusk/pnpm-plugin-defaults
```

This will add `@obusk/pnpm-plugin-defaults` to the [configDependencies](https://pnpm.io/config-dependencies) field in your `pnpm-workspace.yaml`.

## License

MIT
