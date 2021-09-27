/* @flow strict */

import invariant from 'graphql/jsutils/invariant';
import { GraphQLNonNull } from './graphql';
import {
  isNamedTypeComposer,
  type AnyTypeComposer,
  type NamedTypeComposer,
} from './utils/typeHelpers';
import { ListComposer } from './ListComposer';
import type { SchemaComposer } from './SchemaComposer';

export class NonNullComposer<+T: AnyTypeComposer<any>> {
  +ofType: T;

  constructor(type: T): NonNullComposer<T> {
    invariant(
      !(type instanceof NonNullComposer),
      'You provide NonNull value to NonNullCOmposer constructor. Nesting NonNull is not allowed.'
    );
    this.ofType = type;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  getType(): GraphQLNonNull<any> {
    return new GraphQLNonNull(this.ofType.getType());
  }

  getTypeName(): string {
    return `${this.ofType.getTypeName()}!`;
  }

  getUnwrappedTC(): NamedTypeComposer<any> {
    let tc = this;
    while (!isNamedTypeComposer(tc)) {
      tc = tc.ofType;
    }
    return tc;
  }

  getTypePlural(): ListComposer<NonNullComposer<T>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<T> {
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
  get List(): ListComposer<NonNullComposer<T>> {
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
  get NonNull(): NonNullComposer<T> {
    return this;
  }

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */
  cloneTo(
    anotherSchemaComposer: SchemaComposer<any>,
    cloneMap?: Map<any, any> = new Map()
  ): NonNullComposer<AnyTypeComposer<any>> {
    return new NonNullComposer((this.ofType: any).cloneTo(anotherSchemaComposer, cloneMap));
  }
}
