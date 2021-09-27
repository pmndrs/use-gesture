import { GraphQLNonNull } from 'graphql';
import { ListComposer } from './ListComposer';
import { AnyTypeComposer, NamedTypeComposer } from './utils/typeHelpers';
import { SchemaComposer } from './SchemaComposer';

export class NonNullComposer<T extends AnyTypeComposer<any>> {
  public ofType: T;

  constructor(type: T);

  public getType(): GraphQLNonNull<any>;

  public getTypeName(): string;

  public getUnwrappedTC(): NamedTypeComposer<any>;

  public getTypePlural(): ListComposer<NonNullComposer<T>>;

  public getTypeNonNull(): NonNullComposer<T>;

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
  public get List(): ListComposer<NonNullComposer<T>>;

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
  public get NonNull(): NonNullComposer<T>;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): NonNullComposer<AnyTypeComposer<TCtx>>;
}
