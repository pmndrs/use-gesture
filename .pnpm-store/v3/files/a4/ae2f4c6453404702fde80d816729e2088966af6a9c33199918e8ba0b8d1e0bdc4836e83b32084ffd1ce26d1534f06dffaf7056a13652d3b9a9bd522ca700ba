import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext } from '@graphql-tools/delegate';
export default class ExtractField implements Transform {
    private readonly from;
    private readonly to;
    constructor({ from, to }: {
        from: Array<string>;
        to: Array<string>;
    });
    transformRequest(originalRequest: Request, _delegationContext: DelegationContext, _transformationContext: Record<string, any>): Request;
}
