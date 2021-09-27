"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NonNullComposer = void 0;

var _invariant = _interopRequireDefault(require("graphql/jsutils/invariant"));

var _graphql = require("./graphql");

var _typeHelpers = require("./utils/typeHelpers");

var _ListComposer = require("./ListComposer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NonNullComposer {
  constructor(type) {
    (0, _invariant.default)(!(type instanceof NonNullComposer), 'You provide NonNull value to NonNullCOmposer constructor. Nesting NonNull is not allowed.');
    this.ofType = type; // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */
  }

  getType() {
    return new _graphql.GraphQLNonNull(this.ofType.getType());
  }

  getTypeName() {
    return `${this.ofType.getTypeName()}!`;
  }

  getUnwrappedTC() {
    let tc = this;

    while (!(0, _typeHelpers.isNamedTypeComposer)(tc)) {
      tc = tc.ofType;
    }

    return tc;
  }

  getTypePlural() {
    return new _ListComposer.ListComposer(this);
  }

  getTypeNonNull() {
    return this;
  }
  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const UserTC = schemaComposer.createObjectTC(`type User { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [User]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [User!]
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [User!]!
   *   })
   */


  get List() {
    return new _ListComposer.ListComposer(this);
  }
  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const UserTC = schemaComposer.createObjectTC(`type User { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [User]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [User!]!
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [User!]!
   *   })
   */


  get NonNull() {
    return this;
  }
  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    return new NonNullComposer(this.ofType.cloneTo(anotherSchemaComposer, cloneMap));
  }

}

exports.NonNullComposer = NonNullComposer;