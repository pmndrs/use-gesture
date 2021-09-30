"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectionFromAST = getProjectionFromAST;
exports.getProjectionFromASTQuery = getProjectionFromASTQuery;
exports.getFlatProjectionFromAST = getFlatProjectionFromAST;
exports.extendByFieldProjection = extendByFieldProjection;
exports.getProjectionFromASTquery = void 0;

var _graphql = require("../graphql");

var _deepmerge = require("./deepmerge");

/* eslint-disable no-param-reassign, no-lonely-if */
const {
  FIELD,
  FRAGMENT_SPREAD,
  INLINE_FRAGMENT
} = _graphql.Kind; // export type ProjectionType = { [fieldName: string]: $Shape<ProjectionNode> | true };
// export type ProjectionNode = { [fieldName: string]: $Shape<ProjectionNode> } | true;

function getProjectionFromAST(info, fieldNode) {
  if (!info) {
    return {};
  }

  const queryProjection = getProjectionFromASTQuery(info, fieldNode);
  const queryExtProjection = extendByFieldProjection(info.returnType, queryProjection);
  return queryExtProjection;
}

function getProjectionFromASTQuery(info, fieldNode) {
  if (!info) {
    return {};
  }

  let selections; // Array<FieldNode | InlineFragmentNode | FragmentSpreadNode>;

  if (fieldNode) {
    if (fieldNode.selectionSet) {
      selections = fieldNode.selectionSet.selections;
    }
  } else if (Array.isArray(info.fieldNodes)) {
    // get all selectionSets
    selections = info.fieldNodes.reduce((result, source) => {
      if (source.selectionSet) {
        result.push(...source.selectionSet.selections);
      }

      return result;
    }, []);
  }

  const projection = (selections || []).reduce((res, ast) => {
    switch (ast.kind) {
      case FIELD:
        {
          const {
            value
          } = ast.name;

          if (res[value]) {
            res[value] = (0, _deepmerge.deepmerge)(res[value], getProjectionFromASTQuery(info, ast) || true);
          } else {
            res[value] = getProjectionFromASTQuery(info, ast) || true;
          }

          return res;
        }

      case INLINE_FRAGMENT:
        return (0, _deepmerge.deepmerge)(res, getProjectionFromASTQuery(info, ast));

      case FRAGMENT_SPREAD:
        return (0, _deepmerge.deepmerge)(res, getProjectionFromASTQuery(info, info.fragments[ast.name.value]));

      default:
        throw new Error('Unsupported query selection');
    }
  }, {});
  return projection;
} // export old getProjectionFromASTquery to be removed in next major release


const getProjectionFromASTquery = getProjectionFromASTQuery;
exports.getProjectionFromASTquery = getProjectionFromASTquery;

function getFlatProjectionFromAST(info, fieldNodes) {
  const projection = getProjectionFromAST(info, fieldNodes) || {};
  const flatProjection = {};
  Object.keys(projection).forEach(key => {
    flatProjection[key] = !!projection[key];
  });
  return flatProjection;
} // This method traverse fields and extends current projection
// by projection from fields


function extendByFieldProjection(returnType, projection) {
  let type = returnType;

  while (type instanceof _graphql.GraphQLList || type instanceof _graphql.GraphQLNonNull) {
    type = type.ofType;
  }

  if (!(type instanceof _graphql.GraphQLObjectType || type instanceof _graphql.GraphQLInterfaceType)) {
    return projection;
  }

  let proj = projection;
  Object.keys(proj).forEach(key => {
    const field = type.getFields()[key];
    if (!field) return;
    if (field.projection) proj = (0, _deepmerge.deepmerge)(proj, field.projection);

    if (field.extensions && field.extensions.projection) {
      proj = (0, _deepmerge.deepmerge)(proj, field.extensions.projection);
    }

    proj[key] = extendByFieldProjection(field.type, proj[key]);
  });
  return proj;
}