/**
 * @fileoverview Prevent passing of children as props
 * @author Benjamin Stepp
 */

'use strict';

const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if the node is a createElement call with a props literal.
 * @param {ASTNode} node - The AST node being checked.
 * @returns {Boolean} - True if node is a createElement call with a props
 * object literal, False if not.
*/
function isCreateElementWithProps(node) {
  return node.callee
    && node.callee.type === 'MemberExpression'
    && node.callee.property.name === 'createElement'
    && node.arguments.length > 1
    && node.arguments[1].type === 'ObjectExpression';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children as props.',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-children-prop')
    },

    messages: {
      nestChildren: 'Do not pass children as props. Instead, nest children between the opening and closing tags.',
      passChildrenAsArgs: 'Do not pass children as props. Instead, pass them as additional arguments to React.createElement.',
      nestFunction: 'Do not nest a function between the opening and closing tags. Instead, pass it as a prop.',
      passFunctionAsArgs: 'Do not pass a function as an additional argument to React.createElement. Instead, pass it as a prop.'
    },

    schema: [{
      type: 'object',
      properties: {
        allowFunctions: {
          type: 'boolean',
          default: false
        }
      },
      additionalProperties: false
    }]
  },
  create(context) {
    const configuration = context.options[0] || {};

    function isFunction(node) {
      return configuration.allowFunctions && (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression');
    }

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'children') {
          return;
        }

        const value = node.value;
        if (value && value.type === 'JSXExpressionContainer' && isFunction(value.expression)) {
          return;
        }

        context.report({
          node,
          messageId: 'nestChildren'
        });
      },
      CallExpression(node) {
        if (!isCreateElementWithProps(node)) {
          return;
        }

        const props = node.arguments[1].properties;
        const childrenProp = props.find((prop) => prop.key && prop.key.name === 'children');

        if (childrenProp) {
          if (childrenProp.value && !isFunction(childrenProp.value)) {
            context.report({
              node,
              messageId: 'passChildrenAsArgs'
            });
          }
        } else if (node.arguments.length === 3) {
          const children = node.arguments[2];
          if (isFunction(children)) {
            context.report({
              node,
              messageId: 'passFunctionAsArgs'
            });
          }
        }
      },
      JSXElement(node) {
        const children = node.children;
        if (children && children.length === 1 && children[0].type === 'JSXExpressionContainer') {
          if (isFunction(children[0].expression)) {
            context.report({
              node,
              messageId: 'nestFunction'
            });
          }
        }
      }
    };
  }
};
