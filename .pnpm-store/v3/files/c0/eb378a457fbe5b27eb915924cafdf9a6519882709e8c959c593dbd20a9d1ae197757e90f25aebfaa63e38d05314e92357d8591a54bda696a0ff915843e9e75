import {
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLResolveInfo,
  GraphQLFieldConfigArgumentMap,
} from 'graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import {
  ObjectTypeComposerArgumentConfig,
  ObjectTypeComposerArgumentConfigMapDefinition,
  ObjectTypeComposerArgumentConfigMap,
  ObjectTypeComposer,
  ObjectTypeComposerArgumentConfigAsObjectDefinition,
  ObjectTypeComposerArgumentConfigDefinition,
} from './ObjectTypeComposer';
import { Thunk, ThunkWithSchemaComposer, Extensions } from './utils/definitions';
import { ProjectionType } from './utils/projection';
import {
  ComposeOutputTypeDefinition,
  ComposeInputType,
  ComposeOutputType,
  ComposeInputTypeDefinition,
  ComposeNamedOutputType,
  ComposeNamedInputType,
} from './utils/typeHelpers';

export type ResolverKinds = 'query' | 'mutation' | 'subscription';

export type ResolverDefinition<TSource, TContext, TArgs = any> = {
  type?: ThunkWithSchemaComposer<
    | ComposeOutputType<TContext>
    | ComposeOutputTypeDefinition<TContext>
    | Resolver<any, TContext, any>,
    SchemaComposer<TContext>
  >;
  resolve?: ResolverRpCb<TSource, TContext, TArgs>;
  args?: ObjectTypeComposerArgumentConfigMapDefinition<TArgs>;
  name?: string;
  displayName?: string;
  kind?: ResolverKinds;
  description?: string;
  deprecationReason?: string;
  projection?: ProjectionType;
  parent?: Resolver<any, TContext, any>;
  extensions?: Extensions;
};

export type ResolverResolveParams<TSource, TContext, TArgs = any> = {
  source: TSource;
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
  projection: Partial<ProjectionType>;
  [opt: string]: any;
};

export type ResolverFilterArgFn<TSource, TContext, TArgs = any> = (
  query: any,
  value: any,
  resolveParams: ResolverResolveParams<TSource, TContext, TArgs>
) => any;

export type ResolverFilterArgConfigDefinition<TSource, TContext, TArgs = any> = {
  name: string;
  type: ComposeInputTypeDefinition;
  description?: string | null | void;
  query?: ResolverFilterArgFn<TSource, TContext, TArgs>;
  filterTypeNameFallback?: string;
  defaultValue?: any;
};

export type ResolverSortArgFn<TSource, TContext, TArgs = any> = (
  resolveParams: ResolverResolveParams<TSource, TContext, TArgs>
) => any;

export type ResolverSortArgConfig<TSource, TContext, TArgs = any> = {
  name: string;
  sortTypeNameFallback?: string;
  // value also can be an `Object`, but flow does not understande union with object and function
  // see https://github.com/facebook/flow/issues/1948
  value:
    | { [key: string]: any }
    | ResolverSortArgFn<TSource, TContext, TArgs>
    | string
    | number
    | boolean
    | any[];
  deprecationReason?: string | null;
  description?: string | null;
};

export type ResolverWrapCb<TNewSource, TPrevSource, TContext, TNewArgs = any, TPrevArgs = any> = (
  newResolver: Resolver<TNewSource, TContext, TNewArgs>,
  prevResolver: Resolver<TPrevSource, TContext, TPrevArgs>
) => Resolver<TNewSource, TContext, TNewArgs>;

export type ResolverRpCb<TSource, TContext, TArgs = any> = (
  resolveParams: ResolverResolveParams<TSource, TContext, TArgs>
) => Promise<any> | any;
export type ResolverNextRpCb<TSource, TContext, TArgs = any> = (
  next: ResolverRpCb<TSource, TContext, TArgs>
) => ResolverRpCb<TSource, TContext, TArgs>;

export type ResolverDebugOpts = {
  showHidden?: boolean;
  depth?: number;
  colors?: boolean;
};

export type ResolverMiddleware<TSource, TContext, TArgs = any> = (
  resolve: (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any,
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;

/**
 * The most interesting class in `graphql-compose`. The main goal of `Resolver` is to keep available resolve methods for Type and use them for building relation with other types.
 */
export class Resolver<TSource = any, TContext = any, TArgs = any, TReturn = any> {
  public schemaComposer: SchemaComposer<TContext>;
  public type: ComposeOutputType<TContext>;
  public args: ObjectTypeComposerArgumentConfigMap<any>;
  public name: string;
  public displayName: string | void;
  public kind: ResolverKinds | void;
  public description: string | void;
  public parent: Resolver<TSource, TContext, any> | void;
  public extensions: Extensions | void;
  public resolve: (
    resolveParams: Partial<ResolverResolveParams<TSource, TContext, TArgs>>
  ) => Promise<any> | any;

  constructor(
    opts: ResolverDefinition<TSource, TContext, TArgs>,
    schemaComposer: SchemaComposer<TContext>
  );

  /**
   * -----------------------------------------------
   * Output type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLOutputType;

  public getTypeName(): string;

  public getTypeComposer(): ComposeNamedOutputType<TContext>;

  /**
   * Almost alias for `getTypeComposer`, but returns only ObjectTypeComposer.
   * It will throw an error if resolver has another kind of type.
   */
  public getOTC(): ObjectTypeComposer<TReturn, TContext>;

  public setType<TNewReturn>(
    composeType: ThunkWithSchemaComposer<
      | ComposeOutputType<TContext>
      | ComposeOutputTypeDefinition<TContext>
      | Resolver<any, TContext, any>,
      SchemaComposer<TContext>
    >
  ): Resolver<TSource, TContext, TArgs, TNewReturn>;

  /**
   *  -----------------------------------------------
   * Args methods
   * -----------------------------------------------
   */

  public hasArg(argName: string): boolean;

  public getArg(argName: string): ObjectTypeComposerArgumentConfig;

  public getArgConfig(argName: string): GraphQLArgumentConfig;

  public getArgType(argName: string): GraphQLInputType;

  public getArgTypeName(fieldName: string): string;

  public getArgs(): ObjectTypeComposerArgumentConfigMap<TArgs>;

  public getArgNames(): string[];

  public setArgs<TNewArgs>(
    args: ObjectTypeComposerArgumentConfigMapDefinition<TNewArgs>
  ): Resolver<TSource, TContext, TNewArgs>;

  public setArg(argName: string, argConfig: ObjectTypeComposerArgumentConfigDefinition): this;

  public setArgType(argName: string, typeDef: Thunk<ComposeInputTypeDefinition>): this;

  public extendArg(
    argName: string,
    partialArgConfig: Partial<ObjectTypeComposerArgumentConfigAsObjectDefinition>
  ): this;

  public addArgs(newArgs: ObjectTypeComposerArgumentConfigMapDefinition<any>): this;

  public removeArg(argNameOrArray: string | string[]): this;

  public removeOtherArgs(argNameOrArray: string | string[]): this;

  public reorderArgs(names: string[]): this;

  public getArgTC(argName: string): ComposeNamedInputType<TContext>;

  public getArgITC(argName: string): InputTypeComposer<TContext>;

  public isArgNonNull(argName: string): boolean;

  public makeArgNonNull(argNameOrArray: string | string[]): this;

  public makeRequired(argNameOrArray: string | string[]): this;

  public makeArgNullable(argNameOrArray: string | string[]): this;

  public makeOptional(argNameOrArray: string | string[]): this;

  public isArgPlural(argName: string): boolean;

  public makeArgPlural(argNameOrArray: string | string[]): this;

  public makeArgNonPlural(argNameOrArray: string | string[]): this;

  public cloneArg(argName: string, newTypeName: string): this;

  public addFilterArg(opts: ResolverFilterArgConfigDefinition<TSource, TContext, TArgs>): this;

  public addSortArg(opts: ResolverSortArgConfig<TSource, TContext, TArgs>): this;

  /**
   * -----------------------------------------------
   * Resolve methods
   * -----------------------------------------------
   */

  public getResolve(): ResolverRpCb<TSource, TContext, TArgs>;

  public setResolve(resolve: ResolverRpCb<TSource, TContext, TArgs>): this;

  /**
   * -----------------------------------------------
   * Wrap methods
   * -----------------------------------------------
   */

  /**
   * You may construct a new resolver with wrapped logic:
   *
   * @example
   *     const log = [];
   *
   *     const mw1 = async (resolve, source, args, context, info) => {
   *       log.push('m1.before');
   *       const res = await resolve(source, args, context, info);
   *       log.push('m1.after');
   *       return res;
   *     };
   *
   *     const mw2 = async (resolve, source, args, context, info) => {
   *       log.push('m2.before');
   *       const res = await resolve(source, args, context, info);
   *       log.push('m2.after');
   *       return res;
   *     };
   *
   *     const newResolver = Resolver.withMiddlewares([mw1, mw2]);
   *     await newResolver.resolve({});
   *
   *     expect(log).toEqual([
   *       'm1.before',
   *       'm2.before',
   *       'call resolve',
   *       'm2.after',
   *       'm1.after'
   *     ]);
   */
  public withMiddlewares(
    middlewares: Array<ResolverMiddleware<TSource, TContext, TArgs>>
  ): Resolver<TSource, TContext, TArgs>;

  public wrap<TNewSource = TSource, TNewArgs = TArgs>(
    cb?: ResolverWrapCb<TNewSource, TSource, TContext, TNewArgs, TArgs>,
    newResolverOpts?: Partial<ResolverDefinition<TNewSource, TContext, TArgs>>
  ): Resolver<TNewSource, TContext, TNewArgs>;

  public wrapResolve<TCSource = TSource, TCArgs = TArgs>(
    cb: ResolverNextRpCb<TCSource, TContext, TCArgs>,
    wrapperName?: string
  ): Resolver<TCSource, TContext, TCArgs>;

  public wrapArgs<TCArgs = TArgs>(
    cb: (
      prevArgs: GraphQLFieldConfigArgumentMap
    ) => ObjectTypeComposerArgumentConfigMapDefinition<TArgs>,
    wrapperName?: string
  ): Resolver<TSource, TContext, TCArgs>;

  public wrapCloneArg<TCArgs = TArgs>(
    argName: string,
    newTypeName: string
  ): Resolver<TSource, TContext, TCArgs>;

  public wrapType(
    cb: (prevType: ComposeOutputType<TContext>) => ComposeOutputTypeDefinition<TContext>,
    wrapperName?: string
  ): Resolver<TSource, TContext, TArgs>;

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  public getFieldConfig(opts?: {
    projection?: ProjectionType;
  }): GraphQLFieldConfig<TSource, TContext, TArgs>;

  public getKind(): ResolverKinds | void;

  public setKind(kind: string): this;

  public getDescription(): string | null;

  public setDescription(description: string | void): this;

  public getDeprecationReason(): string | null;

  public setDeprecationReason(reason: string | void): this;

  public get(path: string | string[]): any;

  /**
   * Clone this Resolver with overriding of some options.
   * Internally it just copies all properties.
   * But for `args` and `projection` it recreates objects with the same type & values (it allows to add or remove properties without affection old Resolver).
   */
  public clone<TNewSource = TSource, TNewArgs = TArgs>(
    opts?: Partial<ResolverDefinition<TNewSource, TContext, TNewArgs>>
  ): Resolver<TNewSource, TContext, TNewArgs>;

  /**
   * Clone this resolver to another SchemaComposer.
   * Also will be clonned all sub-types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): Resolver<any, TCtx, any>;

  /**
   * -----------------------------------------------
   * Extensions methods
   * -----------------------------------------------
   */

  public getExtensions(): Extensions;

  public setExtensions(extensions: Extensions): this;

  public extendExtensions(extensions: Extensions): this;

  public clearExtensions(): this;

  public getExtension(extensionName: string): any;

  public hasExtension(extensionName: string): boolean;

  public setExtension(extensionName: string, value: any): this;

  public removeExtension(extensionName: string): this;

  /**
   * -----------------------------------------------
   * Debug methods
   * -----------------------------------------------
   */

  public getNestedName(): string;

  public toString(colors?: boolean): string;

  public setDisplayName(name: string): this;

  public toDebugStructure(colors?: boolean): object;

  public debugExecTime(): Resolver<TSource, TContext, TArgs>;

  public debugParams(
    filterPaths: (string | string[]) | null,
    opts?: ResolverDebugOpts
  ): Resolver<TSource, TContext, TArgs>;

  public debugPayload(
    filterPaths: (string | string[]) | null,
    opts?: ResolverDebugOpts
  ): Resolver<TSource, TContext, TArgs>;

  public debug(
    filterDotPaths?: {
      params?: string | string[];
      payload?: string | string[];
    },
    opts?: ResolverDebugOpts
  ): Resolver<TSource, TContext, TArgs>;
}
