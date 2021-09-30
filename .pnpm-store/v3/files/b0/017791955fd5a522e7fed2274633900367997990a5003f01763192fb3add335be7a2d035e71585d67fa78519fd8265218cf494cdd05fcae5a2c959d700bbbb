import { getVisitKinds, visitSchema } from '../schemaVisitor';
import { schemaComposer } from '../..';
beforeEach(() => {
  schemaComposer.clear();
});
describe('schemaVisitor', () => {
  describe('getVisitKinds()', () => {
    const object = schemaComposer.createTC(`type A { f: Int }`);
    const input = schemaComposer.createTC(`input B { f: Int }`);
    const scalar = schemaComposer.createTC(`scalar C`);
    const enumType = schemaComposer.createTC(`enum D { ASC DESC }`);
    const union = schemaComposer.createTC(`union E = A | AA`);
    const iface = schemaComposer.createTC(`interface F { f: Int }`);
    it('OBJECT_TYPE', () => {
      expect(getVisitKinds(object, schemaComposer)).toEqual(['OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(input, schemaComposer)).not.toContain('OBJECT_TYPE');
    });
    it('INPUT_OBJECT_TYPE', () => {
      expect(getVisitKinds(input, schemaComposer)).toEqual(['INPUT_OBJECT_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('INPUT_OBJECT_TYPE');
    });
    it('SCALAR_TYPE', () => {
      expect(getVisitKinds(scalar, schemaComposer)).toEqual(['SCALAR_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('SCALAR_TYPE');
    });
    it('ENUM_TYPE', () => {
      expect(getVisitKinds(enumType, schemaComposer)).toEqual(['ENUM_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('ENUM_TYPE');
    });
    it('UNION_TYPE', () => {
      expect(getVisitKinds(union, schemaComposer)).toEqual(['UNION_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('UNION_TYPE');
    });
    it('INTERFACE_TYPE', () => {
      expect(getVisitKinds(iface, schemaComposer)).toEqual(['INTERFACE_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE']); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('INTERFACE_TYPE');
    });
    it('ABSTRACT_TYPE', () => {
      expect(getVisitKinds(iface, schemaComposer)).toContain('ABSTRACT_TYPE');
      expect(getVisitKinds(union, schemaComposer)).toContain('ABSTRACT_TYPE'); // NOT

      expect(getVisitKinds(input, schemaComposer)).not.toContain('ABSTRACT_TYPE');
      expect(getVisitKinds(scalar, schemaComposer)).not.toContain('ABSTRACT_TYPE');
      expect(getVisitKinds(enumType, schemaComposer)).not.toContain('ABSTRACT_TYPE');
    });
    it('COMPOSITE_TYPE', () => {
      expect(getVisitKinds(schemaComposer.Query, schemaComposer)).toContain('COMPOSITE_TYPE');
      expect(getVisitKinds(object, schemaComposer)).toContain('COMPOSITE_TYPE');
      expect(getVisitKinds(iface, schemaComposer)).toContain('COMPOSITE_TYPE');
      expect(getVisitKinds(union, schemaComposer)).toContain('COMPOSITE_TYPE'); // NOT

      expect(getVisitKinds(input, schemaComposer)).not.toContain('COMPOSITE_TYPE');
      expect(getVisitKinds(scalar, schemaComposer)).not.toContain('COMPOSITE_TYPE');
      expect(getVisitKinds(enumType, schemaComposer)).not.toContain('COMPOSITE_TYPE');
    });
    it('QUERY', () => {
      expect(getVisitKinds(schemaComposer.Query, schemaComposer)).toEqual(['QUERY', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('MUTATION', () => {
      expect(getVisitKinds(schemaComposer.Mutation, schemaComposer)).toEqual(['MUTATION', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('SUBSCRIPTION', () => {
      expect(getVisitKinds(schemaComposer.Subscription, schemaComposer)).toEqual(['SUBSCRIPTION', 'ROOT_OBJECT', 'OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']);
    });
    it('ROOT_OBJECT', () => {
      expect(getVisitKinds(schemaComposer.Query, schemaComposer)).toContain('ROOT_OBJECT');
      expect(getVisitKinds(schemaComposer.Mutation, schemaComposer)).toContain('ROOT_OBJECT');
      expect(getVisitKinds(schemaComposer.Subscription, schemaComposer)).toContain('ROOT_OBJECT'); // NOT

      expect(getVisitKinds(object, schemaComposer)).not.toContain('ROOT_OBJECT');
      expect(getVisitKinds(input, schemaComposer)).not.toContain('ROOT_OBJECT');
    });
    it('empty array on unexpected object', () => {
      expect(getVisitKinds({}, schemaComposer)).toEqual([]);
      expect(getVisitKinds(false, schemaComposer)).toEqual([]);
      expect(getVisitKinds(null, schemaComposer)).toEqual([]);
      expect(getVisitKinds(undefined, schemaComposer)).toEqual([]);
      expect(getVisitKinds('abc', schemaComposer)).toEqual([]);
    });
  });
  describe('visitSchema()', () => {
    it('should traverse schema types', () => {
      schemaComposer.addTypeDefs(`
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
      visitSchema(schemaComposer, {
        TYPE(tc) {
          data.push(tc.getTypeName());
        }

      });
      expect(data).toEqual(expect.arrayContaining(['User', 'Article', 'Filter', 'Query', 'Mutation', 'Subscription']));
    });
    it('should visit TypeComposer only once under different keys', () => {
      // TypeComposer will be added to Registry 4 times,
      // as keys will be: SDL as string, TypeName as string, GraphQLObjectType(AAA) and TypeComposer
      schemaComposer.createTC(`type AAA { f: Int }`); // BUT visitor should visit type AAA only once

      let catchCount = 0;
      visitSchema(schemaComposer, {
        TYPE: tc => {
          if (tc.getTypeName() === 'AAA') catchCount += 1;
        }
      });
      expect(catchCount).toBe(1);
    });
  });
});