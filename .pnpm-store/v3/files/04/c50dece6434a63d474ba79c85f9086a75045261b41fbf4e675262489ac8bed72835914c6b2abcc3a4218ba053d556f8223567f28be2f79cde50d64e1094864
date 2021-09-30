# Preconstruct 🎁

> Dev and build your code painlessly in monorepos

## Key Features

- In dev mode, your code behaves the same as it will in production, including locally linked in monorepos
- Add multiple entrypoints to your packages for publishing
- CLI helps walk you through set-up and making changes to your configs
- Works with different kinds of JS monorepos
- Also works for single package repos!
- Builds your code with rollup

## Getting Started

Assuming you already have a source file at src/index.js (or src/index.ts) or you're using Yarn Workspaces and have packages with src/index.js (or src/index.ts), you can setup Preconstruct like this.

```bash
yarn add --dev @preconstruct/cli
yarn preconstruct init
```

If you're in a monorepo, you should also run `yarn preconstruct dev` and add it to a postinstall script(`"postinstall": "preconstruct dev"`) that runs preconstruct dev so that you can import your code without having to rebuild your project every time in changes.

## Publishing packages

Before you publish packages to npm, run `preconstruct build`. reconstruct will use your Babel config and build flat bundles so make sure to [configure Babel](/guides/configuring-babel) with the transforms you want.

> We strongly recomment making a single script in your package.json that runs both build and publish, to stop broken publishes, such as `"release": "preconstruct build && yarn publish:packages`. If you're in a single-package repo, you could also run `preconstruct build` in a `prepare` or `prepublishOnly` script.

## Further Guides

There are a number of tasks that become easier with preconstruct that lie slightly outside the main workflow. Check out the following guides for setting these up.

- [A more detailed account of getting set up](https://preconstruct.tools/tutorials)
- [Setting up a second entrypoint](https://preconstruct.tools/guides/adding-a-second-entrypoint)
- [CLI command documentation](https://preconstruct.tools/commands)
- [Other configuration](https://preconstruct.tools/configuration)

# See the docs at [preconstruct.tools](https://preconstruct.tools)

# Thanks/Inspiration

- [microbundle](https://github.com/developit/microbundle) was a huge inspiration for this! ❤️
- [rollup](https://rollupjs.org) - rollup has done the really hard stuff that makes preconstruct possible!
- [bolt](https://github.com/boltpkg/bolt) - lots of utils and things in this project were inspired by things in bolt
- [Kye Hohenberger](https://github.com/tkh44) for thinking of the name preconstruct
- Too many awesome people to name at [Thinkmill](https://thinkmill.com.au) who have given so much great feedback to make Preconstruct better and Thinkmill for sponsoring the development of Preconstruct 💝
- all the people who wrote all the dependencies for this project!

# Things that review would be good on

- https://medium.com/@mitchell_hamilton/introducing-preconstruct-26996f23de2a
-
