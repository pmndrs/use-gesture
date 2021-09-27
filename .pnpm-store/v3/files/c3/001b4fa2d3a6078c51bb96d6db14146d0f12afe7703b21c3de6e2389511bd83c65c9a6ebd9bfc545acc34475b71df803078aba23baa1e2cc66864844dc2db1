"use strict";

var _ = require("../..");

describe('github issue #72', () => {
  it('extendField after addRelation', () => {
    const MyTypeTC = _.schemaComposer.createObjectTC(`type MyType { name: String }`);

    const OtherTypeTC = _.schemaComposer.createObjectTC(`type OtherType { name: String }`);

    OtherTypeTC.addResolver({
      name: 'findOne',
      type: OtherTypeTC,
      resolve: () => null
    });
    MyTypeTC.addRelation('field1', {
      resolver: () => OtherTypeTC.getResolver('findOne'),
      description: 'Relation with OtherType'
    });
    expect(MyTypeTC._gqcFields.field1.type).toBeInstanceOf(_.ObjectTypeComposer);
    expect(MyTypeTC._gqcFields.field1.type.getTypeName()).toBe('OtherType');
    MyTypeTC.extendField('field1', {
      description: 'Extended desc'
    });
    expect(MyTypeTC.getFieldConfig('field1').description).toBe('Extended desc');
  });
});