/**
 * Query a feature by some of it's properties to lookup a glyph substitution.
 */

import { ContextParams } from '../tokenizer';
import { isTashkeelArabicChar } from '../char';

/**
 * Create feature query instance
 * @param {Font} font opentype font instance
 */
function FeatureQuery(font) {
    this.font = font;
    this.features = {};
}

/**
 * @typedef SubstitutionAction
 * @type Object
 * @property {number} id substitution type
 * @property {string} tag feature tag
 * @property {any} substitution substitution value(s)
 */

/**
 * Create a substitution action instance
 * @param {SubstitutionAction} action
 */
function SubstitutionAction(action) {
    this.id = action.id;
    this.tag = action.tag;
    this.substitution = action.substitution;
}

/**
 * Lookup a coverage table
 * @param {number} glyphIndex glyph index
 * @param {CoverageTable} coverage coverage table
 */
function lookupCoverage(glyphIndex, coverage) {
    if (!glyphIndex) return -1;
    switch (coverage.format) {
        case 1:
            return coverage.glyphs.indexOf(glyphIndex);

        case 2:
            let ranges = coverage.ranges;
            for (let i = 0; i < ranges.length; i++) {
                const range = ranges[i];
                if (glyphIndex >= range.start && glyphIndex <= range.end) {
                    let offset = glyphIndex - range.start;
                    return range.index + offset;
                }
            }
            break;
        default:
            return -1; // not found
    }
    return -1;
}

/**
 * Handle a single substitution - format 1
 * @param {ContextParams} contextParams context params to lookup
 */
function singleSubstitutionFormat1(glyphIndex, subtable) {
    let substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
    if (substituteIndex === -1) return null;
    return glyphIndex + subtable.deltaGlyphId;
}

/**
 * Handle a single substitution - format 2
 * @param {ContextParams} contextParams context params to lookup
 */
function singleSubstitutionFormat2(glyphIndex, subtable) {
    let substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
    if (substituteIndex === -1) return null;
    return subtable.substitute[substituteIndex];
}

/**
 * Lookup a list of coverage tables
 * @param {any} coverageList a list of coverage tables
 * @param {ContextParams} contextParams context params to lookup
 */
function lookupCoverageList(coverageList, contextParams) {
    let lookupList = [];
    for (let i = 0; i < coverageList.length; i++) {
        const coverage = coverageList[i];
        let glyphIndex = contextParams.current;
        glyphIndex = Array.isArray(glyphIndex) ? glyphIndex[0] : glyphIndex;
        const lookupIndex = lookupCoverage(glyphIndex, coverage);
        if (lookupIndex !== -1) {
            lookupList.push(lookupIndex);
        }
    }
    if (lookupList.length !== coverageList.length) return -1;
    return lookupList;
}

/**
 * Handle chaining context substitution - format 3
 * @param {ContextParams} contextParams context params to lookup
 */
function chainingSubstitutionFormat3(contextParams, subtable) {
    const lookupsCount = (
        subtable.inputCoverage.length +
        subtable.lookaheadCoverage.length +
        subtable.backtrackCoverage.length
    );
    if (contextParams.context.length < lookupsCount) return [];
    // INPUT LOOKUP //
    let inputLookups = lookupCoverageList(
        subtable.inputCoverage, contextParams
    );
    if (inputLookups === -1) return [];
    // LOOKAHEAD LOOKUP //
    const lookaheadOffset = subtable.inputCoverage.length - 1;
    if (contextParams.lookahead.length < subtable.lookaheadCoverage.length) return [];
    let lookaheadContext = contextParams.lookahead.slice(lookaheadOffset);
    while (lookaheadContext.length && isTashkeelArabicChar(lookaheadContext[0].char)) {
        lookaheadContext.shift();
    }
    const lookaheadParams = new ContextParams(lookaheadContext, 0);
    let lookaheadLookups = lookupCoverageList(
        subtable.lookaheadCoverage, lookaheadParams
    );
    // BACKTRACK LOOKUP //
    let backtrackContext = [].concat(contextParams.backtrack);
    backtrackContext.reverse();
    while (backtrackContext.length && isTashkeelArabicChar(backtrackContext[0].char)) {
        backtrackContext.shift();
    }
    if (backtrackContext.length < subtable.backtrackCoverage.length) return [];
    const backtrackParams = new ContextParams(backtrackContext, 0);
    let backtrackLookups = lookupCoverageList(
        subtable.backtrackCoverage, backtrackParams
    );
    const contextRulesMatch = (
        inputLookups.length === subtable.inputCoverage.length &&
        lookaheadLookups.length === subtable.lookaheadCoverage.length &&
        backtrackLookups.length === subtable.backtrackCoverage.length
    );
    let substitutions = [];
    if (contextRulesMatch) {
        for (let i = 0; i < subtable.lookupRecords.length; i++) {
            const lookupRecord = subtable.lookupRecords[i];
            const lookupListIndex = lookupRecord.lookupListIndex;
            const lookupTable = this.getLookupByIndex(lookupListIndex);
            for (let s = 0; s < lookupTable.subtables.length; s++) {
                const subtable = lookupTable.subtables[s];
                const lookup = this.getLookupMethod(lookupTable, subtable);
                const substitutionType = this.getSubstitutionType(lookupTable, subtable);
                if (substitutionType === '12') {
                    for (let n = 0; n < inputLookups.length; n++) {
                        const glyphIndex = contextParams.get(n);
                        const substitution = lookup(glyphIndex);
                        if (substitution) substitutions.push(substitution);
                    }
                }
            }
        }
    }
    return substitutions;
}

/**
 * Handle ligature substitution - format 1
 * @param {ContextParams} contextParams context params to lookup
 */
function ligatureSubstitutionFormat1(contextParams, subtable) {
    // COVERAGE LOOKUP //
    let glyphIndex = contextParams.current;
    let ligSetIndex = lookupCoverage(glyphIndex, subtable.coverage);
    if (ligSetIndex === -1) return null;
    // COMPONENTS LOOKUP
    // (!) note, components are ordered in the written direction.
    let ligature;
    let ligatureSet = subtable.ligatureSets[ligSetIndex];
    for (let s = 0; s < ligatureSet.length; s++) {
        ligature = ligatureSet[s];
        for (let l = 0; l < ligature.components.length; l++) {
            const lookaheadItem = contextParams.lookahead[l];
            const component = ligature.components[l];
            if (lookaheadItem !== component) break;
            if (l === ligature.components.length - 1) return ligature;
        }
    }
    return null;
}

/**
 * Handle decomposition substitution - format 1
 * @param {number} glyphIndex glyph index
 * @param {any} subtable subtable
 */
function decompositionSubstitutionFormat1(glyphIndex, subtable) {
    let substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
    if (substituteIndex === -1) return null;
    return subtable.sequences[substituteIndex];
}

/**
 * Get default script features indexes
 */
FeatureQuery.prototype.getDefaultScriptFeaturesIndexes = function () {
    const scripts = this.font.tables.gsub.scripts;
    for (let s = 0; s < scripts.length; s++) {
        const script = scripts[s];
        if (script.tag === 'DFLT') return (
            script.script.defaultLangSys.featureIndexes
        );
    }
    return [];
};

/**
 * Get feature indexes of a specific script
 * @param {string} scriptTag script tag
 */
FeatureQuery.prototype.getScriptFeaturesIndexes = function(scriptTag) {
    const tables = this.font.tables;
    if (!tables.gsub) return [];
    if (!scriptTag) return this.getDefaultScriptFeaturesIndexes();
    const scripts = this.font.tables.gsub.scripts;
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (script.tag === scriptTag && script.script.defaultLangSys) {
            return script.script.defaultLangSys.featureIndexes;
        } else {
            let langSysRecords = script.langSysRecords;
            if (!!langSysRecords) {
                for (let j = 0; j < langSysRecords.length; j++) {
                    const langSysRecord = langSysRecords[j];
                    if (langSysRecord.tag === scriptTag) {
                        let langSys = langSysRecord.langSys;
                        return langSys.featureIndexes;
                    }
                }
            }
        }
    }
    return this.getDefaultScriptFeaturesIndexes();
};

/**
 * Map a feature tag to a gsub feature
 * @param {any} features gsub features
 * @param {string} scriptTag script tag
 */
FeatureQuery.prototype.mapTagsToFeatures = function (features, scriptTag) {
    let tags = {};
    for (let i = 0; i < features.length; i++) {
        const tag = features[i].tag;
        const feature = features[i].feature;
        tags[tag] = feature;
    }
    this.features[scriptTag].tags = tags;
};

/**
 * Get features of a specific script
 * @param {string} scriptTag script tag
 */
FeatureQuery.prototype.getScriptFeatures = function (scriptTag) {
    let features = this.features[scriptTag];
    if (this.features.hasOwnProperty(scriptTag)) return features;
    const featuresIndexes = this.getScriptFeaturesIndexes(scriptTag);
    if (!featuresIndexes) return null;
    const gsub = this.font.tables.gsub;
    features = featuresIndexes.map(index => gsub.features[index]);
    this.features[scriptTag] = features;
    this.mapTagsToFeatures(features, scriptTag);
    return features;
};

/**
 * Get substitution type
 * @param {any} lookupTable lookup table
 * @param {any} subtable subtable
 */
FeatureQuery.prototype.getSubstitutionType = function(lookupTable, subtable) {
    const lookupType = lookupTable.lookupType.toString();
    const substFormat = subtable.substFormat.toString();
    return lookupType + substFormat;
};

/**
 * Get lookup method
 * @param {any} lookupTable lookup table
 * @param {any} subtable subtable
 */
FeatureQuery.prototype.getLookupMethod = function(lookupTable, subtable) {
    let substitutionType = this.getSubstitutionType(lookupTable, subtable);
    switch (substitutionType) {
        case '11':
            return glyphIndex => singleSubstitutionFormat1.apply(
                this, [glyphIndex, subtable]
            );
        case '12':
            return glyphIndex => singleSubstitutionFormat2.apply(
                this, [glyphIndex, subtable]
            );
        case '63':
            return contextParams => chainingSubstitutionFormat3.apply(
                this, [contextParams, subtable]
            );
        case '41':
            return contextParams => ligatureSubstitutionFormat1.apply(
                this, [contextParams, subtable]
            );
        case '21':
            return glyphIndex => decompositionSubstitutionFormat1.apply(
                this, [glyphIndex, subtable]
            );
        default:
            throw new Error(
                `lookupType: ${lookupTable.lookupType} - ` +
                `substFormat: ${subtable.substFormat} ` +
                `is not yet supported`
            );
    }
};

/**
 * [ LOOKUP TYPES ]
 * -------------------------------
 * Single                        1;
 * Multiple                      2;
 * Alternate                     3;
 * Ligature                      4;
 * Context                       5;
 * ChainingContext               6;
 * ExtensionSubstitution         7;
 * ReverseChainingContext        8;
 * -------------------------------
 *
 */

/**
 * @typedef FQuery
 * @type Object
 * @param {string} tag feature tag
 * @param {string} script feature script
 * @param {ContextParams} contextParams context params
 */

/**
 * Lookup a feature using a query parameters
 * @param {FQuery} query feature query
 */
FeatureQuery.prototype.lookupFeature = function (query) {
    let contextParams = query.contextParams;
    let currentIndex = contextParams.index;
    const feature = this.getFeature({
        tag: query.tag, script: query.script
    });
    if (!feature) return new Error(
        `font '${this.font.names.fullName.en}' ` +
        `doesn't support feature '${query.tag}' ` +
        `for script '${query.script}'.`
    );
    const lookups = this.getFeatureLookups(feature);
    const substitutions = [].concat(contextParams.context);
    for (let l = 0; l < lookups.length; l++) {
        const lookupTable = lookups[l];
        const subtables = this.getLookupSubtables(lookupTable);
        for (let s = 0; s < subtables.length; s++) {
            const subtable = subtables[s];
            const substType = this.getSubstitutionType(lookupTable, subtable);
            const lookup = this.getLookupMethod(lookupTable, subtable);
            let substitution;
            switch (substType) {
                case '11':
                    substitution = lookup(contextParams.current);
                    if (substitution) {
                        substitutions.splice(currentIndex, 1, new SubstitutionAction({
                            id: 11, tag: query.tag, substitution
                        }));
                    }
                    break;
                case '12':
                    substitution = lookup(contextParams.current);
                    if (substitution) {
                        substitutions.splice(currentIndex, 1, new SubstitutionAction({
                            id: 12, tag: query.tag, substitution
                        }));
                    }
                    break;
                case '63':
                    substitution = lookup(contextParams);
                    if (Array.isArray(substitution) && substitution.length) {
                        substitutions.splice(currentIndex, 1, new SubstitutionAction({
                            id: 63, tag: query.tag, substitution
                        }));
                    }
                    break;
                case '41':
                    substitution = lookup(contextParams);
                    if (substitution) {
                        substitutions.splice(currentIndex, 1, new SubstitutionAction({
                            id: 41, tag: query.tag, substitution
                        }));
                    }
                    break;
                case '21':
                    substitution = lookup(contextParams.current);
                    if (substitution) {
                        substitutions.splice(currentIndex, 1, new SubstitutionAction({
                            id: 21, tag: query.tag, substitution
                        }));
                    }
                    break;
            }
            contextParams = new ContextParams(substitutions, currentIndex);
            if (Array.isArray(substitution) && !substitution.length) continue;
            substitution = null;
        }
    }
    return substitutions.length ? substitutions : null;
};

/**
 * Checks if a font supports a specific features
 * @param {FQuery} query feature query object
 */
FeatureQuery.prototype.supports = function (query) {
    if (!query.script) return false;
    this.getScriptFeatures(query.script);
    const supportedScript = this.features.hasOwnProperty(query.script);
    if (!query.tag) return supportedScript;
    const supportedFeature = (
        this.features[query.script].some(feature => feature.tag === query.tag)
    );
    return supportedScript && supportedFeature;
};

/**
 * Get lookup table subtables
 * @param {any} lookupTable lookup table
 */
FeatureQuery.prototype.getLookupSubtables = function (lookupTable) {
    return lookupTable.subtables || null;
};

/**
 * Get lookup table by index
 * @param {number} index lookup table index
 */
FeatureQuery.prototype.getLookupByIndex = function (index) {
    const lookups = this.font.tables.gsub.lookups;
    return lookups[index] || null;
};

/**
 * Get lookup tables for a feature
 * @param {string} feature
 */
FeatureQuery.prototype.getFeatureLookups = function (feature) {
    // TODO: memoize
    return feature.lookupListIndexes.map(this.getLookupByIndex.bind(this));
};

/**
 * Query a feature by it's properties
 * @param {any} query an object that describes the properties of a query
 */
FeatureQuery.prototype.getFeature = function getFeature(query) {
    if (!this.font) return { FAIL: `No font was found`};
    if (!this.features.hasOwnProperty(query.script)) {
        this.getScriptFeatures(query.script);
    }
    const scriptFeatures = this.features[query.script];
    if (!scriptFeatures) return (
        { FAIL: `No feature for script ${query.script}`}
    );
    if (!scriptFeatures.tags[query.tag]) return null;
    return this.features[query.script].tags[query.tag];
};

export default FeatureQuery;
export { FeatureQuery, SubstitutionAction };
