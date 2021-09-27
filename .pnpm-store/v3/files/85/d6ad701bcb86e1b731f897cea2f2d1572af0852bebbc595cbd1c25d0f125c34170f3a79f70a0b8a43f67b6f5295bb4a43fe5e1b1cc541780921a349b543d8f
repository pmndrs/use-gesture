"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var helperModuleImports = require("@babel/helper-module-imports");

function importHelperPlugin(babel) {
  return {
    pre(file) {
      const cachedHelpers = {}, previousHelperGenerator = file.get("helperGenerator");
      file.set("helperGenerator", name => {
        if (previousHelperGenerator) {
          const helperFromPrev = previousHelperGenerator(name);
          if (null != helperFromPrev) return helperFromPrev;
        }
        return file.availableHelper(name) ? cachedHelpers[name] ? babel.types.identifier(cachedHelpers[name].name) : cachedHelpers[name] = helperModuleImports.addDefault(file.path, `\0rollupPluginBabelHelpers/${name}`, {
          nameHint: name
        }) : null;
      });
    }
  };
}

async function transformBabel(code, cwd, filename) {
  return _lazyRequireBabelCore().transformAsync(code, {
    caller: {
      name: "rollup-plugin-babel",
      supportsStaticESM: !0,
      supportsDynamicImport: !0
    },
    sourceMaps: !0,
    cwd: cwd,
    filename: filename,
    plugins: [ importHelperPlugin ]
  }).then(res => ({
    code: res.code,
    map: res.map
  }));
}

function transformTerser(code, optionsString) {
  const {minify: minify} = _lazyRequireTerser();
  return minify(code, JSON.parse(optionsString));
}

function _lazyRequireBabelCore() {
  var mod = require("@babel/core");
  return _lazyRequireBabelCore = function() {
    return mod;
  }, mod;
}

function _lazyRequireTerser() {
  var mod = require("terser");
  return _lazyRequireTerser = function() {
    return mod;
  }, mod;
}

exports.transformBabel = transformBabel, exports.transformTerser = transformTerser;
