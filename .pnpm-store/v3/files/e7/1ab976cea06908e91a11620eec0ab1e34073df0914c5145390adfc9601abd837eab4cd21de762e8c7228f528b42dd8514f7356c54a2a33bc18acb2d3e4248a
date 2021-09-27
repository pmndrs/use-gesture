/* eslint-disable no-unused-vars */
/* @flow strict */

import { isFunction } from './utils/is';
import type { GraphQLType } from './graphql';
import type { NamedTypeComposer } from './utils/typeHelpers';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { inspect } from './utils/misc';
import type { SchemaComposer } from './SchemaComposer';

export class ThunkComposer<T = NamedTypeComposer<any>, G = GraphQLType> {
  _thunk: Function;
  _typeName: string | void;
  _typeFromThunk: T | void;

  get ofType(): T {
    if (!this._typeFromThunk) {
      this._typeFromThunk = this._thunk();
    }
    if (!this._typeFromThunk) {
      throw new Error(
        `ThunkComposer(${this._typeName || ''}) returns empty value: ${inspect(
          this._typeFromThunk
        )}`
      );
    }
    return this._typeFromThunk;
  }

  constructor(thunk: Function, typeName?: string): ThunkComposer<T, G> {
    this._thunk = thunk;
    if (typeName && typeof typeName === 'string') {
      this._typeName = typeName;
    }

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  getUnwrappedTC(): T {
    return this.ofType;
  }

  getType(): G {
    return (this.ofType: any).getType();
  }

  getTypeName(): string {
    if (this._typeFromThunk && isFunction((this._typeFromThunk: any).getTypeName)) {
      return (this._typeFromThunk: any).getTypeName();
    } else if (this._typeName) {
      return this._typeName;
    }
    return (this.getUnwrappedTC(): any).getTypeName();
  }

  getTypePlural(): ListComposer<ThunkComposer<T, G>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<ThunkComposer<T, G>> {
    return new NonNullComposer(this);
  }

  /**
   * Get Type wrapped in List modifier
   */
  get List(): ListComposer<ThunkComposer<T, G>> {
    return new ListComposer(this);
  }

  /**
   * Get Type wrapped in NonNull modifier
   */
  get NonNull(): NonNullComposer<ThunkComposer<T, G>> {
    return new NonNullComposer(this);
  }

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all wrapped types.
   */
  cloneTo(
    anotherSchemaComposer: SchemaComposer<any>,
    cloneMap?: Map<any, any> = new Map()
  ): ThunkComposer<NamedTypeComposer<any>, G> {
    const cloned = (this.ofType: any).cloneTo(anotherSchemaComposer, cloneMap);
    return new ThunkComposer(() => cloned, this._typeName);
  }
}
