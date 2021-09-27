import React, { Component, Fragment, createContext } from 'react';
import 'prop-types';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import { transform } from 'buble';
import assign from 'core-js/fn/object/assign';

var theme = {
  plain: {
    color: '#C5C8C6',
    backgroundColor: '#1D1F21'
  },
  styles: [{
    types: ['prolog', 'comment', 'doctype', 'cdata'],
    style: {
      color: 'hsl(30, 20%, 50%)'
    }
  }, {
    types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
    style: { color: 'hsl(350, 40%, 70%)' }
  }, {
    types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
    style: {
      color: 'hsl(75, 70%, 60%)'
    }
  }, {
    types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
    style: {
      color: 'hsl(40, 90%, 60%)'
    }
  }, {
    types: ['deleted'],
    style: {
      color: 'rgb(255, 85, 85)'
    }
  }, {
    types: ['italic'],
    style: {
      fontStyle: 'italic'
    }
  }, {
    types: ['important', 'bold'],
    style: {
      fontWeight: 'bold'
    }
  }, {
    types: ['regex', 'important'],
    style: {
      color: '#e90'
    }
  }, {
    types: ['atrule', 'attr-value', 'keyword'],
    style: {
      color: 'hsl(350, 40%, 70%)'
    }
  }, {
    types: ['punctuation', 'symbol'],
    style: {
      opacity: '0.7'
    }
  }]
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var CodeEditor = function (_Component) {
  inherits(CodeEditor, _Component);

  function CodeEditor() {
    var _temp, _this, _ret;

    classCallCheck(this, CodeEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      code: ''
    }, _this.updateContent = function (code) {
      _this.setState({ code: code }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(_this.state.code);
        }
      });
    }, _this.highlightCode = function (code) {
      return React.createElement(
        Highlight,
        {
          Prism: Prism,
          code: code,
          theme: _this.props.theme || theme,
          language: _this.props.language
        },
        function (_ref) {
          var tokens = _ref.tokens,
              getLineProps = _ref.getLineProps,
              getTokenProps = _ref.getTokenProps;
          return React.createElement(
            Fragment,
            null,
            tokens.map(function (line, i) {
              return (
                // eslint-disable-next-line react/jsx-key
                React.createElement(
                  'div',
                  getLineProps({ line: line, key: i }),
                  line.map(function (token, key) {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      React.createElement('span', getTokenProps({ token: token, key: key }))
                    );
                  })
                )
              );
            })
          );
        }
      );
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  CodeEditor.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.code !== state.prevCodeProp) {
      return { code: props.code, prevCodeProp: props.code };
    }

    return null;
  };

  CodeEditor.prototype.render = function render() {
    // eslint-disable-next-line no-unused-vars
    var _props = this.props,
        style = _props.style,
        _code = _props.code,
        onChange = _props.onChange,
        language = _props.language,
        theme$$1 = _props.theme,
        rest = objectWithoutProperties(_props, ['style', 'code', 'onChange', 'language', 'theme']);
    var code = this.state.code;


    var baseTheme = theme$$1 && _typeof(theme$$1.plain) === 'object' ? theme$$1.plain : {};

    return React.createElement(Editor, _extends({
      value: code,
      padding: 10,
      highlight: this.highlightCode,
      onValueChange: this.updateContent,
      style: _extends({
        whiteSpace: 'pre',
        fontFamily: 'monospace'
      }, baseTheme, style)
    }, rest));
  };

  return CodeEditor;
}(Component);

var LiveContext = createContext({});

var _poly = { assign: assign };

var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var transform$1 = (function (code) {
  return transform(code, opts).code;
});

var errorBoundary = function errorBoundary(Element, errorCallback) {
  return function (_Component) {
    inherits(ErrorBoundary, _Component);

    function ErrorBoundary() {
      classCallCheck(this, ErrorBoundary);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error);
    };

    ErrorBoundary.prototype.render = function render() {
      return typeof Element === 'function' ? React.createElement(Element, null) : Element;
    };

    return ErrorBoundary;
  }(Component);
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  // eslint-disable-next-line no-new-func
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, React].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope;

  // NOTE: Remove trailing semicolon to get an actual expression.
  var codeTrimmed = code.trim().replace(/;$/, '');

  // NOTE: Workaround for classes and arrow functions.
  var transformed = transform$1('return (' + codeTrimmed + ')').trim();
  return errorBoundary(evalCode(transformed, scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback
// eslint-disable-next-line consistent-return
) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    if (typeof element === 'undefined') {
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'));
    } else {
      resultCallback(errorBoundary(element, errorCallback));
    }
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform$1(code), _extends({}, scope, { render: render }));
};

var LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }, _this.onError = function (error) {
      _this.setState({ error: error.toString() });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline;

      // Transpilation arguments
      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };

      var errorCallback = function errorCallback(err) {
        return _this.setState({ element: undefined, error: err.toString() });
      };
      var renderElement = function renderElement(element) {
        return _this.setState(_extends({}, state, { element: element }));
      };

      // State reset object
      var state = { unsafeWrapperError: undefined, error: undefined };

      try {
        if (noInline) {
          _this.setState(_extends({}, state, { element: null })); // Reset output for async (no inline) evaluation
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(_extends({}, state, { error: error.toString() }));
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line camelcase
  LiveProvider.prototype.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;


    this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
  };

  LiveProvider.prototype.componentDidUpdate = function componentDidUpdate(_ref2) {
    var prevCode = _ref2.code,
        prevScope = _ref2.scope,
        prevNoInline = _ref2.noInline,
        prevTransformCode = _ref2.transformCode;
    var _props2 = this.props,
        code = _props2.code,
        scope = _props2.scope,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode;

    if (code !== prevCode || scope !== prevScope || noInline !== prevNoInline || transformCode !== prevTransformCode) {
      this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props3 = this.props,
        children = _props3.children,
        code = _props3.code,
        language = _props3.language,
        theme = _props3.theme,
        disabled = _props3.disabled;


    return React.createElement(
      LiveContext.Provider,
      {
        value: _extends({}, this.state, {
          code: code,
          language: language,
          theme: theme,
          disabled: disabled,
          onError: this.onError,
          onChange: this.onChange
        })
      },
      children
    );
  };

  return LiveProvider;
}(Component);

LiveProvider.defaultProps = {
  code: '',
  noInline: false,
  language: 'jsx',
  disabled: false
};

function LiveEditor(props) {
  return React.createElement(
    LiveContext.Consumer,
    null,
    function (_ref) {
      var code = _ref.code,
          language = _ref.language,
          theme = _ref.theme,
          disabled = _ref.disabled,
          onChange = _ref.onChange;
      return React.createElement(CodeEditor, _extends({
        theme: theme,
        code: code,
        language: language,
        disabled: disabled,
        onChange: onChange
      }, props));
    }
  );
}

function LiveError(props) {
  return React.createElement(
    LiveContext.Consumer,
    null,
    function (_ref) {
      var error = _ref.error;
      return error ? React.createElement(
        'pre',
        props,
        error
      ) : null;
    }
  );
}

function LivePreview(_ref) {
  var Component$$1 = _ref.Component,
      rest = objectWithoutProperties(_ref, ['Component']);

  return React.createElement(
    Component$$1,
    rest,
    React.createElement(
      LiveContext.Consumer,
      null,
      function (_ref2) {
        var Element = _ref2.element;
        return Element && React.createElement(Element, null);
      }
    )
  );
}

LivePreview.defaultProps = {
  Component: 'div'
};

function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var _this2 = this;

      return React.createElement(
        LiveContext.Consumer,
        null,
        function (live) {
          return React.createElement(WrappedComponent, _extends({ live: live }, _this2.props));
        }
      );
    };

    return WithLive;
  }(Component);

  return WithLive;
}

export { CodeEditor as Editor, LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext, withLive, generateElement, renderElementAsync };
