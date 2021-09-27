import { GraphQLSchema, GraphQLError, SelectionSetNode } from 'graphql';
import { SubschemaConfig, ExternalObject } from './types';
export declare function isExternalObject(data: any): data is ExternalObject;
export declare function annotateExternalObject(object: any, errors: Array<GraphQLError>, subschema: GraphQLSchema | SubschemaConfig): ExternalObject;
export declare function getSubschema(object: ExternalObject, responseKey: string): GraphQLSchema | SubschemaConfig;
export declare function getUnpathedErrors(object: ExternalObject): Array<GraphQLError>;
export declare function mergeExternalObjects(schema: GraphQLSchema, path: Array<string | number>, typeName: string, target: ExternalObject, sources: Array<ExternalObject>, selectionSets: Array<SelectionSetNode>): ExternalObject;
