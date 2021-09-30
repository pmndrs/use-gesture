import { __values, __assign, __read } from 'tslib';
import { print, parse, Source, Kind } from 'graphql';
import { readFileSync, realpathSync } from 'fs';
import { join, isAbsolute, dirname } from 'path';
import resolveFrom from 'resolve-from';
import { cwd } from 'process';

var builtinTypes = ['String', 'Float', 'Int', 'Boolean', 'ID', 'Upload'];
var builtinDirectives = [
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
var IMPORT_FROM_REGEX = /^import\s+(\*|(.*))\s+from\s+('|")(.*)('|");?$/;
var IMPORT_DEFAULT_REGEX = /^import\s+('|")(.*)('|");?$/;
function processImport(filePath, cwd$1, predefinedImports, visitedFiles) {
    var e_1, _a, e_2, _b;
    if (cwd$1 === void 0) { cwd$1 = cwd(); }
    if (predefinedImports === void 0) { predefinedImports = {}; }
    if (visitedFiles === void 0) { visitedFiles = new Map(); }
    var set = visitFile(filePath, join(cwd$1 + '/root.graphql'), visitedFiles, predefinedImports);
    var definitionStrSet = new Set();
    var definitionsStr = '';
    if (set != null) {
        try {
            for (var _c = __values(set.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var defs = _d.value;
                try {
                    for (var defs_1 = (e_2 = void 0, __values(defs)), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                        var def = defs_1_1.value;
                        var defStr = print(def);
                        if (!definitionStrSet.has(defStr)) {
                            definitionStrSet.add(defStr);
                            definitionsStr += defStr + '\n';
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (defs_1_1 && !defs_1_1.done && (_b = defs_1.return)) _b.call(defs_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return (definitionsStr === null || definitionsStr === void 0 ? void 0 : definitionsStr.length)
        ? parse(new Source(definitionsStr, filePath))
        : {
            kind: Kind.DOCUMENT,
            definitions: [],
        };
}
function visitFile(filePath, cwd, visitedFiles, predefinedImports) {
    var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e, e_8, _f, e_9, _g, e_10, _h, e_11, _j, e_12, _k, e_13, _l, e_14, _m, e_15, _o;
    var _p;
    if (!isAbsolute(filePath) && !(filePath in predefinedImports)) {
        filePath = resolveFilePath(cwd, filePath);
    }
    if (!visitedFiles.has(filePath)) {
        var fileContent = filePath in predefinedImports ? predefinedImports[filePath] : readFileSync(filePath, 'utf8');
        var importLines = [];
        var otherLines = '';
        try {
            for (var _q = __values(fileContent.split('\n')), _r = _q.next(); !_r.done; _r = _q.next()) {
                var line = _r.value;
                var trimmedLine = line.trim();
                if (trimmedLine.startsWith('#import ') || trimmedLine.startsWith('# import ')) {
                    importLines.push(trimmedLine);
                }
                else if (trimmedLine) {
                    otherLines += line + '\n';
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_r && !_r.done && (_a = _q.return)) _a.call(_q);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var definitionsByName = new Map();
        var dependenciesByDefinitionName_1 = new Map();
        if (otherLines) {
            var fileDefinitionMap = new Map();
            // To prevent circular dependency
            visitedFiles.set(filePath, fileDefinitionMap);
            var document_1 = parse(new Source(otherLines, filePath), {
                noLocation: true,
            });
            try {
                for (var _s = __values(document_1.definitions), _t = _s.next(); !_t.done; _t = _s.next()) {
                    var definition = _t.value;
                    if ('name' in definition || definition.kind === Kind.SCHEMA_DEFINITION) {
                        var definitionName = 'name' in definition && definition.name ? definition.name.value : 'schema';
                        if (!definitionsByName.has(definitionName)) {
                            definitionsByName.set(definitionName, new Set());
                        }
                        var definitionsSet = definitionsByName.get(definitionName);
                        definitionsSet === null || definitionsSet === void 0 ? void 0 : definitionsSet.add(definition);
                        var dependencySet = dependenciesByDefinitionName_1.get(definitionName);
                        if (!dependencySet) {
                            dependencySet = new Set();
                            dependenciesByDefinitionName_1.set(definitionName, dependencySet);
                        }
                        switch (definition.kind) {
                            case Kind.OPERATION_DEFINITION:
                                visitOperationDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.FRAGMENT_DEFINITION:
                                visitFragmentDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.OBJECT_TYPE_DEFINITION:
                                visitObjectTypeDefinitionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.INTERFACE_TYPE_DEFINITION:
                                visitInterfaceTypeDefinitionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.UNION_TYPE_DEFINITION:
                                visitUnionTypeDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.ENUM_TYPE_DEFINITION:
                                visitEnumTypeDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.INPUT_OBJECT_TYPE_DEFINITION:
                                visitInputObjectTypeDefinitionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.DIRECTIVE_DEFINITION:
                                visitDirectiveDefinitionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.SCALAR_TYPE_DEFINITION:
                                visitScalarDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.SCHEMA_DEFINITION:
                                visitSchemaDefinitionNode(definition, dependencySet);
                                break;
                            case Kind.OBJECT_TYPE_EXTENSION:
                                visitObjectTypeExtensionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.INTERFACE_TYPE_EXTENSION:
                                visitInterfaceTypeExtensionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.UNION_TYPE_EXTENSION:
                                visitUnionTypeExtensionNode(definition, dependencySet);
                                break;
                            case Kind.ENUM_TYPE_EXTENSION:
                                visitEnumTypeExtensionNode(definition, dependencySet);
                                break;
                            case Kind.INPUT_OBJECT_TYPE_EXTENSION:
                                visitInputObjectTypeExtensionNode(definition, dependencySet, dependenciesByDefinitionName_1);
                                break;
                            case Kind.SCALAR_TYPE_EXTENSION:
                                visitScalarExtensionNode(definition, dependencySet);
                                break;
                        }
                        if ('fields' in definition && definition.fields) {
                            try {
                                for (var _u = (e_5 = void 0, __values(definition.fields)), _v = _u.next(); !_v.done; _v = _u.next()) {
                                    var field = _v.value;
                                    var definitionName_1 = definition.name.value + '.' + field.name.value;
                                    if (!definitionsByName.has(definitionName_1)) {
                                        definitionsByName.set(definitionName_1, new Set());
                                    }
                                    (_p = definitionsByName.get(definitionName_1)) === null || _p === void 0 ? void 0 : _p.add(__assign(__assign({}, definition), { fields: [field] }));
                                    var dependencySet_1 = dependenciesByDefinitionName_1.get(definitionName_1);
                                    if (!dependencySet_1) {
                                        dependencySet_1 = new Set();
                                        dependenciesByDefinitionName_1.set(definitionName_1, dependencySet_1);
                                    }
                                    switch (field.kind) {
                                        case Kind.FIELD_DEFINITION:
                                            visitFieldDefinitionNode(field, dependencySet_1, dependenciesByDefinitionName_1);
                                            break;
                                        case Kind.INPUT_VALUE_DEFINITION:
                                            visitInputValueDefinitionNode(field, dependencySet_1, dependenciesByDefinitionName_1);
                                            break;
                                    }
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_v && !_v.done && (_c = _u.return)) _c.call(_u);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_t && !_t.done && (_b = _s.return)) _b.call(_s);
                }
                finally { if (e_4) throw e_4.error; }
            }
            try {
                for (var definitionsByName_1 = __values(definitionsByName), definitionsByName_1_1 = definitionsByName_1.next(); !definitionsByName_1_1.done; definitionsByName_1_1 = definitionsByName_1.next()) {
                    var _w = __read(definitionsByName_1_1.value, 2), definitionName = _w[0], definitions = _w[1];
                    var definitionsWithDependencies = fileDefinitionMap.get(definitionName);
                    if (definitionsWithDependencies == null) {
                        definitionsWithDependencies = new Set();
                        fileDefinitionMap.set(definitionName, definitionsWithDependencies);
                    }
                    try {
                        for (var definitions_1 = (e_7 = void 0, __values(definitions)), definitions_1_1 = definitions_1.next(); !definitions_1_1.done; definitions_1_1 = definitions_1.next()) {
                            var definition = definitions_1_1.value;
                            definitionsWithDependencies.add(definition);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (definitions_1_1 && !definitions_1_1.done && (_e = definitions_1.return)) _e.call(definitions_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    var dependenciesOfDefinition = dependenciesByDefinitionName_1.get(definitionName);
                    if (dependenciesOfDefinition) {
                        try {
                            for (var dependenciesOfDefinition_1 = (e_8 = void 0, __values(dependenciesOfDefinition)), dependenciesOfDefinition_1_1 = dependenciesOfDefinition_1.next(); !dependenciesOfDefinition_1_1.done; dependenciesOfDefinition_1_1 = dependenciesOfDefinition_1.next()) {
                                var dependencyName = dependenciesOfDefinition_1_1.value;
                                var dependencyDefinitions = definitionsByName.get(dependencyName);
                                if (dependencyDefinitions != null) {
                                    try {
                                        for (var dependencyDefinitions_1 = (e_9 = void 0, __values(dependencyDefinitions)), dependencyDefinitions_1_1 = dependencyDefinitions_1.next(); !dependencyDefinitions_1_1.done; dependencyDefinitions_1_1 = dependencyDefinitions_1.next()) {
                                            var dependencyDefinition = dependencyDefinitions_1_1.value;
                                            definitionsWithDependencies.add(dependencyDefinition);
                                        }
                                    }
                                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                    finally {
                                        try {
                                            if (dependencyDefinitions_1_1 && !dependencyDefinitions_1_1.done && (_g = dependencyDefinitions_1.return)) _g.call(dependencyDefinitions_1);
                                        }
                                        finally { if (e_9) throw e_9.error; }
                                    }
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (dependenciesOfDefinition_1_1 && !dependenciesOfDefinition_1_1.done && (_f = dependenciesOfDefinition_1.return)) _f.call(dependenciesOfDefinition_1);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (definitionsByName_1_1 && !definitionsByName_1_1.done && (_d = definitionsByName_1.return)) _d.call(definitionsByName_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        var allImportedDefinitionsMap_1 = new Map();
        try {
            for (var importLines_1 = __values(importLines), importLines_1_1 = importLines_1.next(); !importLines_1_1.done; importLines_1_1 = importLines_1.next()) {
                var line = importLines_1_1.value;
                var _x = parseImportLine(line.replace('#', '').trim()), imports = _x.imports, from = _x.from;
                var importFileDefinitionMap = visitFile(from, filePath, visitedFiles, predefinedImports);
                if (importFileDefinitionMap != null) {
                    if (imports.includes('*')) {
                        try {
                            for (var importFileDefinitionMap_1 = (e_11 = void 0, __values(importFileDefinitionMap)), importFileDefinitionMap_1_1 = importFileDefinitionMap_1.next(); !importFileDefinitionMap_1_1.done; importFileDefinitionMap_1_1 = importFileDefinitionMap_1.next()) {
                                var _y = __read(importFileDefinitionMap_1_1.value, 2), importedDefinitionName = _y[0], importedDefinitions = _y[1];
                                var _z = __read(importedDefinitionName.split('.'), 1), importedDefinitionTypeName = _z[0];
                                if (!allImportedDefinitionsMap_1.has(importedDefinitionTypeName)) {
                                    allImportedDefinitionsMap_1.set(importedDefinitionTypeName, new Set());
                                }
                                var allImportedDefinitions = allImportedDefinitionsMap_1.get(importedDefinitionTypeName);
                                if (allImportedDefinitions) {
                                    try {
                                        for (var importedDefinitions_1 = (e_12 = void 0, __values(importedDefinitions)), importedDefinitions_1_1 = importedDefinitions_1.next(); !importedDefinitions_1_1.done; importedDefinitions_1_1 = importedDefinitions_1.next()) {
                                            var importedDefinition = importedDefinitions_1_1.value;
                                            allImportedDefinitions.add(importedDefinition);
                                        }
                                    }
                                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                    finally {
                                        try {
                                            if (importedDefinitions_1_1 && !importedDefinitions_1_1.done && (_k = importedDefinitions_1.return)) _k.call(importedDefinitions_1);
                                        }
                                        finally { if (e_12) throw e_12.error; }
                                    }
                                }
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (importFileDefinitionMap_1_1 && !importFileDefinitionMap_1_1.done && (_j = importFileDefinitionMap_1.return)) _j.call(importFileDefinitionMap_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                    }
                    else {
                        try {
                            for (var imports_1 = (e_13 = void 0, __values(imports)), imports_1_1 = imports_1.next(); !imports_1_1.done; imports_1_1 = imports_1.next()) {
                                var importedDefinitionName = imports_1_1.value;
                                if (importedDefinitionName.endsWith('.*')) {
                                    // Adding whole type means the same thing with adding every single field
                                    importedDefinitionName = importedDefinitionName.replace('.*', '');
                                }
                                var _0 = __read(importedDefinitionName.split('.'), 1), importedDefinitionTypeName = _0[0];
                                if (!allImportedDefinitionsMap_1.has(importedDefinitionTypeName)) {
                                    allImportedDefinitionsMap_1.set(importedDefinitionTypeName, new Set());
                                }
                                var allImportedDefinitions = allImportedDefinitionsMap_1.get(importedDefinitionTypeName);
                                var importedDefinitions = importFileDefinitionMap.get(importedDefinitionName);
                                if (!importedDefinitions) {
                                    throw new Error(importedDefinitionName + " is not exported by " + from + " imported by " + filePath);
                                }
                                if (allImportedDefinitions != null) {
                                    try {
                                        for (var importedDefinitions_2 = (e_14 = void 0, __values(importedDefinitions)), importedDefinitions_2_1 = importedDefinitions_2.next(); !importedDefinitions_2_1.done; importedDefinitions_2_1 = importedDefinitions_2.next()) {
                                            var importedDefinition = importedDefinitions_2_1.value;
                                            allImportedDefinitions.add(importedDefinition);
                                        }
                                    }
                                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                                    finally {
                                        try {
                                            if (importedDefinitions_2_1 && !importedDefinitions_2_1.done && (_m = importedDefinitions_2.return)) _m.call(importedDefinitions_2);
                                        }
                                        finally { if (e_14) throw e_14.error; }
                                    }
                                }
                            }
                        }
                        catch (e_13_1) { e_13 = { error: e_13_1 }; }
                        finally {
                            try {
                                if (imports_1_1 && !imports_1_1.done && (_l = imports_1.return)) _l.call(imports_1);
                            }
                            finally { if (e_13) throw e_13.error; }
                        }
                    }
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (importLines_1_1 && !importLines_1_1.done && (_h = importLines_1.return)) _h.call(importLines_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        if (!otherLines) {
            visitedFiles.set(filePath, allImportedDefinitionsMap_1);
        }
        else {
            var fileDefinitionMap_1 = visitedFiles.get(filePath);
            if (fileDefinitionMap_1) {
                var addDefinition_1 = function (definition, definitionName, definitionSet) {
                    var e_16, _a;
                    if (!definitionSet.has(definition)) {
                        definitionSet.add(definition);
                        // Regenerate field exports if some fields are imported after visitor
                        if ('fields' in definition && definition.fields) {
                            var _loop_2 = function (field) {
                                var fieldName = field.name.value;
                                var fieldDefinitionName = definition.name.value + '.' + fieldName;
                                var allImportedDefinitions = allImportedDefinitionsMap_1.get(definitionName);
                                allImportedDefinitions === null || allImportedDefinitions === void 0 ? void 0 : allImportedDefinitions.forEach(function (importedDefinition) {
                                    if (!fileDefinitionMap_1.has(fieldDefinitionName)) {
                                        fileDefinitionMap_1.set(fieldDefinitionName, new Set());
                                    }
                                    var definitionsWithDeps = fileDefinitionMap_1.get(fieldDefinitionName);
                                    if (definitionsWithDeps) {
                                        addDefinition_1(importedDefinition, fieldDefinitionName, definitionsWithDeps);
                                    }
                                });
                                var newDependencySet = new Set();
                                switch (field.kind) {
                                    case Kind.FIELD_DEFINITION:
                                        visitFieldDefinitionNode(field, newDependencySet);
                                        break;
                                    case Kind.INPUT_VALUE_DEFINITION:
                                        visitInputValueDefinitionNode(field, newDependencySet);
                                        break;
                                }
                                newDependencySet.forEach(function (dependencyName) {
                                    var definitionsInCurrentFile = fileDefinitionMap_1.get(dependencyName);
                                    definitionsInCurrentFile === null || definitionsInCurrentFile === void 0 ? void 0 : definitionsInCurrentFile.forEach(function (def) { return addDefinition_1(def, definitionName, definitionSet); });
                                    var definitionsFromImports = allImportedDefinitionsMap_1.get(dependencyName);
                                    definitionsFromImports === null || definitionsFromImports === void 0 ? void 0 : definitionsFromImports.forEach(function (def) { return addDefinition_1(def, definitionName, definitionSet); });
                                });
                            };
                            try {
                                for (var _b = __values(definition.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var field = _c.value;
                                    _loop_2(field);
                                }
                            }
                            catch (e_16_1) { e_16 = { error: e_16_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_16) throw e_16.error; }
                            }
                        }
                    }
                };
                var _loop_1 = function (definitionName) {
                    var e_17, _2;
                    var definitionsWithDependencies = fileDefinitionMap_1.get(definitionName);
                    if (definitionsWithDependencies) {
                        var allImportedDefinitions = allImportedDefinitionsMap_1.get(definitionName);
                        allImportedDefinitions === null || allImportedDefinitions === void 0 ? void 0 : allImportedDefinitions.forEach(function (importedDefinition) {
                            addDefinition_1(importedDefinition, definitionName, definitionsWithDependencies);
                        });
                        var dependenciesOfDefinition = dependenciesByDefinitionName_1.get(definitionName);
                        if (dependenciesOfDefinition) {
                            try {
                                for (var dependenciesOfDefinition_2 = (e_17 = void 0, __values(dependenciesOfDefinition)), dependenciesOfDefinition_2_1 = dependenciesOfDefinition_2.next(); !dependenciesOfDefinition_2_1.done; dependenciesOfDefinition_2_1 = dependenciesOfDefinition_2.next()) {
                                    var dependencyName = dependenciesOfDefinition_2_1.value;
                                    // If that dependency cannot be found both in imports and this file, throw an error
                                    if (!allImportedDefinitionsMap_1.has(dependencyName) && !definitionsByName.has(dependencyName)) {
                                        throw new Error("Couldn't find type " + dependencyName + " in any of the schemas.");
                                    }
                                    var dependencyDefinitionsFromImports = allImportedDefinitionsMap_1.get(dependencyName);
                                    dependencyDefinitionsFromImports === null || dependencyDefinitionsFromImports === void 0 ? void 0 : dependencyDefinitionsFromImports.forEach(function (dependencyDefinition) {
                                        addDefinition_1(dependencyDefinition, definitionName, definitionsWithDependencies);
                                    });
                                }
                            }
                            catch (e_17_1) { e_17 = { error: e_17_1 }; }
                            finally {
                                try {
                                    if (dependenciesOfDefinition_2_1 && !dependenciesOfDefinition_2_1.done && (_2 = dependenciesOfDefinition_2.return)) _2.call(dependenciesOfDefinition_2);
                                }
                                finally { if (e_17) throw e_17.error; }
                            }
                        }
                    }
                };
                try {
                    for (var definitionsByName_2 = __values(definitionsByName), definitionsByName_2_1 = definitionsByName_2.next(); !definitionsByName_2_1.done; definitionsByName_2_1 = definitionsByName_2.next()) {
                        var _1 = __read(definitionsByName_2_1.value, 1), definitionName = _1[0];
                        _loop_1(definitionName);
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (definitionsByName_2_1 && !definitionsByName_2_1.done && (_o = definitionsByName_2.return)) _o.call(definitionsByName_2);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
        }
    }
    return visitedFiles.get(filePath);
}
function parseImportLine(importLine) {
    var regexMatch = importLine.match(IMPORT_FROM_REGEX);
    if (regexMatch != null) {
        // Apply regex to import line
        // Extract matches into named variables
        var _a = __read(regexMatch, 5), wildcard = _a[1], importsString = _a[2], from = _a[4];
        if (from) {
            // Extract imported types
            var imports = wildcard === '*' ? ['*'] : importsString.split(',').map(function (d) { return d.trim(); });
            // Return information about the import line
            return { imports: imports, from: from };
        }
    }
    regexMatch = importLine.match(IMPORT_DEFAULT_REGEX);
    if (regexMatch != null) {
        var _b = __read(regexMatch, 3), from = _b[2];
        if (from) {
            return { imports: ['*'], from: from };
        }
    }
    throw new Error("\n    Import statement is not valid:\n    > " + importLine + "\n    If you want to have comments starting with '# import', please use ''' instead!\n    You can only have 'import' statements in the following pattern;\n    # import [Type].[Field] from [File]\n  ");
}
function resolveFilePath(filePath, importFrom) {
    var dirName = dirname(filePath);
    try {
        var fullPath = join(dirName, importFrom);
        return realpathSync(fullPath);
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
    node.selectionSet.selections.forEach(function (selectionNode) { return visitSelectionNode(selectionNode, dependencySet); });
}
function visitSelectionNode(node, dependencySet) {
    switch (node.kind) {
        case Kind.FIELD:
            visitFieldNode(node, dependencySet);
            break;
        case Kind.FRAGMENT_SPREAD:
            visitFragmentSpreadNode(node, dependencySet);
            break;
        case Kind.INLINE_FRAGMENT:
            visitInlineFragmentNode(node, dependencySet);
            break;
    }
}
function visitFieldNode(node, dependencySet) {
    var _a;
    (_a = node.selectionSet) === null || _a === void 0 ? void 0 : _a.selections.forEach(function (selectionNode) { return visitSelectionNode(selectionNode, dependencySet); });
}
function visitFragmentSpreadNode(node, dependencySet) {
    dependencySet.add(node.name.value);
}
function visitInlineFragmentNode(node, dependencySet) {
    node.selectionSet.selections.forEach(function (selectionNode) { return visitSelectionNode(selectionNode, dependencySet); });
}
function visitFragmentDefinitionNode(node, dependencySet) {
    dependencySet.add(node.name.value);
    node.selectionSet.selections.forEach(function (selectionNode) { return visitSelectionNode(selectionNode, dependencySet); });
}
function visitObjectTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    var typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (fieldDefinitionNode) {
        return visitFieldDefinitionNode(fieldDefinitionNode, dependencySet);
    });
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(function (namedTypeNode) {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        var interfaceName = namedTypeNode.name.value;
        var set = dependenciesByDefinitionName.get(interfaceName);
        // interface should be dependent to the type as well
        if (set == null) {
            set = new Set();
            dependenciesByDefinitionName.set(interfaceName, set);
        }
        set.add(typeName);
    });
}
function visitDirectiveNode(node, dependencySet) {
    var directiveName = node.name.value;
    if (!builtinDirectives.includes(directiveName)) {
        dependencySet.add(node.name.value);
    }
}
function visitFieldDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    (_a = node.arguments) === null || _a === void 0 ? void 0 : _a.forEach(function (inputValueDefinitionNode) {
        return visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet);
    });
    (_b = node.directives) === null || _b === void 0 ? void 0 : _b.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    visitTypeNode(node.type, dependencySet);
}
function visitTypeNode(node, dependencySet, dependenciesByDefinitionName) {
    switch (node.kind) {
        case Kind.LIST_TYPE:
            visitListTypeNode(node, dependencySet);
            break;
        case Kind.NON_NULL_TYPE:
            visitNonNullTypeNode(node, dependencySet);
            break;
        case Kind.NAMED_TYPE:
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
    var namedTypeName = node.name.value;
    if (!builtinTypes.includes(namedTypeName)) {
        dependencySet.add(node.name.value);
    }
}
function visitInputValueDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a;
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    visitTypeNode(node.type, dependencySet);
}
function visitInterfaceTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    var typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (fieldDefinitionNode) {
        return visitFieldDefinitionNode(fieldDefinitionNode, dependencySet);
    });
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(function (namedTypeNode) {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        var interfaceName = namedTypeNode.name.value;
        var set = dependenciesByDefinitionName.get(interfaceName);
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
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.types) === null || _b === void 0 ? void 0 : _b.forEach(function (namedTypeNode) { return visitNamedTypeNode(namedTypeNode, dependencySet); });
}
function visitEnumTypeDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
}
function visitInputObjectTypeDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (inputValueDefinitionNode) {
        return visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet);
    });
}
function visitDirectiveDefinitionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.arguments) === null || _a === void 0 ? void 0 : _a.forEach(function (inputValueDefinitionNode) {
        return visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet);
    });
}
function visitObjectTypeExtensionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b, _c;
    var typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (fieldDefinitionNode) {
        return visitFieldDefinitionNode(fieldDefinitionNode, dependencySet);
    });
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(function (namedTypeNode) {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        var interfaceName = namedTypeNode.name.value;
        var set = dependenciesByDefinitionName.get(interfaceName);
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
    var typeName = node.name.value;
    dependencySet.add(typeName);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (fieldDefinitionNode) {
        return visitFieldDefinitionNode(fieldDefinitionNode, dependencySet);
    });
    (_c = node.interfaces) === null || _c === void 0 ? void 0 : _c.forEach(function (namedTypeNode) {
        visitNamedTypeNode(namedTypeNode, dependencySet);
        var interfaceName = namedTypeNode.name.value;
        var set = dependenciesByDefinitionName.get(interfaceName);
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
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.types) === null || _b === void 0 ? void 0 : _b.forEach(function (namedTypeNode) { return visitNamedTypeNode(namedTypeNode, dependencySet); });
}
function visitEnumTypeExtensionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
}
function visitInputObjectTypeExtensionNode(node, dependencySet, dependenciesByDefinitionName) {
    var _a, _b;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    (_b = node.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (inputValueDefinitionNode) {
        return visitInputValueDefinitionNode(inputValueDefinitionNode, dependencySet);
    });
}
function visitSchemaDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add('schema');
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
    node.operationTypes.forEach(function (operationTypeDefinitionNode) {
        return visitOperationTypeDefinitionNode(operationTypeDefinitionNode, dependencySet);
    });
}
function visitScalarDefinitionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
}
function visitScalarExtensionNode(node, dependencySet) {
    var _a;
    dependencySet.add(node.name.value);
    (_a = node.directives) === null || _a === void 0 ? void 0 : _a.forEach(function (directiveNode) { return visitDirectiveNode(directiveNode, dependencySet); });
}
function visitOperationTypeDefinitionNode(node, dependencySet) {
    visitNamedTypeNode(node.type, dependencySet);
}

export { parseImportLine, processImport };
