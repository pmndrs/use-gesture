export type ObjMap<T> = Record<string, T>;
export type ObjMapReadOnly<T> = Readonly<Record<string, Readonly<T>>>;
export type MaybePromise<T> = Promise<T> | T;

// Workaround for fixing "Maximum call stack size exceeded" in Typescript
// See https://github.com/microsoft/TypeScript/issues/31230 for more details
// Try to return back these checks in TS 3.8:
// export type Thunk<T> = (() => T) | T;
export type Thunk<T> = (() => any) | T;

export type ThunkWithSchemaComposer<T, SC> = ((schemaComposer: SC) => T) | T;

export type DirectiveArgs = { [key: string]: any };
export type ExtensionsDirective = {
  name: string;
  args: DirectiveArgs;
};
export type Extensions = {
  [key: string]: any;
  directives?: ExtensionsDirective[];
};
