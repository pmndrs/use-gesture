"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assignmentAst = require("./assignment-ast");

var _default = ({
  preferred,
  negatedPreferred,
  attributes
}) => context => {
  const getCorrectFunctionFor = (node, negated = false) => (node.arguments.length === 1 || node.arguments[1].value === true || node.arguments[1].type !== "Literal" || typeof node.arguments[1].value === "string" && node.arguments[1].value.toLowerCase() === "true" || node.arguments[1].value === "") && !negated ? preferred : negatedPreferred;

  const isBannedArg = node => node.arguments.length && attributes.some(attr => attr === node.arguments[0].value); //expect(el).not.toBeEnabled() => expect(el).toBeDisabled()


  return {
    [`CallExpression[callee.property.name=/${preferred}|${negatedPreferred}/][callee.object.property.name='not'][callee.object.object.callee.name='expect']`](node) {
      if (!negatedPreferred.startsWith("toBe")) {
        return;
      }

      const incorrectFunction = node.callee.property.name;
      const correctFunction = incorrectFunction === preferred ? negatedPreferred : preferred;
      context.report({
        message: `Use ${correctFunction}() instead of not.${incorrectFunction}()`,
        node,
        fix: fixer => fixer.replaceTextRange([node.callee.object.property.range[0], node.range[1]], `${correctFunction}()`)
      });
    },

    //expect(getByText('foo').<attribute>).toBeTruthy()
    "CallExpression[callee.property.name=/toBe(Truthy|Falsy)?|toEqual/][callee.object.callee.name='expect']"(node) {
      if (!node.callee.object.arguments.length) {
        return;
      }

      const {
        arguments: [{
          object,
          property,
          property: {
            name
          } = {}
        }]
      } = node.callee.object;
      const matcher = node.callee.property.name;
      const matcherArg = node.arguments.length && node.arguments[0].value;

      if (!attributes.some(attr => attr === name)) {
        return;
      }

      const {
        isDTLQuery
      } = (0, _assignmentAst.getQueryNodeFrom)(context, node.callee.object.arguments[0]);
      if (!isDTLQuery) return;
      const isNegated = matcher.endsWith("Falsy") || (matcher === "toBe" || matcher === "toEqual") && matcherArg !== true;
      const correctFunction = getCorrectFunctionFor(node.callee.object, isNegated);
      context.report({
        node,
        message: `Use ${correctFunction}() instead of checking .${name} directly`,
        fix: fixer => [fixer.removeRange([object.range[1], property.range[1]]), fixer.replaceTextRange([node.callee.property.range[0], node.range[1]], `${correctFunction}()`)]
      });
    },

    "CallExpression[callee.property.name=/toHaveProperty|toHaveAttribute/][callee.object.property.name='not'][callee.object.object.callee.name='expect']"(node) {
      if (!isBannedArg(node)) {
        return;
      }

      const arg = node.arguments[0].value;
      const correctFunction = getCorrectFunctionFor(node, true);
      const incorrectFunction = node.callee.property.name;
      context.report({
        message: `Use ${correctFunction}() instead of not.${incorrectFunction}('${arg}')`,
        node,
        fix: fixer => fixer.replaceTextRange([node.callee.object.property.range[0], node.range[1]], `${correctFunction}()`)
      });
    },

    "CallExpression[callee.object.callee.name='expect'][callee.property.name=/toHaveProperty|toHaveAttribute/]"(node) {
      if (!isBannedArg(node)) {
        return;
      }

      const {
        isDTLQuery
      } = (0, _assignmentAst.getQueryNodeFrom)(context, node.callee.object.arguments[0]);
      if (!isDTLQuery) return;
      const correctFunction = getCorrectFunctionFor(node);
      const incorrectFunction = node.callee.property.name;
      const message = `Use ${correctFunction}() instead of ${incorrectFunction}(${node.arguments.map(({
        raw,
        name
      }) => raw || name).join(", ")})`;
      const secondArgIsLiteral = node.arguments.length === 2 && node.arguments[1].type === "Literal";
      context.report({
        node: node.callee.property,
        message,
        fix: fixer => {
          if (node.arguments.length === 1 || secondArgIsLiteral) {
            return [fixer.replaceTextRange([node.callee.property.range[0], node.range[1]], `${correctFunction}()`)];
          }

          return null;
        }
      });
    }

  };
};

exports.default = _default;