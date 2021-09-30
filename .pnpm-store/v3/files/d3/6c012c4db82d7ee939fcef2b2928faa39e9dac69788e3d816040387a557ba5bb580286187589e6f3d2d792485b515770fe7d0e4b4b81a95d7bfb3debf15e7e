import { SelectionSetNode, TypeInfo } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext } from '../types';
export default class VisitSelectionSets implements Transform {
    private readonly visitor;
    constructor(visitor: (node: SelectionSetNode, typeInfo: TypeInfo) => SelectionSetNode);
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, _transformationContext: Record<string, any>): Request;
}
