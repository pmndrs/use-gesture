"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPaths;

function getPaths(context) {
  const {
    stats,
    options
  } = context;
  const childStats = stats.stats ? stats.stats : [stats];
  const publicPaths = [];

  for (const {
    compilation
  } of childStats) {
    // The `output.path` is always present and always absolute
    const outputPath = compilation.getPath(compilation.outputOptions.path);
    const publicPath = options.publicPath ? compilation.getPath(options.publicPath) : compilation.outputOptions.publicPath ? compilation.getPath(compilation.outputOptions.publicPath) : "";
    publicPaths.push({
      outputPath,
      publicPath
    });
  }

  return publicPaths;
}