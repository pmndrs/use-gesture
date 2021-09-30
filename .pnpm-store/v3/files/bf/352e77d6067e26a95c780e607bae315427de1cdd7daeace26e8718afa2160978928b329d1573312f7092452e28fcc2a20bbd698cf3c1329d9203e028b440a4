import * as React from 'react';
import { Options as ResizeOptions } from 'react-use-measure';
import { RenderProps } from './index';
import { UseStore } from 'zustand';
import { RootState } from '../core/store';
import { EventManager } from '../core/events';
export interface Props extends Omit<RenderProps<HTMLCanvasElement>, 'size' | 'events'>, React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    resize?: ResizeOptions;
    events?: (store: UseStore<RootState>) => EventManager<any>;
}
export declare const Canvas: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLCanvasElement>>;
