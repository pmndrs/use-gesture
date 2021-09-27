import { SchemaComposer } from '../..';
import { graphqlVersion } from '../../utils/graphqlVersion';
const sdl = `
  directive @test(reason: String = "No longer supported") on FIELD_DEFINITION | ENUM_VALUE | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION
    
  type ModifyMe {
    id: ID! @test(reason: "asjdk")
    field(arg: ID! @test(reason: "123")): String
    status: Status
  }

  input ModifyMeInput {
    id: ID! @test(reason: "input")
  }

  enum Status {
    OK @test(reason: "enum")
  }

  type Query {
    hello(a: ModifyMeInput): ModifyMe
  }
`;
describe('github issue #246: Directives are removed from schema in SchemaCompose', () => {
  it('via addTypeDefs', async () => {
    const schemaComposer = new SchemaComposer();
    schemaComposer.addTypeDefs(sdl);
    expect(schemaComposer.toSDL({
      omitDescriptions: true,
      exclude: ['String']
    })).toMatchInlineSnapshot(`
      "directive @test(reason: String = \\"No longer supported\\") on FIELD_DEFINITION | ENUM_VALUE | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION

      scalar ID

      type ModifyMe {
        id: ID! @test(reason: \\"asjdk\\")
        field(arg: ID! @test(reason: \\"123\\")): String
        status: Status
      }

      input ModifyMeInput {
        id: ID! @test(reason: \\"input\\")
      }

      type Query {
        hello(a: ModifyMeInput): ModifyMe
      }

      enum Status {
        OK @test(reason: \\"enum\\")
      }"
    `);
  });
  it('via constructor', async () => {
    const schemaComposer = new SchemaComposer(sdl);

    if (graphqlVersion >= 15.1) {
      expect(schemaComposer.toSDL({
        omitDescriptions: true,
        exclude: ['String']
      })).toMatchInlineSnapshot(`
      "directive @test(reason: String = \\"No longer supported\\") on FIELD_DEFINITION | ENUM_VALUE | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION

      directive @specifiedBy(
        url: String!
      ) on SCALAR

      scalar ID

      type ModifyMe {
        id: ID! @test(reason: \\"asjdk\\")
        field(arg: ID! @test(reason: \\"123\\")): String
        status: Status
      }

      input ModifyMeInput {
        id: ID! @test(reason: \\"input\\")
      }

      type Query {
        hello(a: ModifyMeInput): ModifyMe
      }

      enum Status {
        OK @test(reason: \\"enum\\")
      }"
    `);
    }
  });
});