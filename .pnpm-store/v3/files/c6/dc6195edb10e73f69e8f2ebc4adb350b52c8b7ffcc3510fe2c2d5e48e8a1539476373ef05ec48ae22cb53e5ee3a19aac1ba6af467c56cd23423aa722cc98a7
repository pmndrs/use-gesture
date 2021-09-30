import * as React from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            effectComposer: ReactThreeFiber.Node<EffectComposer, typeof EffectComposer>;
            renderPass: ReactThreeFiber.Node<RenderPass, typeof RenderPass>;
            shaderPass: ReactThreeFiber.Node<ShaderPass, typeof ShaderPass>;
        }
    }
}
export declare const isWebGL2Available: () => boolean;
export declare const Effects: React.ForwardRefExoticComponent<Pick<Omit<Partial<EffectComposer<import("three").WebGLRenderTarget>>, ReactThreeFiber.NonFunctionKeys<ReactThreeFiber.NodeProps<EffectComposer<import("three").WebGLRenderTarget>, typeof EffectComposer>>> & ReactThreeFiber.NodeProps<EffectComposer<import("three").WebGLRenderTarget>, typeof EffectComposer> & {
    multisamping?: number | undefined;
    renderIndex?: number | undefined;
    disableGamma?: boolean | undefined;
    disableRenderPass?: boolean | undefined;
}, "attach" | "attachArray" | "attachObject" | "args" | "children" | "key" | "onUpdate" | keyof EffectComposer<import("three").WebGLRenderTarget> | "multisamping" | "renderIndex" | "disableGamma" | "disableRenderPass"> & React.RefAttributes<unknown>>;
