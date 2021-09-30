import { Component } from './component';
import { Constants } from './constants';

export class VisualResponse {
  constructor(visualResponseDescription: object);

  readonly componentProperty: Constants.ComponentProperty;
  readonly states: [Constants.ComponentState];
  readonly valueNodeName: string;
  readonly valueNodeProperty: Constants.VisualResponseProperty;

  readonly minNodeName?: string;
  readonly maxNodeName?: string;

  readonly value: number | boolean;

  updateFromComponent(component: { 
    state: Constants.ComponentState;
    button?: number;
    xAxis?: number;
    yAxis?: number 
  }): void;
}
