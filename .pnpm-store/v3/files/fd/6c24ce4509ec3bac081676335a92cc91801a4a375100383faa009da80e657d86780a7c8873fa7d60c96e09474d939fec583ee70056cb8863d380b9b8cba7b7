"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.findOne = findOne;
exports.findManyPaginated = findManyPaginated;
exports.paginate = paginate;
exports.link = link;
exports.fileByPath = fileByPath;
exports.wrappingResolver = wrappingResolver;
exports.defaultResolver = exports.defaultFieldResolver = exports.group = exports.sum = exports.max = exports.min = exports.distinct = void 0;

var _path = _interopRequireDefault(require("path"));

var _normalizePath = _interopRequireDefault(require("normalize-path"));

var _graphql = require("graphql");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _utils = require("../query/utils");

var _getValueAt = require("../utils/get-value-at");

var _iterable = require("../datastore/common/iterable");

function findOne(typeName) {
  return function findOneResolver(_source, args, context, info) {
    if (context.stats) {
      context.stats.totalRunQuery++;
    }

    return context.nodeModel.runQuery({
      query: {
        filter: args
      },
      firstOnly: true,
      type: info.schema.getType(typeName),
      stats: context.stats,
      tracer: context.tracer
    }, {
      path: context.path
    });
  };
}

function findManyPaginated(typeName) {
  return async function findManyPaginatedResolver(_source, args, context, info) {
    // Peek into selection set and pass on the `field` arg of `group` and
    // `distinct` which might need to be resolved.
    const group = getProjectedField(info, `group`);
    const distinct = getProjectedField(info, `distinct`);
    const max = getProjectedField(info, `max`);
    const min = getProjectedField(info, `min`);
    const sum = getProjectedField(info, `sum`); // Apply paddings for pagination
    // (for previous/next node and also to detect if there is a previous/next page)

    const skip = typeof args.skip === `number` ? Math.max(0, args.skip - 1) : 0;
    const limit = typeof args.limit === `number` ? args.limit + 2 : undefined;
    const extendedArgs = { ...args,
      group: group || [],
      distinct: distinct || [],
      max: max || [],
      min: min || [],
      sum: sum || [],
      skip,
      limit
    }; // Note: stats are passed to telemetry in src/commands/build.ts

    if (context.stats) {
      context.stats.totalRunQuery++;
      context.stats.totalPluralRunQuery++;
    }

    const result = await context.nodeModel.findAll({
      query: extendedArgs,
      type: info.schema.getType(typeName),
      stats: context.stats,
      tracer: context.tracer
    }, {
      path: context.path,
      connectionType: typeName
    });
    return paginate(result, {
      resultOffset: skip,
      skip: args.skip,
      limit: args.limit
    });
  };
}

const distinct = function distinctResolver(source, args) {
  const {
    field
  } = args;
  const {
    edges
  } = source;
  const values = new Set();
  edges.forEach(({
    node
  }) => {
    const value = (0, _getValueAt.getValueAt)(node, `__gatsby_resolved.${field}`) || (0, _getValueAt.getValueAt)(node, field);

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(subValue => values.add(subValue instanceof Date ? subValue.toISOString() : subValue));
    } else if (value instanceof Date) {
      values.add(value.toISOString());
    } else {
      values.add(value);
    }
  });
  return Array.from(values).sort();
};

exports.distinct = distinct;

const min = function minResolver(source, args) {
  const {
    field
  } = args;
  const {
    edges
  } = source;
  let min = Number.MAX_SAFE_INTEGER;
  edges.forEach(({
    node
  }) => {
    let value = (0, _getValueAt.getValueAt)(node, `__gatsby_resolved.${field}`) || (0, _getValueAt.getValueAt)(node, field);

    if (typeof value !== `number`) {
      value = Number(value);
    }

    if (!isNaN(value) && value < min) {
      min = value;
    }
  });

  if (min === Number.MAX_SAFE_INTEGER) {
    return null;
  }

  return min;
};

exports.min = min;

const max = function maxResolver(source, args) {
  const {
    field
  } = args;
  const {
    edges
  } = source;
  let max = Number.MIN_SAFE_INTEGER;
  edges.forEach(({
    node
  }) => {
    let value = (0, _getValueAt.getValueAt)(node, `__gatsby_resolved.${field}`) || (0, _getValueAt.getValueAt)(node, field);

    if (typeof value !== `number`) {
      value = Number(value);
    }

    if (!isNaN(value) && value > max) {
      max = value;
    }
  });

  if (max === Number.MIN_SAFE_INTEGER) {
    return null;
  }

  return max;
};

exports.max = max;

const sum = function sumResolver(source, args) {
  const {
    field
  } = args;
  const {
    edges
  } = source;
  return edges.reduce((prev, {
    node
  }) => {
    let value = (0, _getValueAt.getValueAt)(node, `__gatsby_resolved.${field}`) || (0, _getValueAt.getValueAt)(node, field);

    if (typeof value !== `number`) {
      value = Number(value);
    }

    if (!isNaN(value)) {
      return (prev || 0) + value;
    }

    return prev;
  }, null);
};

exports.sum = sum;

const group = function groupResolver(source, args) {
  const {
    field
  } = args;
  const {
    edges
  } = source;
  const groupedResults = edges.reduce((acc, {
    node
  }) => {
    const value = (0, _getValueAt.getValueAt)(node, `__gatsby_resolved.${field}`) || (0, _getValueAt.getValueAt)(node, field);
    const values = Array.isArray(value) ? value : [value];
    values.filter(value => value != null).forEach(value => {
      const key = value instanceof Date ? value.toISOString() : value;
      acc[key] = (acc[key] || []).concat(node);
    });
    return acc; // Note: using Object.create on purpose:
    //   object key may be arbitrary string including reserved words (i.e. `constructor`)
    //   see: https://github.com/gatsbyjs/gatsby/issues/22508
  }, Object.create(null));
  return Object.keys(groupedResults).sort().reduce((acc, fieldValue) => {
    const entries = groupedResults[fieldValue] || [];
    acc.push({ ...paginate({
        entries: new _iterable.GatsbyIterable(entries),
        totalCount: async () => entries.length
      }, args),
      field,
      fieldValue
    });
    return acc;
  }, []);
};

exports.group = group;

function paginate(results, params) {
  const {
    resultOffset = 0,
    skip = 0,
    limit
  } = params;

  if (resultOffset > skip) {
    throw new Error("Result offset cannot be greater than `skip` argument");
  }

  const allItems = Array.from(results.entries);
  const start = skip - resultOffset;
  const items = allItems.slice(start, limit && start + limit);
  const totalCount = results.totalCount;

  const pageCount = async () => {
    const count = await totalCount();
    return limit ? Math.ceil(skip / limit) + Math.ceil((count - skip) / limit) : skip ? 2 : 1;
  };

  const currentPage = limit ? Math.ceil(skip / limit) + 1 : skip ? 2 : 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = limit ? allItems.length - start > limit : false;
  return {
    totalCount,
    edges: items.map((item, i, arr) => {
      return {
        node: item,
        next: arr[i + 1],
        previous: arr[i - 1]
      };
    }),
    nodes: items,
    pageInfo: {
      currentPage,
      hasPreviousPage,
      hasNextPage,
      itemCount: items.length,
      pageCount,
      perPage: limit,
      totalCount
    }
  };
}

function link(options = {
  by: `id`
}, fieldConfig) {
  // Note: we explicitly make an attempt to prevent using the `async` keyword because often
  //       it does not return a promise and this makes a significant difference at scale.
  return function linkResolver(source, args, context, info) {
    const resolver = fieldConfig.resolve || context.defaultFieldResolver;
    const fieldValueOrPromise = resolver(source, args, context, { ...info,
      from: options.from || info.from,
      fromNode: options.from ? options.fromNode : info.fromNode
    }); // Note: for this function, at scale, conditional .then is more efficient than generic await

    if (typeof (fieldValueOrPromise === null || fieldValueOrPromise === void 0 ? void 0 : fieldValueOrPromise.then) === `function`) {
      return fieldValueOrPromise.then(fieldValue => linkResolverValue(fieldValue, args, context, info));
    }

    return linkResolverValue(fieldValueOrPromise, args, context, info);
  };

  function linkResolverValue(fieldValue, args, context, info) {
    if (fieldValue == null) {
      return null;
    }

    const returnType = (0, _graphql.getNullableType)(options.type || info.returnType);
    const type = (0, _graphql.getNamedType)(returnType);

    if (options.by === `id`) {
      if (Array.isArray(fieldValue)) {
        return context.nodeModel.getNodesByIds({
          ids: fieldValue,
          type: type
        }, {
          path: context.path
        });
      } else {
        return context.nodeModel.getNodeById({
          id: fieldValue,
          type: type
        }, {
          path: context.path
        });
      }
    } // Return early if fieldValue is [] since { in: [] } doesn't make sense


    if (Array.isArray(fieldValue) && fieldValue.length === 0) {
      return fieldValue;
    }

    const runQueryArgs = args;
    runQueryArgs.filter = options.by.split(`.`).reduceRight((acc, key) => {
      const obj = {};
      obj[key] = acc;
      return obj;
    }, Array.isArray(fieldValue) ? {
      in: fieldValue
    } : {
      eq: fieldValue
    });
    const firstOnly = !(returnType instanceof _graphql.GraphQLList);

    if (context.stats) {
      context.stats.totalRunQuery++;

      if (firstOnly) {
        context.stats.totalPluralRunQuery++;
      }
    }

    const resultOrPromise = context.nodeModel.runQuery({
      query: runQueryArgs,
      firstOnly,
      type,
      stats: context.stats,
      tracer: context.tracer
    }, {
      path: context.path
    }); // Note: for this function, at scale, conditional .then is more efficient than generic await

    if (typeof (resultOrPromise === null || resultOrPromise === void 0 ? void 0 : resultOrPromise.then) === `function`) {
      return resultOrPromise.then(result => linkResolverQueryResult(fieldValue, result, returnType));
    }

    return linkResolverQueryResult(fieldValue, resultOrPromise, returnType);
  }

  function linkResolverQueryResult(fieldValue, queryResult, returnType) {
    if (returnType instanceof _graphql.GraphQLList && Array.isArray(fieldValue) && Array.isArray(queryResult)) {
      return fieldValue.map(value => queryResult.find(obj => (0, _getValueAt.getValueAt)(obj, options.by) === value));
    } else {
      return queryResult;
    }
  }
}

function fileByPath(options = {}, fieldConfig) {
  return async function fileByPathResolver(source, args, context, info) {
    const resolver = fieldConfig.resolve || context.defaultFieldResolver;
    const fieldValue = await resolver(source, args, context, { ...info,
      from: options.from || info.from,
      fromNode: options.from ? options.fromNode : info.fromNode
    });

    if (fieldValue == null) {
      return null;
    } // Find the File node for this node (we assume the node is something
    // like markdown which would be a child node of a File node).


    const parentFileNode = context.nodeModel.findRootNodeAncestor(source, node => node.internal && node.internal.type === `File`);

    async function queryNodesByPath(relPaths) {
      const arr = [];

      for (let i = 0; i < relPaths.length; ++i) {
        arr[i] = await (Array.isArray(relPaths[i]) ? queryNodesByPath(relPaths[i]) : queryNodeByPath(relPaths[i]));
      }

      return arr;
    }

    function queryNodeByPath(relPath) {
      return context.nodeModel.runQuery({
        query: {
          filter: {
            absolutePath: {
              eq: (0, _normalizePath.default)(_path.default.resolve(parentFileNode.dir, relPath))
            }
          }
        },
        firstOnly: true,
        type: `File`
      });
    }

    if (Array.isArray(fieldValue)) {
      return queryNodesByPath(fieldValue);
    } else {
      return queryNodeByPath(fieldValue);
    }
  };
}

function getProjectedField(info, fieldName) {
  const selectionSet = info.fieldNodes[0].selectionSet;

  if (selectionSet) {
    const fieldNodes = getFieldNodeByNameInSelectionSet(selectionSet, fieldName, info);
    const returnType = (0, _graphql.getNullableType)(info.returnType);

    if ((0, _graphql.isObjectType)(returnType) || (0, _graphql.isInterfaceType)(returnType)) {
      var _field$args;

      const field = returnType.getFields()[fieldName];
      const fieldArg = field === null || field === void 0 ? void 0 : (_field$args = field.args) === null || _field$args === void 0 ? void 0 : _field$args.find(arg => arg.name === `field`);

      if (fieldArg) {
        const fieldEnum = (0, _graphql.getNullableType)(fieldArg.type);

        if ((0, _graphql.isEnumType)(fieldEnum)) {
          return fieldNodes.reduce((acc, fieldNode) => {
            var _fieldNode$arguments;

            const fieldArg = (_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === void 0 ? void 0 : _fieldNode$arguments.find(arg => arg.name.value === `field`);

            if ((fieldArg === null || fieldArg === void 0 ? void 0 : fieldArg.value.kind) === _graphql.Kind.ENUM) {
              const enumKey = fieldArg.value.value;
              const enumValue = fieldEnum.getValue(enumKey);

              if (enumValue) {
                return [...acc, enumValue.value];
              }
            }

            return acc;
          }, []);
        }
      }
    }
  }

  return [];
}

function getFieldNodeByNameInSelectionSet(selectionSet, fieldName, info) {
  return selectionSet.selections.reduce((acc, selection) => {
    if (selection.kind === _graphql.Kind.FRAGMENT_SPREAD) {
      const fragmentDef = info.fragments[selection.name.value];

      if (fragmentDef) {
        return [...acc, ...getFieldNodeByNameInSelectionSet(fragmentDef.selectionSet, fieldName, info)];
      }
    } else if (selection.kind === _graphql.Kind.INLINE_FRAGMENT) {
      return [...acc, ...getFieldNodeByNameInSelectionSet(selection.selectionSet, fieldName, info)];
    }
    /* FIELD_NODE */
    else {
      if (selection.name.value === fieldName) {
        return [...acc, selection];
      }
    }

    return acc;
  }, []);
}

const defaultFieldResolver = function defaultFieldResolver(source, args, context, info) {
  if (typeof source == `object` && source !== null || typeof source === `function`) {
    if (info.from) {
      if (info.fromNode) {
        const node = context.nodeModel.findRootNodeAncestor(source);
        if (!node) return null;
        return (0, _getValueAt.getValueAt)(node, info.from);
      }

      return (0, _getValueAt.getValueAt)(source, info.from);
    }

    const property = source[info.fieldName];

    if (typeof property === `function`) {
      return source[info.fieldName](args, context, info);
    }

    return property;
  }

  return null;
};

exports.defaultFieldResolver = defaultFieldResolver;
let WARNED_ABOUT_RESOLVERS = false;

function badResolverInvocationMessage(missingVar, path) {
  const resolverName = path ? `${(0, _utils.pathToArray)(path)} ` : ``;
  return `GraphQL Resolver ${resolverName}got called without "${missingVar}" argument. This might cause unexpected errors.

It's likely that this has happened in a schemaCustomization with manually invoked resolver. If manually invoking resolvers, it's best to invoke them as follows:

  resolve(parent, args, context, info)

`;
}

function wrappingResolver(resolver) {
  // Note: we explicitly make an attempt to prevent using the `async` keyword because often
  //       it does not return a promise and this makes a significant difference at scale.
  //       GraphQL will gracefully handle the resolver result of a promise or non-promise.
  return function wrappedTracingResolver(parent, args, context, info) {
    if (!WARNED_ABOUT_RESOLVERS) {
      if (!info) {
        _reporter.default.warn(badResolverInvocationMessage(`info`));

        WARNED_ABOUT_RESOLVERS = true;
      } else if (!context) {
        _reporter.default.warn(badResolverInvocationMessage(`context`, info.path));

        WARNED_ABOUT_RESOLVERS = true;
      }
    }

    let activity;

    if (context !== null && context !== void 0 && context.tracer) {
      activity = context.tracer.createResolverActivity(info.path, `${info.parentType.name}.${info.fieldName}`);
      activity.start();
    }

    const result = resolver(parent, args, context, info);

    if (!activity) {
      return result;
    }

    const endActivity = () => {
      if (activity) {
        activity.end();
      }
    };

    if (typeof (result === null || result === void 0 ? void 0 : result.then) === `function`) {
      result.then(endActivity, endActivity);
    } else {
      endActivity();
    }

    return result;
  };
}

const defaultResolver = wrappingResolver(defaultFieldResolver);
exports.defaultResolver = defaultResolver;
//# sourceMappingURL=resolvers.js.map