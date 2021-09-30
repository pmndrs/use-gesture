import { BasePredicate } from '..';
export interface Shape {
    [key: string]: BasePredicate | Shape;
}
/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export declare function partial(object: {
    [key: string]: any;
}, shape: Shape, parent?: string): boolean | string;
/**
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export declare function exact(object: {
    [key: string]: any;
}, shape: Shape, parent?: string): boolean | string;
