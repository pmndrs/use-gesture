import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback, createElement } from 'react';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import '../Role/Role.js';
import 'reakit-utils/canUseDOM';
import '../__keys-e6a5cfbe.js';
import { useDisclosureContent } from '../Disclosure/DisclosureContent.js';
import 'react-dom';
import { Portal } from '../Portal/Portal.js';
import { D as DialogBackdropContext } from '../DialogBackdropContext-8775f78b.js';
import { a as DIALOG_BACKDROP_KEYS } from '../__keys-ed7b48af.js';

var useDialogBackdrop = createHook({
  name: "DialogBackdrop",
  compose: useDisclosureContent,
  keys: DIALOG_BACKDROP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? true : _ref$modal,
        options = _objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _objectSpread2({
      modal: modal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlWrapElement = _ref2.wrapElement,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["wrapElement"]);

    var wrapElement = useCallback(function (element) {
      if (options.modal) {
        element = /*#__PURE__*/createElement(Portal, null, /*#__PURE__*/createElement(DialogBackdropContext.Provider, {
          value: options.baseId
        }, element));
      }

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [options.modal, htmlWrapElement]);
    return _objectSpread2({
      id: undefined,
      "data-dialog-ref": options.baseId,
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var DialogBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: useDialogBackdrop
});

export { DialogBackdrop, useDialogBackdrop };
