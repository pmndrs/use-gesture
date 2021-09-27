import { parseHighlightedAttribute, parseReverseHighlightedAttribute, parseSnippetedAttribute } from '../formatting';
describe('highlight', function () {
  describe('parseHighlightedAttribute', function () {
    test('returns the highlighted parts of the hit', function () {
      expect(parseHighlightedAttribute({
        attribute: 'title',
        hit: {
          _highlightResult: {
            title: {
              value: '<mark>He</mark>llo t<mark>he</mark>re'
            }
          }
        },
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      })).toMatchInlineSnapshot("\n        Array [\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"He\",\n          },\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"llo t\",\n          },\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"he\",\n          },\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"re\",\n          },\n        ]\n      ");
    });
  });
  describe('parseReverseHighlightedAttribute', function () {
    test('returns the reverse-highlighted parts of the hit', function () {
      expect(parseReverseHighlightedAttribute({
        attribute: 'title',
        hit: {
          _highlightResult: {
            title: {
              value: '<mark>He</mark>llo t<mark>he</mark>re'
            }
          }
        },
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      })).toMatchInlineSnapshot("\n        Array [\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"He\",\n          },\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"llo t\",\n          },\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"he\",\n          },\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"re\",\n          },\n        ]\n      ");
    });
    test('returns the non-highlighted parts when every part matches', function () {
      expect(parseReverseHighlightedAttribute({
        attribute: 'title',
        hit: {
          _highlightResult: {
            title: {
              value: 'Hello'
            }
          }
        },
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      })).toMatchInlineSnapshot("\n        Array [\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"Hello\",\n          },\n        ]\n      ");
    });
  });
  describe('parseSnippetedAttribute', function () {
    test('returns the highlighted snippet parts of the hit', function () {
      expect(parseSnippetedAttribute({
        attribute: 'title',
        hit: {
          _snippetResult: {
            title: {
              value: '<mark>He</mark>llo t<mark>he</mark>re'
            }
          }
        },
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      })).toMatchInlineSnapshot("\n        Array [\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"He\",\n          },\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"llo t\",\n          },\n          Object {\n            \"isHighlighted\": true,\n            \"value\": \"he\",\n          },\n          Object {\n            \"isHighlighted\": false,\n            \"value\": \"re\",\n          },\n        ]\n      ");
    });
  });
});