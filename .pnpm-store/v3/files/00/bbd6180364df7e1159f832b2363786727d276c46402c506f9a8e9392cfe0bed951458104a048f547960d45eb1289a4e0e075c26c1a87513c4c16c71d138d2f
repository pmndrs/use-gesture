import React from 'react';
export function useDocSearchKeyboardEvents(_ref) {
  var isOpen = _ref.isOpen,
      onOpen = _ref.onOpen,
      onClose = _ref.onClose;
  React.useEffect(function () {
    function onKeyDown(event) {
      if (event.keyCode === 27 && isOpen || event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return function () {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}