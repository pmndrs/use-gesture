"use strict";

var _ = require("..");

var _graphql = require("../graphql");

var _NonNullComposer = require("../NonNullComposer");

var _ListComposer = require("../ListComposer");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

beforeEach(() => {
  _.schemaComposer.clear();
});
describe('ListComposer', () => {
  let tc;
  beforeEach(() => {
    tc = new _ListComposer.ListComposer(_.schemaComposer.createTC(`
        type User {
          name: String
        }
      `));
  });
  it('getType()', () => {
    const type = tc.getType();
    expect(type).toBeInstanceOf(_graphql.GraphQLList);
    expect(type.ofType.name).toBe('User');
  });
  it('getTypeName()', () => {
    expect(tc.getTypeName()).toBe('[User]');
  });
  it('getTypePlural() should return wrapped type with ListComposer', () => {
    const tc2 = tc.getTypePlural();
    expect(tc2).toBeInstanceOf(_ListComposer.ListComposer);
    expect(tc2.ofType).toBe(tc);
    expect(tc2.getTypeName()).toBe('[[User]]');
  });
  it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
    expect(tc.getTypeNonNull()).toBeInstanceOf(_NonNullComposer.NonNullComposer);
    expect(tc.getTypeNonNull().ofType).toBe(tc);
  });
  it('check getters List, NonNull', () => {
    const UserTC = _.schemaComposer.createObjectTC(`type User { name: String }`);

    expect(UserTC.List).toBeInstanceOf(_ListComposer.ListComposer);
    expect(UserTC.List.ofType).toBe(UserTC);
    expect(UserTC.List.getTypeName()).toBe('[User]');
    expect(UserTC.List.List.getTypeName()).toBe('[[User]]');
    expect(UserTC.List.List.List.getTypeName()).toBe('[[[User]]]');
    expect(UserTC.List.NonNull.getTypeName()).toBe('[User]!');
  });
  it('getUnwrappedTC() should return NamedTypeComposer', () => {
    const UserTC1 = tc.getUnwrappedTC();
    expect(UserTC1).toBeInstanceOf(_ObjectTypeComposer.ObjectTypeComposer);
    expect(UserTC1.getTypeName()).toBe('User'); // should unwrap deeply wrapped Types

    const tc2 = _.schemaComposer.typeMapper.convertSDLWrappedTypeName('[[[User]]]');

    const UserTC2 = tc2.getUnwrappedTC();
    expect(UserTC2.getTypeName()).toBe('User');
    expect(UserTC1).toBe(UserTC2);
  });
  it('cloneTo() should clone type with subtype to another Schema', () => {
    const sc2 = new _.SchemaComposer();
    const cloned = tc.cloneTo(sc2);
    expect(tc.getTypeName()).toEqual(cloned.getTypeName());
    expect(tc).not.toBe(cloned);
    expect(tc.getType()).not.toBe(cloned.getType());
    expect(tc.getType().ofType).not.toBe(cloned.getType().ofType);
    expect(sc2.getOTC('User')).not.toBe(tc.getUnwrappedTC());
  });
});