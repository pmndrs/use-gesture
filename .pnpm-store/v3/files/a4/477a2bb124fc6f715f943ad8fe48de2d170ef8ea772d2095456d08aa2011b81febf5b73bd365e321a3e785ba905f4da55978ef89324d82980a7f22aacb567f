import { DocumentNode, ASTNode, StringValueNode } from 'graphql';
import { GraphQLParseOptions } from './Interfaces';
export declare function parseGraphQLSDL(location: string, rawSDL: string, options?: GraphQLParseOptions): {
    location: string;
    document: DocumentNode;
    rawSDL: string;
};
export declare function getLeadingCommentBlock(node: ASTNode): void | string;
export declare function transformCommentsToDescriptions(sourceSdl: string, options?: GraphQLParseOptions): DocumentNode | null;
declare type DiscriminateUnion<T, U> = T extends U ? T : never;
declare type DescribableASTNodes = DiscriminateUnion<ASTNode, {
    description?: StringValueNode;
}>;
export declare function isDescribable(node: ASTNode): node is DescribableASTNodes;
export {};
