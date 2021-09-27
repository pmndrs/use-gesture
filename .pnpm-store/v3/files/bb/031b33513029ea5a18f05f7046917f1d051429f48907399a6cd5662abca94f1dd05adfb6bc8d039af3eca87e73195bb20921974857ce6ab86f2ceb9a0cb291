import { schemaComposer, SchemaComposer } from '..';
import { GraphQLNonNull } from '../graphql';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
beforeEach(() => {
  schemaComposer.clear();
});
describe('NonNullComposer', () => {
  let tc;
  beforeEach(() => {
    tc = new NonNullComposer(schemaComposer.createTC(`
        type User {
          name: String
        }
      `));
  });
  it('no nesting NonNull', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new NonNullComposer(tc);
    }).toThrow('Nesting NonNull is not allowed');
  });
  it('getType()', () => {
    const type = tc.getType();
    expect(type).toBeInstanceOf(GraphQLNonNull);
    expect(type.ofType.name).toBe('User');
  });
  it('getTypeName()', () => {
    expect(tc.getTypeName()).toBe('User!');
  });
  it('getTypePlural() should return wrapped type with ListComposer', () => {
    const tc2 = tc.getTypePlural();
    expect(tc2).toBeInstanceOf(ListComposer);
    expect(tc2.ofType).toBe(tc);
    expect(tc2.getTypeName()).toBe('[User!]');
  });
  it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
    expect(tc.getTypeNonNull()).toBeInstanceOf(NonNullComposer); // should return itself

    expect(tc.getTypeNonNull()).toBe(tc);
  });
  it('check getters List, NonNull', () => {
    const UserTC = schemaComposer.createObjectTC(`type User { name: String }`);
    expect(UserTC.NonNull).toBeInstanceOf(NonNullComposer);
    expect(UserTC.NonNull.ofType).toBe(UserTC);
    expect(UserTC.NonNull.getTypeName()).toBe('User!');
    expect(UserTC.NonNull.NonNull.NonNull.getTypeName()).toBe('User!');
    expect(UserTC.NonNull.List.getTypeName()).toBe('[User!]');
  });
  it('getUnwrappedTC() should return NamedTypeComposer', () => {
    const UserTC1 = tc.getUnwrappedTC();
    expect(UserTC1).toBeInstanceOf(ObjectTypeComposer);
    expect(UserTC1.getTypeName()).toBe('User'); // should unwrap deeply wrapped Types

    const tc2 = schemaComposer.typeMapper.convertSDLWrappedTypeName('[User!]!');
    const UserTC2 = tc2.getUnwrappedTC();
    expect(UserTC2.getTypeName()).toBe('User');
    expect(UserTC1).toBe(UserTC2);
  });
  it('cloneTo() should clone type with subtype to another Schema', () => {
    const sc2 = new SchemaComposer();
    const cloned = tc.cloneTo(sc2);
    expect(tc.getTypeName()).toEqual(cloned.getTypeName());
    expect(tc).not.toBe(cloned);
    expect(tc.getType()).not.toBe(cloned.getType());
    expect(tc.getType().ofType).not.toBe(cloned.getType().ofType);
    expect(sc2.getOTC('User')).not.toBe(tc.getUnwrappedTC());
  });
});