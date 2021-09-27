import React from 'react';
import LiveContext from './LiveContext';
import Editor from '../Editor';

export default function LiveEditor(props) {
  return (
    <LiveContext.Consumer>
      {({ code, language, theme, disabled, onChange }) => (
        <Editor
          theme={theme}
          code={code}
          language={language}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      )}
    </LiveContext.Consumer>
  );
}
