import { Span } from "opentracing";
import { GraphQLRunner } from "./graphql-runner";
import { IExecutionResult, PageContext } from "./types";
export interface IQueryJob {
    id: string;
    hash?: string;
    query: string;
    componentPath: string;
    context: PageContext;
    isPage: boolean;
    pluginCreatorId?: string;
}
export declare function queryRunner(graphqlRunner: GraphQLRunner, queryJob: IQueryJob, parentSpan: Span | undefined): Promise<IExecutionResult>;
