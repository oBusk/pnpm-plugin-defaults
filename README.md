# @obusk/pnpm-plugin-defaults

> oBusk defaults for pnpm

## What it changes

- Sets [hoistPattern](https://pnpm.io/settings#hoistpattern) to an empty array, disabling hoisting.
- Sets [ignorePatchFailures](https://pnpm.io/settings#ignorepatchfailures) to `false`.
- Sets [resolutionMode](https://pnpm.io/settings#resolutionmode) to `lowest-direct`.
- Sets [verifyDepsBeforeRun](https://pnpm.io/settings#verifydepsbeforerun) to `install`.

You can extend or override these settings in your own `.pnpmfile.cjs`.

## Installation

```
pnpm add --config @obusk/pnpm-plugin-defaults
```

This will add `@obusk/pnpm-plugin-defaults` to the [configDependencies](https://pnpm.io/config-dependencies) field in your `pnpm-workspace.yaml`.

## License

MIT
