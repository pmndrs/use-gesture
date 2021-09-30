import { useRef, useEffect } from 'react';

/**
 * Adds a DOM event listener
 *
 * @param eventName
 * @param listener
 * @param element
 */

function useEventListener(eventName, listener, element) {
  if (element === void 0) {
    element = window;
  }

  var savedHandler = useRef(listener);
  useEffect(function () {
    savedHandler.current = listener;
  }, [listener]);
  useEffect(function () {
    var isSupported = element && element.addEventListener;

    if (!isSupported) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Event listener not supported on the element provided");
      }

      return;
    }

    function eventListener(event) {
      savedHandler.current(event);
    }

    element.addEventListener(eventName, eventListener);
    return function () {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export { useEventListener };
