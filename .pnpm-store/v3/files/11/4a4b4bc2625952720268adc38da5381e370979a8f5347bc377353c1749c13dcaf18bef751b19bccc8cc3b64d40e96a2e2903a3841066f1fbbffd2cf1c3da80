# cosmiconfig-toml-loader

A TOML loader for Cosmiconfig

## Installation

```
npm install cosmiconfig-toml-loader
```

## Usage

```typescript
import cosmiconfig from 'cosmiconfig';
import { loadToml } from 'cosmiconfig-toml-loader';

const moduleName = 'myModuleName';
const explorer = cosmiconfig(moduleName, {
  searchPlaces: [
    'package.json',
    `.${moduleName}rc.toml`
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.ts`,
    `.${moduleName}rc.js`,
    `${moduleName}.config.js`,
  ],
  loaders: {
    '.toml': loadToml,
  },
});
```
