'use strict';

var globalState = {
  currentTooltipId: null,
  listeners: new Set(),
  subscribe: function subscribe(listener) {
    var _this = this;

    this.listeners.add(listener);
    return function () {
      _this.listeners.delete(listener);
    };
  },
  show: function show(id) {
    this.currentTooltipId = id;
    this.listeners.forEach(function (listener) {
      return listener(id);
    });
  },
  hide: function hide(id) {
    if (this.currentTooltipId === id) {
      this.currentTooltipId = null;
      this.listeners.forEach(function (listener) {
        return listener(null);
      });
    }
  }
};

exports.globalState = globalState;
