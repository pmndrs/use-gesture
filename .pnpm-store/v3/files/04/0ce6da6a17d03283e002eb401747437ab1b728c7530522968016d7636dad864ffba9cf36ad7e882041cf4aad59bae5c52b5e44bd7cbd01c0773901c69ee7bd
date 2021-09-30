"use strict";

var _schemaVisitor = require("../schemaVisitor");

var _ = require("../..");

beforeEach(() => {
  _.schemaComposer.clear();
});
describe('schemaVisitor', () => {
  describe('getVisitKinds()', () => {
    const object = _.schemaComposer.createTC(`type A { f: Int }`);

    const input = _.schemaComposer.createTC(`input B { f: Int }`);

    const scalar = _.schemaComposer.createTC(`scalar C`);

    const enumType = _.schemaComposer.createTC(`enum D { ASC DESC }`);

    const union = _.schemaComposer.createTC(`union E = A | AA`);

    const iface = _.schemaComposer.createTC(`interface F { f: Int }`);

    it('OBJECT_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).toEqual(['OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(input, _.schemaComposer)).not.toContain('OBJECT_TYPE');
    });
    it('INPUT_OBJECT_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(input, _.schemaComposer)).toEqual(['INPUT_OBJECT_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('INPUT_OBJECT_TYPE');
    });
    it('SCALAR_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(scalar, _.schemaComposer)).toEqual(['SCALAR_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('SCALAR_TYPE');
    });
    it('ENUM_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(enumType, _.schemaComposer)).toEqual(['ENUM_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('ENUM_TYPE');
    });
    it('UNION_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(union, _.schemaComposer)).toEqual(['UNION_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('UNION_TYPE');
    });
    it('INTERFACE_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(iface, _.schemaComposer)).toEqual(['INTERFACE_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('INTERFACE_TYPE');
    });
    it('ABSTRACT_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(iface, _.schemaComposer)).toContain('ABSTRACT_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(union, _.schemaComposer)).toContain('ABSTRACT_TYPE'); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(input, _.schemaComposer)).not.toContain('ABSTRACT_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(scalar, _.schemaComposer)).not.toContain('ABSTRACT_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(enumType, _.schemaComposer)).not.toContain('ABSTRACT_TYPE');
    });
    it('COMPOSITE_TYPE', () => {
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Query, _.schemaComposer)).toContain('COMPOSITE_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).toContain('COMPOSITE_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(iface, _.schemaComposer)).toContain('COMPOSITE_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(union, _.schemaComposer)).toContain('COMPOSITE_TYPE'); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(input, _.schemaComposer)).not.toContain('COMPOSITE_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(scalar, _.schemaComposer)).not.toContain('COMPOSITE_TYPE');
      expect((0, _schemaVisitor.getVisitKinds)(enumType, _.schemaComposer)).not.toContain('COMPOSITE_TYPE');
    });
    it('QUERY', () => {
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Query, _.schemaComposer)).toEqual(['QUERY', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('MUTATION', () => {
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Mutation, _.schemaComposer)).toEqual(['MUTATION', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('SUBSCRIPTION', () => {
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Subscription, _.schemaComposer)).toEqual(['SUBSCRIPTION', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('ROOT_OBJECT', () => {
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Query, _.schemaComposer)).toContain('ROOT_OBJECT');
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Mutation, _.schemaComposer)).toContain('ROOT_OBJECT');
      expect((0, _schemaVisitor.getVisitKinds)(_.schemaComposer.Subscription, _.schemaComposer)).toContain('ROOT_OBJECT'); // NOT

      expect((0, _schemaVisitor.getVisitKinds)(object, _.schemaComposer)).not.toContain('ROOT_OBJECT');
      expect((0, _schemaVisitor.getVisitKinds)(input, _.schemaComposer)).not.toContain('ROOT_OBJECT');
    });
    it('empty array on unexpected object', () => {
      expect((0, _schemaVisitor.getVisitKinds)({}, _.schemaComposer)).toEqual([]);
      expect((0, _schemaVisitor.getVisitKinds)(false, _.schemaComposer)).toEqual([]);
      expect((0, _schemaVisitor.getVisitKinds)(null, _.schemaComposer)).toEqual([]);
      expect((0, _schemaVisitor.getVisitKinds)(undefined, _.schemaComposer)).toEqual([]);
      expect((0, _schemaVisitor.getVisitKinds)('abc', _.schemaComposer)).toEqual([]);
    });
  });
  describe('visitSchema()', () => {
    it('should traverse schema types', () => {
      _.schemaComposer.addTypeDefs(`
        type User {
          name: String
        }

        type Article {
          title: String
        }

        input Filter {
          q: String
        }

        type Query {
          me: User
          articles(filter: Filter): [Articles]
        }
      `);

      const data = [];
      (0, _schemaVisitor.visitSchema)(_.schemaComposer, {
        TYPE(tc) {
          data.push(tc.getTypeName());
        }

      });
      expect(data).toEqual(expect.arrayContaining(['User', 'Article', 'Filter', 'Query', 'Mutation', 'Subscription']));
    });
    it('should visit TypeComposer only once under different keys', () => {
      // TypeComposer will be added to Registry 4 times,
      // as keys will be: SDL as string, TypeName as string, GraphQLObjectType(AAA) and TypeComposer
      _.schemaComposer.createTC(`type AAA { f: Int }`); // BUT visitor should visit type AAA only once


      let catchCount = 0;
      (0, _schemaVisitor.visitSchema)(_.schemaComposer, {
        TYPE: tc => {
          if (tc.getTypeName() === 'AAA') catchCount += 1;
        }
      });
      expect(catchCount).toBe(1);
    });
  });
});