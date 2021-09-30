"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.meta = void 0;

/**
 * @fileoverview prefer toHaveAttribute over checking  getAttribute/hasAttribute
 * @author Ben Monro
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const meta = {
  docs: {
    category: "Best Practices",
    description: "prefer toHaveAttribute over checking  getAttribute/hasAttribute ",
    url: "prefer-to-have-attribute",
    recommended: true
  },
  fixable: "code"
};
exports.meta = meta;

const create = context => ({
  [`CallExpression[callee.property.name='getAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBeNull/]`](node) {
    context.report({
      node: node.parent,
      message: `Use toHaveAttribute instead of asserting on getAttribute`,
      fix: fixer => [fixer.removeRange([node.callee.object.range[1], node.range[1]]), fixer.replaceTextRange([node.parent.parent.property.range[0], node.parent.parent.parent.range[1]], `not.toHaveAttribute(${context.getSourceCode().getText(node.arguments[0])})`)]
    });
  },

  [`CallExpression[callee.property.name='getAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toContain$|toMatch$/]`](node) {
    const sourceCode = context.getSourceCode();
    context.report({
      node: node.parent,
      message: `Use toHaveAttribute instead of asserting on getAttribute`,
      fix: fixer => [fixer.removeRange([node.callee.object.range[1], node.range[1]]), fixer.replaceText(node.parent.parent.property, "toHaveAttribute"), fixer.replaceText(node.parent.parent.parent.arguments[0], `${sourceCode.getText(node.arguments[0])}, expect.string${node.parent.parent.property.name.slice(2)}ing(${sourceCode.getText(node.parent.parent.parent.arguments[0])})`)]
    });
  },

  [`CallExpression[callee.property.name='getAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBe$|to(Strict)?Equal/]`](node) {
    const arg = node.parent.parent.parent.arguments;
    const isNull = arg.length > 0 && arg[0].value === null;
    const sourceCode = context.getSourceCode();
    context.report({
      node: node.parent,
      message: `Use toHaveAttribute instead of asserting on getAttribute`,
      fix: fixer => {
        const lastFixer = isNull ? fixer.replaceText(node.parent.parent.parent.arguments[0], sourceCode.getText(node.arguments[0])) : fixer.insertTextBefore(node.parent.parent.parent.arguments[0], `${sourceCode.getText(node.arguments[0])}, `);
        return [fixer.removeRange([node.callee.object.range[1], node.range[1]]), fixer.replaceText(node.parent.parent.property, `${isNull ? "not." : ""}toHaveAttribute`), lastFixer];
      }
    });
  },

  [`CallExpression[callee.property.name='hasAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBeNull|toBeUndefined|toBeDefined/]`](node) {
    context.report({
      node: node.parent.parent.property,
      message: "Invalid matcher for hasAttribute"
    });
  },

  [`CallExpression[callee.property.name='getAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBeUndefined|toBeDefined/]`](node) {
    context.report({
      node: node.parent.parent.property,
      message: "Invalid matcher for getAttribute"
    });
  },

  [`CallExpression[callee.property.name='hasAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBe$|to(Strict)?Equal/]`](node) {
    if (typeof node.parent.parent.parent.arguments[0].value === "boolean") {
      context.report({
        node: node.parent,
        message: `Use toHaveAttribute instead of asserting on hasAttribute`,
        fix: fixer => [fixer.removeRange([node.callee.object.range[1], node.range[1]]), fixer.replaceText(node.parent.parent.property, `${node.parent.parent.parent.arguments[0].value === false ? "not." : ""}toHaveAttribute`), fixer.replaceText(node.parent.parent.parent.arguments[0], context.getSourceCode().getText(node.arguments[0]))]
      });
    } else {
      context.report({
        node: node.parent.parent.property,
        message: "Invalid matcher for hasAttribute"
      });
    }
  },

  [`CallExpression[callee.property.name='hasAttribute'][parent.callee.name='expect'][parent.parent.property.name=/toBeTruthy|toBeFalsy/]`](node) {
    context.report({
      node: node.parent,
      message: `Use toHaveAttribute instead of asserting on hasAttribute`,
      fix: fixer => [fixer.removeRange([node.callee.object.range[1], node.range[1]]), fixer.replaceTextRange([node.parent.parent.property.range[0], node.parent.parent.parent.range[1]], `${node.parent.parent.property.name === "toBeFalsy" ? "not." : ""}toHaveAttribute(${context.getSourceCode().getText(node.arguments[0])})`)]
    });
  }

});

exports.create = create;