// The `hmtx` table contains the horizontal metrics for all glyphs.
// https://www.microsoft.com/typography/OTSPEC/hmtx.htm

import parse from '../parse';
import table from '../table';

function parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs) {
    let advanceWidth;
    let leftSideBearing;
    const p = new parse.Parser(data, start);
    for (let i = 0; i < numGlyphs; i += 1) {
        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
        if (i < numMetrics) {
            advanceWidth = p.parseUShort();
            leftSideBearing = p.parseShort();
        }

        const glyph = glyphs.get(i);
        glyph.advanceWidth = advanceWidth;
        glyph.leftSideBearing = leftSideBearing;
    }
}

function parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs) {
    font._hmtxTableData = {};

    let advanceWidth;
    let leftSideBearing;
    const p = new parse.Parser(data, start);
    for (let i = 0; i < numGlyphs; i += 1) {
        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
        if (i < numMetrics) {
            advanceWidth = p.parseUShort();
            leftSideBearing = p.parseShort();
        }

        font._hmtxTableData[i] = {
            advanceWidth: advanceWidth,
            leftSideBearing: leftSideBearing
        };
    }
}

// Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
// This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
function parseHmtxTable(font, data, start, numMetrics, numGlyphs, glyphs, opt) {
    if (opt.lowMemory)
        parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs);
    else
        parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs);
}

function makeHmtxTable(glyphs) {
    const t = new table.Table('hmtx', []);
    for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs.get(i);
        const advanceWidth = glyph.advanceWidth || 0;
        const leftSideBearing = glyph.leftSideBearing || 0;
        t.fields.push({name: 'advanceWidth_' + i, type: 'USHORT', value: advanceWidth});
        t.fields.push({name: 'leftSideBearing_' + i, type: 'SHORT', value: leftSideBearing});
    }

    return t;
}

export default { parse: parseHmtxTable, make: makeHmtxTable };
