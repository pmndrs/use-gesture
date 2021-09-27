export declare const EXECUTE = 1;
export declare const ERROR = 2;
export declare const RESULT = 3;
export declare const END = 0;
export declare const CUSTOM_MESSAGE = 4;
declare type CustomMessage = [typeof CUSTOM_MESSAGE, unknown];
declare type FunctionName = string | number | symbol;
declare type FunctionArgs = Array<any>;
declare type ExecuteMessage = [typeof EXECUTE, FunctionName, FunctionArgs];
declare type EndMessage = [typeof END];
export declare type ParentMessageUnion = ExecuteMessage | EndMessage | CustomMessage;
declare type ErrorType = string;
declare type ErrorMessage = string;
declare type ErrorStack = string;
declare type TaskError = [
    typeof ERROR,
    ErrorType,
    ErrorMessage,
    ErrorStack | undefined,
    Error
];
declare type ResultType = unknown;
declare type TaskResult = [typeof RESULT, ResultType];
export declare type ChildMessageUnion = TaskError | TaskResult | CustomMessage;
export {};
