"use strict";

var _ = require("../..");

describe('github issue #314: Fields defined as thunk with arguments causes stack overflow', () => {
  it('should build schema successfully', async () => {
    const composer = new _.SchemaComposer();

    _.ObjectTypeComposer.create({
      name: 'Foo',
      fields: () => ({
        bar: {
          type: `Boolean`,
          args: {
            baz: {
              type: `Boolean`
            }
          }
        }
      })
    }, composer);

    composer.Query.addFields({
      foo: `Foo`
    });
    expect(() => {
      composer.buildSchema();
    }).not.toThrowError(`Maximum call stack size exceeded`);
    const schema = composer.buildSchema();
    const barArg = schema.getType(`Foo`).getFields().bar.args[0];
    expect(barArg.type.name).toEqual(`Boolean`);
  });
});