declare module 'react-simple-code-editor' {
  import * as React from 'react';

  export default class extends React.Component<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      // Props for the component
      value: string;
      onValueChange: (value: string) => void;
      highlight: (value: string) => string | React.ReactNode;
      tabSize?: number;
      insertSpaces?: boolean;
      ignoreTabKey?: boolean;
      padding?: number | string;
      style?: React.CSSProperties;

      // Props for the textarea
      textareaId?: string,
      autoFocus?: boolean;
      disabled?: boolean;
      form?: string;
      maxLength?: number;
      minLength?: number;
      name?: string;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
      onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
      onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
      onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    }
  > {
    session: {
      history: {
        stack: Array<{
          value: string;
          selectionStart: number;
          selectionEnd: number;
          timestamp: number;
        }>;
        offset: number;
      };
    };
  }
}
