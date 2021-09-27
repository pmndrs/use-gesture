import { useRef, useEffect } from 'react';

/**
 * Detect when focus changes in our document.
 *
 * @param handleChange
 * @param when
 * @param ownerDocument
 */

function useFocusChange(handleChange, when, ownerDocument) {
  if (handleChange === void 0) {
    handleChange = console.log;
  }

  if (when === void 0) {
    when = "focus";
  }

  if (ownerDocument === void 0) {
    ownerDocument = document;
  }

  var lastActiveElement = useRef(ownerDocument.activeElement);
  useEffect(function () {
    lastActiveElement.current = ownerDocument.activeElement;

    function onChange(event) {
      if (lastActiveElement.current !== ownerDocument.activeElement) {
        handleChange(ownerDocument.activeElement, lastActiveElement.current, event);
        lastActiveElement.current = ownerDocument.activeElement;
      }
    }

    ownerDocument.addEventListener(when, onChange, true);
    return function () {
      ownerDocument.removeEventListener(when, onChange);
    };
  }, [when, handleChange, ownerDocument]);
}

export { useFocusChange };
