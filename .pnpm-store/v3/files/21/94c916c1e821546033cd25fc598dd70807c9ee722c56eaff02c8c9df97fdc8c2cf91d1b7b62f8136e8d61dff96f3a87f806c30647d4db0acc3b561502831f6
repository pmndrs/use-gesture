import { resolveMaybeThunk, camelCase, getPluralName, upperFirst, clearName, omit, only, forEachKey, mapEachKey } from '../misc';
describe('util/misc', () => {
  it('resolveMaybeThunk', () => {
    expect(resolveMaybeThunk('hey')).toBe('hey');
    expect(resolveMaybeThunk({
      a: 1
    })).toEqual({
      a: 1
    });
    expect(resolveMaybeThunk(() => 'wow')).toBe('wow');
  });
  it('camelCase', () => {
    expect(camelCase('Hello how are you')).toBe('helloHowAreYou');
  });
  it('getPluralName', () => {
    expect(getPluralName('author')).toBe('authors');
    expect(getPluralName('child')).toBe('children');
    expect(getPluralName('person')).toBe('people');
    expect(getPluralName('ox')).toBe('oxen');
    expect(getPluralName('my field')).toBe('myFields');
  });
  it('upperFirst', () => {
    expect(upperFirst('author')).toBe('Author');
    expect(upperFirst('my type')).toBe('My type');
    expect(upperFirst('my_type')).toBe('My_type');
  });
  it('clearName', () => {
    expect(clearName('author')).toBe('author');
    expect(clearName('my type')).toBe('mytype');
    expect(clearName('my_type#2048@!')).toBe('my_type2048');
  });
  it('omit', () => {
    expect(omit({
      a: 1,
      b: 2,
      c: 3
    }, ['a', 'd'])).toEqual({
      b: 2,
      c: 3
    });
    expect(omit({
      a: 1,
      b: 2,
      c: 3
    }, 'c')).toEqual({
      a: 1,
      b: 2
    });
  });
  it('only', () => {
    expect(only({
      a: 1,
      b: 2,
      c: 3
    }, ['a', 'd'])).toEqual({
      a: 1
    });
    expect(only({
      a: 1,
      b: 2,
      c: 3
    }, 'c')).toEqual({
      c: 3
    });
  });
  it('forEachKey', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    let result = '';
    forEachKey(obj, (v, k) => {
      result += `${v},${k};`;
    });
    expect(result).toBe('1,a;2,b;3,c;');
  });
  it('mapEachKey', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    expect(mapEachKey(obj, (v, k) => `${v}${k}`)).toEqual({
      a: '1a',
      b: '2b',
      c: '3c'
    });
  });
});