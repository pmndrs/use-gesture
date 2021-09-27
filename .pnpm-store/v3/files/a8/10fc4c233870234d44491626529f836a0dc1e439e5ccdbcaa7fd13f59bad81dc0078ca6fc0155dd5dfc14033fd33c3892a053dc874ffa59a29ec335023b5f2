"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperModuleImports = require("@babel/helper-module-imports");

var _detectors = require("../utils/detectors");

var _options = require("../utils/options");

// Most of this code was taken from @satya164's babel-plugin-css-prop
// @see https://github.com/satya164/babel-plugin-css-prop
var TAG_NAME_REGEXP = /^[a-z][a-z\d]*(\-[a-z][a-z\d]*)?$/;

var getName = function getName(node, t) {
  if (typeof node.name === 'string') return node.name;

  if (t.isJSXMemberExpression(node)) {
    return `${getName(node.object, t)}.${node.property.name}`;
  }

  throw path.buildCodeFrameError(`Cannot infer name from node with type "${node.type}". Please submit an issue at github.com/styled-components/babel-plugin-styled-components with your code so we can take a look at your use case!`);
};

var getNameExpression = function getNameExpression(node, t) {
  if (typeof node.name === 'string') return t.identifier(node.name);

  if (t.isJSXMemberExpression(node)) {
    return t.memberExpression(getNameExpression(node.object, t), t.identifier(node.property.name));
  }

  throw path.buildCodeFrameError(`Cannot infer name expression from node with type "${node.type}". Please submit an issue at github.com/styled-components/babel-plugin-styled-components with your code so we can take a look at your use case!`);
};

var _default = function _default(t) {
  return function (path, state) {
    if (!(0, _options.useCssProp)(state)) return;
    if (path.node.name.name !== 'css') return;
    var program = state.file.path; // state.customImportName is passed through from styled-components/macro if it's used
    // since the macro also inserts the import

    var importName = state.customImportName || (0, _detectors.importLocalName)('default', state);
    var bindings = program.scope.bindings; // Insert import if it doesn't exist yet

    if (!importName || !bindings[importName.name] || !bindings[importName]) {
      (0, _helperModuleImports.addDefault)(path, 'styled-components', {
        nameHint: 'styled'
      });
      importName = t.identifier((0, _detectors.importLocalName)('default', state, true));
    }

    if (!t.isIdentifier(importName)) importName = t.identifier(importName);
    var elem = path.parentPath;
    var name = getName(elem.node.name, t);
    var nameExpression = getNameExpression(elem.node.name, t);
    var id = path.scope.generateUidIdentifier('Styled' + name.replace(/^([a-z])/, function (match, p1) {
      return p1.toUpperCase();
    }));
    var styled;
    var injector;

    if (TAG_NAME_REGEXP.test(name)) {
      styled = t.callExpression(importName, [t.stringLiteral(name)]);
    } else {
      styled = t.callExpression(importName, [nameExpression]);

      if (bindings[name] && !t.isImportDeclaration(bindings[name].path.parent)) {
        injector = function injector(nodeToInsert) {
          return (t.isVariableDeclaration(bindings[name].path.parent) ? bindings[name].path.parentPath : bindings[name].path).insertAfter(nodeToInsert);
        };
      }
    }

    var css;

    if (t.isStringLiteral(path.node.value)) {
      css = t.templateLiteral([t.templateElement({
        raw: path.node.value.value,
        cooked: path.node.value.value
      }, true)], []);
    } else if (t.isJSXExpressionContainer(path.node.value)) {
      if (t.isTemplateLiteral(path.node.value.expression)) {
        css = path.node.value.expression;
      } else if (t.isTaggedTemplateExpression(path.node.value.expression) && path.node.value.expression.tag.name === 'css') {
        css = path.node.value.expression.quasi;
      } else if (t.isObjectExpression(path.node.value.expression)) {
        css = path.node.value.expression;
      } else {
        css = t.templateLiteral([t.templateElement({
          raw: '',
          cooked: ''
        }, false), t.templateElement({
          raw: '',
          cooked: ''
        }, true)], [path.node.value.expression]);
      }
    }

    if (!css) return;
    elem.node.attributes = elem.node.attributes.filter(function (attr) {
      return attr !== path.node;
    });
    elem.node.name = t.jSXIdentifier(id.name);

    if (elem.parentPath.node.closingElement) {
      elem.parentPath.node.closingElement.name = t.jSXIdentifier(id.name);
    } // object syntax


    if (t.isObjectExpression(css)) {
      /**
       * for objects as CSS props, we have to recurse through the object and replace any
       * object value scope references with generated props similar to how the template
       * literal transform above creates dynamic interpolations
       */
      var p = t.identifier('p');
      var replaceObjectWithPropFunction = false;
      css.properties = css.properties.reduce(function propertiesReducer(acc, property) {
        if (t.isObjectExpression(property.value)) {
          // recurse for objects within objects (e.g. {'::before': { content: x }})
          property.value.properties = property.value.properties.reduce(propertiesReducer, []);
          acc.push(property);
        } else if (t.isSpreadElement(property)) {
          // recurse for objects within objects (e.g. {'::before': { content: x }})
          property.argument.properties = property.argument.properties.reduce(propertiesReducer, []);
          acc.push(property);
        } else if ( // if a non-primitive value we have to interpolate it
        [t.isBigIntLiteral, t.isBooleanLiteral, t.isNullLiteral, t.isNumericLiteral, t.isStringLiteral].filter(Boolean) // older versions of babel might not have bigint support baked in
        .every(function (x) {
          return !x(property.value);
        })) {
          replaceObjectWithPropFunction = true;

          var _name = path.scope.generateUidIdentifier('css');

          elem.node.attributes.push(t.jSXAttribute(t.jSXIdentifier(_name.name), t.jSXExpressionContainer(property.value)));
          acc.push(t.objectProperty(property.key, t.memberExpression(p, _name)));
        } else {
          // some sort of primitive which is safe to pass through as-is
          acc.push(property);
        }

        return acc;
      }, []);

      if (replaceObjectWithPropFunction) {
        css = t.arrowFunctionExpression([p], css);
      }
    } else {
      // tagged template literal
      css.expressions = css.expressions.reduce(function (acc, ex) {
        if (Object.keys(bindings).some(function (key) {
          return bindings[key].referencePaths.find(function (p) {
            return p.node === ex;
          });
        }) || t.isFunctionExpression(ex) || t.isArrowFunctionExpression(ex)) {
          acc.push(ex);
        } else {
          var _name2 = path.scope.generateUidIdentifier('css');

          var _p = t.identifier('p');

          elem.node.attributes.push(t.jSXAttribute(t.jSXIdentifier(_name2.name), t.jSXExpressionContainer(ex)));
          acc.push(t.arrowFunctionExpression([_p], t.memberExpression(_p, _name2)));
        }

        return acc;
      }, []);
    }

    if (!injector) {
      var parent = elem;

      while (!t.isProgram(parent.parentPath)) {
        parent = parent.parentPath;
      }

      injector = function injector(nodeToInsert) {
        return parent.insertBefore(nodeToInsert);
      };
    }

    injector(t.variableDeclaration('var', [t.variableDeclarator(id, t.isObjectExpression(css) || t.isArrowFunctionExpression(css) ? t.callExpression(styled, [css]) : t.taggedTemplateExpression(styled, css))]));
  };
};

exports.default = _default;