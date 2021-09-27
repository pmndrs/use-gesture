"use strict";

var _ = require("..");

var _graphql = require("../graphql");

var _NonNullComposer = require("../NonNullComposer");

var _ListComposer = require("../ListComposer");

var _ThunkComposer = require("../ThunkComposer");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

beforeEach(() => {
  _.schemaComposer.clear();
});
describe('ThunkComposer', () => {
  let tc;
  beforeEach(() => {
    tc = new _ThunkComposer.ThunkComposer(() => {
      return _.schemaComposer.createTC(`type User { name: Int }`);
    }, 'User');
  });
  describe('getter ofType', () => {
    it('should call `thunk` once and memoize result', () => {
      const fn = jest.fn(() => 'Some calculated type');
      const tc2 = new _ThunkComposer.ThunkComposer(fn, 'SomeType');
      expect(fn).toHaveBeenCalledTimes(0);
      expect(tc2.ofType).toBe('Some calculated type');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(tc2.ofType).toBe('Some calculated type');
      expect(tc2.ofType).toBe('Some calculated type');
      expect(fn).toHaveBeenCalledTimes(1); // check recalculation

      tc2._typeFromThunk = null;
      expect(tc2.ofType).toBe('Some calculated type');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
  it('getType()', () => {
    const type = tc.getType();
    expect(type).toBeInstanceOf(_graphql.GraphQLObjectType);
    expect(type.name).toBe('User');
  });
  describe('getTypeName()', () => {
    it('should return type name provided via constructor', () => {
      const tc2 = new _ThunkComposer.ThunkComposer(() => {
        return _.schemaComposer.createTC(`type User { name: Int }`);
      }, 'SomeUser');
      expect(tc2.getTypeName()).toBe('SomeUser');
    });
    it('should return name from type if it evaluated', () => {
      const tc2 = new _ThunkComposer.ThunkComposer(() => {
        return _.schemaComposer.createTC(`type User { name: Int }`);
      }, 'SomeUser');
      expect(tc2.getTypeName()).toBe('SomeUser');
      tc2.getType();
      expect(tc2.getTypeName()).toBe('User');
    });
    it('should evaluate type if name not provided via constructor', () => {
      const tc2 = new _ThunkComposer.ThunkComposer(() => {
        return _.schemaComposer.createTC(`type User { name: Int }`);
      });
      expect(tc2._typeFromThunk).toBeUndefined();
      expect(tc2.getTypeName()).toBe('User');
      expect(tc2._typeFromThunk).toBeDefined();
    });
  });
  it('getTypePlural() should return wrapped type with ListComposer', () => {
    const tc2 = tc.getTypePlural();
    expect(tc2).toBeInstanceOf(_ListComposer.ListComposer);
    expect(tc2.ofType).toBe(tc);
    expect(tc2.getTypeName()).toBe('[User]');
  });
  it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
    expect(tc.getTypeNonNull()).toBeInstanceOf(_NonNullComposer.NonNullComposer);
    expect(tc.getTypeNonNull().ofType).toBe(tc);
  });
  it('check getters List, NonNull', () => {
    expect(tc.List).toBeInstanceOf(_ListComposer.ListComposer);
    expect(tc.List.ofType).toBe(tc);
    expect(tc.List.getTypeName()).toBe('[User]');
    expect(tc.NonNull).toBeInstanceOf(_NonNullComposer.NonNullComposer);
    expect(tc.NonNull.ofType).toBe(tc);
    expect(tc.NonNull.getTypeName()).toBe('User!');
    expect(tc.NonNull.List.NonNull.getTypeName()).toBe('[User!]!');
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
    expect(tc.ofType).not.toBe(cloned.ofType);
    expect(tc.ofType.getTypeName()).toBe('User');
    expect(sc2.getOTC('User')).not.toBe(tc.getUnwrappedTC());
  });
});