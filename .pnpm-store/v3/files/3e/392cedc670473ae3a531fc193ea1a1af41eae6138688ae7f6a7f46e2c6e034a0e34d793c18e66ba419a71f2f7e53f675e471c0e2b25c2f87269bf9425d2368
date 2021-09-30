"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.GraphQLRunner = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _graphql = require("graphql");

var _lodash = require("lodash");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _addPageDependency = require("../redux/actions/add-page-dependency");

var _context = _interopRequireDefault(require("../schema/context"));

var _nodeModel = require("../schema/node-model");

var _graphqlSpanTracer = _interopRequireDefault(require("./graphql-span-tracer"));

class GraphQLRunner {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // TODO: convert "../schema/node-model" from Flow
  constructor(store, {
    collectStats,
    graphqlTracing
  } = {}) {
    this.store = store;
    const {
      schema,
      schemaCustomization
    } = this.store.getState();
    this.nodeModel = new _nodeModel.LocalNodeModel({
      schema,
      schemaComposer: schemaCustomization.composer,
      createPageDependency: _addPageDependency.createPageDependency
    });
    this.schema = schema;
    this.parseCache = new Map();
    this.validDocuments = new WeakSet();
    this.scheduleClearCache = (0, _lodash.debounce)(this.clearCache.bind(this), 5000);
    this.graphqlTracing = graphqlTracing || false;

    if (collectStats) {
      this.stats = {
        totalQueries: 0,
        uniqueOperations: new Set(),
        uniqueQueries: new Set(),
        totalRunQuery: 0,
        totalPluralRunQuery: 0,
        totalIndexHits: 0,
        totalSiftHits: 0,
        totalNonSingleFilters: 0,
        comparatorsUsed: new Map(),
        uniqueFilterPaths: new Set(),
        uniqueSorts: new Set()
      };
    } else {
      this.stats = null;
    }
  }

  clearCache() {
    this.parseCache.clear();
    this.validDocuments = new WeakSet();
  }

  parse(query) {
    if (!this.parseCache.has(query)) {
      this.parseCache.set(query, (0, _graphql.parse)(query));
    }

    return this.parseCache.get(query);
  }

  validate(schema, document) {
    let errors = [];
    let warnings = [];

    if (!this.validDocuments.has(document)) {
      errors = (0, _graphql.validate)(schema, document);
      warnings = (0, _graphql.validate)(schema, document, [_graphql.NoDeprecatedCustomRule]);

      if (!errors.length) {
        this.validDocuments.add(document);
      }
    }

    return {
      errors,
      warnings
    };
  }

  getStats() {
    if (this.stats) {
      const comparatorsUsedObj = [];
      this.stats.comparatorsUsed.forEach((value, key) => {
        comparatorsUsedObj.push({
          comparator: key,
          amount: value
        });
      });
      return {
        totalQueries: this.stats.totalQueries,
        uniqueOperations: this.stats.uniqueOperations.size,
        uniqueQueries: this.stats.uniqueQueries.size,
        totalRunQuery: this.stats.totalRunQuery,
        totalPluralRunQuery: this.stats.totalPluralRunQuery,
        totalIndexHits: this.stats.totalIndexHits,
        totalSiftHits: this.stats.totalSiftHits,
        totalNonSingleFilters: this.stats.totalNonSingleFilters,
        comparatorsUsed: comparatorsUsedObj,
        uniqueFilterPaths: this.stats.uniqueFilterPaths.size,
        uniqueSorts: this.stats.uniqueSorts.size
      };
    } else {
      return null;
    }
  }

  async query(query, context, {
    parentSpan,
    queryName,
    componentPath
  }) {
    const {
      schema,
      schemaCustomization
    } = this.store.getState();

    if (this.schema !== schema) {
      this.schema = schema;
      this.clearCache();
    }

    if (this.stats) {
      this.stats.totalQueries++;
      let statsQuery = query;

      if (typeof statsQuery !== `string`) {
        statsQuery = statsQuery.body;
      }

      this.stats.uniqueQueries.add(_crypto.default.createHash(`sha1`).update(statsQuery).digest(`hex`));
    }

    const document = this.parse(query);
    const {
      errors,
      warnings
    } = this.validate(schema, document); // Queries are usually executed in batch. But after the batch is finished
    // cache just wastes memory without much benefits.
    // TODO: consider a better strategy for cache purging/invalidation

    this.scheduleClearCache();

    if (warnings.length > 0) {
      // TODO: move those warnings to the caller side, e.g. query-runner.ts
      warnings.forEach(err => {
        const message = componentPath ? `\nQueried in ${componentPath}` : ``;

        _reporter.default.warn(err.message + message);
      });
    }

    if (errors.length > 0) {
      return {
        errors
      };
    }

    let tracer;

    if (this.graphqlTracing && parentSpan) {
      tracer = new _graphqlSpanTracer.default(`GraphQL Query`, {
        parentSpan,
        tags: {
          queryName: queryName
        }
      });
      tracer.start();
    }

    try {
      // `execute` will return a promise
      return await (0, _graphql.execute)({
        schema,
        document,
        rootValue: context,
        contextValue: (0, _context.default)({
          schema,
          schemaComposer: schemaCustomization.composer,
          context,
          customContext: schemaCustomization.context,
          nodeModel: this.nodeModel,
          stats: this.stats,
          tracer
        }),
        variableValues: context
      });
    } finally {
      if (tracer) {
        tracer.end();
      }
    }
  }

}

exports.GraphQLRunner = GraphQLRunner;
//# sourceMappingURL=graphql-runner.js.map