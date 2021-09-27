/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { ASTVisitor, DocumentNode, ValidationRule, ValidationContext, ExecutionArgs, ExecutionResult, FormattedExecutionResult, GraphQLSchema, GraphQLFieldResolver, GraphQLTypeResolver, GraphQLFormattedError } from 'graphql';
import { Source, GraphQLError } from 'graphql';
import { GraphiQLOptions } from './renderGraphiQL';
declare type Request = IncomingMessage & {
    url: string;
};
declare type Response = ServerResponse & {
    json?: (data: unknown) => void;
};
declare type MaybePromise<T> = Promise<T> | T;
/**
 * Used to configure the graphqlHTTP middleware by providing a schema
 * and other configuration options.
 *
 * Options can be provided as an Object, a Promise for an Object, or a Function
 * that returns an Object or a Promise for an Object.
 */
export declare type Options = ((request: Request, response: Response, params?: GraphQLParams) => MaybePromise<OptionsData>) | MaybePromise<OptionsData>;
export interface OptionsData {
    /**
     * A GraphQL schema from graphql-js.
     */
    schema: GraphQLSchema;
    /**
     * A value to pass as the context to this middleware.
     */
    context?: unknown;
    /**
     * An object to pass as the rootValue to the graphql() function.
     */
    rootValue?: unknown;
    /**
     * A boolean to configure whether the output should be pretty-printed.
     */
    pretty?: boolean;
    /**
     * An optional array of validation rules that will be applied on the document
     * in additional to those defined by the GraphQL spec.
     */
    validationRules?: ReadonlyArray<(ctx: ValidationContext) => ASTVisitor>;
    /**
     * An optional function which will be used to validate instead of default `validate`
     * from `graphql-js`.
     */
    customValidateFn?: (schema: GraphQLSchema, documentAST: DocumentNode, rules: ReadonlyArray<ValidationRule>) => ReadonlyArray<GraphQLError>;
    /**
     * An optional function which will be used to execute instead of default `execute`
     * from `graphql-js`.
     */
    customExecuteFn?: (args: ExecutionArgs) => MaybePromise<ExecutionResult>;
    /**
     * An optional function which will be used to format any errors produced by
     * fulfilling a GraphQL operation. If no function is provided, GraphQL's
     * default spec-compliant `formatError` function will be used.
     */
    customFormatErrorFn?: (error: GraphQLError) => GraphQLFormattedError;
    /**
     * An optional function which will be used to create a document instead of
     * the default `parse` from `graphql-js`.
     */
    customParseFn?: (source: Source) => DocumentNode;
    /**
     * `formatError` is deprecated and replaced by `customFormatErrorFn`. It will
     *  be removed in version 1.0.0.
     */
    formatError?: (error: GraphQLError) => GraphQLFormattedError;
    /**
     * An optional function for adding additional metadata to the GraphQL response
     * as a key-value object. The result will be added to "extensions" field in
     * the resulting JSON. This is often a useful place to add development time
     * info such as the runtime of a query or the amount of resources consumed.
     *
     * Information about the request is provided to be used.
     *
     * This function may be async.
     */
    extensions?: (info: RequestInfo) => MaybePromise<undefined | {
        [key: string]: unknown;
    }>;
    /**
     * A boolean to optionally enable GraphiQL mode.
     * Alternatively, instead of `true` you can pass in an options object.
     */
    graphiql?: boolean | GraphiQLOptions;
    /**
     * A resolver function to use when one is not provided by the schema.
     * If not provided, the default field resolver is used (which looks for a
     * value or method on the source value with the field's name).
     */
    fieldResolver?: GraphQLFieldResolver<unknown, unknown>;
    /**
     * A type resolver function to use when none is provided by the schema.
     * If not provided, the default type resolver is used (which looks for a
     * `__typename` field or alternatively calls the `isTypeOf` method).
     */
    typeResolver?: GraphQLTypeResolver<unknown, unknown>;
}
/**
 * All information about a GraphQL request.
 */
export interface RequestInfo {
    /**
     * The parsed GraphQL document.
     */
    document: DocumentNode;
    /**
     * The variable values used at runtime.
     */
    variables: {
        readonly [name: string]: unknown;
    } | null;
    /**
     * The (optional) operation name requested.
     */
    operationName: string | null;
    /**
     * The result of executing the operation.
     */
    result: FormattedExecutionResult;
    /**
     * A value to pass as the context to the graphql() function.
     */
    context?: unknown;
}
declare type Middleware = (request: Request, response: Response) => Promise<void>;
/**
 * Middleware for express; takes an options object or function as input to
 * configure behavior, and returns an express middleware.
 */
export declare function graphqlHTTP(options: Options): Middleware;
export interface GraphQLParams {
    query: string | null;
    variables: {
        readonly [name: string]: unknown;
    } | null;
    operationName: string | null;
    raw: boolean;
}
/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the GraphQL request parameters.
 */
export declare function getGraphQLParams(request: Request): Promise<GraphQLParams>;
export {};
