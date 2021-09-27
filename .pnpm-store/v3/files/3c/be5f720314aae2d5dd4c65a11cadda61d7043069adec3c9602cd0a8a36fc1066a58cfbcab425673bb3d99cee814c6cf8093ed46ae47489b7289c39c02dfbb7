/*! screenlog - v0.3.0 - 2019-01-25
* https://github.com/chinchang/screenlog.js
* Copyright (c) 2019 Kushagra Gour; Licensed  */

(function() {
  var logEl,
    isInitialized = false,
    _console = {}; // backup console obj to contain references of overridden fns.
  _options = {
    bgColor: "black",
    logColor: "lightgreen",
    infoColor: "blue",
    warnColor: "orange",
    errorColor: "red",
    fontSize: "1em",
    freeConsole: false,
    css: "",
    autoScroll: true
  };

  function createElement(tag, css) {
    var element = document.createElement(tag);
    element.style.cssText = css;
    return element;
  }

  function createPanel() {
    var div = createElement(
      "div",
      "z-index:2147483647;font-family:Helvetica,Arial,sans-serif;font-size:" +
        _options.fontSize +
        ";padding:5px;text-align:left;opacity:0.8;position:fixed;right:0;top:0;min-width:200px;max-height:50vh;overflow:auto;background:" +
        _options.bgColor +
        ";" +
        _options.css
    );
    return div;
  }

  function genericLogger(color) {
    return function() {
      var el = createElement(
        "div",
        "line-height:1.7em;min-height:1.7em;background:" +
          (logEl.children.length % 2 ? "rgba(255,255,255,0.1)" : "") +
          ";color:" +
          color
      ); // zebra lines
      var val = [].slice.call(arguments).reduce(function(prev, arg) {
        return (
          prev + " " + (typeof arg === "object" ? JSON.stringify(arg) : arg)
        );
      }, "");
      el.textContent = val;

      logEl.appendChild(el);

      // Scroll to last element, if autoScroll option is set.
      if (_options.autoScroll) {
        logEl.scrollTop = logEl.scrollHeight - logEl.clientHeight;
      }
    };
  }

  function clear() {
    logEl.innerHTML = "";
  }

  function log() {
    return genericLogger(_options.logColor).apply(null, arguments);
  }

  function info() {
    return genericLogger(_options.infoColor).apply(null, arguments);
  }

  function warn() {
    return genericLogger(_options.warnColor).apply(null, arguments);
  }

  function error() {
    return genericLogger(_options.errorColor).apply(null, arguments);
  }

  function setOptions(options) {
    for (var i in options)
      if (options.hasOwnProperty(i) && _options.hasOwnProperty(i)) {
        _options[i] = options[i];
      }
  }

  function init(options) {
    if (isInitialized) {
      return;
    }

    isInitialized = true;

    if (options) {
      setOptions(options);
    }

    logEl = createPanel();
    document.body.appendChild(logEl);

    if (!_options.freeConsole) {
      // Backup actual fns to keep it working together
      _console.log = console.log;
      _console.clear = console.clear;
      _console.info = console.info;
      _console.warn = console.warn;
      _console.error = console.error;
      console.log = originalFnCallDecorator(log, "log");
      console.clear = originalFnCallDecorator(clear, "clear");
      console.info = originalFnCallDecorator(info, "info");
      console.warn = originalFnCallDecorator(warn, "warn");
      console.error = originalFnCallDecorator(error, "error");
    }
  }

  function destroy() {
    isInitialized = false;
    console.log = _console.log;
    console.clear = _console.clear;
    console.info = _console.info;
    console.warn = _console.warn;
    console.error = _console.error;
    logEl.remove();
  }

  /**
   * Checking if isInitialized is set
   */
  function checkInitialized() {
    if (!isInitialized) {
      throw "You need to call `screenLog.init()` first.";
    }
  }

  /**
   * Decorator for checking if isInitialized is set
   * @param  {Function} fn Fn to decorate
   * @return {Function}      Decorated fn.
   */
  function checkInitDecorator(fn) {
    return function() {
      checkInitialized();
      return fn.apply(this, arguments);
    };
  }

  /**
   * Decorator for calling the original console's fn at the end of
   * our overridden fn definitions.
   * @param  {Function} fn Fn to decorate
   * @param  {string} fn Name of original function
   * @return {Function}      Decorated fn.
   */
  function originalFnCallDecorator(fn, fnName) {
    return function() {
      fn.apply(this, arguments);
      if (typeof _console[fnName] === "function") {
        _console[fnName].apply(console, arguments);
      }
    };
  }

  // Public API
  window.screenLog = {
    init: init,
    log: originalFnCallDecorator(checkInitDecorator(log), "log"),
    clear: originalFnCallDecorator(checkInitDecorator(clear), "clear"),
    info: originalFnCallDecorator(checkInitDecorator(clear), "info"),
    warn: originalFnCallDecorator(checkInitDecorator(warn), "warn"),
    error: originalFnCallDecorator(checkInitDecorator(error), "error"),
    destroy: checkInitDecorator(destroy)
  };
})();
