import { GraphQLList } from './graphql';
import { isNamedTypeComposer } from './utils/typeHelpers';
import { NonNullComposer } from './NonNullComposer';
export class ListComposer {
  constructor(type) {
    this.ofType = type; // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */
  }

  getType() {
    return new GraphQLList(this.ofType.getType());
  }

  getTypeName() {
    return `[${this.ofType.getTypeName()}]`;
  }

  getUnwrappedTC() {
    let tc = this;

    while (!isNamedTypeComposer(tc)) {
      tc = tc.ofType;
    }

    return tc;
  }

  getTypePlural() {
    return new ListComposer(this);
  }

  getTypeNonNull() {
    return new NonNullComposer(this);
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
    return new ListComposer(this);
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
    return new NonNullComposer(this);
  }
  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    return new ListComposer(this.ofType.cloneTo(anotherSchemaComposer, cloneMap));
  }

}