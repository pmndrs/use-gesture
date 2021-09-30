"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.GatsbyWebpackEslintGraphqlSchemaReload = void 0;

var _redux = require("../redux");

var _eslintConfig = require("./eslint-config");

var _localEslintConfigFinder = require("./local-eslint-config-finder");

var _webpackUtils = require("./webpack-utils");

var _eslintWebpackPlugin = _interopRequireDefault(require("eslint-webpack-plugin"));

/**
 * The problem: after GraphQL schema rebuilds, eslint loader keeps validating against
 * the old schema.
 *
 * This plugin replaces options of eslint-plugin-graphql during develop
 */
class GatsbyWebpackEslintGraphqlSchemaReload {
  constructor() {
    this.plugin = {
      name: `GatsbyWebpackEslintGraphqlSchemaReload`
    };
    this.schema = null;
  }

  findEslintOptions(compiler) {
    const plugin = compiler.options.plugins.find(item => item instanceof _eslintWebpackPlugin.default);
    return typeof plugin === `object` ? plugin === null || plugin === void 0 ? void 0 : plugin.options : undefined;
  }

  apply(compiler) {
    compiler.hooks.compile.tap(this.plugin.name, () => {
      const {
        schema,
        program
      } = _redux.store.getState();

      if (!this.schema) {
        // initial build
        this.schema = schema;
        return;
      }

      if (this.schema === schema || (0, _localEslintConfigFinder.hasLocalEslint)(program.directory)) {
        return;
      }

      this.schema = schema; // Original eslint config object from webpack rules

      const options = this.findEslintOptions(compiler);

      if (!options) {
        return;
      } // Hackish but works:
      // replacing original eslint options object with updated config


      Object.assign(options, (0, _eslintConfig.eslintConfig)(schema, (0, _webpackUtils.reactHasJsxRuntime)()));
    });
  }

}

exports.GatsbyWebpackEslintGraphqlSchemaReload = GatsbyWebpackEslintGraphqlSchemaReload;
//# sourceMappingURL=gatsby-webpack-eslint-graphql-schema-reload-plugin.js.map