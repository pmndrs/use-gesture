import { useContext, useRef, useState } from 'react';
import { useSealedState } from 'reakit-utils/useSealedState';
import { unstable_IdContext } from './IdProvider.js';

function unstable_useIdState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      initialBaseId = _useSealedState.baseId;

  var generateId = useContext(unstable_IdContext);
  var idCountRef = useRef(0);

  var _React$useState = useState(function () {
    return initialBaseId || generateId();
  }),
      baseId = _React$useState[0],
      setBaseId = _React$useState[1];

  return {
    baseId: baseId,
    setBaseId: setBaseId,
    unstable_idCountRef: idCountRef
  };
}

export { unstable_useIdState };
