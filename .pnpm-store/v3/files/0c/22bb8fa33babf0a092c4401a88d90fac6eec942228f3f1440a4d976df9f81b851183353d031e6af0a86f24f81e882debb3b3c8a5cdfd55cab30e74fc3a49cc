import { ComponentClass, StatelessComponent, HTMLProps, ComponentType, Context } from 'react'
import { PrismTheme, Language } from 'prism-react-renderer';

// Helper types
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// React Element Props
type DivProps = HTMLProps<HTMLDivElement>
type PreProps = HTMLProps<HTMLPreElement>

// LiveProvider
export type LiveProviderProps = Omit<DivProps, 'scope'> & {
  scope?: { [key: string]: any };
  code?: string;
  noInline?: boolean;
  transformCode?: (code: string) => string;
  language?: Language;
  disabled?: boolean;
  theme?: PrismTheme;
}

export const LiveProvider: ComponentClass<LiveProviderProps>

// Editor
export type EditorProps = Omit<PreProps, 'onChange'> & {
  code?: string,
  disabled?: boolean;
  language?: Language;
  onChange?: (code: string) => void;
  theme?: PrismTheme;
}

export const Editor: ComponentClass<EditorProps>

// Context
export interface ContextProps {
  code?: string;
  language?: Language;
  theme: PrismTheme;
  disabled?: boolean;
  error?: string;
}

export const LiveContext: Context<ContextProps>;

// LiveEditor
export type LiveEditorProps = EditorProps;

export const LiveEditor: ComponentClass<LiveEditorProps>

// LiveError
export const LiveError: ComponentClass<DivProps>

// LivePreview
export const LivePreview: ComponentClass<DivProps>

// withLive HOC
export function withLive<P>(wrappedComponent: ComponentType<P>): ComponentClass<P>
