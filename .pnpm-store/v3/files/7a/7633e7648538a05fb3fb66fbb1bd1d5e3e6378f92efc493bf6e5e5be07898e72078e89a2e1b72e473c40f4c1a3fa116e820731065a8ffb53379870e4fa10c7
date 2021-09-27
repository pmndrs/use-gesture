/* @flow strict */
/* eslint-disable no-use-before-define */

import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { Resolver } from '../Resolver';
import { NamedTypeComposer, ComposeOutputType, ComposeInputType } from './typeHelpers';

export type TypeInPath<TContext> = NamedTypeComposer<TContext> | Resolver<any, TContext, any>;

/**
 * fieldName
 * @argName
 * #resolver
 */
export function typeByPath<TContext>(
  src: TypeInPath<TContext>,
  path: string | string[]
): TypeInPath<TContext> | void;

export function typeByPathTC<TContext>(
  tc: ObjectTypeComposer<any, TContext>,
  parts: string[]
): TypeInPath<TContext> | void;

export function typeByPathITC<TContext>(
  itc: InputTypeComposer<TContext>,
  parts: string[]
): TypeInPath<TContext> | void;

export function typeByPathRSV<TContext>(
  rsv: Resolver<any, TContext, any>,
  parts: string[]
): TypeInPath<TContext> | Resolver<any, TContext, any> | void;

export function typeByPathIFTC<TContext>(
  tc: InterfaceTypeComposer<any, TContext>,
  parts: string[]
): TypeInPath<TContext> | void;

export function processType<TContext>(
  type: ComposeOutputType<TContext> | ComposeInputType | void | null,
  restParts: string[]
): TypeInPath<TContext> | void;
