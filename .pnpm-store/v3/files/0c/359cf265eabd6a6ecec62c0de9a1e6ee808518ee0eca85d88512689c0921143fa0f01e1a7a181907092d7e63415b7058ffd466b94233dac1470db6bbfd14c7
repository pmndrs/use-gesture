'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const graphql = require('graphql');
const fs = require('fs');
const path = require('path');
const resolveFrom = _interopDefault(require('resolve-from'));
const process = require('process');

/* eslint-disable no-unused-expressions */
const builtinTypes = ['String', 'Float', 'Int', 'Boolean', 'ID', 'Upload'];
const builtinDirectives = [
    'deprecated',
    'skip',
    'include',
    'cacheControl',
    'key',
    'external',
    'requires',
    'provides',
    'connection',
    'client',
    'specifiedBy',
];
const IMPORT_FROM_REGEX = /^import\s+(\*|(.*))\s+from\s+('|")(.*)('|");?$/;
const IMPORT_DEFAULT_REGEX = /^import\s+('|")(.*)('|");?$/;
function processImport(filePath, cwd = process.cwd(), predefinedImports = {}, visitedFiles = new Map()) {
    const set = visitFile(filePath, path.join(cwd + '/root.graphql'), visitedFiles, predefinedImports);
    const definitionStrSet = new Set();
    let definitionsStr = '';
    if (set != null) {
        for (const defs of set.values()) {
            for (const def of defs) {
                const defStr = graphql.print(def);
                if (!definitionStrSet.has(defStr)) {
                    definitionStrSet.add(defStr);
                    definitionsStr += defStr + '\n';
                }
            }
        }
    }
    return (definitionsStr === null || definitionsStr === void 0 ? void 0 : definitionsStr.length)
        ? graphql.parse(new graphql.Source(definitionsStr, filePath))
        : {
            kind: graphql.Kind.DOCUMENT,
            definitions: [],
        };
}
function visitFile(filePath, cwd, visitedFiles, predefinedImports) {
    var _a;
    if (!path.isAbsolute(filePath) && !(filePath in predefinedImports)) {
        filePath = resolveFilePath(cwd, filePath);
    }
    if (!visitedFiles.has(filePath)) {
        const fileContent = filePath in predefinedImports ? predefinedImports[filePath] : fs.readFileSync(filePath, 'utf8');
        const importLines = [];
        let otherLines = '';
        for (const line of fileContent.split('\n')) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#import ') || trimmedLine.startsWith('# import ')) {
                importLines.push(trimmedLine);
            }
            else if (trimmedLine) {
                otherLines += line + '\n';
            }
        }
        const definitionsByName = new Map();
        const dependenciesByDefinitionName = new Map();
        if (otherLines) {
            const fileDefinitionMap = new Map();
            // To prevent circular dependency
            visitedFiles.set(filePath, fileDefinitionMap);
            const document = graphql.parse(new graphql.Source(otherLines, filePath), {
                noLocation: true,
            });
            for (const definition of document.definitions) {
                if ('name' in definition || definition.kind === graphql.Kind.SCHEMA_DEFINITION) {
                    const definitionName = 'name' in definition && definition.name ? definition.name.value : 'schema';
                    if (!definitionsByName.has(definitionName)) {
                        definitionsByName.set(definitionName, new Set());
                    }
                    const definitionsSet = definitionsByName.get(definitionName);
                    definitionsSet === null || definitionsSet === void 0 ? void 0 : definitionsSet.add(definition);
                    let dependencySet = dependenciesByDefinitionName.get(definitionName);
                    if (!dependencySet) {
                        dependencySet = new Set();
                        dependenciesByDefinitionName.set(definitionName, dependencySet);
                    }
                    switch (definition.kind) {
                        case graphql.Kind.OPERATION_DEFINITION:
                            visitOperationDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.FRAGMENT_DEFINITION:
                            visitFragmentDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.OBJECT_TYPE_DEFINITION:
                            visitObjectTypeDefinitionNode(definition, dependencySet, dependenciesByDefinitionName);
                            break;
                        case graphql.Kind.INTERFACE_TYPE_DEFINITION:
                            visitInterfaceTypeDefinitionNode(definition, dependencySet, dependenciesByDefinitionName);
                            break;
                        case graphql.Kind.UNION_TYPE_DEFINITION:
                            visitUnionTypeDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.ENUM_TYPE_DEFINITION:
                            visitEnumTypeDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.INPUT_OBJECT_TYPE_DEFINITION:
                            visitInputObjectTypeDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.DIRECTIVE_DEFINITION:
                            visitDirectiveDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.SCALAR_TYPE_DEFINITION:
                            visitScalarDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.SCHEMA_DEFINITION:
                            visitSchemaDefinitionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.OBJECT_TYPE_EXTENSION:
                            visitObjectTypeExtensionNode(definition, dependencySet, dependenciesByDefinitionName);
                            break;
                        case graphql.Kind.INTERFACE_TYPE_EXTENSION:
                            visitInterfaceTypeExtensionNode(definition, dependencySet, dependenciesByDefinitionName);
                            break;
                        case graphql.Kind.UNION_TYPE_EXTENSION:
                            visitUnionTypeExtensionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.ENUM_TYPE_EXTENSION:
                            visitEnumTypeExtensionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.INPUT_OBJECT_TYPE_EXTENSION:
                            visitInputObjectTypeExtensionNode(definition, dependencySet);
                            break;
                        case graphql.Kind.SCALAR_TYPE_EXTENSION:
                            visitScalarExtensionNode(definition, dependencySet);
                            break;
                    }
                    if ('fields' in definition && definition.fields) {
                        for (const field of definition.fields) {
                            const definitionName = definition.name.value + '.' + field.name.value;
                            if (!definitionsByName.has(definitionName)) {
                                definitionsByName.set(definitionName, new Set());
                            }
                            (_a = definitionsByName.get(definitionName)) === null || _a === void 0 ? void 0 : _a.add({
                                ...definition,
                                fields: [field],
                            });
                            let dependencySet = dependenciesByDefinitionName.get(definitionName);
                            if (!dependencySet) {
                                dependencySet = new Set();
                                dependenciesByDefinitionName.set(definitionName, dependencySet);
                            }
                            switch (field.kind) {
                                case graphql.Kind.FIELD_DEFINITION:
                                    visitFieldDefinitionNode(field, dependencySet);
                                    break;
                                case graphql.Kind.INPUT_VALUE_DEFINITION:
                                    visitInputValueDefinitionNode(field, dependencySet);
                                    break;
                            }
                        }
                    }
                }
            }
            for (const [definitionName, definitions] of definitionsByName) {
                let definitionsWithDependencies = fileDefinitionMap.get(definitionName);
                if (definitionsWithDependencies == null) {
                    definitionsWithDependencies = new Set();
                    fileDefinitionMap.set(definitionName, definitionsWithDependencies);
                }
                for (const definition of definitions) {
                    definitionsWithDependencies.add(definition);
                }
                const dependenciesOfDefinition = dependenciesByDefinitionName.get(definitionName);
                if (dependenciesOfDefinition) {
                    for (const dependencyName of dependenciesOfDefinition) {
                        const dependencyDefinitions = definitionsByName.get(dependencyName);
                        if (dependencyDefinitions != null) {
                            for (const dependencyDefinition of dependencyDefinitions) {
                                definitionsWithDependencies.add(dependencyDefinition);
                            }
                        }
                    }
                }
            }
        }
        const allImportedDefinitionsMap = new Map();
        for (const line of importLines) {
            const { imports, from } = parseImportLine(line.replace('#', '').trim());
            const importFileDefinitionMap = visitFile(from, filePath, visitedFiles, predefinedImports);
            if (importFileDefinitionMap != null) {
                if (imports.includes('*')) {
                    for (const [importedDefinitionName, importedDefinitions] of importFileDefinitionMap) {
                        const [importedDefinitionTypeName] = importedDefinitionName.split('.');
                        if (!allImportedDefinitionsMap.has(importedDefinitionTypeName)) {
                            allImportedDefinitionsMap.set(importedDefinitionTypeName, new Set());
                        }
                        const allImportedDefinitions = allImportedDefinitionsMap.get(importedDefinitionTypeName);
                        if (allImportedDefinitions) {
                            for (const importedDefinition of importedDefinitions) {
                                allImportedDefinitions.add(importedDefinition);
                            }
                        }
                    }
                }
                else {
                    for (let importedDefinitionName of imports) {
                        if (importedDefinitionName.endsWith('.*')) {
                            // Adding whole type means the same thing with adding every single field
                            importedDefinitionName = importedDefinitionName.replace('.*', '');
                        }
                        const [importedDefinitionTypeName] = importedDefinitionName.split('.');
                        if (!allImportedDefinitionsMap.has(importedDefinitionTypeName)) {
                            allImportedDefinitionsMap.set(importedDefinitionTypeName, new Set());
                        }
                        const allImportedDefinitions = allImportedDefinitionsMap.get(importedDefinitionTypeName);
                        const importedDefinitions = importFileDefinitionMap.get(importedDefinitionName);
                        if (!importedDefinitions) {
                            throw new Error(`${importedDefinitionName} is not exported by ${from} imported by ${filePath}`);
                        }
                        if (allImportedDefinitions != null) {
                            for (const importedDefinition of importedDefinitions) {
                                allImportedDefinitions.add(importedDefinition);
                            }
                        }
                    }
                }
            }
        }
        if (!otherLines) {
            visitedFiles.set(filePath, allImportedDefinitionsMap);
        }
        else {
            const fileDefinitionMap = visitedFiles.get(filePath);
            if (fileDefinitionMap) {
                const addDefinition = (definition, definitionName, definitionSet) => {
                    if (!definitionSet.has(definition)) {
                        definitionSet.add(definition);
                        // Regenerate field exports if some fields are imported after visitor
                        if ('fields' in definition && definition.fields) {
                            for (const field of definition.fields) {
                                const fieldName = field.name.value;
                                const fieldDefinitionName = definition.name.value + '.' + fieldName;
                                const allImportedDefinitions = allImportedDefinitionsMap.get(definitionName);
                                allImportedDefinitions === null || allImportedDefinitions === void 0 ? void 0 : allImportedDefinitions.forEach(importedDefinition => {
                                    if (!fileDefinitionMap.has(fieldDefinitionName)) {
                                        fileDefinitionMap.set(fieldDefinitionName, new Set());
                                    }
                                    const definitionsWithDeps = fileDefinitionMap.get(fieldDefinitionName);
                                    if (definitionsWithDeps) {
                                        addDefinition(importedDefinition, fieldDefinitionName, definitionsWithDeps);
                                    }
                                });
                                const newDependencySet = new Set();
                                switch (field.kind) {
                                    case graphql.Kind.FIELD_DEFINITION:
                                        visitFieldDefinitionNode(field, newDependencySet);
                                        break;
                                    case graphql.Kind.INPUT_VALUE_DEFINITION:
                                        visitInputValueDefinitionNode(field, newDependencySet);
                                        break;
                                }
                                newDependencySet.forEach(dependencyName => {
                                    const definitionsInCurrentFile = fileDefinitionMap.get(dependencyName);
                                    definitionsInCurrentFile === null || definitionsInCurrentFile === void 0 ? void 0 : definitionsInCurrentFile.forEach(def => addDefinition(def, definitionName, definitionSet));
                                    const definitionsFromImports = allImportedDefinitionsMap.get(dependencyName);
                                    definitionsFromImports === null || definitionsFromImports === void 0 ? void 0 : definitionsFromImports.forEach(def => addDefinition(def, definitionName, definitionSet));
                                });
                            }
                        }
                    }
                };
                for (const [definitionName] of definitionsByName) {
                    const definitionsWithDependencies = fileDefinitionMap.get(definitionName);
                    if (definitionsWithDependencies) {
                        const allImportedDefinitions = allImportedDefinitionsMap.get(definitionName);
                        allImportedDefinitions === null || allImportedDefinitions === void 0 ? void 0 : allImportedDefinitions.forEach(importedDefinition => {
                            addDefinition(importedDefinition, definitionName, definitionsWithDependencies);
                        });
                        const dependenciesOfDefinition = dependenciesByDefinitionName.get(definitionName);
                        if (dependenciesOfDefinition) {
                            for (const dependencyName of dependenciesOfDefinition) {
                                // If that dependency cannot be found both in imports and this file, throw an error
                                if (!allImportedDefinitionsMap.has(dependencyName) && !definitionsByName.has(dependencyName)) {
                                    throw new Error(`Couldn't find type ${dependencyName} in any of the schemas.`);
                                }
                                const dependencyDefinitionsFromImports = allImportedDefinitionsMap.get(dependencyName);
                                dependencyDefinitionsFromImports === null || dependencyDefinitionsFromImports === void 0 ? void 0 : dependencyDefinitionsFromImports.forEach(dependencyDefinition => {
                                    addDefinition(dependencyDefinition, definitionName, definitionsWithDependencies);
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    return visitedFiles.get(filePath);
}
function parseImportLine(importLine) {
    let regexMatch = importLine.match(IMPORT_FROM_REGEX);
    if (regexMatch != null) {
        // Apply regex to import line
        // Extract matches into named variables
        const [, wildcard, importsString, , from] = regexMatch;
        if (from) {
            // Extract imported types
            const imports = wildcard === '*' ? ['*'] : importsString.split(',').map(d => d.trim());
            // Return information about the import line
            return { imports, from };
        }
    }
    regexMatch = importLine.match(IMPORT_DEFAULT_REGEX);
    if (regexMatch != null) {
        const [, , from] = regexMatch;
        if (from) {
            return { imports: ['*'], from };
        }
    }
    throw new Error(`
    Import statement is not valid:
    > ${importLine}
    If you want to have comments starting with '# import', please use ''' instead!
    You can only have 'import' statements in the following pattern;
    # import [Type].[Field] from [File]
  `);
}
function resolveFilePath(filePath, importFrom) {
    const dirName = path.dirname(filePath);
    try {
        const fullPath = path.join(dirName, importFrom);
        return fs.realpathSync(fullPath);
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            return resolveFrom(dirName, importFrom);
        }
        throw e;
    }
}
function visitOperationDefinitionNode(node, dependencySet) {
    var _a;
    if ((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) {
        dependencySet.add(node.name.value);
    }
    node.selectionSet.selections.forEach(selectionNode => visitSelectionNode(selectionNode, dependencySet));
}
function visitSelectionNode(node, dependencySet) {
    switch (node.kind) {
        case graphql.Kind.FIELD:
            visitFieldNode(node, dependencySet);
            break;
        case graphql.Kind.FRAGMENT_SPREAD:
            visitFragmentSpreadNode(node, dependencySet);
            break;
        case graphql.Kind.INLINE_FRAGMENT:
            visitInlineFragmentNode(node, dependencySet);
            break;
    }
}
function visitFieldNode(node, dependencySet) {
    var _a;
    (_a = node.selectionSet) === null || _a === void 0 ? void 0 : _a.selections.forEach(selectionNode => visitSelectionNode(selectionNode, dependencySet));
}
function visitFragmentSpreadNode(node, dependencySet) {
    dependencySet.add(node.name.value);
}
function visitInlineFragmentNode(node, dependencySet) {
    node.selectionSet.selections.forEach(selectionNode => visitSelectionNode(selectionNode, dependencySet));
}
function visitFragmentDefinitionNode(node, dependencySet) {
    dependencySet.add(node.name.value);
    node.selectionSet.selections.forEach(selectionNode => visitSelectionNode(selectionNode, dependencySet));
}
function visitObjectTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    const typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(fieldDefinitionNode => visitFieldDefinitionNode(fieldDefinitionNode, dependencySet));
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(namedTypeNode => {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        const interfaceName = namedTypeNode.name.value;
        let set = dependenciesByDefinitionName.get(interfaceName);
        // interface should be dependent to the type as well
        if (set == null) {
            set = new Set();
            dependenciesByDefinitionName.set(interfaceName, set);
        }
        set.add(typeName);
    });
}
function visitDirectiveNode(node, dependencySet) {
    const directiveName = node.name.value;
    if (!builtinDirectives.includes(directiveName)) {
        dependencySet.add(node.name.value);
    }
}
function visitFieldDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    (_a = node.arguments) === null || _a === void 0 ? void 0 : _a.forEach(inputValueDefinitionNode => visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet));
    (_b = node.directives) === null || _b === void 0 ? void 0 : _b.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    visitTypeNode(node.type, dependencySet);
}
function visitTypeNode(node, dependencySet, dependenciesByDefinitionName) {
    switch (node.kind) {
        case graphql.Kind.LIST_TYPE:
            visitListTypeNode(node, dependencySet);
            break;
        case graphql.Kind.NON_NULL_TYPE:
            visitNonNullTypeNode(node, dependencySet);
            break;
        case graphql.Kind.NAMED_TYPE:
            visitNamedTypeNode(node, dependencySet);
            break;
    }
}
function visitListTypeNode(node, dependencySet, dependenciesByDefinitionName) {
    visitTypeNode(node.type, dependencySet);
}
function visitNonNullTypeNode(node, dependencySet, dependenciesByDefinitionName) {
    visitTypeNode(node.type, dependencySet);
}
function visitNamedTypeNode(node, dependencySet) {
    const namedTypeName = node.name.value;
    if (!builtinTypes.includes(namedTypeName)) {
        dependencySet.add(node.name.value);
    }
}
function visitInputValueDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a;
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    visitTypeNode(node.type, dependencySet);
}
function visitInterfaceTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    const typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(fieldDefinitionNode => visitFieldDefinitionNode(fieldDefinitionNode, dependencySet));
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach((namedTypeNode) => {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        const interfaceName = namedTypeNode.name.value;
        let set = dependenciesByDefinitionName.get(interfaceName);
        // interface should be dependent to the type as well
        if (set == null) {
            set = new Set();
            dependenciesByDefinitionName.set(interfaceName, set);
        }
        set.add(typeName);
    });
}
function visitUnionTypeDefinitionNode(node, dependencySet) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.types) === null || _b === void 0 ? void 0 : _b.forEach(namedTypeNode => visitNamedTypeNode(namedTypeNode, dependencySet));
}
function visitEnumTypeDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
}
function visitInputObjectTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(inputValueDefinitionNode => visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet));
}
function visitDirectiveDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.arguments) === null || _a === void 0 ? void 0 : _a.forEach(inputValueDefinitionNode => visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet));
}
function visitObjectTypeExtensionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    const typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(fieldDefinitionNode => visitFieldDefinitionNode(fieldDefinitionNode, dependencySet));
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(namedTypeNode => {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        const interfaceName = namedTypeNode.name.value;
        let set = dependenciesByDefinitionName.get(interfaceName);
        // interface should be dependent to the type as well
        if (set == null) {
            set = new Set();
            dependenciesByDefinitionName.set(interfaceName, set);
        }
        set.add(typeName);
    });
}
function visitInterfaceTypeExtensionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    const typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(fieldDefinitionNode => visitFieldDefinitionNode(fieldDefinitionNode, dependencySet));
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach((namedTypeNode) => {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        const interfaceName = namedTypeNode.name.value;
        let set = dependenciesByDefinitionName.get(interfaceName);
        // interface should be dependent to the type as well
        if (set == null) {
            set = new Set();
            dependenciesByDefinitionName.set(interfaceName, set);
        }
        set.add(typeName);
    });
}
function visitUnionTypeExtensionNode(node, dependencySet) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.types) === null || _b === void 0 ? void 0 : _b.forEach(namedTypeNode => visitNamedTypeNode(namedTypeNode, dependencySet));
}
function visitEnumTypeExtensionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
}
function visitInputObjectTypeExtensionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(inputValueDefinitionNode => visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet));
}
function visitSchemaDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add('schema');
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
    node.operationTypes.forEach(operationTypeDefinitionNode => visitOperationTypeDefinitionNode(operationTypeDefinitionNode, dependencySet));
}
function visitScalarDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
}
function visitScalarExtensionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(directiveNode => visitDirectiveNode(directiveNode, dependencySet));
}
function visitOperationTypeDefinitionNode(node, dependencySet) {
    visitNamedTypeNode(node.type, dependencySet);
}

exports.parseImportLine = parseImportLine;
exports.processImport = processImport;
