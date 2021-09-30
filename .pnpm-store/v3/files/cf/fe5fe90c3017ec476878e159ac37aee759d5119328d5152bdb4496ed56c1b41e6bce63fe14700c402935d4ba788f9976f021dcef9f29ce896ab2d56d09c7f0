import { SelectionSetNode, FieldNode } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext } from '../types';
export default class AddSelectionSets implements Transform {
    private readonly transformer;
    constructor(selectionSetsByType: Record<string, SelectionSetNode>, selectionSetsByField: Record<string, Record<string, SelectionSetNode>>, dynamicSelectionSetsByField: Record<string, Record<string, Array<(node: FieldNode) => SelectionSetNode>>>);
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
}
