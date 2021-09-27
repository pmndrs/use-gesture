// The `GPOS` table contains kerning pairs, among other things.
// https://docs.microsoft.com/en-us/typography/opentype/spec/gpos

import check from '../check';
import { Parser } from '../parse';
import table from '../table';

const subtableParsers = new Array(10);         // subtableParsers[0] is unused

// https://docs.microsoft.com/en-us/typography/opentype/spec/gpos#lookup-type-1-single-adjustment-positioning-subtable
// this = Parser instance
subtableParsers[1] = function parseLookup1() {
    const start = this.offset + this.relativeOffset;
    const posformat = this.parseUShort();
    if (posformat === 1) {
        return {
            posFormat: 1,
            coverage: this.parsePointer(Parser.coverage),
            value: this.parseValueRecord()
        };
    } else if (posformat === 2) {
        return {
            posFormat: 2,
            coverage: this.parsePointer(Parser.coverage),
            values: this.parseValueRecordList()
        };
    }
    check.assert(false, '0x' + start.toString(16) + ': GPOS lookup type 1 format must be 1 or 2.');
};

// https://docs.microsoft.com/en-us/typography/opentype/spec/gpos#lookup-type-2-pair-adjustment-positioning-subtable
subtableParsers[2] = function parseLookup2() {
    const start = this.offset + this.relativeOffset;
    const posFormat = this.parseUShort();
    check.assert(posFormat === 1 || posFormat === 2, '0x' + start.toString(16) + ': GPOS lookup type 2 format must be 1 or 2.');
    const coverage = this.parsePointer(Parser.coverage);
    const valueFormat1 = this.parseUShort();
    const valueFormat2 = this.parseUShort();
    if (posFormat === 1) {
        // Adjustments for Glyph Pairs
        return {
            posFormat: posFormat,
            coverage: coverage,
            valueFormat1: valueFormat1,
            valueFormat2: valueFormat2,
            pairSets: this.parseList(Parser.pointer(Parser.list(function() {
                return {        // pairValueRecord
                    secondGlyph: this.parseUShort(),
                    value1: this.parseValueRecord(valueFormat1),
                    value2: this.parseValueRecord(valueFormat2)
                };
            })))
        };
    } else if (posFormat === 2) {
        const classDef1 = this.parsePointer(Parser.classDef);
        const classDef2 = this.parsePointer(Parser.classDef);
        const class1Count = this.parseUShort();
        const class2Count = this.parseUShort();
        return {
            // Class Pair Adjustment
            posFormat: posFormat,
            coverage: coverage,
            valueFormat1: valueFormat1,
            valueFormat2: valueFormat2,
            classDef1: classDef1,
            classDef2: classDef2,
            class1Count: class1Count,
            class2Count: class2Count,
            classRecords: this.parseList(class1Count, Parser.list(class2Count, function() {
                return {
                    value1: this.parseValueRecord(valueFormat1),
                    value2: this.parseValueRecord(valueFormat2)
                };
            }))
        };
    }
};

subtableParsers[3] = function parseLookup3() { return { error: 'GPOS Lookup 3 not supported' }; };
subtableParsers[4] = function parseLookup4() { return { error: 'GPOS Lookup 4 not supported' }; };
subtableParsers[5] = function parseLookup5() { return { error: 'GPOS Lookup 5 not supported' }; };
subtableParsers[6] = function parseLookup6() { return { error: 'GPOS Lookup 6 not supported' }; };
subtableParsers[7] = function parseLookup7() { return { error: 'GPOS Lookup 7 not supported' }; };
subtableParsers[8] = function parseLookup8() { return { error: 'GPOS Lookup 8 not supported' }; };
subtableParsers[9] = function parseLookup9() { return { error: 'GPOS Lookup 9 not supported' }; };

// https://docs.microsoft.com/en-us/typography/opentype/spec/gpos
function parseGposTable(data, start) {
    start = start || 0;
    const p = new Parser(data, start);
    const tableVersion = p.parseVersion(1);
    check.argument(tableVersion === 1 || tableVersion === 1.1, 'Unsupported GPOS table version ' + tableVersion);

    if (tableVersion === 1) {
        return {
            version: tableVersion,
            scripts: p.parseScriptList(),
            features: p.parseFeatureList(),
            lookups: p.parseLookupList(subtableParsers)
        };
    } else {
        return {
            version: tableVersion,
            scripts: p.parseScriptList(),
            features: p.parseFeatureList(),
            lookups: p.parseLookupList(subtableParsers),
            variations: p.parseFeatureVariationsList()
        };
    }

}

// GPOS Writing //////////////////////////////////////////////
// NOT SUPPORTED
const subtableMakers = new Array(10);

function makeGposTable(gpos) {
    return new table.Table('GPOS', [
        {name: 'version', type: 'ULONG', value: 0x10000},
        {name: 'scripts', type: 'TABLE', value: new table.ScriptList(gpos.scripts)},
        {name: 'features', type: 'TABLE', value: new table.FeatureList(gpos.features)},
        {name: 'lookups', type: 'TABLE', value: new table.LookupList(gpos.lookups, subtableMakers)}
    ]);
}

export default { parse: parseGposTable, make: makeGposTable };
