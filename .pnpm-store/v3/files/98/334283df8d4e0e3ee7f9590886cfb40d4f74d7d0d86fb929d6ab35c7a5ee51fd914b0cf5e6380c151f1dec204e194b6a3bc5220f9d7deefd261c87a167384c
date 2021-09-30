import { CompilerOptions } from '@tsd/typescript';
export interface RawCompilerOptions {
    [option: string]: any;
}
export interface Config<Options = CompilerOptions> {
    directory: string;
    compilerOptions: Options;
}
export declare type RawConfig = Partial<Config<RawCompilerOptions>>;
export interface Context {
    cwd: string;
    pkg: any;
    typingsFile: string;
    testFiles: string[];
    config: Config;
}
export declare enum DiagnosticCode {
    AwaitExpressionOnlyAllowedWithinAsyncFunction = 1308,
    TopLevelAwaitOnlyAllowedWhenModuleESNextOrSystem = 1378,
    GenericTypeRequiresTypeArguments = 2314,
    TypeIsNotAssignableToOtherType = 2322,
    TypeDoesNotSatisfyTheConstraint = 2344,
    PropertyDoesNotExistOnType = 2339,
    ArgumentTypeIsNotAssignableToParameterType = 2345,
    CannotAssignToReadOnlyProperty = 2540,
    ExpectedArgumentsButGotOther = 2554,
    TypeHasNoPropertiesInCommonWith = 2559,
    ValueOfTypeNotCallable = 2348,
    ExpressionNotCallable = 2349,
    OnlyVoidFunctionIsNewCallable = 2350,
    ExpressionNotConstructable = 2351,
    NoOverloadExpectsCountOfArguments = 2575,
    ThisContextOfTypeNotAssignableToMethodOfThisType = 2684,
    PropertyMissingInType1ButRequiredInType2 = 2741,
    NoOverloadExpectsCountOfTypeArguments = 2743,
    NoOverloadMatches = 2769,
    MemberCannotHaveOverrideModifierBecauseItIsNotDeclaredInBaseClass = 4113,
    MemberMustHaveOverrideModifier = 4114,
    NewExpressionTargetLackingConstructSignatureHasAnyType = 7009
}
export interface Diagnostic {
    fileName: string;
    message: string;
    severity: 'error' | 'warning';
    line?: number;
    column?: number;
}
export interface Location {
    fileName: string;
    start: number;
    end: number;
}
