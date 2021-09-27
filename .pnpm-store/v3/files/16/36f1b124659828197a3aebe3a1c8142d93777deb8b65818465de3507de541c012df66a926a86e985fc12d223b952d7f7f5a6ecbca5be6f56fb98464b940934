import { SchemaComposer } from '../..';
describe('github issue #239: Descriptions from schema missing', () => {
  it('description should present', async () => {
    const sc = new SchemaComposer();
    sc.addTypeDefs(`
      """@model"""
      type Note {
        id: ID!
        title: String!
        description: String!
        """@db.oneToMany: 'noteComment'"""
        comment: [String]!
      }

      type Query {
        note: Note
      }
    `);
    const schema = sc.buildSchema();
    expect(schema.getType('Note').description).toBe('@model');
    expect(schema.getType('Note').getFields().comment.description).toBe("@db.oneToMany: 'noteComment'");
  });
});