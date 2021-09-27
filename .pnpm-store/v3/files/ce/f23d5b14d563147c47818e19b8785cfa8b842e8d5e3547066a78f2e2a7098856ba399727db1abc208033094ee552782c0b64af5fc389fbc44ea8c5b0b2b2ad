"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerNodeFrom = getInnerNodeFrom;
exports.getAssignmentForIdentifier = getAssignmentForIdentifier;
exports.getQueryNodeFrom = getQueryNodeFrom;

var _queries = require("./queries");

/**
 * Gets the inner relevant node (CallExpression, Identity, et al.) given a generic expression node
 * await someAsyncFunc() => someAsyncFunc()
 * someElement as HTMLDivElement => someElement
 *
 * @param {Object} expression - An expression node
 * @returns {Object} - A node
 */
function getInnerNodeFrom(expression) {
  switch (expression.type) {
    case "TSAsExpression":
      return getInnerNodeFrom(expression.expression);

    case "AwaitExpression":
      return getInnerNodeFrom(expression.argument);

    case "MemberExpression":
      return getInnerNodeFrom(expression.object);

    default:
      return expression;
  }
}
/**
 * Get the node corresponding to the latest assignment to a variable named `identifierName`
 *
 * @param {Object} context - Context for a rule
 * @param {String} identifierName - Name of an identifier
 * @returns {Object} - A node, possibly undefined
 */


function getAssignmentForIdentifier(context, identifierName) {
  const variable = context.getScope().set.get(identifierName);
  if (!variable) return;
  const init = variable.defs[0].node.init;
  let assignmentNode;

  if (init) {
    // let foo = bar;
    assignmentNode = getInnerNodeFrom(init);
  } else {
    // let foo;
    // foo = bar;
    const assignmentRef = variable.references.reverse().find(ref => !!ref.writeExpr);

    if (!assignmentRef) {
      return;
    }

    assignmentNode = getInnerNodeFrom(assignmentRef.writeExpr);
  }

  return assignmentNode;
}
/**
 * get query node, arg and isDTLQuery flag for a given node.  useful for rules that you only
 * want to apply to dom elements.
 *
 * @param {Object} context - Context for a rule
 * @param {Object} nodeWithValueProp - AST Node to get the query from
 * @returns {Object} - Object with query, queryArg & isDTLQuery
 */


function getQueryNodeFrom(context, nodeWithValueProp) {
  const queryNode = nodeWithValueProp.type === "Identifier" ? getAssignmentForIdentifier(context, nodeWithValueProp.name) : getInnerNodeFrom(nodeWithValueProp);

  if (!queryNode || !queryNode.callee) {
    return {
      isDTLQuery: false,
      query: null,
      queryArg: null
    };
  }

  const query = queryNode.callee.name || queryNode.callee.property.name;
  const queryArg = queryNode.arguments[0] && queryNode.arguments[0].value;

  const isDTLQuery = _queries.queries.includes(query);

  return {
    queryArg,
    query,
    isDTLQuery
  };
}