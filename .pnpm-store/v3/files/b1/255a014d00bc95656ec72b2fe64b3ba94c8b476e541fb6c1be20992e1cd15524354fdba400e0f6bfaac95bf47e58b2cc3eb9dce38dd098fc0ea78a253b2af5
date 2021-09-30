"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.meta = void 0;

/**
 * @fileoverview Prefer toBeEmpty over checking innerHTML
 * @author Ben Monro
 */
const meta = {
  docs: {
    description: "Prefer toBeEmpty over checking innerHTML",
    category: "Best Practices",
    recommended: true,
    url: "prefer-empty"
  },
  fixable: "code" // or "code" or "whitespace"

};
exports.meta = meta;

const create = context => {
  function isNonEmptyStringOrTemplateLiteral(node) {
    return !['""', "''", "``", "null"].includes(context.getSourceCode().getText(node));
  }

  return {
    [`BinaryExpression[left.property.name='innerHTML'][right.value=''][parent.callee.name='expect'][parent.parent.property.name=/toBe$|to(Strict)?Equal/]`](node) {
      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.left.object.range[1], node.range[1]]), fixer.replaceText(node.parent.parent.property, Boolean(node.parent.parent.parent.arguments[0].value) === node.operator.startsWith("=") // binary expression XNOR matcher boolean
        ? "toBeEmptyDOMElement" : "not.toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.arguments[0])]
      });
    },

    [`BinaryExpression[left.property.name='firstChild'][right.value=null][parent.callee.name='expect'][parent.parent.property.name=/toBe$|to(Strict)?Equal/]`](node) {
      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.left.object.range[1], node.range[1]]), fixer.replaceText(node.parent.parent.property, Boolean(node.parent.parent.parent.arguments[0].value) === node.operator.startsWith("=") // binary expression XNOR matcher boolean
        ? "toBeEmptyDOMElement" : "not.toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.arguments[0])]
      });
    },

    [`MemberExpression[property.name = 'innerHTML'][parent.callee.name = 'expect'][parent.parent.property.name = /toBe$|to(Strict)?Equal/]`](node) {
      const args = node.parent.parent.parent.arguments[0];

      if (isNonEmptyStringOrTemplateLiteral(args)) {
        return;
      }

      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.property, "toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.arguments[0])]
      });
    },

    [`MemberExpression[property.name='innerHTML'][parent.parent.property.name='not'][parent.parent.parent.property.name=/toBe$|to(Strict)?Equal$/][parent.parent.object.callee.name='expect']`](node) {
      const args = node.parent.parent.parent.parent.arguments[0];

      if (isNonEmptyStringOrTemplateLiteral(args)) {
        return;
      }

      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.parent.property, "toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.parent.arguments[0])]
      });
    },

    [`MemberExpression[property.name = 'firstChild'][parent.callee.name = 'expect'][parent.parent.property.name = /toBeNull$/]`](node) {
      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.property, "toBeEmptyDOMElement")]
      });
    },

    [`MemberExpression[property.name='firstChild'][parent.parent.property.name='not'][parent.parent.parent.property.name=/toBe$|to(Strict)?Equal$/][parent.parent.object.callee.name='expect']`](node) {
      if (node.parent.parent.parent.parent.arguments[0].value !== null) {
        return;
      }

      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.parent.property, "toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.parent.arguments[0])]
      });
    },

    [`MemberExpression[property.name='firstChild'][parent.parent.property.name='not'][parent.parent.parent.property.name=/toBeNull$/][parent.parent.object.callee.name='expect']`](node) {
      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.parent.property, "toBeEmptyDOMElement")]
      });
    },

    [`MemberExpression[property.name = 'firstChild'][parent.callee.name = 'expect'][parent.parent.property.name = /toBe$|to(Strict)?Equal/]`](node) {
      if (node.parent.parent.parent.arguments[0].value !== null) {
        return;
      }

      context.report({
        node,
        message: "Use toBeEmptyDOMElement instead of checking inner html.",
        fix: fixer => [fixer.removeRange([node.object.range[1], node.property.range[1]]), fixer.replaceText(node.parent.parent.property, "toBeEmptyDOMElement"), fixer.remove(node.parent.parent.parent.arguments[0])]
      });
    }

  };
};

exports.create = create;