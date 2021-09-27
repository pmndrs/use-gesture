import { GraphQLResolveInfo, GraphQLOutputType, GraphQLSchema, GraphQLError } from 'graphql';
import { ExecutionResult } from '@graphql-tools/utils';
import { SubschemaConfig, Transform, DelegationContext } from '../types';
export default class CheckResultAndHandleErrors implements Transform {
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, _transformationContext: Record<string, any>): ExecutionResult;
}
export declare function checkResultAndHandleErrors(result: ExecutionResult, context: Record<string, any>, info: GraphQLResolveInfo, responseKey?: string, subschema?: GraphQLSchema | SubschemaConfig, returnType?: GraphQLOutputType, skipTypeMerging?: boolean, onLocatedError?: (originalError: GraphQLError) => GraphQLError): any;
export declare function mergeDataAndErrors(data: any, errors: ReadonlyArray<GraphQLError>, path: Array<string | number>, onLocatedError: (originalError: GraphQLError) => GraphQLError, index?: number): {
    data: any;
    unpathedErrors: Array<GraphQLError>;
};
