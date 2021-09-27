import { ICreateJobV2Action, IRemoveStaleJobV2Action, IEndJobV2Action, IGatsbyState, IGatsbyIncompleteJobV2, IGatsbyCompleteJobV2, IDeleteCacheAction } from "../types";
export declare const jobsV2Reducer: (state: {
    incomplete: Map<string, IGatsbyIncompleteJobV2>;
    complete: Map<string, IGatsbyCompleteJobV2>;
} | undefined, action: ICreateJobV2Action | IRemoveStaleJobV2Action | IEndJobV2Action | IDeleteCacheAction) => IGatsbyState["jobsV2"];
