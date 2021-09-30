/* @flow strict */

export type ObjMap<T> = { [key: string]: T, __proto__: null };
export type ObjMapReadOnly<T> = { +[key: string]: T, __proto__: null };
export type Thunk<+T> = (() => T) | T;
export type ThunkWithSchemaComposer<+T, SC> = ((schemaComposer: SC) => T) | T;
export type MaybePromise<+T> = Promise<T> | T;

export type DirectiveArgs = { [key: string]: any };
export type ExtensionsDirective = {
  name: string,
  args: DirectiveArgs,
};
export type Extensions = {
  [key: string]: any,
  directives?: Array<ExtensionsDirective>,
};
