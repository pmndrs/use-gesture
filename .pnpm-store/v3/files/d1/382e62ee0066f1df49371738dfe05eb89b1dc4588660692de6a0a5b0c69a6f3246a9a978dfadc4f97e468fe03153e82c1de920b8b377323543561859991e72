import React from 'react';
import type { FullTheme } from './styles';
import type { StoreType, PanelSettingsType, InputContextProps } from './types';
export declare const InputContext: React.Context<{}>;
export declare function useInputContext<T = {}>(): InputContextProps & T;
declare type ThemeContextProps = {
    theme: FullTheme;
    className: string;
};
export declare const ThemeContext: React.Context<ThemeContextProps | null>;
export declare const StoreContext: React.Context<StoreType | null>;
export declare const PanelSettingsContext: React.Context<PanelSettingsType | null>;
export declare function useStoreContext(): StoreType;
export declare function usePanelSettingsContext(): PanelSettingsType;
declare type LevaStoreProviderProps = {
    children: React.ReactChild | React.ReactChild[] | React.ReactChildren;
    store: StoreType;
};
export declare function LevaStoreProvider({ children, store }: LevaStoreProviderProps): JSX.Element;
export {};
