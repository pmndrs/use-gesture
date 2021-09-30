import { isFunction } from './utils/is';
import { GraphQLType } from './graphql';
import { NamedTypeComposer } from './utils/typeHelpers';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { inspect } from './utils/misc';
import { SchemaComposer } from './SchemaComposer';

export class ThunkComposer<
  T extends NamedTypeComposer<any> = NamedTypeComposer<any>,
  G extends GraphQLType = GraphQLType
> {
  protected thunk: Function;
  protected typeName: string | void;
  protected _typeFromThunk: T | void;
  public ofType: T;

  constructor(thunk: Function, typeName?: string);

  public getUnwrappedTC(): T;

  public getType(): G;

  public getTypeName(): string;

  public getTypePlural(): ListComposer<ThunkComposer<T, G>>;

  public getTypeNonNull(): NonNullComposer<ThunkComposer<T, G>>;

  /**
   * Get Type wrapped in List modifier
   */
  public get List(): ListComposer<ThunkComposer<T, G>>;

  /**
   * Get Type wrapped in NonNull modifier
   */
  public get NonNull(): NonNullComposer<ThunkComposer<T, G>>;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): ThunkComposer<NamedTypeComposer<TCtx>, G>;
}
