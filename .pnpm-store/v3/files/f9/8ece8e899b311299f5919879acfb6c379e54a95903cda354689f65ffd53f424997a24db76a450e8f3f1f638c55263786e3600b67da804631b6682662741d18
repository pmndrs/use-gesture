import { Constants } from './constants';
import { VisualResponse } from './visualResponse';

export class Component {
  constructor(componentId: string, componentDescription: object);

  readonly id: string;
  readonly type: Constants.ComponentType;
  readonly rootNodeName: string;
  readonly touchPointNodeName: string;

  readonly visualResponses: { [key: string]: VisualResponse };
  readonly gamepadIndices: { button: number; xAxis: number; yAxis: number };
  readonly values: { 
    state: Constants.ComponentState; 
    button?: number; 
    xAxis?: number; 
    yAxis?: number };

  get data(): object;

  updateFromGamepad(gamepad: Gamepad): void;
}
