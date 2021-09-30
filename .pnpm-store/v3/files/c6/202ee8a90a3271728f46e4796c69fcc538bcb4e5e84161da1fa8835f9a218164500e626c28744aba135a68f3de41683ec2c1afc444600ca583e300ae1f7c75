"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.meta = void 0;

var _assignmentAst = require("../assignment-ast");

/**
 * @fileoverview prefer toHaveClass over checking element className
 * @author Ben Monro
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const messageId = "use-to-have-class";
const meta = {
  docs: {
    category: "Best Practices",
    url: "prefer-to-have-class",
    description: "prefer toHaveClass over checking element className",
    recommended: true
  },
  messages: {
    [messageId]: `Prefer .toHaveClass() over checking element className`
  },
  fixable: "code"
};
exports.meta = meta;

const create = context => ({
  //expect(el.classList.contains("foo")).toBe(true)
  [`CallExpression[callee.object.callee.name=expect][callee.object.arguments.0.callee.object.property.name=classList][callee.object.arguments.0.callee.property.name=contains][callee.property.name=/toBe(Truthy|Falsy)?|to(Strict)?Equal/]`](node) {
    const classValue = node.callee.object.arguments[0].arguments[0];
    const checkedProp = node.callee.object.arguments[0].callee.object.object;
    const matcher = node.callee.property;
    const [matcherArg] = node.arguments;
    const [expectArg] = node.callee.object.arguments;
    const isTruthy = matcher.name === "toBe" && matcherArg.value === true || matcher.name === "toBeTruthy";
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        return [fixer.removeRange([checkedProp.range[1], expectArg.range[1]]), fixer.replaceText(matcher, `${isTruthy ? "" : "not."}toHaveClass`), matcherArg ? fixer.replaceText(matcherArg, context.getSourceCode().getText(classValue)) : fixer.insertTextBefore(context.getSourceCode().getTokenAfter(matcher, {
          skip: 1
        }), context.getSourceCode().getText(classValue))];
      }

    });
  },

  //expect(el.classList[0]).toBe("bar")
  [`CallExpression[callee.object.callee.name=expect][callee.object.arguments.0.object.property.name=classList][callee.property.name=/toBe$|to(Strict)?Equal|toContain/][arguments.0.type=/Literal$/]`](node) {
    const [classValue] = node.arguments;
    const matcher = node.callee.property;
    const classNameProp = node.callee.object.arguments[0].object;
    const expectArg = node.callee.object.arguments[0];
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        //can't autofix here as it toHaveClass doesn't have a partial matcher / regex for class names.
        if (matcher.name === "toContain") return;
        return [fixer.removeRange([classNameProp.object.range[1], expectArg.range[1]]), fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classValue, context.getSourceCode().getText(classValue))];
      }

    });
  },

  //expect(el.classList[0]).not.toBe("bar")
  [`CallExpression[callee.object.object.callee.name=expect][callee.object.object.arguments.0.object.property.name=classList][callee.object.property.name=not][callee.property.name=/toBe$|to(Strict)?Equal|toContain/][arguments.0.type=/Literal$/]`](node) {
    //can't autofix this case because the class could be in another element of the classList array.
    context.report({
      node,
      messageId
    });
  },

  //expect(el.className | el.classList).toBe("bar") / toStrict?Equal / toContain
  [`CallExpression[callee.object.callee.name=expect][callee.object.arguments.0.property.name=/class(Name|List)/][callee.property.name=/toBe$|to(Strict)?Equal|toContain/]`](node) {
    const checkedProp = node.callee.object.arguments[0].property;
    const [classValue] = node.arguments;
    const matcher = node.callee.property;
    const classNameProp = node.callee.object.arguments[0].object;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, classNameProp);
    if (!isDTLQuery) return; // don't report here if using `expect.foo()`

    if (classValue.type === "CallExpression" && classValue.callee.type === "MemberExpression" && classValue.callee.object.name === "expect") return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        if (checkedProp.name === "classList" && matcher.name !== "toContain") return;
        return [fixer.removeRange([classNameProp.range[1], checkedProp.range[1]]), fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classValue, `${context.getSourceCode().getText(classValue)}${matcher.name === "toContain" ? "" : ", { exact: true }"}`)];
      }

    });
  },

  //expect(el.className | el.classList).toEqual(expect.stringContaining("foo") | objectContaining) / toStrictEqual
  [`CallExpression[callee.object.callee.name=expect][callee.object.arguments.0.property.name=/class(Name|List)/][callee.property.name=/to(Strict)?Equal/][arguments.0.callee.object.name=expect]`](node) {
    const className = node.callee.object.arguments[0].property;
    const [classValue] = node.arguments[0].arguments;
    const matcher = node.callee.property;
    const classNameProp = node.callee.object.arguments[0].object;
    const matcherArg = node.arguments[0].callee.property;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, classNameProp);
    if (!isDTLQuery) return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        if (matcherArg.name !== "stringContaining") return;
        return [fixer.removeRange([classNameProp.range[1], className.range[1]]), fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(node.arguments[0], `${context.getSourceCode().getText(classValue)}`)];
      }

    });
  },

  //expect(screen.getByRole("button").className | classList).not.toBe("foo"); / toStrict?Equal / toContain
  [`CallExpression[callee.object.object.callee.name=expect][callee.object.object.arguments.0.property.name=/class(Name|List)/][callee.object.property.name=not][callee.property.name=/toBe$|to(Strict)?Equal|toContain/]`](node) {
    const className = node.callee.object.object.arguments[0].property;
    const [classValue] = node.arguments;
    const matcher = node.callee.property;
    const classNameProp = node.callee.object.object.arguments[0].object;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, classNameProp);
    if (!isDTLQuery) return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        if (className.name === "classList" && matcher.name !== "toContain") return;
        return [fixer.removeRange([classNameProp.range[1], className.range[1]]), fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classValue, `${context.getSourceCode().getText(classValue)}${matcher.name === "toContain" ? "" : ", { exact: true }"}`)];
      }

    });
  },

  //expect(el).toHaveProperty("className", "foo: bar");
  //expect(el).toHaveAttribute("class", "foo: bar");
  [[`CallExpression[callee.object.callee.name=expect][callee.property.name=toHaveAttribute][arguments.0.type=/Literal/][arguments.1.type=/Literal$/]`, `CallExpression[callee.object.callee.name=expect][callee.property.name=toHaveProperty][arguments.0.type=/Literal/][arguments.1.type=/Literal$/]`].join(",")](node) {
    const matcher = node.callee.property;
    const [classArg, classValueArg] = node.arguments;
    const classNameValue = context.getSourceCode().getText(classArg).slice(1, -1);
    if (matcher.name === "toHaveAttribute" && classNameValue !== "class" || matcher.name === "toHaveProperty" && classNameValue !== "className") return;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, node.callee.object.arguments[0]);
    if (!isDTLQuery) return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        return [fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classArg, context.getSourceCode().getText(classValueArg)), fixer.replaceText(classValueArg, `{ exact: true }`)];
      }

    });
  },

  //expect(el).not.toHaveAttribute("class", "foo: bar");
  //expect(el).not.toHaveProperty("className", "foo: bar");
  [[`CallExpression[callee.object.object.callee.name=expect][callee.object.property.name=not][callee.property.name=toHaveAttribute][arguments.0.type=/Literal/][arguments.1.type=/Literal$/]`, `CallExpression[callee.object.object.callee.name=expect][callee.object.property.name=not][callee.property.name=toHaveProperty][arguments.0.type=/Literal/][arguments.1.type=/Literal$/]`].join(",")](node) {
    //[callee.object.property.name=/toHaveAttribute|toHaveProperty/][arguments.0.value=class][arguments.1.type=/Literal$/]
    const matcher = node.callee.property;
    const [classArg, classValueArg] = node.arguments;
    const classNameValue = context.getSourceCode().getText(classArg).slice(1, -1);
    if (matcher.name === "toHaveAttribute" && classNameValue !== "class" || matcher.name === "toHaveProperty" && classNameValue !== "className") return;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, node.callee.object.object.arguments[0]);
    if (!isDTLQuery) return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        return [fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classArg, context.getSourceCode().getText(classValueArg)), fixer.replaceText(classValueArg, `{ exact: true }`)];
      }

    });
  },

  //expect(el).toHaveProperty(`className`, expect.stringContaining("foo"));
  //expect(el).toHaveAttribute(`class`, expect.stringContaining("foo"));
  [[`CallExpression[callee.object.callee.name=expect][callee.property.name=toHaveAttribute][arguments.0.type=/Literal/][arguments.1.callee.object.name=expect][arguments.1.callee.property.name=stringContaining]`, `CallExpression[callee.object.callee.name=expect][callee.property.name=toHaveProperty][arguments.0.type=/Literal/][arguments.1.callee.object.name=expect][arguments.1.callee.property.name=stringContaining]`].join(",")](node) {
    const matcher = node.callee.property;
    const [classArg, classValue] = node.arguments;
    const classValueArg = classValue.arguments[0];
    const classNameValue = context.getSourceCode().getText(classArg).slice(1, -1);
    if (matcher.name === "toHaveAttribute" && classNameValue !== "class" || matcher.name === "toHaveProperty" && classNameValue !== "className") return;
    const {
      isDTLQuery
    } = (0, _assignmentAst.getQueryNodeFrom)(context, node.callee.object.arguments[0]);
    if (!isDTLQuery) return;
    context.report({
      node: matcher,
      messageId,

      fix(fixer) {
        return [fixer.replaceText(matcher, "toHaveClass"), fixer.replaceText(classArg, context.getSourceCode().getText(classValueArg)), fixer.removeRange([classArg.range[1], classValue.range[1]])];
      }

    });
  }

});

exports.create = create;