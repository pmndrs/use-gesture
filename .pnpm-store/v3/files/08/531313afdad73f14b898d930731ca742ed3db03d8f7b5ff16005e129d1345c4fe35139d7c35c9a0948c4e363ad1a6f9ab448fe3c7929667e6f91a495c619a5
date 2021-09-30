"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThunkComposer = void 0;

var _is = require("./utils/is");

var _ListComposer = require("./ListComposer");

var _NonNullComposer = require("./NonNullComposer");

var _misc = require("./utils/misc");

/* eslint-disable no-unused-vars */
class ThunkComposer {
  get ofType() {
    if (!this._typeFromThunk) {
      this._typeFromThunk = this._thunk();
    }

    if (!this._typeFromThunk) {
      throw new Error(`ThunkComposer(${this._typeName || ''}) returns empty value: ${(0, _misc.inspect)(this._typeFromThunk)}`);
    }

    return this._typeFromThunk;
  }

  constructor(thunk, typeName) {
    this._thunk = thunk;

    if (typeName && typeof typeName === 'string') {
      this._typeName = typeName;
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  }

  getUnwrappedTC() {
    return this.ofType;
  }

  getType() {
    return this.ofType.getType();
  }

  getTypeName() {
    if (this._typeFromThunk && (0, _is.isFunction)(this._typeFromThunk.getTypeName)) {
      return this._typeFromThunk.getTypeName();
    } else if (this._typeName) {
      return this._typeName;
    }

    return this.getUnwrappedTC().getTypeName();
  }

  getTypePlural() {
    return new _ListComposer.ListComposer(this);
  }

  getTypeNonNull() {
    return new _NonNullComposer.NonNullComposer(this);
  }
  /**
   * Get Type wrapped in List modifier
   */


  get List() {
    return new _ListComposer.ListComposer(this);
  }
  /**
   * Get Type wrapped in NonNull modifier
   */


  get NonNull() {
    return new _NonNullComposer.NonNullComposer(this);
  }
  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    const cloned = this.ofType.cloneTo(anotherSchemaComposer, cloneMap);
    return new ThunkComposer(() => cloned, this._typeName);
  }

}

exports.ThunkComposer = ThunkComposer;