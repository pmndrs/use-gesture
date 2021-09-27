'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helperModuleImports = require('@babel/helper-module-imports');

// @ts-ignore

function importHelperPlugin(babel) {
  return {
    pre(file) {
      const cachedHelpers = {};
      const previousHelperGenerator = file.get("helperGenerator");
      file.set("helperGenerator", name => {
        if (previousHelperGenerator) {
          const helperFromPrev = previousHelperGenerator(name);
          if (helperFromPrev != null) return helperFromPrev;
        }

        if (!file.availableHelper(name)) {
          return null;
        }

        if (cachedHelpers[name]) {
          return babel.types.identifier(cachedHelpers[name].name);
        }

        return cachedHelpers[name] = helperModuleImports.addDefault(file.path, `\0rollupPluginBabelHelpers/${name}`, {
          nameHint: name
        });
      });
    }

  };
}

async function transformBabel(code, cwd, filename) {
  const babel = _lazyRequireBabelCore();

  return babel.transformAsync(code, {
    caller: {
      name: "rollup-plugin-babel",
      supportsStaticESM: true,
      supportsDynamicImport: true
    },
    sourceMaps: true,
    cwd,
    filename,
    plugins: [importHelperPlugin]
  }).then(res => {
    return {
      code: res.code,
      map: res.map
    };
  });
}
function transformTerser(code, optionsString) {
  const {
    minify
  } = _lazyRequireTerser();

  const options = JSON.parse(optionsString);
  return minify(code, options);
}

function _lazyRequireBabelCore() {
  var mod = require("@babel/core");

  _lazyRequireBabelCore = function () {
    return mod;
  };

  return mod;
}

function _lazyRequireTerser() {
  var mod = require("terser");

  _lazyRequireTerser = function () {
    return mod;
  };

  return mod;
}

exports.transformBabel = transformBabel;
exports.transformTerser = transformTerser;
