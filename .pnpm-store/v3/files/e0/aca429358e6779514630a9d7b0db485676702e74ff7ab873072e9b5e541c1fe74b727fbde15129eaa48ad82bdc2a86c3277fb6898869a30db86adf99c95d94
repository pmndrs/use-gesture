import * as reporterActionsForTypes from "./redux/actions";
import { Span } from "opentracing";
import { reporter as gatsbyReporter } from "./reporter";
import { IStructuredError } from "../structured-errors/types";
interface ICreateTimerReporterArguments {
    text: string;
    id: string;
    span: Span;
    reporter: typeof gatsbyReporter;
    reporterActions: typeof reporterActionsForTypes;
}
export interface ITimerReporter {
    start(): void;
    setStatus(statusText: string): void;
    panicOnBuild(arg: any, ...otherArgs: Array<any>): IStructuredError | Array<IStructuredError>;
    panic(arg: any, ...otherArgs: Array<any>): void;
    end(): void;
    span: Span;
}
export declare const createTimerReporter: ({ text, id, span, reporter, reporterActions, }: ICreateTimerReporterArguments) => ITimerReporter;
export {};
