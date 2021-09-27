import { SchemaComposer } from '../..';
describe('github issue #241: Does graphql-compose support `extend type` construction from SDL?', () => {
  it('check `extend type`', async () => {
    const sc = new SchemaComposer(`
      type User {
        name: String
      }
    `);
    sc.addTypeDefs(`
      extend type User {
        name(uppercase: Boolean): String
        age: Int
      }
    `);
    expect(sc.getOTC('User').getFieldNames()).toEqual(['name', 'age']);
    expect(sc.getOTC('User').getFieldArgNames('name')).toEqual(['uppercase']);
  });
  it('check `extend input`', async () => {
    const sc = new SchemaComposer(`
      input Filter {
        name: String
      }
    `);
    sc.addTypeDefs(`
      extend input Filter {
        age: Int
      }
    `);
    expect(sc.getITC('Filter').getFieldNames()).toEqual(['name', 'age']);
  });
  it('check `extend union`', async () => {
    const sc = new SchemaComposer(`
      union Search = User | Article

      type User { name: String }
      type Article { title: String }
    `);
    sc.addTypeDefs(`
      extend union Search = Comment

      type Comment { msg: String }
    `);
    expect(sc.getUTC('Search').getTypeNames()).toEqual(['User', 'Article', 'Comment']);
  });
  it('check `extend interface`', async () => {
    const sc = new SchemaComposer(`
      interface Node {
        id: ID
      }
    `);
    sc.addTypeDefs(`
      extend interface Node {
        id(base64: Boolean): ID
        createdAt: String
      }
    `);
    expect(sc.getIFTC('Node').getFieldNames()).toEqual(['id', 'createdAt']);
    expect(sc.getIFTC('Node').getFieldArgNames('id')).toEqual(['base64']);
  });
  it('check `extend enum`', async () => {
    const sc = new SchemaComposer(`
      enum Color {
        RED
      }
    `);
    sc.addTypeDefs(`
      extend enum Color {
        GREEN
      }
    `);
    expect(sc.getETC('Color').getFieldNames()).toEqual(['RED', 'GREEN']);
  });
});