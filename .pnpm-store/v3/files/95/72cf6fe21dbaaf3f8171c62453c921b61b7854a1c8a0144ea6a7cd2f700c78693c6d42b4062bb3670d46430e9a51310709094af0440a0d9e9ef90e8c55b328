import { DefinitionNode, DocumentNode } from 'graphql';
export declare type VisitedFilesMap = Map<string, Map<string, Set<DefinitionNode>>>;
export declare function processImport(filePath: string, cwd?: string, predefinedImports?: Record<string, string>, visitedFiles?: VisitedFilesMap): DocumentNode;
export declare function parseImportLine(importLine: string): {
    imports: string[];
    from: string;
};
